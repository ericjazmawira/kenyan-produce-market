import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import EditListingDialog from "@/components/EditListingDialog";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TransportJobs } from "@/components/TransportJobs";
import { ShippingJobForm } from "@/components/ShippingJobForm";
import { useToast } from "@/hooks/use-toast";

const FarmerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [activeListings, setActiveListings] = useState([
    { 
      id: 1, 
      title: "Fresh Tomatoes", 
      quantity: 50, 
      price: 80, 
      unit: "kg",
      status: "approved", 
      description: "Farm-fresh tomatoes, harvested yesterday", 
      category: "vegetables" 
    },
    { 
      id: 2, 
      title: "Green Maize", 
      quantity: 100, 
      price: 45, 
      unit: "kg",
      status: "approved", 
      description: "Sweet green maize, perfect for roasting", 
      category: "grains" 
    },
    { 
      id: 3, 
      title: "French Beans", 
      quantity: 25, 
      price: 120, 
      unit: "kg",
      status: "pending", 
      description: "Premium quality French beans", 
      category: "vegetables" 
    }
  ]);

  const [editingListing, setEditingListing] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const editListing = (listing: any) => {
    setEditingListing(listing);
    setIsEditDialogOpen(true);
  };

  const handleSaveListing = (updatedListing: any) => {
    setActiveListings(prev => 
      prev.map(listing => 
        listing.id === updatedListing.id ? updatedListing : listing
      )
    );
    toast({
      title: "Listing Updated",
      description: "Your listing has been updated successfully.",
    });
  };

  const deleteListing = (listingId: number) => {
    setActiveListings(prev => prev.filter(listing => listing.id !== listingId));
    toast({
      title: "Listing Deleted",
      description: "Listing has been removed successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Farmer Dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader 
          title="Farmer Dashboard" 
          subtitle="Manage your listings and orders"
        />
        
        <div className="mt-8">
          <StatsCards userRole="farmer" />
        </div>

        <div className="mt-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="transport">Transport Jobs</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome to your Dashboard</CardTitle>
                  <CardDescription>Manage your farm operations efficiently</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Overview statistics and recent activity will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="listings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Listings</h2>
                <Button onClick={() => setIsEditDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Listing
                </Button>
              </div>

              <div className="grid gap-6">
                {activeListings.map((listing) => (
                  <Card key={listing.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{listing.title}</CardTitle>
                          <p className="text-gray-600 mt-1">{listing.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => editListing(listing)}
                          >
                            <Edit2 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteListing(listing.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Price:</span>
                          <p>KSh {listing.price}/{listing.unit}</p>
                        </div>
                        <div>
                          <span className="font-medium">Available:</span>
                          <p>{listing.quantity} {listing.unit}</p>
                        </div>
                        <div>
                          <span className="font-medium">Category:</span>
                          <p>{listing.category}</p>
                        </div>
                        <div>
                          <span className="font-medium">Status:</span>
                          <Badge variant={listing.status === 'approved' ? 'default' : 'secondary'}>
                            {listing.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transport" className="space-y-6">
              <TransportJobs userRole="farmer" userId={user?.id || ''} />
            </TabsContent>

            <TabsContent value="shipping" className="space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Delivery Management</h2>
                    <p className="text-gray-600">Create delivery jobs for customer orders</p>
                  </div>
                  <ShippingJobForm userRole="farmer" userId={user?.id || ''} />
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders Requiring Delivery</CardTitle>
                    <CardDescription>Orders from customers who selected delivery option</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Orders with delivery requests will appear here</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
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