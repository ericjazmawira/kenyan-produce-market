
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Package } from "lucide-react";

const ProduceListings = () => {
  const [listings, setListings] = useState([
    {
      id: 1,
      name: "Fresh Tomatoes",
      quantity: "50kg",
      price: "KSh 80/kg",
      status: "active",
      orders: 5,
      description: "Farm-fresh tomatoes, harvested yesterday",
      category: "vegetables"
    },
    {
      id: 2,
      name: "Green Maize",
      quantity: "100kg",
      price: "KSh 45/kg",
      status: "active",
      orders: 8,
      description: "Sweet green maize, perfect for roasting",
      category: "grains"
    },
    {
      id: 3,
      name: "French Beans",
      quantity: "25kg",
      price: "KSh 120/kg",
      status: "active",
      orders: 3,
      description: "Premium quality French beans",
      category: "vegetables"
    }
  ]);

  const [newListing, setNewListing] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
    category: "vegetables"
  });

  const [isAddingListing, setIsAddingListing] = useState(false);

  const handleAddListing = () => {
    const listing = {
      id: Date.now(),
      ...newListing,
      status: "active" as const,
      orders: 0
    };
    setListings([...listings, listing]);
    setNewListing({ name: "", quantity: "", price: "", description: "", category: "vegetables" });
    setIsAddingListing(false);
  };

  const handleDeleteListing = (id: number) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Produce Listings</CardTitle>
            <CardDescription>
              Manage your active produce listings and track orders
            </CardDescription>
          </div>
          <Dialog open={isAddingListing} onOpenChange={setIsAddingListing}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Listing
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Produce Listing</DialogTitle>
                <DialogDescription>
                  Create a new listing for your produce to attract buyers.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Fresh Tomatoes"
                    value={newListing.name}
                    onChange={(e) => setNewListing({ ...newListing, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity Available</Label>
                  <Input
                    id="quantity"
                    placeholder="e.g., 50kg"
                    value={newListing.quantity}
                    onChange={(e) => setNewListing({ ...newListing, quantity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Unit</Label>
                  <Input
                    id="price"
                    placeholder="e.g., KSh 80/kg"
                    value={newListing.price}
                    onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Brief description of your produce"
                    value={newListing.description}
                    onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingListing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddListing} className="bg-green-600 hover:bg-green-700">
                  Add Listing
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{listing.name}</CardTitle>
                <Badge className={getStatusColor(listing.status)}>
                  {listing.status}
                </Badge>
              </div>
              <CardDescription>{listing.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <span className="font-medium">{listing.quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="font-medium text-green-600">{listing.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Orders:</span>
                  <div className="flex items-center space-x-1">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{listing.orders}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteListing(listing.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {listings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No listings yet</h3>
          <p className="text-gray-500 mb-4">Create your first produce listing to start selling</p>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setIsAddingListing(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Listing
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProduceListings;
