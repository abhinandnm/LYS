import React, { useState, useMemo } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import FeaturedListings from './components/FeaturedListings'
import ServiceModal from './components/ServiceModal'

const INITIAL_SERVICES = [
  { 
    id: 1, 
    name: 'Sharma Electrical Solutions', 
    provider: 'Rahul Sharma',
    category: 'Electrician', 
    rating: 4.9, 
    reviews: 128, 
    price: '₹499/hr',
    location: 'Mumbai, MH',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 2, 
    name: 'Vedic Math & Science Tutors', 
    provider: 'Anjali Gupta',
    category: 'Tutor', 
    rating: 5.0, 
    reviews: 45, 
    price: '₹800/hr',
    location: 'Bengaluru, KA',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 3, 
    name: 'Blue Diamond Cleaning', 
    provider: 'Vikram Singh',
    category: 'Cleaner', 
    rating: 4.8, 
    reviews: 210, 
    price: '₹350/hr',
    location: 'Delhi, NCR',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 4, 
    name: 'FitIndia Personal Training', 
    provider: 'Arjun Kapoor',
    category: 'Fitness', 
    rating: 4.7, 
    reviews: 89, 
    price: '₹1200/hr',
    location: 'Hyderabad, TS',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=500&auto=format&fit=crop'
  },
];

function App() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const sQuery = searchQuery.toLowerCase().trim();
      const lQuery = locationQuery.toLowerCase().trim();

      // Flexible Name/Category matching
      const matchName = service.name.toLowerCase().includes(sQuery) || 
                       service.category.toLowerCase().includes(sQuery) ||
                       // Handle plural categories (e.g., 'Tutors' matches 'Tutor')
                       sQuery.startsWith(service.category.toLowerCase()) ||
                       service.category.toLowerCase().startsWith(sQuery.replace(/s$/, ''));

      // Flexible Location matching (e.g., 'Mumbai' matches 'Mumbai, MH')
      const serviceLoc = service.location.toLowerCase();
      const matchLocation = !lQuery || 
                           serviceLoc.includes(lQuery) || 
                           lQuery.includes(serviceLoc.split(',')[0].trim());

      return (sQuery === '' || matchName) && matchLocation;
    });
  }, [services, searchQuery, locationQuery]);

  const handleAddService = (newService) => {
    setServices([newService, ...services]);
  };

  const handleSearch = (query, location) => {
    setSearchQuery(query);
    setLocationQuery(location);
    // Smooth scroll to results
    const resultsSection = document.getElementById('browse');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <main>
        <Hero onSearch={handleSearch} onOpenModal={() => setIsModalOpen(true)} />
        <Categories onSelectCategory={(catName) => handleSearch(catName, locationQuery)} />
        <div id="browse">
          <FeaturedListings 
            services={filteredServices} 
            title={searchQuery ? `Search Results for "${searchQuery}"` : "Featured Services"} 
          />
        </div>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="how-it-works">
          <div className="container">
            <h2 className="section-title">How <span className="text-primary">LYS</span> Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-num">1</div>
                <h3>Explore Services</h3>
                <p>Browse detailed listings across dozens of categories near you.</p>
              </div>
              <div className="step">
                <div className="step-num">2</div>
                <h3>Book Instantly</h3>
                <p>Select your provider, check their availability, and book in seconds.</p>
              </div>
              <div className="step">
                <div className="step-num">3</div>
                <h3>Get it Done</h3>
                <p>Relax while your service provider delivers quality work as promised.</p>
              </div>
            </div>
          </div>
          <style>{`
            .how-it-works { padding: var(--section-padding); background: white; }
            .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem; margin-top: 2rem; }
            .step { text-align: center; }
            .step-num { width: 60px; height: 60px; background: var(--primary-light); color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; margin: 0 auto 1.5rem; }
            .step h3 { margin-bottom: 1rem; }
            .step p { color: var(--text-muted); }
          `}</style>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="container cta-box glass-effect">
            <div className="cta-content">
              <h2>Ready to grow your <span className="text-secondary">Business?</span></h2>
              <p>Join thousands of service providers and start reaching more customers today.</p>
            </div>
            <button className="btn-primary-large" onClick={() => setIsModalOpen(true)}>List Your Service</button>
          </div>
          <style>{`
            .cta-section { padding: var(--section-padding); }
            .cta-box { display: flex; justify-content: space-between; align-items: center; padding: 4rem; border-radius: 30px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: white; border: none; }
            .cta-content h2 { font-size: 2.5rem; margin-bottom: 1rem; color: white; }
            .cta-content .text-secondary { color: #facc15; }
            .btn-primary-large { background: white; color: var(--primary); padding: 18px 38px; border-radius: 14px; font-size: 1.1rem; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
            .btn-primary-large:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,0,0,0.2); }
            @media (max-width: 768px) { .cta-box { flex-direction: column; text-align: center; gap: 2rem; padding: 2rem; } }
          `}</style>
        </section>
      </main>

      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddService={handleAddService} 
      />

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="logo"><span className="logo-accent">L</span>YS</div>
            <p>Your platform for discovering and listing the best local services.</p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Terms of Service</a>
            </div>
            <div>
              <h4>For Providers</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>List Your Service</a>
              <a href="#">Provider FAQ</a>
              <a href="#">Dashboard Login</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom container">
          <p>&copy; 2026 LYS Platform. All rights reserved.</p>
        </div>
        <style>{`
          .footer { background: #0f172a; color: white; padding-top: 80px; padding-bottom: 40px; }
          .footer-content { display: flex; justify-content: space-between; gap: 4rem; margin-bottom: 60px; }
          .footer-brand .logo { font-size: 2rem; color: white; margin-bottom: 1rem; }
          .footer-brand p { color: #94a3b8; max-width: 300px; }
          .footer-links { display: flex; gap: 4rem; }
          .footer-links h4 { margin-bottom: 1.5rem; font-size: 1.1rem; }
          .footer-links a { display: block; margin-bottom: 0.8rem; color: #94a3b8; font-size: 0.95rem; }
          .footer-links a:hover { color: white; }
          .footer-bottom { border-top: 1px solid #1e293b; padding-top: 30px; text-align: center; color: #64748b; font-size: 0.9rem; }
          @media (max-width: 768px) { .footer-content { flex-direction: column; gap: 2rem; } }
        `}</style>
      </footer>
    </div>
  )
}

export default App
