import React, { useState } from 'react';

const Hero = ({ onSearch, onOpenModal }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Mumbai, India');

  const handleSearchClick = () => {
    onSearch(query, location);
  };

  return (
    <section className="hero-section">
      <div className="container hero-content animate-fade-in">
        <h1 className="hero-title">
          Connecting You to the <span className="text-gradient">Best Local Services</span>
        </h1>
        <p className="hero-subtitle">
          From expert electricians to personal trainers—find, book, and review the best services in your neighborhood.
        </p>
        
        <div className="search-container glass-effect">
          <div className="search-input-group">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="What service are you looking for?" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
            />
          </div>
          <div className="search-input-group border-left">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
            </svg>
            <input 
              type="text" 
              placeholder="Location" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
            />
          </div>
          <button className="btn-primary search-btn" onClick={handleSearchClick}>Search Now</button>
        </div>
        
        <div className="hero-badges">
          <span className="badge">Trusted Providers</span>
          <span className="badge">Secure Payments</span>
          <span className="badge">Instant Booking</span>
        </div>
      </div>
      
      <div className="hero-decoration">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
      </div>
      
      <style>{`
        .hero-section {
          padding-top: calc(var(--nav-height) + 60px);
          padding-bottom: 100px;
          position: relative;
          background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
          overflow: hidden;
        }
        .hero-content {
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .hero-title {
          font-size: 3.8rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--text-main);
        }
        .text-gradient {
          background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .search-container {
          display: flex;
          align-items: center;
          padding: 10px;
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }
        .search-input-group {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 20px;
        }
        .search-input-group.border-left {
          border-left: 1px solid var(--border);
        }
        .search-input-group input {
          border: none;
          background: transparent;
          padding: 15px 10px;
          font-size: 1rem;
          width: 100%;
          outline: none;
          color: var(--text-main);
        }
        .search-icon {
          width: 20px;
          height: 20px;
          color: var(--text-muted);
        }
        .search-btn {
          padding: 15px 40px;
          border-radius: 14px;
          font-size: 1rem;
        }
        .hero-badges {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .badge {
          background: white;
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-main);
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .badge::before {
          content: '✓';
          color: var(--secondary);
          font-weight: 800;
        }
        .hero-decoration .bubble {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          z-index: 1;
          opacity: 0.4;
        }
        .bubble-1 {
          width: 400px;
          height: 400px;
          background: var(--primary);
          top: -100px;
          right: -100px;
        }
        .bubble-2 {
          width: 300px;
          height: 300px;
          background: var(--secondary);
          bottom: -50px;
          left: -50px;
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .search-container { flex-direction: column; padding: 15px; gap: 10px; }
          .search-input-group.border-left { border-left: none; border-top: 1px solid var(--border); }
          .search-btn { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
