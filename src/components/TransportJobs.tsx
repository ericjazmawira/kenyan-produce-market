import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Truck, MapPin, Calendar, Weight, DollarSign } from "lucide-react";

interface TransportJob {
  id: string;
  title: string;
  description: string;
  pickup_location: string;
  delivery_location: string;
  pickup_date: string;
  cargo_type: string;
  weight_kg: number;
  budget_amount: number;
  status: string;
  created_at: string;
}

interface TransportBid {
  id: string;
  bid_amount: number;
  estimated_duration_hours: number;
  message: string;
  status: string;
  created_at: string;
}

interface TransportJobsProps {
  userRole: string;
  userId: string;
}

export const TransportJobs = ({ userRole, userId }: TransportJobsProps) => {
  const [jobs, setJobs] = useState<TransportJob[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<TransportJob | null>(null);
  const [bids, setBids] = useState<TransportBid[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    pickup_location: "",
    delivery_location: "",
    pickup_date: "",
    cargo_type: "",
    weight_kg: "",
    budget_amount: ""
  });

  const [newBid, setNewBid] = useState({
    bid_amount: "",
    estimated_duration_hours: "",
    message: ""
  });

  useEffect(() => {
    fetchJobs();
  }, [userRole]);

  const fetchJobs = async () => {
    try {
      let query = supabase.from('transport_jobs').select('*');
      
      if (userRole === 'farmer') {
        query = query.eq('farmer_id', userId);
      } else if (userRole === 'transporter') {
        query = query.or(`status.eq.open,assigned_transporter_id.eq.${userId}`);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch transport jobs",
        variant: "destructive"
      });
    }
  };

  const createJob = async () => {
    if (!newJob.title || !newJob.pickup_location || !newJob.delivery_location || !newJob.pickup_date) {
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
        farmer_id: userId,
        title: newJob.title,
        description: newJob.description,
        pickup_location: newJob.pickup_location,
        delivery_location: newJob.delivery_location,
        pickup_date: newJob.pickup_date,
        cargo_type: newJob.cargo_type,
        weight_kg: parseFloat(newJob.weight_kg) || 0,
        budget_amount: parseFloat(newJob.budget_amount) || 0
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transport job posted successfully!"
      });

      setNewJob({
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
      fetchJobs();
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Error",
        description: "Failed to create transport job",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const submitBid = async () => {
    if (!selectedJob || !newBid.bid_amount) {
      toast({
        title: "Missing Information",
        description: "Please enter a bid amount",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('transport_bids').insert({
        job_id: selectedJob.id,
        transporter_id: userId,
        bid_amount: parseFloat(newBid.bid_amount),
        estimated_duration_hours: parseInt(newBid.estimated_duration_hours) || null,
        message: newBid.message
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Bid submitted successfully!"
      });

      setNewBid({
        bid_amount: "",
        estimated_duration_hours: "",
        message: ""
      });
      setSelectedJob(null);
    } catch (error) {
      console.error('Error submitting bid:', error);
      toast({
        title: "Error",
        description: "Failed to submit bid",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchBidsForJob = async (jobId: string) => {
    try {
      const { data, error } = await supabase
        .from('transport_bids')
        .select('*')
        .eq('job_id', jobId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBids(data || []);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transport Jobs</h2>
        {userRole === 'farmer' && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Post Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Post Transport Job</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={newJob.title}
                    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    placeholder="e.g., Transport vegetables to Nairobi market"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    placeholder="Additional details about the transport job..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickup">Pickup Location *</Label>
                    <Input
                      id="pickup"
                      value={newJob.pickup_location}
                      onChange={(e) => setNewJob({...newJob, pickup_location: e.target.value})}
                      placeholder="Farm address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="delivery">Delivery Location *</Label>
                    <Input
                      id="delivery"
                      value={newJob.delivery_location}
                      onChange={(e) => setNewJob({...newJob, delivery_location: e.target.value})}
                      placeholder="Market/destination address"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Pickup Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newJob.pickup_date}
                      onChange={(e) => setNewJob({...newJob, pickup_date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cargo">Cargo Type</Label>
                    <Select onValueChange={(value) => setNewJob({...newJob, cargo_type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cargo type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="grains">Grains</SelectItem>
                        <SelectItem value="livestock">Livestock</SelectItem>
                        <SelectItem value="dairy">Dairy Products</SelectItem>
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
                      value={newJob.weight_kg}
                      onChange={(e) => setNewJob({...newJob, weight_kg: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget (KES)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={newJob.budget_amount}
                      onChange={(e) => setNewJob({...newJob, budget_amount: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                </div>
                <Button onClick={createJob} disabled={loading}>
                  {loading ? "Posting..." : "Post Job"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    {job.title}
                  </CardTitle>
                  <Badge className={getStatusColor(job.status)}>
                    {job.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                {userRole === 'transporter' && job.status === 'open' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm"
                        onClick={() => setSelectedJob(job)}
                      >
                        Place Bid
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Place Bid for: {job.title}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="bidAmount">Bid Amount (KES) *</Label>
                          <Input
                            id="bidAmount"
                            type="number"
                            value={newBid.bid_amount}
                            onChange={(e) => setNewBid({...newBid, bid_amount: e.target.value})}
                            placeholder="Enter your bid"
                          />
                        </div>
                        <div>
                          <Label htmlFor="duration">Estimated Duration (hours)</Label>
                          <Input
                            id="duration"
                            type="number"
                            value={newBid.estimated_duration_hours}
                            onChange={(e) => setNewBid({...newBid, estimated_duration_hours: e.target.value})}
                            placeholder="How long will it take?"
                          />
                        </div>
                        <div>
                          <Label htmlFor="bidMessage">Message</Label>
                          <Textarea
                            id="bidMessage"
                            value={newBid.message}
                            onChange={(e) => setNewBid({...newBid, message: e.target.value})}
                            placeholder="Additional information about your bid..."
                          />
                        </div>
                        <Button onClick={submitBid} disabled={loading}>
                          {loading ? "Submitting..." : "Submit Bid"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                {userRole === 'farmer' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedJob(job);
                      fetchBidsForJob(job.id);
                    }}
                  >
                    View Bids
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">From</p>
                    <p className="text-gray-600">{job.pickup_location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">To</p>
                    <p className="text-gray-600">{job.delivery_location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Pickup Date</p>
                    <p className="text-gray-600">{new Date(job.pickup_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Weight</p>
                    <p className="text-gray-600">{job.weight_kg} kg</p>
                  </div>
                </div>
              </div>
              {job.description && (
                <p className="mt-4 text-gray-600">{job.description}</p>
              )}
              {job.budget_amount > 0 && (
                <div className="mt-4 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Budget: KES {job.budget_amount}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {userRole === 'farmer' && selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Bids for: {selectedJob.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {bids.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No bids yet</p>
              ) : (
                bids.map((bid) => (
                  <Card key={bid.id}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">KES {bid.bid_amount}</p>
                          {bid.estimated_duration_hours && (
                            <p className="text-sm text-gray-600">
                              Estimated: {bid.estimated_duration_hours} hours
                            </p>
                          )}
                          {bid.message && (
                            <p className="text-sm text-gray-600 mt-2">{bid.message}</p>
                          )}
                        </div>
                        <Badge className={bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                          {bid.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};