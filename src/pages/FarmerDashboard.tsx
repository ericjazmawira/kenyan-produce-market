import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Package, TrendingUp, Clock, CheckCircle, Truck, Edit, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import MarketPrices from "@/components/MarketPrices";
import ProduceListings from "@/components/ProduceListings";
import OrderTracking from "@/components/OrderTracking";
import EditListingDialog from "@/components/EditListingDialog";
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
        <div className="flex justify-between items-center mb-8">
          <div></div>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={handleAddNewListing}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Listing
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeListings.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSh 45,600</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Need attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
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
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Track and manage your customer orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
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
                          onClick={() => handleUpdateOrderStatus(order.id, "in-transit")}
                        >
                          Update Status
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="prices">
            <MarketPrices />
          </TabsContent>
          
          <TabsContent value="tracking">
            <OrderTracking />
          </TabsContent>
        </Tabs>
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
