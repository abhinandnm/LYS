import React, { useState } from 'react';

const Navbar = ({ onOpenModal }) => {
  return (
    <nav className="navbar glass-effect">
      <div className="container nav-content">
        <a href="/" className="logo">
          <span className="logo-accent">L</span>YS
        </a>
        <div className="nav-links">
          <a href="#browse" className="nav-item">Browse Services</a>
          <a href="#how-it-works" className="nav-item">How it Works</a>
          <div className="nav-actions">
            <button className="btn-list" onClick={onOpenModal}>List Your Service</button>
            <button className="btn-login">Log In</button>
          </div>
        </div>
      </div>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          z-index: 1000;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .logo {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
          text-decoration: none;
          letter-spacing: -1.5px;
        }
        .logo-accent { color: var(--secondary); }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }
        .nav-item {
          text-decoration: none;
          color: var(--text-main);
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .nav-item:hover { color: var(--primary); }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .btn-list {
          background: white;
          border: 1.5px solid var(--primary);
          color: var(--primary);
          padding: 10px 22px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-list:hover {
          background: var(--primary-light);
          transform: translateY(-1px);
        }
        .btn-login {
          background: var(--primary);
          color: white;
          padding: 10px 28px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
        }
        .btn-login:hover {
          background: var(--secondary);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
        }
        @media (max-width: 768px) {
          .nav-item { display: none; }
          .nav-links { gap: 1rem; }
          .btn-list { padding: 8px 14px; font-size: 0.85rem; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

