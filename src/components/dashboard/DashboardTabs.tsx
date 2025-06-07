
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

export const DashboardTabs = () => {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="listings">Listings</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <StatsCards />
        <RecentOrdersTab />
      </TabsContent>

      <TabsContent value="users">
        <AdminManagement />
      </TabsContent>

      <TabsContent value="listings">
        <ProduceListings />
      </TabsContent>

      <TabsContent value="orders">
        <OrderTracking />
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
    </Tabs>
  );
};
