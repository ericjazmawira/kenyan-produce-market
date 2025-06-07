
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Shield,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2
} from "lucide-react";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  created_at: string;
  user_roles?: {
    role: string;
  };
}

export const AdminManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          user_roles (
            role
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as UserProfile[];
    }
  });

  const updateUserStatus = useMutation({
    mutationFn: async ({ userId, status }: { userId: string; status: string }) => {
      const { error } = await supabase
        .from('user_profiles')
        .update({ status })
        .eq('user_id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: "User Status Updated",
        description: "User status has been successfully updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to update user status.",
        variant: "destructive",
      });
    }
  });

  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: "User Deleted",
        description: "User has been successfully deleted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to delete user.",
        variant: "destructive",
      });
    }
  });

  const handleStatusUpdate = (userId: string, status: string) => {
    updateUserStatus.mutate({ userId, status });
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      deleteUser.mutate(userId);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      suspended: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  const getRoleBadge = (userRoles: any) => {
    const role = Array.isArray(userRoles) ? userRoles[0]?.role : userRoles?.role;
    const roleColors = {
      admin: "bg-purple-100 text-purple-800",
      farmer: "bg-green-100 text-green-800",
      buyer: "bg-blue-100 text-blue-800"
    } as const;
    
    return (
      <Badge className={roleColors[role as keyof typeof roleColors] || "bg-gray-100 text-gray-800"}>
        {role || 'user'}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users?.map((user) => (
            <div key={user.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{user.full_name || 'No name provided'}</h3>
                    {getStatusBadge(user.status)}
                    {getRoleBadge(user.user_roles)}
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                    {user.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {user.phone}
                      </div>
                    )}
                    {user.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {user.location}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    Joined: {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  {user.status === 'active' ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(user.user_id, 'suspended')}
                      className="text-red-600 hover:text-red-700"
                    >
                      <UserX className="h-4 w-4 mr-1" />
                      Suspend
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(user.user_id, 'active')}
                      className="text-green-600 hover:text-green-700"
                    >
                      <UserCheck className="h-4 w-4 mr-1" />
                      Activate
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteUser(user.user_id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {users?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No users found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
