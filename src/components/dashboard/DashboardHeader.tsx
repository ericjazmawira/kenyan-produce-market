
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  showAdminActions?: boolean;
}

export const DashboardHeader = ({ title, subtitle, showAdminActions = false }: DashboardHeaderProps) => {
  const { toast } = useToast();

  const handleRefreshStats = () => {
    toast({
      title: "Stats Refreshed",
      description: "Platform statistics have been updated.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export will be ready shortly.",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{subtitle}</p>
      </div>
      {showAdminActions && (
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshStats}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      )}
    </div>
  );
};
