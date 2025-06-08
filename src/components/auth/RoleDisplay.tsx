
import { Button } from "@/components/ui/button";

interface Role {
  id: string;
  label: string;
  icon?: any;
}

interface RoleDisplayProps {
  selectedRole: string;
  roles: Role[];
  onRoleChange: () => void;
}

const RoleDisplay = ({ selectedRole, roles, onRoleChange }: RoleDisplayProps) => {
  const roleData = roles.find(r => r.id === selectedRole);
  const Icon = roleData?.icon;

  return (
    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="h-5 w-5 text-green-600" />}
          <span className="text-sm font-medium text-green-800">
            Registering as {roleData?.label}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRoleChange}
          className="text-green-600 hover:text-green-700 p-1"
        >
          Change
        </Button>
      </div>
    </div>
  );
};

export default RoleDisplay;
