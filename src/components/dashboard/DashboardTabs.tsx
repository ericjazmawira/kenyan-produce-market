
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  MessageSquare,
  Settings,
  BarChart3
} from "lucide-react";
import { AdminManagement } from "@/components/AdminManagement";
import { ProduceListings } from "@/components/ProduceListings";
import { OrderTracking } from "@/components/OrderTracking";
import { RecentOrdersTab } from "./RecentOrdersTab";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardTabs = ({ activeTab, setActiveTab }: DashboardTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Users
        </TabsTrigger>
        <TabsTrigger value="listings" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          Listings
        </TabsTrigger>
        <TabsTrigger value="orders" className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          Orders
        </TabsTrigger>
        <TabsTrigger value="messages" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Messages
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <RecentOrdersTab />
      </TabsContent>

      <TabsContent value="users" className="space-y-6">
        <AdminManagement />
      </TabsContent>

      <TabsContent value="listings" className="space-y-6">
        <ProduceListings />
      </TabsContent>

      <TabsContent value="orders" className="space-y-6">
        <OrderTracking />
      </TabsContent>

      <TabsContent value="messages" className="space-y-6">
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Messages & Support</h3>
          <p className="text-gray-500">Support messages and reports will appear here.</p>
        </div>
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <div className="text-center py-12">
          <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Platform Settings</h3>
          <p className="text-gray-500">Configure delivery options, fees, and platform settings.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
