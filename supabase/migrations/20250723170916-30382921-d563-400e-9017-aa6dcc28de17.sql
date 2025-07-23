-- Create transport jobs table
CREATE TABLE public.transport_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  pickup_location TEXT NOT NULL,
  delivery_location TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  cargo_type TEXT NOT NULL,
  weight_kg NUMERIC NOT NULL,
  budget_amount NUMERIC,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'in_progress', 'completed', 'cancelled')),
  assigned_transporter_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create transport bids table
CREATE TABLE public.transport_bids (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.transport_jobs(id) ON DELETE CASCADE,
  transporter_id UUID NOT NULL,
  bid_amount NUMERIC NOT NULL,
  estimated_duration_hours INTEGER,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(job_id, transporter_id)
);

-- Enable RLS
ALTER TABLE public.transport_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_bids ENABLE ROW LEVEL SECURITY;

-- RLS policies for transport_jobs
CREATE POLICY "Farmers can manage their own transport jobs" 
ON public.transport_jobs 
FOR ALL 
USING (farmer_id = (SELECT auth.uid()))
WITH CHECK (farmer_id = (SELECT auth.uid()));

CREATE POLICY "Transporters can view open transport jobs" 
ON public.transport_jobs 
FOR SELECT 
USING (status = 'open');

CREATE POLICY "Transporters can view their assigned jobs" 
ON public.transport_jobs 
FOR SELECT 
USING (assigned_transporter_id = (SELECT auth.uid()));

CREATE POLICY "Admins can manage all transport jobs" 
ON public.transport_jobs 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = (SELECT auth.uid()) 
    AND role = 'admin'
  )
);

-- RLS policies for transport_bids
CREATE POLICY "Transporters can manage their own bids" 
ON public.transport_bids 
FOR ALL 
USING (transporter_id = (SELECT auth.uid()))
WITH CHECK (transporter_id = (SELECT auth.uid()));

CREATE POLICY "Farmers can view bids on their jobs" 
ON public.transport_bids 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.transport_jobs 
    WHERE id = transport_bids.job_id 
    AND farmer_id = (SELECT auth.uid())
  )
);

CREATE POLICY "Farmers can update bid status on their jobs" 
ON public.transport_bids 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 
    FROM public.transport_jobs 
    WHERE id = transport_bids.job_id 
    AND farmer_id = (SELECT auth.uid())
  )
);

CREATE POLICY "Admins can manage all transport bids" 
ON public.transport_bids 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = (SELECT auth.uid()) 
    AND role = 'admin'
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_transport_jobs_updated_at
BEFORE UPDATE ON public.transport_jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transport_bids_updated_at
BEFORE UPDATE ON public.transport_bids
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();