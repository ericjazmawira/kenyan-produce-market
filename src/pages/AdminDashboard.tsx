
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  MessageSquare,
  Settings,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader 
          title="Admin Dashboard" 
          subtitle="Manage your Farm2Table marketplace"
          showAdminActions={true}
        />
        
        <div className="mt-8">
          <StatsCards />
        </div>

        <div className="mt-8">
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} userRole="admin" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
