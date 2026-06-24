
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  meal_plan TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Seed pricing data from the catalogue
INSERT INTO products (name, category, meal_plan, price, description) VALUES
  ('Standard Room Single', 'Standard Room', 'Bed & Breakfast', 4500, 'Comfortable single room with breakfast included. Check-out by 12:00pm.'),
  ('Standard Room Single', 'Standard Room', 'Half Board', 6000, 'Comfortable single room with breakfast and dinner included.'),
  ('Standard Room Single', 'Standard Room', 'Full Board', 7000, 'Comfortable single room with all meals included.'),
  ('Standard Room Double', 'Standard Room', 'Bed & Breakfast', 5500, 'Comfortable double room with breakfast included. Check-out by 12:00pm.'),
  ('Standard Room Double', 'Standard Room', 'Half Board', 7500, 'Comfortable double room with breakfast and dinner included.'),
  ('Standard Room Double', 'Standard Room', 'Full Board', 9000, 'Comfortable double room with all meals included.'),
  ('Deluxe Room Single', 'Deluxe Room', 'Bed & Breakfast', 5000, 'Premium single room with breakfast included. Upgraded amenities and views.'),
  ('Deluxe Room Single', 'Deluxe Room', 'Half Board', 6500, 'Premium single room with breakfast and dinner included.'),
  ('Deluxe Room Single', 'Deluxe Room', 'Full Board', 7500, 'Premium single room with all meals included.'),
  ('Deluxe Room Double', 'Deluxe Room', 'Bed & Breakfast', 6000, 'Premium double room with breakfast included. Upgraded amenities and views.'),
  ('Deluxe Room Double', 'Deluxe Room', 'Half Board', 8000, 'Premium double room with breakfast and dinner included.'),
  ('Deluxe Room Double', 'Deluxe Room', 'Full Board', 10000, 'Premium double room with all meals included.');
