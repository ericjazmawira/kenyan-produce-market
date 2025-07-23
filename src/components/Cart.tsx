import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Plus, Minus, Trash2, Phone, MessageCircle, Truck, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();

  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to place an order.",
        variant: "destructive"
      });
      return;
    }

    if (deliveryOption === 'delivery' && !deliveryAddress.trim()) {
      toast({
        title: "Delivery address required",
        description: "Please enter a delivery address.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create orders for each cart item
      for (const item of cartItems) {
        const { error } = await supabase
          .from('orders')
          .insert({
            buyer_id: user.id,
            listing_id: null, // Set to null since cart items don't have listing IDs yet
            farmer_id: user.id, // This should be the actual farmer ID from the cart item
            quantity: item.quantity,
            total_amount: parseFloat(item.price.replace('KSh ', '').replace(',', '')) * item.quantity,
            status: 'pending',
            delivery_address: deliveryOption === 'delivery' ? deliveryAddress : null
          });

        if (error) {
          console.error('Error creating order:', error);
          throw error;
        }
      }

      toast({
        title: "Order Placed!",
        description: `Your order for KSh ${getCartTotal().toFixed(2)} has been placed successfully.`,
      });
      
      clearCart();
      setShowCheckoutDialog(false);
      setDeliveryAddress('');
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleContactFarmer = (farmer: string, phone: string) => {
    toast({
      title: `Contacting ${farmer}`,
      description: `Phone: ${phone}`,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-500">Start shopping to add items to your cart</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Shopping Cart ({cartItems.length} items)</span>
          </CardTitle>
          <CardDescription>
            Review your items and proceed to checkout
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">Farmer: {item.farmer}</p>
                  <p className="text-sm text-gray-600">Location: {item.location}</p>
                  <p className="text-lg font-medium text-green-600">{item.price}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Badge variant="outline" className="px-3">
                      {item.quantity}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactFarmer(item.farmer, item.phone)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-green-600">
              KSh {getCartTotal().toFixed(2)}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={clearCart}
              className="flex-1"
            >
              Clear Cart
            </Button>
            <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  Proceed to Checkout
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Checkout Options</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Delivery Method</Label>
                    <RadioGroup 
                      value={deliveryOption} 
                      onValueChange={(value: 'pickup' | 'delivery') => setDeliveryOption(value)}
                      className="mt-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="flex items-center space-x-2 cursor-pointer">
                          <Home className="h-4 w-4" />
                          <span>Pickup from farm</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="flex items-center space-x-2 cursor-pointer">
                          <Truck className="h-4 w-4" />
                          <span>Home delivery</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {deliveryOption === 'delivery' && (
                    <div>
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Input
                        id="address"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Enter your full delivery address"
                        className="mt-1"
                      />
                    </div>
                  )}
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Total:</span>
                      <span className="text-xl font-bold text-green-600">
                        KSh {getCartTotal().toFixed(2)}
                      </span>
                    </div>
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
