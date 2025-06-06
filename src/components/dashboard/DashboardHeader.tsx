
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface DashboardHeaderProps {
  onAddNewListing: () => void;
}

const DashboardHeader = ({ onAddNewListing }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div></div>
      <Button 
        className="bg-green-600 hover:bg-green-700"
        onClick={onAddNewListing}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Listing
      </Button>
    </div>
  );
};

export default DashboardHeader;
