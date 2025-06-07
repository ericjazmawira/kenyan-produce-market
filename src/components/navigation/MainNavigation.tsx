import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Menu, 
  Home, 
  Store, 
  User, 
  Plus, 
  ShoppingCart, 
  Package, 
  HelpCircle,
  LogOut,
  TrendingUp,
  Truck
} from "lucide-react";

const MainNavigation = () => {
  const { user, signOut, getUserRole } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Get user role on component mount
  React.useEffect(() => {
    const fetchRole = async () => {
      if (user) {
        const role = await getUserRole();
        setUserRole(role);
      }
    };
    fetchRole();
  }, [user, getUserRole]);

  const cartItemCount = (cartItems || []).reduce((total, item) => total + item.quantity, 0);

  const getNavigationItems = () => {
    const baseItems = [
      { href: "/", label: "Home", icon: Home },
      { href: "/market-prices", label: "Market Prices", icon: TrendingUp }
    ];

    if (!user) {
      return [
        ...baseItems,
        { href: "/support", label: "Help", icon: HelpCircle }
      ];
    }

    const authenticatedItems = [
      ...baseItems,
      { href: "/profile", label: "My Account", icon: User },
      { href: "/orders", label: "Orders", icon: Package },
      { href: "/messages", label: "Messages", icon: HelpCircle },
      { href: "/support", label: "Help", icon: HelpCircle }
    ];

    // Role-specific items
    if (userRole === "farmer") {
      authenticatedItems.splice(2, 0, 
        { href: "/farmer-dashboard", label: "My Dashboard", icon: TrendingUp }
      );
    } else if (userRole === "buyer") {
      authenticatedItems.splice(2, 0, 
        { href: "/buyer-marketplace", label: "Marketplace", icon: Store }
      );
    } else if (userRole === "transporter") {
      authenticatedItems.splice(2, 0, 
        { href: "/transporter-dashboard", label: "Jobs", icon: Truck }
      );
    } else if (userRole === "admin") {
      authenticatedItems.splice(2, 0, 
        { href: "/admin-dashboard", label: "Admin Panel", icon: TrendingUp }
      );
    }

    return authenticatedItems;
  };

  const navigationItems = getNavigationItems();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-green-800">Farm2Table</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-green-600 ${
                isActive(item.href) 
                  ? "text-green-600" 
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user && userRole === "buyer" && (
            <Link to="/buyer-marketplace" className="relative">
              <Button variant="outline" size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          )}
          
          {user && userRole === "farmer" && (
            <Link to="/farmer-dashboard">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Listing
              </Button>
            </Link>
          )}

          {user ? (
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              {/* Logo in mobile menu */}
              <div className="flex items-center space-x-2 pb-4 border-b">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold text-green-800">Farm2Table</span>
              </div>

              {/* Navigation Links */}
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleNavClick}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-green-50 text-green-600"
                      : "text-muted-foreground hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Mobile Actions */}
              <div className="pt-4 border-t space-y-3">
                {user && userRole === "buyer" && (
                  <Link to="/buyer-marketplace" onClick={handleNavClick}>
                    <Button variant="outline" className="w-full justify-start">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Cart
                      {cartItemCount > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                        >
                          {cartItemCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                )}

                {user && userRole === "farmer" && (
                  <Link to="/farmer-dashboard" onClick={handleNavClick}>
                    <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Listing
                    </Button>
                  </Link>
                )}

                {user ? (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => {
                      signOut();
                      handleNavClick();
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" onClick={handleNavClick}>
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link to="/register" onClick={handleNavClick}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default MainNavigation;
