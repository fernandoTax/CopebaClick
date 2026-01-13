import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LoanApplication {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  department: string;
  municipality: string;
  loan_amount: number;
  loan_purpose: string;
  income_source: string;
  contact_method: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}
