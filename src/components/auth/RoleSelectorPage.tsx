
import { Leaf } from "lucide-react";
import RoleSelector from "@/components/RoleSelector";

interface RoleSelectorPageProps {
  onRoleSelect: (role: string) => void;
  selectedRole?: string;
  onModeSwitch: () => void;
}

const RoleSelectorPage = ({ onRoleSelect, selectedRole, onModeSwitch }: RoleSelectorPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-green-800">Farm2Table</span>
        </div>
        
        <RoleSelector 
          onRoleSelect={onRoleSelect} 
          selectedRole={selectedRole}
        />
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button 
              onClick={onModeSwitch}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectorPage;
