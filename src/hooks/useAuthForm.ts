
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { isAuthorizedAdminEmail } from "@/utils/adminConfig";

export const useAuth = (isLogin: boolean, selectedRole: string) => {
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

        // Clear form data
        setFormData({
          email: "",
          password: "",
          fullName: "",
          phone: "",
          location: ""
        });
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

  return {
    formData,
    loading,
    handleInputChange,
    handleSubmit
  };
};
