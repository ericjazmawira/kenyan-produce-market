
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShoppingCart, Truck, Shield } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: string) => void;
  selectedRole?: string;
}

const RoleSelector = ({ onRoleSelect, selectedRole }: RoleSelectorProps) => {
  const roles = [
    {
      id: "farmer",
      title: "Farmer",
      icon: User,
      description: "Sell your fresh produce directly to buyers",
      color: "from-green-500 to-emerald-600",
      features: ["List your produce", "Set your prices", "Connect with buyers", "Track your sales"]
    },
    {
      id: "buyer",
      title: "Buyer",
      icon: ShoppingCart,
      description: "Purchase fresh produce directly from farmers",
      color: "from-blue-500 to-cyan-600",
      features: ["Browse fresh produce", "Compare prices", "Order directly", "Track deliveries"]
    },
    {
      id: "transporter",
      title: "Transporter",
      icon: Truck,
      description: "Connect farmers and buyers through reliable delivery",
      color: "from-purple-500 to-violet-600",
      features: ["Accept delivery jobs", "Earn per delivery", "Flexible schedule", "Build reputation"]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
        <p className="text-lg text-gray-600">Select how you'd like to use Farm2Table</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <Card 
              key={role.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-green-500 shadow-lg scale-105' 
                  : 'hover:scale-102 border-gray-200'
              }`}
              onClick={() => onRoleSelect(role.id)}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                  <p className="text-gray-600 mb-4">{role.description}</p>
                </div>

                <div className="space-y-2">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button 
                  variant={isSelected ? "default" : "outline"}
                  className={`w-full mt-4 ${
                    isSelected 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'hover:bg-green-50 hover:border-green-300'
                  }`}
                >
                  {isSelected ? 'Selected' : `Continue as ${role.title}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Don't worry, you can always change your role later in your profile settings
        </p>
      </div>
    </div>
  );
};

export default RoleSelector;
