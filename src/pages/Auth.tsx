
import { useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import RoleSelectorPage from "@/components/auth/RoleSelectorPage";

const Auth = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");
  const [searchParams] = useSearchParams();
  const [selectedRole, setSelectedRole] = useState(searchParams.get("role") || "");
  const [showRoleSelector, setShowRoleSelector] = useState(!isLogin && !selectedRole);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setShowRoleSelector(false);
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    if (!isLogin) {
      // Switching to login mode
      setShowRoleSelector(false);
    } else {
      // Switching to register mode
      if (!selectedRole) {
        setShowRoleSelector(true);
      }
    }
  };

  const handleRoleChange = () => {
    setShowRoleSelector(true);
  };

  // Show role selector for registration
  if (!isLogin && showRoleSelector) {
    return (
      <RoleSelectorPage 
        onRoleSelect={handleRoleSelect} 
        selectedRole={selectedRole}
        onModeSwitch={handleModeSwitch}
      />
    );
  }

  return (
    <AuthForm
      isLogin={isLogin}
      selectedRole={selectedRole}
      onModeSwitch={handleModeSwitch}
      onRoleChange={handleRoleChange}
    />
  );
};

export default Auth;
