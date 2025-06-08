
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { Truck, Package, MapPin, Clock, DollarSign, CheckCircle, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface DeliveryRequest {
  id: string;
  pickup: string;
  destination: string;
  produce: string;
  quantity: string;
  distance: string;
  payment: string;
  farmer: string;
  buyer: string;
  status: "Available" | "Accepted" | "In Progress" | "Completed";
  deadline: string;
  order_id?: string;
}

const TransporterDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch real orders from the database
  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ['transporter-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          listings (title, farmer_id),
          user_profiles!orders_buyer_id_fkey (full_name, phone, location)
        `)
        .eq('status', 'confirmed');
      
      if (error) throw error;
      return data;
    }
  });

  // Convert orders to delivery requests format
  const deliveryRequests: DeliveryRequest[] = orders?.map(order => ({
    id: `DEL-${order.id.slice(-8)}`,
    order_id: order.id,
    pickup: "Farm Location", // This would come from farmer's profile
    destination: order.delivery_address || "Delivery Address",
    produce: order.listings?.title || "Fresh Produce",
    quantity: `${order.quantity} kg`,
    distance: "25 km", // This would be calculated
    payment: `KSh ${order.total_amount}`,
    farmer: "Farmer Name", // This would come from farmer's profile
    buyer: order.user_profiles?.full_name || "Buyer",
    status: "Available",
    deadline: "Today, 4:00 PM"
  })) || [];

  // Mock data for demo purposes when no real orders
  const mockDeliveryRequests: DeliveryRequest[] = [
    {
      id: "DEL-001",
      pickup: "Kiambu Farm",
      destination: "Nairobi CBD",
      produce: "Fresh Tomatoes",
      quantity: "100 kg",
      distance: "25 km",
      payment: "KSh 800",
      farmer: "John Kamau",
      buyer: "City Restaurant",
      status: "Available",
      deadline: "Today, 4:00 PM"
    },
    {
      id: "DEL-002",
      pickup: "Nakuru Market",
      destination: "Eldoret",
      produce: "Maize",
      quantity: "500 kg",
      distance: "80 km",
      payment: "KSh 2,500",
      farmer: "Mary Wanjiku",
      buyer: "Wholesale Depot",
      status: "Accepted",
      deadline: "Tomorrow, 10:00 AM"
    },
    {
      id: "DEL-003",
      pickup: "Meru",
      destination: "Nairobi",
      produce: "Green Beans",
      quantity: "75 kg",
      distance: "180 km",
      payment: "KSh 1,800",
      farmer: "Peter Mwangi",
      buyer: "Export Company",
      status: "In Progress",
      deadline: "Today, 6:00 PM"
    }
  ];

  const allRequests = deliveryRequests.length > 0 ? deliveryRequests : mockDeliveryRequests;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Accepted":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAcceptJob = async (id: string, orderId?: string) => {
    if (orderId) {
      try {
        // Update order status to in_progress when transporter accepts
        await supabase
          .from('orders')
          .update({ status: 'in_progress' })
          .eq('id', orderId);

        toast({
          title: "Job Accepted!",
          description: "You have successfully accepted this delivery job.",
        });

        refetch();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to accept the job. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Job Accepted!",
        description: `You have accepted job ${id}`,
      });
    }
  };

  const RequestCard = ({ request }: { request: DeliveryRequest }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <h3 className="font-semibold text-lg">{request.produce}</h3>
              <Badge className={getStatusColor(request.status)}>
                {request.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{request.pickup} → {request.destination}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{request.quantity}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{request.distance}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-semibold">{request.payment}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{request.deadline}</span>
              </div>
            </div>
            
            <div className="mt-3 text-sm text-gray-600">
              <p><strong>Farmer:</strong> {request.farmer}</p>
              <p><strong>Buyer:</strong> {request.buyer}</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 md:ml-6">
            {request.status === "Available" && (
              <Button onClick={() => handleAcceptJob(request.id, request.order_id)} className="w-full md:w-auto">
                Accept Job
              </Button>
            )}
            {request.status === "Accepted" && (
              <Button variant="outline" className="w-full md:w-auto">
                Start Pickup
              </Button>
            )}
            {request.status === "In Progress" && (
              <Button variant="outline" className="w-full md:w-auto">
                Mark Delivered
              </Button>
            )}
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                Farmer
              </Button>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                Buyer
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Transporter Dashboard" />
      
      <div className="max-w-6xl mx-auto p-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{allRequests.filter(r => r.status === "Available").length}</p>
                  <p className="text-sm text-gray-600">Available Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{allRequests.filter(r => r.status === "Accepted" || r.status === "In Progress").length}</p>
                  <p className="text-sm text-gray-600">Active Deliveries</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">KSh 45,200</p>
                  <p className="text-sm text-gray-600">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">Available Jobs</TabsTrigger>
            <TabsTrigger value="active">Active Deliveries</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests" className="mt-6">
            <div className="space-y-4">
              {allRequests
                .filter(req => req.status === "Available")
                .map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-6">
            <div className="space-y-4">
              {allRequests
                .filter(req => req.status === "Accepted" || req.status === "In Progress")
                .map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {allRequests
                .filter(req => req.status === "Completed")
                .map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TransporterDashboard;
