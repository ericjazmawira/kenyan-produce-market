
-- Add missing indexes for foreign key constraints to improve query performance

-- Index for listings.farmer_id foreign key
CREATE INDEX IF NOT EXISTS idx_listings_farmer_id ON public.listings (farmer_id);

-- Index for orders.farmer_id foreign key
CREATE INDEX IF NOT EXISTS idx_orders_farmer_id ON public.orders (farmer_id);

-- Index for platform_settings.updated_by foreign key
CREATE INDEX IF NOT EXISTS idx_platform_settings_updated_by ON public.platform_settings (updated_by);

-- Index for support_messages.assigned_to foreign key
CREATE INDEX IF NOT EXISTS idx_support_messages_assigned_to ON public.support_messages (assigned_to);

-- Index for support_messages.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_support_messages_user_id ON public.support_messages (user_id);

-- Remove unused indexes that are not being utilized
DROP INDEX IF EXISTS orders_listing_id_idx;
DROP INDEX IF EXISTS activity_logs_user_id_idx;
DROP INDEX IF EXISTS orders_buyer_id_idx;
