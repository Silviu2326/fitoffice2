/*
  # Insert example user data
  
  This migration creates example users and trainers for testing purposes.
  It includes:
  - A trainer user with complete profile
  - Sample data for testing the application
*/

-- Insert example trainer user
-- Note: In a real scenario, you would create the auth user first through Supabase Auth
-- This is just for demonstration purposes

-- Example trainer profile (you'll need to create the auth user first)
INSERT INTO trainers (id, email, full_name, created_at, updated_at) 
VALUES (
  '550e8400-e29b-41d4-a716-446655440000', -- Example UUID
  'trainer@fitoffice.com',
  'María González',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- You can also add more example trainers
INSERT INTO trainers (id, email, full_name, created_at, updated_at) 
VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  'carlos@fitoffice.com',
  'Carlos Rodríguez',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO trainers (id, email, full_name, created_at, updated_at) 
VALUES (
  '550e8400-e29b-41d4-a716-446655440002',
  'ana@fitoffice.com',
  'Ana Martínez',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;
