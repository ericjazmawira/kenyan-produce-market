import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Users, Truck, TrendingUp, MessageSquare, HelpCircle, ShoppingCart, Package, User, DollarSign, Shield } from "lucide-react";

const Index = () => {
  const { user, signOut, getUserRole } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const role = await getUserRole();
        setUserRole(role);
      }
    };
    fetchUserRole();
  }, [user, getUserRole]);

  const handleGetStarted = () => {
    if (user) {
      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else if (userRole === 'farmer') {
        navigate('/farmer-dashboard');
      } else if (userRole === 'buyer') {
        navigate('/buyer-marketplace');
      } else if (userRole === 'transporter') {
        navigate('/transporter-dashboard');
      } else {
        navigate('/farmer-dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Farm2Table</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/market-prices" className="text-gray-600 hover:text-green-600 transition-colors">
                Market Prices
              </Link>
              <Link to="/support" className="text-gray-600 hover:text-green-600 transition-colors">
                Support
              </Link>
              {user ? (
                <div className="flex items-center space-x-4">
                  {userRole === 'admin' && (
                    <Link to="/admin-dashboard">
                      <Button variant="outline" size="sm" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                        <Shield className="h-4 w-4 mr-1" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Link to="/profile">
                    <Button variant="outline" size="sm">Profile</Button>
                  </Link>
                  <Button onClick={signOut} variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Fresh Produce,
            <span className="text-green-600"> Direct Connection</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Farm2Table connects farmers with buyers and transporters across Kenya, 
            ensuring fresh produce reaches markets efficiently while supporting local agriculture.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
          <p className="text-gray-600">Comprehensive tools for farmers, buyers, and transporters</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>For Farmers</CardTitle>
              <CardDescription>List your produce and connect with buyers</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Manage produce listings</li>
                <li>• Track orders and sales</li>
                <li>• Real-time market prices</li>
                <li>• Direct buyer communication</li>
              </ul>
              {user ? (
                <Link to="/farmer-dashboard" className="block mt-4">
                  <Button className="w-full">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link to="/register" className="block mt-4">
                  <Button className="w-full">Join as Farmer</Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <ShoppingCart className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>For Buyers</CardTitle>
              <CardDescription>Source fresh produce directly from farms</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Browse available produce</li>
                <li>• Compare prices and quality</li>
                <li>• Order tracking system</li>
                <li>• Direct farmer contact</li>
              </ul>
              {user ? (
                <Link to="/buyer-marketplace" className="block mt-4">
                  <Button className="w-full">Browse Marketplace</Button>
                </Link>
              ) : (
                <Link to="/register" className="block mt-4">
                  <Button className="w-full">Join as Buyer</Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Truck className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>For Transporters</CardTitle>
              <CardDescription>Find delivery opportunities and manage logistics</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Available delivery jobs</li>
                <li>• Route optimization</li>
                <li>• Earnings tracking</li>
                <li>• Real-time job updates</li>
              </ul>
              {user ? (
                <Link to="/transporter-dashboard" className="block mt-4">
                  <Button className="w-full">View Jobs</Button>
                </Link>
              ) : (
                <Link to="/register" className="block mt-4">
                  <Button className="w-full">Join as Transporter</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Access Section */}
      {user && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Access</h2>
            <p className="text-gray-600">Jump to the tools you need most</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {userRole === 'admin' && (
              <Link to="/admin-dashboard" className="group">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2 group-hover:text-purple-700 transition-colors" />
                    <p className="text-sm font-medium">Admin</p>
                  </CardContent>
                </Card>
              </Link>
            )}
            
            <Link to="/profile" className="group">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <User className="h-8 w-8 text-gray-600 mx-auto mb-2 group-hover:text-green-600 transition-colors" />
                  <p className="text-sm font-medium">Profile</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/orders" className="group">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 text-gray-600 mx-auto mb-2 group-hover:text-green-600 transition-colors" />
                  <p className="text-sm font-medium">Orders</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/market-prices" className="group">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-gray-600 mx-auto mb-2 group-hover:text-green-600 transition-colors" />
                  <p className="text-sm font-medium">Prices</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/messages" className="group">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-8 w-8 text-gray-600 mx-auto mb-2 group-hover:text-green-600 transition-colors" />
                  <p className="text-sm font-medium">Messages</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/support" className="group">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <HelpCircle className="h-8 w-8 text-gray-600 mx-auto mb-2 group-hover:text-green-600 transition-colors" />
                  <p className="text-sm font-medium">Support</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/farmer-dashboard" className="group">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-gray-600 mx-auto mb-2 group-hover:text-green-600 transition-colors" />
                  <p className="text-sm font-medium">Dashboard</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">Farm2Table</span>
              </div>
              <p className="text-gray-400">
                Connecting Kenya's agricultural community for fresh, efficient produce trading.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/farmer-dashboard" className="hover:text-white transition-colors">For Farmers</Link></li>
                <li><Link to="/buyer-marketplace" className="hover:text-white transition-colors">For Buyers</Link></li>
                <li><Link to="/transporter-dashboard" className="hover:text-white transition-colors">For Transporters</Link></li>
                <li><Link to="/market-prices" className="hover:text-white transition-colors">Market Prices</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/support" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="tel:+254700123456" className="hover:text-white transition-colors">+254 700 123 456</a></li>
                <li><a href="mailto:help@farm2table.co.ke" className="hover:text-white transition-colors">help@farm2table.co.ke</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Farm2Table. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
