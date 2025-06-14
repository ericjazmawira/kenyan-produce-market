
-- Drop the existing policy that's causing performance issues
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;

-- Create an optimized policy that evaluates auth.uid() only once
CREATE POLICY "Admins can view all profiles" ON public.user_profiles
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = (SELECT auth.uid()) 
    AND role = 'admin'
  )
);
