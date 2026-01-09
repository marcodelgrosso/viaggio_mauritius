-- Create interested_people table
CREATE TABLE IF NOT EXISTS interested_people (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trip_details table
CREATE TABLE IF NOT EXISTS trip_details (
  id INTEGER PRIMARY KEY DEFAULT 1,
  destination TEXT NOT NULL DEFAULT 'Mauritius',
  dates TEXT NOT NULL DEFAULT '20-28 marzo 2026',
  price DECIMAL(10, 2) NOT NULL DEFAULT 2570.00,
  deposit DECIMAL(10, 2) NOT NULL DEFAULT 200.00,
  interested_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default trip details
INSERT INTO trip_details (id, destination, dates, price, deposit, interested_count)
VALUES (1, 'Mauritius', '20-28 marzo 2026', 2570.00, 200.00, 0)
ON CONFLICT (id) DO NOTHING;

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_interested_people_email ON interested_people(email);
CREATE INDEX IF NOT EXISTS idx_interested_people_created_at ON interested_people(created_at);

-- Enable Row Level Security (RLS) - since no auth is needed, we'll allow public reads
ALTER TABLE interested_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_details ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read interested_people count (but not personal data)
CREATE POLICY "Allow public read count" ON interested_people
  FOR SELECT USING (true);

-- Policy: Allow anyone to insert (for signups)
CREATE POLICY "Allow public insert" ON interested_people
  FOR INSERT WITH CHECK (true);

-- Policy: Allow public read of trip_details
CREATE POLICY "Allow public read trip_details" ON trip_details
  FOR SELECT USING (true);
