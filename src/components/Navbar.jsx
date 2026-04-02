import React from 'react';

const Navbar = ({ onOpenModal }) => {
  return (
    <nav className="navbar glass-effect">
      <div className="container nav-content">
        <a href="/" className="logo">
          <span className="logo-accent">L</span>YS
        </a>
        <div className="nav-links">
          <a href="#browse">Browse Services</a>
          <a href="#how-it-works">How it Works</a>
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
      `}</style>
    </nav>
  );
};

export default Navbar;
