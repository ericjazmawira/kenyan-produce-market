
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
  Truck,
  ChevronDown,
  UserPlus,
  DollarSign,
  MessageSquare
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
    // Always include Home - common across all roles
    const commonItems = [
      { href: "/", label: "Home", icon: Home }
    ];

    if (!user) {
      return [
        ...commonItems,
        { href: "/market-prices", label: "Market Prices", icon: TrendingUp },
        { href: "/support", label: "Help", icon: HelpCircle }
      ];
    }

    // Role-specific navigation items
    switch (userRole) {
      case "farmer":
        return [
          ...commonItems,
          { href: "/farmer-dashboard", label: "Dashboard", icon: TrendingUp },
          { href: "/market-prices", label: "Market Prices", icon: TrendingUp },
          { href: "/orders", label: "Orders", icon: Package },
          { href: "/messages", label: "Messages", icon: MessageSquare },
          { href: "/profile", label: "Profile", icon: User },
          { href: "/support", label: "Support", icon: HelpCircle }
        ];

      case "buyer":
        return [
          ...commonItems,
          { href: "/buyer-dashboard", label: "Dashboard", icon: User },
          { href: "/buyer-marketplace", label: "Marketplace", icon: Store },
          { href: "/market-prices", label: "Market Prices", icon: TrendingUp },
          { href: "/orders", label: "Orders", icon: Package },
          { href: "/messages", label: "Messages", icon: MessageSquare },
          { href: "/profile", label: "Profile", icon: User },
          { href: "/support", label: "Support", icon: HelpCircle }
        ];

      case "transporter":
        return [
          ...commonItems,
          { href: "/transporter-dashboard", label: "Dashboard", icon: Truck },
          { href: "/market-prices", label: "Market Prices", icon: TrendingUp },
          { href: "/orders", label: "Deliveries", icon: Package },
          { href: "/messages", label: "Messages", icon: MessageSquare },
          { href: "/profile", label: "Profile", icon: User },
          { href: "/support", label: "Support", icon: HelpCircle }
        ];

      case "admin":
        return [
          ...commonItems,
          { href: "/admin-dashboard", label: "Admin Dashboard", icon: TrendingUp },
          { href: "/market-prices", label: "Market Prices", icon: TrendingUp },
          { href: "/orders", label: "All Orders", icon: Package },
          { href: "/messages", label: "Messages", icon: MessageSquare },
          { href: "/profile", label: "Profile", icon: User },
          { href: "/support", label: "Support", icon: HelpCircle }
        ];

      default:
        // Fallback for authenticated users without a specific role
        return [
          ...commonItems,
          { href: "/market-prices", label: "Market Prices", icon: TrendingUp },
          { href: "/profile", label: "Profile", icon: User },
          { href: "/orders", label: "Orders", icon: Package },
          { href: "/messages", label: "Messages", icon: MessageSquare },
          { href: "/support", label: "Support", icon: HelpCircle }
        ];
    }
  };

  const navigationItems = getNavigationItems();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-green-800">Farm2Table</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-green-600 ${
              isActive("/") 
                ? "text-green-600" 
                : "text-muted-foreground"
            }`}
          >
            Home
          </Link>

          {/* Platform Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm font-medium text-muted-foreground hover:text-green-600 transition-colors">
              Platform
              <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/farmer-dashboard" className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  For Farmers
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/buyer-marketplace" className="flex items-center">
                  <Store className="mr-2 h-4 w-4" />
                  For Buyers
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/transporter-dashboard" className="flex items-center">
                  <Truck className="mr-2 h-4 w-4" />
                  For Transporters
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/market-prices"
            className={`text-sm font-medium transition-colors hover:text-green-600 ${
              isActive("/market-prices") 
                ? "text-green-600" 
                : "text-muted-foreground"
            }`}
          >
            Market Prices
          </Link>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium text-muted-foreground hover:text-green-600 transition-colors">
                Account
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/messages" className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/support" className="flex items-center">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Support
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {!user && (
            <Link
              to="/support"
              className={`text-sm font-medium transition-colors hover:text-green-600 ${
                isActive("/support") 
                  ? "text-green-600" 
                  : "text-muted-foreground"
              }`}
            >
              Help
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user && userRole === "buyer" && (
            <Link to="/buyer-marketplace" className="relative">
              <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-300">
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
              <Button size="sm" className="bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all">
                <Plus className="h-4 w-4 mr-2" />
                Add Listing
              </Button>
            </Link>
          )}

          {user ? (
            <Button variant="outline" size="sm" onClick={signOut} className="hover:bg-red-50 hover:border-red-300 hover:text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-300">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Join Now
                </Button>
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
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join Now
                      </Button>
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
