
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Truck, CheckCircle, Package } from "lucide-react";

interface Order {
  id: number;
  product: string;
  buyer: string;
  amount: string;
  status: string;
}

interface RecentOrdersTabProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: number, newStatus: string) => void;
}

const RecentOrdersTab = ({ orders, onUpdateOrderStatus }: RecentOrdersTabProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "in-transit": return <Truck className="h-4 w-4" />;
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "in-transit": return "bg-blue-100 text-blue-800";
      case "delivered": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          Track and manage your customer orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                {getStatusIcon(order.status)}
                <div>
                  <p className="font-medium">{order.product}</p>
                  <p className="text-sm text-gray-500">Buyer: {order.buyer}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">{order.amount}</p>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.replace("-", " ")}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateOrderStatus(order.id, "in-transit")}
                >
                  Update Status
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTab;
