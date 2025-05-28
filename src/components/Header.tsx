
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Leaf, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  showLogout?: boolean;
}

const Header = ({ title, showLogout = true }: HeaderProps) => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Farm2Table</span>
            </Link>
            <span className="text-xl font-medium text-gray-600">|</span>
            <h1 className="text-2xl font-bold text-green-800">{title}</h1>
          </div>
          {user && showLogout && (
            <Button 
              variant="outline" 
              onClick={signOut}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
