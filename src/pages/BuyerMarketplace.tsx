import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MapPin, Phone, MessageCircle, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Cart from "@/components/Cart";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const BuyerMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();
  const { addToCart, cartItems } = useCart();

  const categories = [
    { id: "all", label: "All Products" },
    { id: "vegetables", label: "Vegetables" },
    { id: "grains", label: "Grains" },
    { id: "legumes", label: "Legumes" },
    { id: "fruits", label: "Fruits" }
  ];

  const [produceListings] = useState([
    {
      id: 1,
      name: "Fresh Tomatoes",
      farmer: "John Kamau",
      location: "Kiambu County",
      price: "KSh 80/kg",
      quantity: "50kg available",
      category: "vegetables",
      image: "🍅",
      phone: "+254 700 123 456",
      description: "Farm-fresh tomatoes, harvested yesterday. Perfect for cooking and salads."
    },
    {
      id: 2,
      name: "Green Maize",
      farmer: "Mary Wanjiku",
      location: "Nakuru County",
      price: "KSh 45/kg",
      quantity: "100kg available",
      category: "grains",
      image: "🌽",
      phone: "+254 700 234 567",
      description: "Sweet green maize, freshly harvested. Great for roasting or boiling."
    },
    {
      id: 3,
      name: "French Beans",
      farmer: "Peter Mwangi",
      location: "Meru County",
      price: "KSh 120/kg",
      quantity: "25kg available",
      category: "vegetables",
      image: "🫛",
      phone: "+254 700 345 678",
      description: "Premium quality French beans, export grade. Perfect for restaurants."
    },
    {
      id: 4,
      name: "Red Kidney Beans",
      farmer: "Grace Akinyi",
      location: "Bungoma County",
      price: "KSh 150/kg",
      quantity: "75kg available",
      category: "legumes",
      image: "🫘",
      phone: "+254 700 456 789",
      description: "Organic red kidney beans, sun-dried and ready for cooking."
    },
    {
      id: 5,
      name: "Sweet Bananas",
      farmer: "James Ochieng",
      location: "Kisumu County",
      price: "KSh 60/kg",
      quantity: "200kg available",
      category: "fruits",
      image: "🍌",
      phone: "+254 700 567 890",
      description: "Sweet, ripe bananas. Perfect for snacking or cooking."
    },
    {
      id: 6,
      name: "White Maize",
      farmer: "Agnes Nyambura",
      location: "Uasin Gishu County",
      price: "KSh 40/kg",
      quantity: "300kg available",
      category: "grains",
      image: "🌾",
      phone: "+254 700 678 901",
      description: "High-quality white maize, properly dried and stored."
    }
  ]);

  const filteredProduce = produceListings.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContact = (farmer: string, phone: string, action: string) => {
    toast({
      title: `${action} ${farmer}`,
      description: `Contact: ${phone}`,
    });
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      farmer: item.farmer,
      price: item.price,
      maxQuantity: item.quantity,
      location: item.location,
      phone: item.phone
    });
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Marketplace" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="cart" className="relative">
              Cart
              {cartItems.length > 0 && (
                <Badge className="ml-2 bg-green-600 text-white">
                  {cartItems.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace">
            <div className="flex justify-between items-center mb-8">
              <div></div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search produce, farmers, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredProduce.length} of {produceListings.length} products
              </p>
            </div>

            {/* Produce Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProduce.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-4xl">{item.image}</div>
                      <Badge className="bg-green-100 text-green-800">
                        {item.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-600">{item.price}</span>
                        <span className="text-sm text-gray-500">{item.quantity}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <strong>Farmer:</strong> {item.farmer}
                      </div>
                      
                      <div className="space-y-2 pt-4">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleContact(item.farmer, item.phone, "Calling")}
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleContact(item.farmer, item.phone, "Messaging")}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredProduce.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cart">
            <Cart />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuyerMarketplace;
