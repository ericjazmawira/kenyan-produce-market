
import { useState } from "react";
import Header from "@/components/Header";
import EditListingDialog from "@/components/EditListingDialog";
import StatsCards from "@/components/dashboard/StatsCards";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { useToast } from "@/hooks/use-toast";

const FarmerDashboard = () => {
  const { toast } = useToast();
  const [activeListings, setActiveListings] = useState([
    { id: 1, name: "Fresh Tomatoes", quantity: "50kg", price: "KSh 80/kg", status: "active", orders: 5, description: "Farm-fresh tomatoes, harvested yesterday", category: "vegetables" },
    { id: 2, name: "Green Maize", quantity: "100kg", price: "KSh 45/kg", status: "active", orders: 8, description: "Sweet green maize, perfect for roasting", category: "grains" },
    { id: 3, name: "French Beans", quantity: "25kg", price: "KSh 120/kg", status: "active", orders: 3, description: "Premium quality French beans", category: "vegetables" }
  ]);

  const [recentOrders, setRecentOrders] = useState([
    { id: 1, product: "Fresh Tomatoes", buyer: "Nairobi Market", amount: "KSh 4,000", status: "pending" },
    { id: 2, product: "Green Maize", buyer: "Local Restaurant", amount: "KSh 2,250", status: "in-transit" },
    { id: 3, product: "French Beans", buyer: "Export Company", amount: "KSh 3,600", status: "delivered" }
  ]);

  const [editingListing, setEditingListing] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddNewListing = () => {
    toast({
      title: "Add New Listing",
      description: "Opening form to add a new produce listing...",
    });
  };

  const handleEditListing = (listingId: number, listingName: string) => {
    const listing = activeListings.find(l => l.id === listingId);
    if (listing) {
      setEditingListing(listing);
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveListing = (updatedListing: any) => {
    setActiveListings(prev => 
      prev.map(listing => 
        listing.id === updatedListing.id ? updatedListing : listing
      )
    );
  };

  const handleDeleteListing = (listingId: number, listingName: string) => {
    setActiveListings(prev => prev.filter(listing => listing.id !== listingId));
    toast({
      title: "Listing Deleted",
      description: `${listingName} has been removed from your listings.`,
    });
  };

  const handleUpdateOrderStatus = (orderId: number, newStatus: string) => {
    setRecentOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast({
      title: "Order Status Updated",
      description: `Order #${orderId} status changed to ${newStatus}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Farmer Dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader onAddNewListing={handleAddNewListing} />
        
        <StatsCards activeListingsCount={activeListings.length} />

        <DashboardTabs 
          orders={recentOrders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
        />
      </div>

      <EditListingDialog
        listing={editingListing}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingListing(null);
        }}
        onSave={handleSaveListing}
      />
    </div>
  );
};

export default FarmerDashboard;
