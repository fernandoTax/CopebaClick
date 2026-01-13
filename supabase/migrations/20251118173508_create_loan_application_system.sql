-- Create Loan Application System
--
-- 1. New Tables
--    - loan_applications: Stores all loan application submissions
--      - id, first_name, last_name, phone, department, municipality
--      - loan_amount, loan_purpose, income_source, contact_method
--      - status, notes, timestamps
--    
--    - admin_users: Stores admin user profiles
--      - id (references auth.users), email, full_name, created_at
--
-- 2. Security
--    - Enable RLS on both tables
--    - Public can insert loan applications (anonymous submissions allowed)
--    - Only authenticated admin users can view/update applications
--    - Admin users can view their own profile
--
-- 3. Notes
--    - Application status: pending, reviewing, approved, rejected
--    - No authentication required for submitting applications
--    - Admin authentication required for dashboard access

CREATE TABLE IF NOT EXISTS loan_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  department text NOT NULL,
  municipality text NOT NULL,
  loan_amount numeric NOT NULL,
  loan_purpose text NOT NULL,
  income_source text NOT NULL,
  contact_method text NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  full_name text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Loan Applications Policies
CREATE POLICY "Anyone can submit loan applications"
  ON loan_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all loan applications"
  ON loan_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can update loan applications"
  ON loan_applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Admin Users Policies
CREATE POLICY "Admins can view their own profile"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can insert their own profile"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_loan_applications_status ON loan_applications(status);
CREATE INDEX IF NOT EXISTS idx_loan_applications_created_at ON loan_applications(created_at DESC);