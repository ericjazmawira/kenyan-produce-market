
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Users, ShoppingCart, Truck, CheckCircle } from "lucide-react";

export const FeatureCards = () => {
  const { user } = useAuth();

  return (
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
  );
};
