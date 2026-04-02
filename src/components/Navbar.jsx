import React, { useState } from 'react';

const Navbar = ({ onOpenModal, recentSearches, myListings, onSearch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar glass-effect">
      <div className="container nav-content">
        <a href="/" className="logo">
          <span className="logo-accent">L</span>YS
        </a>
        <div className="nav-links">
          <a href="#browse">Browse Services</a>
          
          {/* Recent Activity Dropdown */}
          <div className="dropdown-container">
            <button 
              className="activity-btn" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Activity {(recentSearches?.length > 0 || myListings?.length > 0) && <span className="badge"></span>}
            </button>
            
            {isDropdownOpen && (
              <div className="dropdown-menu glass-effect animate-fade-in">
                {recentSearches?.length > 0 && (
                  <div className="dropdown-section">
                    <h4>Recent Searches</h4>
                    {recentSearches.map((s, i) => (
                      <button key={i} onClick={() => { onSearch(s, ''); setIsDropdownOpen(false); }}>
                        🔍 {s}
                      </button>
                    ))}
                  </div>
                )}
                
                {myListings?.length > 0 && (
                  <div className="dropdown-section">
                    <h4>My Listings</h4>
                    {myListings.map((l, i) => (
                      <div key={i} className="my-listing-item">
                        <span>✅ {l.name}</span>
                        <small>{l.category}</small>
                      </div>
                    ))}
                  </div>
                )}

                {(!recentSearches?.length && !myListings?.length) && (
                  <p className="empty-msg">No recent activity yet</p>
                )}
              </div>
            )}
          </div>

          <a href="#list-service" className="btn-secondary-outline" onClick={(e) => { e.preventDefault(); onOpenModal(); }}>List Your Service</a>
          <a href="#login" className="btn-primary">Log In</a>
        </div>
      </div>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--nav-height);
          z-index: 1000;
          display: flex;
          align-items: center;
          transition: all 0.4s ease;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--primary);
          letter-spacing: -1px;
        }
        .logo-accent {
          color: var(--secondary);
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .nav-links a {
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-main);
          cursor: pointer;
        }
        .nav-links a:hover {
          color: var(--primary);
        }
        .btn-secondary-outline {
          padding: 8px 20px;
          border: 1.5px solid var(--primary);
          border-radius: 10px;
          color: var(--primary) !important;
        }
        .btn-secondary-outline:hover {
          background: var(--primary-light);
        }
        .dropdown-container { position: relative; }
        .activity-btn {
          background: transparent; font-weight: 500; font-size: 0.95rem;
          color: var(--text-main); display: flex; align-items: center; gap: 6px;
        }
        .activity-btn:hover { color: var(--primary); }
        .badge { width: 8px; height: 8px; background: var(--secondary); border-radius: 50%; }
        .dropdown-menu {
          position: absolute; top: calc(100% + 15px); right: 0;
          width: 280px; background: white; border-radius: 16px;
          padding: 1.5rem; box-shadow: var(--shadow-xl);
          border: 1px solid rgba(255,255,255,0.3);
        }
        .dropdown-section { margin-bottom: 1.5rem; }
        .dropdown-section:last-child { margin-bottom: 0; }
        .dropdown-section h4 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 10px; }
        .dropdown-section button {
          display: block; width: 100%; text-align: left; padding: 10px 12px;
          border-radius: 8px; font-size: 0.9rem; color: var(--text-main);
          transition: all 0.2s; background: transparent;
        }
        .dropdown-section button:hover { background: var(--primary-light); color: var(--primary); }
        .my-listing-item { padding: 10px 12px; display: flex; flex-direction: column; gap: 2px; }
        .my-listing-item span { font-size: 0.9rem; font-weight: 600; }
        .my-listing-item small { font-size: 0.75rem; color: var(--text-muted); }
        .empty-msg { font-size: 0.85rem; color: var(--text-muted); text-align: center; padding: 10px; }
      `}</style>
    </nav>
  );
};

export default Navbar;
