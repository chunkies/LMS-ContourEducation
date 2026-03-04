-- Create the consultations table
CREATE TABLE consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT NOT NULL CHECK (char_length(first_name) BETWEEN 1 AND 100),
  last_name TEXT NOT NULL CHECK (char_length(last_name) BETWEEN 1 AND 100),
  reason TEXT NOT NULL CHECK (char_length(reason) BETWEEN 1 AND 2000),
  consultation_datetime TIMESTAMPTZ NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Users can only view their own consultations
CREATE POLICY "Users can view own consultations"
  ON consultations FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert consultations for themselves
CREATE POLICY "Users can insert own consultations"
  ON consultations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own consultations
CREATE POLICY "Users can update own consultations"
  ON consultations FOR UPDATE
  USING (auth.uid() = user_id);
