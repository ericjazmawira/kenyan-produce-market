
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Leaf, Users, ShoppingCart, Truck, TrendingUp, MessageSquare, HelpCircle, 
  UserPlus, Handshake 
} from "lucide-react";

export const Footer = () => {
  const { user } = useAuth();

  return (
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
  );
};
