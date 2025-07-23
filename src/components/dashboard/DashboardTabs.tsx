
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, TrendingUp, AlertCircle, CheckCircle, Clock, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatsCards } from "./StatsCards";
import { RecentOrdersTab } from "./RecentOrdersTab";
import AdminManagement from "@/components/AdminManagement";
import { ProduceListings } from "@/components/ProduceListings";
import { OrderTracking } from "@/components/OrderTracking";

interface DashboardTabsProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  userRole?: 'farmer' | 'buyer' | 'transporter' | 'admin';
}

export const DashboardTabs = ({ activeTab, setActiveTab, userRole = 'admin' }: DashboardTabsProps) => {
  const getTabsForRole = () => {
    switch (userRole) {
      case 'admin':
        return [
          { value: "overview", label: "Overview" },
          { value: "users", label: "Users" },
          { value: "listings", label: "Listings" },
          { value: "orders", label: "Orders" },
          { value: "analytics", label: "Analytics" }
        ];
      case 'farmer':
        return [
          { value: "overview", label: "Overview" },
          { value: "listings", label: "My Listings" },
          { value: "orders", label: "Orders" },
          { value: "transport", label: "Transport Jobs" }
        ];
      case 'buyer':
        return [
          { value: "overview", label: "Overview" },
          { value: "orders", label: "My Orders" },
          { value: "shipping", label: "Shipping Jobs" }
        ];
      case 'transporter':
        return [
          { value: "overview", label: "Overview" },
          { value: "deliveries", label: "Deliveries" },
          { value: "transport", label: "Transport Jobs" }
        ];
      default:
        return [];
    }
  };

  const tabs = getTabsForRole();

  return (
    <Tabs value={activeTab || "overview"} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className={`grid w-full grid-cols-${tabs.length}`}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <StatsCards userRole={userRole} />
        <RecentOrdersTab userRole={userRole} />
      </TabsContent>

      {userRole === 'admin' && (
        <>
          <TabsContent value="users">
            <AdminManagement />
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Detailed analytics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </>
      )}

      <TabsContent value="listings">
        <ProduceListings />
      </TabsContent>

      <TabsContent value="orders">
        <OrderTracking />
      </TabsContent>

      {(userRole === 'farmer' || userRole === 'transporter') && (
        <TabsContent value="transport">
          <div>Transport jobs content will be handled by parent component</div>
        </TabsContent>
      )}

      {userRole === 'buyer' && (
        <TabsContent value="shipping">
          <div>Shipping jobs content will be handled by parent component</div>
        </TabsContent>
      )}

      {userRole === 'transporter' && (
        <TabsContent value="deliveries">
          <div>Delivery orders content will be handled by parent component</div>
        </TabsContent>
      )}
    </Tabs>
  );
};
