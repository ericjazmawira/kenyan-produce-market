
-- Drop the existing policy that's causing performance issues
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.user_profiles;

-- Create an optimized policy for admins to manage all profiles
CREATE POLICY "Admins can manage all profiles" ON public.user_profiles
FOR ALL
USING (
  EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = (SELECT auth.uid()) 
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = (SELECT auth.uid()) 
    AND role = 'admin'
  )
);
