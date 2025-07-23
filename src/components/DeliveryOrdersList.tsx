import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Calendar, Package, User, Phone } from "lucide-react";

interface Order {
  id: string;
  quantity: number;
  total_amount: number;
  status: string;
  delivery_address: string;
  created_at: string;
  buyer_name?: string;
  farmer_name?: string;
  buyer_phone?: string;
  farmer_phone?: string;
}

interface DeliveryOrdersListProps {
  userId: string;
}

export const DeliveryOrdersList = ({ userId }: DeliveryOrdersListProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .in('status', ['pending', 'accepted', 'in_transit'])
        .order('created_at', { ascending: false });

      if (error) throw error;

      // For now, we'll use placeholder data since user_profiles table structure needs to be clarified
      const enhancedOrders = (data || []).map(order => ({
        ...order,
        buyer_name: 'Customer',
        farmer_name: 'Farmer',
        buyer_phone: '+254 xxx xxx xxx',
        farmer_phone: '+254 xxx xxx xxx'
      }));

      setOrders(enhancedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch delivery orders",
        variant: "destructive"
      });
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Order ${newStatus === 'accepted' ? 'accepted' : newStatus === 'in_transit' ? 'started' : 'completed'} successfully!`
      });

      fetchOrders(); // Refresh the list
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'accepted':
        return <Badge className="bg-blue-100 text-blue-800">Accepted</Badge>;
      case 'in_transit':
        return <Badge className="bg-purple-100 text-purple-800">In Transit</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Delivery Orders</h2>
        <Button variant="outline" onClick={fetchOrders}>
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order #{order.id.slice(0, 8)}
                  </CardTitle>
                  {getStatusBadge(order.status)}
                </div>
                <div className="flex gap-2">
                  {order.status === 'pending' && (
                    <Button 
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, 'accepted')}
                      disabled={loading}
                    >
                      Accept Order
                    </Button>
                  )}
                  {order.status === 'accepted' && (
                    <Button 
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, 'in_transit')}
                      disabled={loading}
                    >
                      Start Delivery
                    </Button>
                  )}
                  {order.status === 'in_transit' && (
                    <Button 
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      disabled={loading}
                    >
                      Complete Delivery
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Buyer</p>
                    <p className="text-gray-600">{order.buyer_name}</p>
                    {order.buyer_phone && (
                      <p className="text-xs text-gray-500">{order.buyer_phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Farmer</p>
                    <p className="text-gray-600">{order.farmer_name}</p>
                    {order.farmer_phone && (
                      <p className="text-xs text-gray-500">{order.farmer_phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Delivery Address</p>
                    <p className="text-gray-600">{order.delivery_address || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Amount</p>
                    <p className="text-gray-600">KES {order.total_amount}</p>
                    <p className="text-xs text-gray-500">Qty: {order.quantity}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>Order placed: {new Date(order.created_at).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No delivery orders found</h3>
          <p className="text-gray-500">Orders will appear here when customers place orders for delivery</p>
        </div>
      )}
    </div>
  );
};