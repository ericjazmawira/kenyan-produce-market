
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import MainNavigation from "@/components/navigation/MainNavigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import MarketPrices from "./pages/MarketPrices";
import Messages from "./pages/Messages";
import Support from "./pages/Support";
import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerMarketplace from "./pages/BuyerMarketplace";
import TransporterDashboard from "./pages/TransporterDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <MainNavigation />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={<Auth />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/orders" 
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/market-prices" 
                  element={<MarketPrices />} 
                />
                <Route 
                  path="/messages" 
                  element={
                    <ProtectedRoute>
                      <Messages />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/support" 
                  element={<Support />} 
                />
                <Route 
                  path="/farmer-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="farmer">
                      <FarmerDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/buyer-marketplace" 
                  element={
                    <ProtectedRoute requiredRole="buyer">
                      <BuyerMarketplace />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/transporter-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="transporter">
                      <TransporterDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
