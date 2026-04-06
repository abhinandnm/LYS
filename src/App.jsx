import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import FeaturedListings from './components/FeaturedListings'
import ServiceModal from './components/ServiceModal'
import CONFIG from './config'

function App() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Activity History State
  const [recentSearches, setRecentSearches] = useState([]);
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    fetchServices();
    // Load history from localStorage
    const savedSearches = JSON.parse(localStorage.getItem('lys_searches') || '[]');
    const savedListings = JSON.parse(localStorage.getItem('lys_my_listings') || '[]');
    setRecentSearches(savedSearches);
    setMyListings(savedListings);
  }, [locationQuery]); // Refresh when location changes

  const fetchServices = async (searchQuery = '') => {
    try {
      const url = searchQuery 
        ? `${CONFIG.API_URL}/api/services/search?q=${searchQuery}` 
        : `${CONFIG.API_URL}/api/services`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]); // fallback to empty array to prevent map undefined error
    }
  };

  const handleSearch = (query, location) => {
    if (query.trim()) {
      // Save to recent searches
      const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('lys_searches', JSON.stringify(updatedSearches));
    }

    setSearchQuery(query);
    setLocationQuery(location);
    fetchServices(query); // Call the search API
    // Smooth scroll to results
    const resultsSection = document.getElementById('browse');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddService = (newService) => {
    // Save to My Listings
    const updatedListings = [newService, ...myListings].slice(0, 10);
    setMyListings(updatedListings);
    localStorage.setItem('lys_my_listings', JSON.stringify(updatedListings));
    
    // Add to current feed instead of refetching
    setServices(prev => [newService, ...prev]);
  };

  return (
    <div className="app">
      <Navbar 
        onOpenModal={() => setIsModalOpen(true)} 
        recentSearches={recentSearches}
        myListings={myListings}
        onSearch={handleSearch}
      />
      <main>
        <Hero onSearch={handleSearch} onOpenModal={() => setIsModalOpen(true)} />
        <Categories onSelectCategory={(catName) => handleSearch(catName, locationQuery)} />
        <div id="browse">
          <FeaturedListings 
            services={services} 
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
