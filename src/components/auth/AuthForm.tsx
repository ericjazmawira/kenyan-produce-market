
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuthForm";
import AuthModeToggle from "./AuthModeToggle";
import UserInfoFields from "./UserInfoFields";
import RoleDisplay from "./RoleDisplay";

interface AuthFormProps {
  isLogin: boolean;
  selectedRole: string;
  onModeSwitch: () => void;
  onRoleChange: () => void;
}

const AuthForm = ({ isLogin, selectedRole, onModeSwitch, onRoleChange }: AuthFormProps) => {
  const { formData, loading, handleInputChange, handleSubmit } = useAuth(isLogin, selectedRole);

  const roles = [
    { id: "farmer", label: "Farmer", icon: User },
    { id: "buyer", label: "Buyer" },
    { id: "transporter", label: "Transporter" },
    { id: "admin", label: "Admin" }
  ];

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
            {isLogin ? "Sign in to your account" : 
              selectedRole ? `Join as ${roles.find(r => r.id === selectedRole)?.label}` : 
              "Join the Farm2Table community"
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {!isLogin && selectedRole && (
            <RoleDisplay 
              selectedRole={selectedRole} 
              roles={roles} 
              onRoleChange={onRoleChange} 
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <UserInfoFields 
                formData={formData} 
                onInputChange={handleInputChange} 
              />
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
          
          <AuthModeToggle isLogin={isLogin} onModeSwitch={onModeSwitch} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
