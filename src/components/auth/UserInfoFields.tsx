
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserInfoFieldsProps {
  formData: {
    fullName: string;
    phone: string;
    location: string;
    email: string;
    password: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserInfoFields = ({ formData, onInputChange }: UserInfoFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={onInputChange}
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
          onChange={onInputChange}
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
          onChange={onInputChange}
          required
        />
      </div>
    </>
  );
};

export default UserInfoFields;
