import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Truck, Calendar, MapPin, Phone, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ShippingJobForm } from "@/components/ShippingJobForm";

interface Order {
  id: string;
  quantity: number;
  total_amount: number;
  status: string;
  delivery_address: string | null;
  created_at: string;
}

const BuyerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('buyer_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your orders",
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
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Buyer Dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader 
          title="Buyer Dashboard" 
          subtitle="Track your orders and manage deliveries"
        />

        <div className="mt-8">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="shipping">Shipping Jobs</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Order History</h2>
                <Button variant="outline" onClick={fetchOrders}>
                  Refresh
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-4 text-gray-500">Loading your orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-500">Start shopping to see your orders here</p>
                </div>
              ) : (
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
                          {order.status === 'pending' && (
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="font-medium">Amount</p>
                              <p className="text-gray-600">KES {order.total_amount}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="font-medium">Quantity</p>
                              <p className="text-gray-600">{order.quantity} items</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="font-medium">Order Date</p>
                              <p className="text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="font-medium">Delivery</p>
                              <p className="text-gray-600">
                                {order.delivery_address ? 'Home delivery' : 'Pickup from farm'}
                              </p>
                            </div>
                          </div>
                        </div>
                        {order.delivery_address && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-700">Delivery Address:</p>
                            <p className="text-sm text-gray-600">{order.delivery_address}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="shipping" className="space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Shipping Jobs</h2>
                    <p className="text-gray-600">Create pickup jobs for returns or personal deliveries</p>
                  </div>
                  <ShippingJobForm userRole="buyer" userId={user?.id || ''} />
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>My Shipping Jobs</CardTitle>
                    <CardDescription>
                      Track your pickup and delivery requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Your shipping jobs will appear here</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;