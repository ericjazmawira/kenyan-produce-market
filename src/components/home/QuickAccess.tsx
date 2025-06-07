
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { 
  Shield, User, Package, DollarSign, MessageSquare, HelpCircle, TrendingUp 
} from "lucide-react";

export const QuickAccess = () => {
  const { user, getUserRole } = useAuth();
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

  if (!user) return null;

  return (
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
  );
};
