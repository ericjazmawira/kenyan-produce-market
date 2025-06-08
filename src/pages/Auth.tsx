
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, User, ShoppingCart, Shield, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { isAuthorizedAdminEmail } from "@/utils/adminConfig";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [searchParams] = useSearchParams();
  const [selectedRole, setSelectedRole] = useState(searchParams.get("role") || "");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    location: ""
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const roles = [
    { id: "farmer", label: "Farmer", icon: User, description: "Sell your produce directly to buyers" },
    { id: "buyer", label: "Buyer", icon: ShoppingCart, description: "Purchase fresh produce from farmers" },
    { id: "transporter", label: "Transporter", icon: Truck, description: "Deliver produce from farmers to buyers" },
    { id: "admin", label: "Admin", icon: Shield, description: "Platform administration (restricted)" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You have been logged in successfully.",
        });

        // Redirect based on user role
        setTimeout(async () => {
          try {
            const { data: roleData, error: roleError } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', data.user.id)
              .maybeSingle();

            if (roleError) {
              console.error('Error fetching user role:', roleError);
            }

            let role = roleData?.role;
            
            // If no role found, try to get from user metadata and create role entry
            if (!role) {
              role = data.user.user_metadata?.role || 'buyer';
              
              // Security check for admin role
              if (role === 'admin' && !isAuthorizedAdminEmail(data.user.email || '')) {
                console.warn(`User ${data.user.email} attempted admin login but is not authorized`);
                role = 'buyer'; // Downgrade to buyer
                toast({
                  title: "Access Denied",
                  description: "You are not authorized for admin access.",
                  variant: "destructive"
                });
              }
              
              // Try to insert the role for existing users
              await supabase
                .from('user_roles')
                .insert({
                  user_id: data.user.id,
                  role: role
                });
            } else {
              // Additional security check for existing admin users
              if (role === 'admin' && !isAuthorizedAdminEmail(data.user.email || '')) {
                console.warn(`User ${data.user.email} has admin role but is not authorized`);
                toast({
                  title: "Access Denied",
                  description: "Your admin access has been revoked.",
                  variant: "destructive"
                });
                role = 'buyer';
              }
            }

            if (role === 'farmer') {
              navigate('/farmer-dashboard');
            } else if (role === 'buyer') {
              navigate('/buyer-marketplace');
            } else if (role === 'transporter') {
              navigate('/transporter-dashboard');
            } else if (role === 'admin') {
              navigate('/admin-dashboard');
            } else {
              navigate('/buyer-marketplace');
            }
          } catch (roleError) {
            console.error('Error handling user role:', roleError);
            // Default to buyer dashboard if role handling fails
            navigate('/buyer-marketplace');
          }
        }, 100);
      } else {
        // Registration flow
        if (!selectedRole) {
          toast({
            title: "Please select a role",
            description: "You must choose whether you're a farmer, buyer, transporter, or admin.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        // Check if user is trying to register as admin
        if (selectedRole === 'admin' && !isAuthorizedAdminEmail(formData.email)) {
          toast({
            title: "Access Denied",
            description: "You are not authorized to register as an admin.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              phone: formData.phone,
              location: formData.location,
              role: selectedRole
            },
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (error) throw error;

        if (data.user) {
          // Insert user role into the database
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({
              user_id: data.user.id,
              role: selectedRole
            });

          if (roleError) {
            console.error('Error creating user role:', roleError);
          }
        }

        toast({
          title: "Account created!",
          description: "Please check your email to confirm your account before logging in.",
        });

        setIsLogin(true);
        // Clear form data
        setFormData({
          email: "",
          password: "",
          fullName: "",
          phone: "",
          location: ""
        });
        setSelectedRole("");
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">Farm2Table</span>
          </div>
          <CardTitle className="text-2xl">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {isLogin ? "Sign in to your account" : "Join the Farm2Table community"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                {/* Role Selection */}
                <div className="space-y-2">
                  <Label>I am a:</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      const isDisabled = role.id === 'admin' && !isAuthorizedAdminEmail(formData.email);
                      return (
                        <button
                          key={role.id}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => !isDisabled && setSelectedRole(role.id)}
                          className={`p-3 border rounded-lg text-left transition-colors ${
                            selectedRole === role.id
                              ? "border-green-500 bg-green-50"
                              : isDisabled
                              ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className={`h-5 w-5 ${isDisabled ? 'text-gray-400' : 'text-green-600'}`} />
                            <div>
                              <div className="font-medium">{role.label}</div>
                              <div className="text-sm text-gray-500">
                                {role.description}
                                {role.id === 'admin' && isDisabled && (
                                  <span className="block text-red-500 mt-1">
                                    Not authorized for this email
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+254 700 000 000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Nairobi, Kenya"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading || (!isLogin && !selectedRole)}
            >
              {loading ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {isLogin ? "Sign up here" : "Sign in here"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
