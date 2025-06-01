
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { Package, Truck, CheckCircle, Clock, Phone, Mail } from "lucide-react";

interface Order {
  id: string;
  produce: string;
  quantity: string;
  farmer: string;
  status: "Pending" | "In Transit" | "Delivered";
  price: string;
  date: string;
  phone: string;
  location: string;
}

const Orders = () => {
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      produce: "Fresh Tomatoes",
      quantity: "50 kg",
      farmer: "John Kamau",
      status: "Delivered",
      price: "KSh 2,500",
      date: "2024-05-28",
      phone: "+254 712 345 678",
      location: "Kiambu"
    },
    {
      id: "ORD-002",
      produce: "Organic Carrots",
      quantity: "30 kg",
      farmer: "Mary Wanjiku",
      status: "In Transit",
      price: "KSh 1,800",
      date: "2024-05-30",
      phone: "+254 723 456 789",
      location: "Nakuru"
    },
    {
      id: "ORD-003",
      produce: "Green Beans",
      quantity: "25 kg",
      farmer: "Peter Mwangi",
      status: "Pending",
      price: "KSh 1,250",
      date: "2024-06-01",
      phone: "+254 734 567 890",
      location: "Meru"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4" />;
      case "In Transit":
        return <Truck className="h-4 w-4" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filterOrders = (status?: string) => {
    if (!status || status === "All") return orders;
    return orders.filter(order => order.status === status);
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card key={order.id} className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-lg">{order.produce}</h3>
              <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1`}>
                {getStatusIcon(order.status)}
                <span>{order.status}</span>
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Farmer:</strong> {order.farmer}</p>
              <p><strong>Location:</strong> {order.location}</p>
              <p><strong>Price:</strong> {order.price}</p>
              <p><strong>Date:</strong> {order.date}</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 md:items-end">
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
              <Button size="sm" variant="outline">
                <Mail className="h-4 w-4 mr-1" />
                Message
              </Button>
            </div>
            {order.status !== "Delivered" && (
              <Button size="sm" className="w-full md:w-auto">
                Track Order
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Orders" />
      
      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">Track and manage your produce orders</p>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="All">All Orders</TabsTrigger>
            <TabsTrigger value="Pending">Pending</TabsTrigger>
            <TabsTrigger value="In Transit">In Transit</TabsTrigger>
            <TabsTrigger value="Delivered">Delivered</TabsTrigger>
          </TabsList>
          
          <TabsContent value="All" className="mt-6">
            <div className="space-y-4">
              {filterOrders().map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="Pending" className="mt-6">
            <div className="space-y-4">
              {filterOrders("Pending").map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="In Transit" className="mt-6">
            <div className="space-y-4">
              {filterOrders("In Transit").map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="Delivered" className="mt-6">
            <div className="space-y-4">
              {filterOrders("Delivered").map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;
