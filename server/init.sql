-- LYS Database Initialization Script
-- Use this in your AWS RDS PostgreSQL Query Editor or via psql

CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    image_url TEXT,
    rating DECIMAL(2,1) DEFAULT 4.5,
    reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Indian Localized Services
INSERT INTO services (name, category, price, location, provider, image_url, rating, reviews)
VALUES 
('Sharma Electrical Solutions', 'Electrician', '₹499/hr', 'Mumbai, MH', 'Rahul Sharma', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=500&auto=format&fit=crop', 4.9, 128),
('Vedic Math & Science Tutors', 'Tutor', '₹800/hr', 'Bengaluru, KA', 'Anjali Gupta', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500&auto=format&fit=crop', 5.0, 45),
('Blue Diamond Cleaning', 'Cleaner', '₹350/hr', 'Delhi, NCR', 'Vikram Singh', 'https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=500&auto=format&fit=crop', 4.8, 210),
('FitIndia Personal Training', 'Fitness', '₹1200/hr', 'Hyderabad, TS', 'Arjun Kapoor', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=500&auto=format&fit=crop', 4.7, 89);
