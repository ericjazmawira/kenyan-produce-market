
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { 
  Leaf, Users, Truck, TrendingUp, MessageSquare, HelpCircle, 
  ShoppingCart, Package, User, DollarSign, Shield, ArrowRight,
  CheckCircle, Star, Play, UserPlus, Search, MapPin, Award,
  Zap, Heart, Handshake
} from "lucide-react";

const Index = () => {
  const { user, getUserRole } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [animatedText, setAnimatedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const heroWords = ["Fresh Produce,", "Direct Connection"];

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const role = await getUserRole();
        setUserRole(role);
      }
    };
    fetchUserRole();
  }, [user, getUserRole]);

  // Typewriter animation effect
  useEffect(() => {
    if (currentWordIndex < heroWords.length) {
      const currentWord = heroWords[currentWordIndex];
      let charIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (charIndex <= currentWord.length) {
          setAnimatedText(prev => {
            if (currentWordIndex === 0) {
              return currentWord.slice(0, charIndex);
            } else {
              return heroWords[0] + " " + currentWord.slice(0, charIndex);
            }
          });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentWordIndex(prev => prev + 1);
          }, 500);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [currentWordIndex]);

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

  const testimonials = [
    {
      name: "John Kimani",
      role: "Farmer, Kiambu",
      content: "Farm2Table has connected me directly with buyers. I've increased my income by 40% since joining!",
      rating: 5
    },
    {
      name: "Mary Wanjiku",
      role: "Restaurant Owner, Nairobi",
      content: "Fresh produce delivered straight from the farm. Quality is exceptional and prices are fair.",
      rating: 5
    },
    {
      name: "Peter Otieno",
      role: "Transporter, Nakuru",
      content: "Great platform for finding delivery jobs. The route optimization helps me serve more customers efficiently.",
      rating: 5
    }
  ];

  const platformStats = [
    { label: "Active Farmers", value: "2,500+", icon: Users },
    { label: "Fresh Orders Daily", value: "850+", icon: Package },
    { label: "Counties Served", value: "25", icon: MapPin },
    { label: "Customer Rating", value: "4.8/5", icon: Star }
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create your account as a farmer, buyer, or transporter",
      icon: UserPlus,
      color: "bg-blue-500"
    },
    {
      step: 2,
      title: "List or Browse",
      description: "Farmers list produce, buyers browse fresh options",
      icon: Search,
      color: "bg-green-500"
    },
    {
      step: 3,
      title: "Connect & Deliver",
      description: "Connect directly and arrange delivery through transporters",
      icon: Truck,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Enhanced Hero Section with Background Image */}
      <section 
        className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-blue-900/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 min-h-[120px] md:min-h-[160px]">
              {animatedText}
              <span className="text-green-400 block mt-2">
                {currentWordIndex >= 1 && animatedText.includes("Direct Connection") ? "" : ""}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Farm2Table connects farmers with buyers and transporters across Kenya, 
              ensuring fresh produce reaches markets efficiently while supporting local agriculture.
            </p>
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 group"
            >
              Get Started Today
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Signals & Stats */}
      <section className="bg-white py-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands Across Kenya</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Join our growing community of farmers, buyers, and transporters</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {platformStats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get started in three simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-all duration-300">
                <div className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-gray-600 font-bold">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
          <p className="text-xl text-gray-600">Comprehensive tools for farmers, buyers, and transporters</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
            <CardHeader>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">For Farmers</CardTitle>
              <CardDescription className="text-gray-600">List your produce and connect with buyers</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Manage produce listings
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Track orders and sales
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Real-time market prices
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Direct buyer communication
                </li>
              </ul>
              {user ? (
                <Link to="/farmer-dashboard" className="block mt-6">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link to="/register" className="block mt-6">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Join as Farmer</Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">For Buyers</CardTitle>
              <CardDescription className="text-gray-600">Source fresh produce directly from farms</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                  Browse available produce
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                  Compare prices and quality
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                  Order tracking system
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                  Direct farmer contact
                </li>
              </ul>
              {user ? (
                <Link to="/buyer-marketplace" className="block mt-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Browse Marketplace</Button>
                </Link>
              ) : (
                <Link to="/register" className="block mt-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Join as Buyer</Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">For Transporters</CardTitle>
              <CardDescription className="text-gray-600">Find delivery opportunities and manage logistics</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                  Available delivery jobs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                  Route optimization
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                  Earnings tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                  Real-time job updates
                </li>
              </ul>
              {user ? (
                <Link to="/transporter-dashboard" className="block mt-6">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">View Jobs</Button>
                </Link>
              ) : (
                <Link to="/register" className="block mt-6">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Join as Transporter</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-green-900 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-xl text-green-100">Real stories from our farming community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-green-100 text-base leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-green-200 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Trust Farm2Table?</h2>
            <p className="text-xl text-gray-600">Built for the Kenyan agricultural community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Platform</h3>
              <p className="text-gray-600">Your data and transactions are protected with enterprise-grade security</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast & Reliable</h3>
              <p className="text-gray-600">Quick connections between farmers and buyers with reliable delivery tracking</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Focused</h3>
              <p className="text-gray-600">Built by Kenyans, for Kenyans. Supporting local agriculture and communities</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assured</h3>
              <p className="text-gray-600">Verified farmers and quality produce with transparent rating systems</p>
            </div>
          </div>
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

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Leaf className="h-8 w-8 text-green-400" />
                <span className="text-2xl font-bold">Farm2Table</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting Kenya's agricultural community for fresh, efficient produce trading.
              </p>
              <div className="flex space-x-4">
                <Badge variant="outline" className="text-green-400 border-green-400">
                  <Handshake className="h-3 w-3 mr-1" />
                  Trusted Platform
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Platform</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/farmer-dashboard" className="hover:text-white transition-colors flex items-center"><Users className="h-4 w-4 mr-2" />For Farmers</Link></li>
                <li><Link to="/buyer-marketplace" className="hover:text-white transition-colors flex items-center"><ShoppingCart className="h-4 w-4 mr-2" />For Buyers</Link></li>
                <li><Link to="/transporter-dashboard" className="hover:text-white transition-colors flex items-center"><Truck className="h-4 w-4 mr-2" />For Transporters</Link></li>
                <li><Link to="/market-prices" className="hover:text-white transition-colors flex items-center"><TrendingUp className="h-4 w-4 mr-2" />Market Prices</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/support" className="hover:text-white transition-colors flex items-center"><HelpCircle className="h-4 w-4 mr-2" />Help Center</Link></li>
                <li><Link to="/support" className="hover:text-white transition-colors flex items-center"><MessageSquare className="h-4 w-4 mr-2" />Contact Us</Link></li>
                <li><a href="tel:+254700123456" className="hover:text-white transition-colors">+254 700 123 456</a></li>
                <li><a href="mailto:help@farm2table.co.ke" className="hover:text-white transition-colors">help@farm2table.co.ke</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li>
                  {!user && (
                    <Link to="/register" className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Join Now
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Farm2Table. All rights reserved. Proudly serving Kenya's agricultural community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
