
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Shield, Plus } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

const AdminManagement = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [canAddAdmins, setCanAddAdmins] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadAdminUsers();
      setCanAddAdmins(true); // For now, assume all admins can add more admins
    }
  }, [user]);

  const loadAdminUsers = async () => {
    // For now, just show a placeholder since we can't query the admin_users table
    // until the types are regenerated
    setAdminUsers([
      { id: "1", email: "admin1@example.com", created_at: new Date().toISOString() },
      { id: "2", email: "admin2@example.com", created_at: new Date().toISOString() }
    ]);
  };

  const addAdmin = async () => {
    if (!newAdminEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      toast({
        title: "Info",
        description: "Admin management will be fully functional once the database types are updated",
      });
      
      setNewAdminEmail("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add admin user",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Admin Management</span>
          </CardTitle>
          <CardDescription>
            Manage admin users and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {canAddAdmins && (
            <div className="space-y-4 p-4 border rounded-lg bg-green-50">
              <h3 className="font-medium">Add New Admin</h3>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="newAdminEmail">Email Address</Label>
                  <Input
                    id="newAdminEmail"
                    type="email"
                    placeholder="admin@example.com"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={addAdmin} 
                  disabled={loading}
                  className="mt-6"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Admin
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-medium">Current Admin Users</h3>
            {adminUsers.length === 0 ? (
              <p className="text-gray-500">No admin users found</p>
            ) : (
              <div className="space-y-2">
                {adminUsers.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{admin.email}</p>
                      <p className="text-sm text-gray-500">
                        Added on {new Date(admin.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Can Add Admins</Badge>
                      <Badge variant="default">Admin</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminManagement;
