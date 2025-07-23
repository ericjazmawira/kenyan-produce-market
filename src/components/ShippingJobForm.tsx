import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Package, MapPin, Calendar } from "lucide-react";

interface ShippingJobFormProps {
  userRole: 'farmer' | 'buyer';
  userId: string;
  orderData?: {
    buyerAddress: string;
    farmerAddress: string;
    items: string;
    weight: number;
  };
}

export const ShippingJobForm = ({ userRole, userId, orderData }: ShippingJobFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    pickup_location: orderData?.farmerAddress || "",
    delivery_location: orderData?.buyerAddress || "",
    pickup_date: "",
    cargo_type: orderData?.items || "",
    weight_kg: orderData?.weight?.toString() || "",
    budget_amount: ""
  });

  const createShippingJob = async () => {
    if (!jobData.title || !jobData.pickup_location || !jobData.delivery_location || !jobData.pickup_date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('transport_jobs').insert({
        farmer_id: userId, // For both farmer and buyer, we use their ID as the requester
        title: jobData.title,
        description: jobData.description,
        pickup_location: jobData.pickup_location,
        delivery_location: jobData.delivery_location,
        pickup_date: jobData.pickup_date,
        cargo_type: jobData.cargo_type,
        weight_kg: parseFloat(jobData.weight_kg) || 0,
        budget_amount: parseFloat(jobData.budget_amount) || 0
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Shipping job created successfully!"
      });

      setJobData({
        title: "",
        description: "",
        pickup_location: "",
        delivery_location: "",
        pickup_date: "",
        cargo_type: "",
        weight_kg: "",
        budget_amount: ""
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating shipping job:', error);
      toast({
        title: "Error",
        description: "Failed to create shipping job",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getJobTypeLabel = () => {
    return userRole === 'farmer' ? 'Delivery Job' : 'Pickup Job';
  };

  const getDefaultTitle = () => {
    if (userRole === 'farmer') {
      return "Delivery for customer order";
    }
    return "Pickup from my location";
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create {getJobTypeLabel()}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create {getJobTypeLabel()}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={jobData.title}
              onChange={(e) => setJobData({...jobData, title: e.target.value})}
              placeholder={getDefaultTitle()}
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={jobData.description}
              onChange={(e) => setJobData({...jobData, description: e.target.value})}
              placeholder="Additional details about the shipping job..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pickup">Pickup Location *</Label>
              <Input
                id="pickup"
                value={jobData.pickup_location}
                onChange={(e) => setJobData({...jobData, pickup_location: e.target.value})}
                placeholder={userRole === 'farmer' ? "Farm address" : "Your address"}
              />
            </div>
            <div>
              <Label htmlFor="delivery">Delivery Location *</Label>
              <Input
                id="delivery"
                value={jobData.delivery_location}
                onChange={(e) => setJobData({...jobData, delivery_location: e.target.value})}
                placeholder={userRole === 'farmer' ? "Customer address" : "Destination address"}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Pickup Date *</Label>
              <Input
                id="date"
                type="date"
                value={jobData.pickup_date}
                onChange={(e) => setJobData({...jobData, pickup_date: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="cargo">Cargo Type</Label>
              <Select onValueChange={(value) => setJobData({...jobData, cargo_type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cargo type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="grains">Grains</SelectItem>
                  <SelectItem value="livestock">Livestock</SelectItem>
                  <SelectItem value="dairy">Dairy Products</SelectItem>
                  <SelectItem value="household">Household Items</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={jobData.weight_kg}
                onChange={(e) => setJobData({...jobData, weight_kg: e.target.value})}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="budget">Budget (KES)</Label>
              <Input
                id="budget"
                type="number"
                value={jobData.budget_amount}
                onChange={(e) => setJobData({...jobData, budget_amount: e.target.value})}
                placeholder="0"
              />
            </div>
          </div>
          
          <Button onClick={createShippingJob} disabled={loading}>
            {loading ? "Creating..." : `Create ${getJobTypeLabel()}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};