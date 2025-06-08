
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, Package, Clock, CheckCircle, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  buyer_id: string;
  listing_id: string;
  farmer_id: string;
  quantity: number;
  total_amount: number;
  status: string;
  delivery_address: string;
  created_at: string;
  buyer_name?: string;
  farmer_name?: string;
}

const TransporterDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
    totalEarnings: 0
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Fetch orders that need transportation (pending or accepted status)
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select('*')
        .in('status', ['pending', 'accepted', 'in_transit'])
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      // Fetch user profile data for buyer and farmer names
      const buyerIds = [...new Set(ordersData.map(order => order.buyer_id))];
      const farmerIds = [...new Set(ordersData.map(order => order.farmer_id))];
      
      const { data: profiles } = await supabase
        .from('user_profiles')
        .select('user_id, full_name')
        .in('user_id', [...buyerIds, ...farmerIds]);

      // Create a map for quick lookup
      const profileMap: { [key: string]: string } = {};
      profiles?.forEach(profile => {
        if (profile.full_name) {
          profileMap[profile.user_id] = profile.full_name;
        }
      });

      // Enhance orders with user names
      const enhancedOrders = ordersData.map(order => ({
        ...order,
        buyer_name: profileMap[order.buyer_id] || 'Unknown Buyer',
        farmer_name: profileMap[order.farmer_id] || 'Unknown Farmer'
      }));

      setOrders(enhancedOrders);

      // Calculate stats
      const totalJobs = enhancedOrders.length;
      const activeJobs = enhancedOrders.filter(o => o.status === 'in_transit').length;
      const completedJobs = enhancedOrders.filter(o => o.status === 'completed').length;
      const totalEarnings = enhancedOrders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + (o.total_amount * 0.1), 0); // 10% commission

      setStats({ totalJobs, activeJobs, completedJobs, totalEarnings });
    } catch (error) {
      console.error('Error in fetchOrders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const acceptJob = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'accepted',
          // You could add transporter_id field to track who accepted the job
        })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Job Accepted!",
        description: "You have successfully accepted this delivery job.",
      });

      fetchOrders(); // Refresh the list
    } catch (error) {
      console.error('Error accepting job:', error);
      toast({
        title: "Error",
        description: "Failed to accept job. Please try again.",
        variant: "destructive"
      });
    }
  };

  const startDelivery = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'in_transit' })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Delivery Started!",
        description: "Order is now in transit.",
      });

      fetchOrders();
    } catch (error) {
      console.error('Error starting delivery:', error);
      toast({
        title: "Error",
        description: "Failed to start delivery. Please try again.",
        variant: "destructive"
      });
    }
  };

  const completeDelivery = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Delivery Completed!",
        description: "Order has been delivered successfully.",
      });

      fetchOrders();
    } catch (error) {
      console.error('Error completing delivery:', error);
      toast({
        title: "Error",
        description: "Failed to complete delivery. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Available</Badge>;
      case 'accepted':
        return <Badge className="bg-blue-500">Accepted</Badge>;
      case 'in_transit':
        return <Badge className="bg-yellow-500">In Transit</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Transporter Dashboard</h1>
        <p className="text-xl text-gray-600">Manage your delivery jobs and earnings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalJobs}</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-3xl font-bold text-blue-600">{stats.activeJobs}</p>
              </div>
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-purple-600">{stats.completedJobs}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-green-600">KSh {stats.totalEarnings.toFixed(2)}</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-6 w-6" />
            <span>Available Delivery Jobs</span>
          </CardTitle>
          <CardDescription>
            Accept and manage delivery jobs from farmers to buyers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs available</h3>
              <p className="text-gray-500">Check back later for new delivery opportunities</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">KSh {order.total_amount}</p>
                      <p className="text-sm text-gray-500">Est. earning: KSh {(order.total_amount * 0.1).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">From:</p>
                      <p>{order.farmer_name}</p>
                    </div>
                    <div>
                      <p className="font-medium">To:</p>
                      <p>{order.buyer_name}</p>
                    </div>
                    <div>
                      <p className="font-medium">Delivery Address:</p>
                      <p className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {order.delivery_address}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {order.status === 'pending' && (
                      <Button 
                        onClick={() => acceptJob(order.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Accept Job
                      </Button>
                    )}
                    {order.status === 'accepted' && (
                      <Button 
                        onClick={() => startDelivery(order.id)}
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        Start Delivery
                      </Button>
                    )}
                    {order.status === 'in_transit' && (
                      <Button 
                        onClick={() => completeDelivery(order.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Complete Delivery
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransporterDashboard;
