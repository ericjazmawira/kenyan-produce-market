
-- Fix RLS performance issues by wrapping auth.uid() calls in SELECT statements
-- This prevents re-evaluation for each row and improves query performance at scale

-- Fix profiles table policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT 
WITH CHECK (id = (SELECT auth.uid()));

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE 
USING (id = (SELECT auth.uid()));

CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT 
USING (id = (SELECT auth.uid()));

-- Fix user_roles table policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT 
USING (user_id = (SELECT auth.uid()));

-- Fix platform_stats table policies
DROP POLICY IF EXISTS "Admins can update platform stats" ON public.platform_stats;
DROP POLICY IF EXISTS "Admins can view platform stats" ON public.platform_stats;

CREATE POLICY "Admins can update platform stats" ON public.platform_stats
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = (SELECT auth.uid()) 
    AND role = 'admin'
  )
);

CREATE POLICY "Admins can view platform stats" ON public.platform_stats
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = (SELECT auth.uid()) 
    AND role = 'admin'
  )
);

-- Fix user_profiles table policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;

CREATE POLICY "Users can view own profile" ON public.user_profiles
FOR SELECT 
USING (user_id = (SELECT auth.uid()));

-- Fix listings table policies
DROP POLICY IF EXISTS "Admins can manage all listings" ON public.listings;
DROP POLICY IF EXISTS "Farmers can manage own listings" ON public.listings;

CREATE POLICY "Admins can manage all listings" ON public.listings
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

CREATE POLICY "Farmers can manage own listings" ON public.listings
FOR ALL 
USING (farmer_id = (SELECT auth.uid()))
WITH CHECK (farmer_id = (SELECT auth.uid()));

-- Fix orders table policies
DROP POLICY IF EXISTS "Admins can manage all orders" ON public.orders;

CREATE POLICY "Admins can manage all orders" ON public.orders
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
