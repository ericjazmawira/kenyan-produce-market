
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketPrices from "@/components/MarketPrices";
import ProduceListings from "@/components/ProduceListings";
import OrderTracking from "@/components/OrderTracking";
import RecentOrdersTab from "./RecentOrdersTab";

interface Order {
  id: number;
  product: string;
  buyer: string;
  amount: string;
  status: string;
}

interface DashboardTabsProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: number, newStatus: string) => void;
}

const DashboardTabs = ({ orders, onUpdateOrderStatus }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="listings" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="listings">My Listings</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="prices">Market Prices</TabsTrigger>
        <TabsTrigger value="tracking">Order Tracking</TabsTrigger>
      </TabsList>
      
      <TabsContent value="listings">
        <ProduceListings />
      </TabsContent>
      
      <TabsContent value="orders">
        <RecentOrdersTab 
          orders={orders}
          onUpdateOrderStatus={onUpdateOrderStatus}
        />
      </TabsContent>
      
      <TabsContent value="prices">
        <MarketPrices />
      </TabsContent>
      
      <TabsContent value="tracking">
        <OrderTracking />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
