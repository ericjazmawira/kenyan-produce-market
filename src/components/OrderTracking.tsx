
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Truck, CheckCircle, Package, Phone, MessageCircle, MapPin } from "lucide-react";

const OrderTracking = () => {
  const orders = [
    {
      id: "ORD-001",
      product: "Fresh Tomatoes",
      buyer: "Nairobi Fresh Market",
      quantity: "20kg",
      amount: "KSh 1,600",
      status: "pending",
      orderDate: "2024-01-15",
      estimatedDelivery: "2024-01-17",
      buyerPhone: "+254 700 111 222",
      deliveryAddress: "Tom Mboya Street, Nairobi"
    },
    {
      id: "ORD-002",
      product: "Green Maize",
      buyer: "Mama Njeri Restaurant",
      quantity: "15kg",
      amount: "KSh 675",
      status: "in-transit",
      orderDate: "2024-01-14",
      estimatedDelivery: "2024-01-16",
      buyerPhone: "+254 700 333 444",
      deliveryAddress: "Kimathi Street, Nairobi"
    },
    {
      id: "ORD-003",
      product: "French Beans",
      buyer: "Green Valley Exports",
      quantity: "30kg",
      amount: "KSh 3,600",
      status: "delivered",
      orderDate: "2024-01-12",
      estimatedDelivery: "2024-01-14",
      buyerPhone: "+254 700 555 666",
      deliveryAddress: "Industrial Area, Nairobi"
    },
    {
      id: "ORD-004",
      product: "Red Kidney Beans",
      buyer: "City Market Vendors",
      quantity: "25kg",
      amount: "KSh 3,750",
      status: "pending",
      orderDate: "2024-01-15",
      estimatedDelivery: "2024-01-18",
      buyerPhone: "+254 700 777 888",
      deliveryAddress: "City Market, Nairobi"
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          icon: <Clock className="h-4 w-4" />,
          color: "bg-yellow-100 text-yellow-800",
          label: "Pending Pickup"
        };
      case "in-transit":
        return {
          icon: <Truck className="h-4 w-4" />,
          color: "bg-blue-100 text-blue-800",
          label: "In Transit"
        };
      case "delivered":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: "bg-green-100 text-green-800",
          label: "Delivered"
        };
      default:
        return {
          icon: <Package className="h-4 w-4" />,
          color: "bg-gray-100 text-gray-800",
          label: "Unknown"
        };
    }
  };

  const getProgressSteps = (status: string) => {
    const steps = [
      { label: "Order Placed", completed: true },
      { label: "Confirmed", completed: true },
      { label: "In Transit", completed: status === "in-transit" || status === "delivered" },
      { label: "Delivered", completed: status === "delivered" }
    ];
    return steps;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Order Tracking</span>
          </CardTitle>
          <CardDescription>
            Track the status of your orders and manage deliveries
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {orders.map((order) => {
          const statusInfo = getStatusInfo(order.status);
          const progressSteps = getProgressSteps(order.status);
          
          return (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg font-semibold">#{order.id}</div>
                    <Badge className={statusInfo.color}>
                      {statusInfo.icon}
                      <span className="ml-1">{statusInfo.label}</span>
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">{order.amount}</div>
                    <div className="text-sm text-gray-500">{order.quantity}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium">{order.product}</div>
                  <div className="text-sm text-gray-600">Buyer: {order.buyer}</div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress Steps */}
                <div className="flex items-center justify-between">
                  {progressSteps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        step.completed ? "bg-green-500" : "bg-gray-300"
                      }`} />
                      {index < progressSteps.length - 1 && (
                        <div className={`w-12 h-0.5 mx-2 ${
                          progressSteps[index + 1].completed ? "bg-green-500" : "bg-gray-300"
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  {progressSteps.map((step, index) => (
                    <span key={index} className={step.completed ? "text-green-600 font-medium" : ""}>
                      {step.label}
                    </span>
                  ))}
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="ml-2 font-medium">{order.orderDate}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Est. Delivery:</span>
                      <span className="ml-2 font-medium">{order.estimatedDelivery}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Phone:</span>
                      <span className="ml-2 font-medium">{order.buyerPhone}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>Delivery Address:</span>
                      </div>
                      <div className="ml-4 font-medium text-sm">{order.deliveryAddress}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Buyer
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  {order.status === "pending" && (
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      Mark as Shipped
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {orders.filter(o => o.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">Pending Orders</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === "in-transit").length}
              </div>
              <div className="text-sm text-gray-600">In Transit</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === "delivered").length}
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderTracking;
