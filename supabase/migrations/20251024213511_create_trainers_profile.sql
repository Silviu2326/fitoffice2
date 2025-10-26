/*
  # Create trainers profile table

  1. New Tables
    - `trainers`
      - `id` (uuid, primary key) - References auth.users
      - `email` (text) - Trainer's email
      - `full_name` (text) - Trainer's full name
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
  
  2. Security
    - Enable RLS on `trainers` table
    - Add policy for trainers to read their own profile
    - Add policy for trainers to update their own profile
    - Add policy for trainers to insert their own profile on signup
*/

CREATE TABLE IF NOT EXISTS trainers (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trainers can view own profile"
  ON trainers FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Trainers can insert own profile"
  ON trainers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Trainers can update own profile"
  ON trainers FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);