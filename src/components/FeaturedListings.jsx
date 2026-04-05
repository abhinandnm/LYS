import React from 'react';

const FeaturedListings = ({ services, title }) => {
  return (
    <section className="listings-section grey-bg">
      <div className="container">
        <h2 className="section-title">{title || <>Featured <span className="text-primary">Services</span></>}</h2>
        
        {services.length === 0 ? (
          <div className="no-results">
            <h3>No services found matching your search.</h3>
            <p>Try different keywords or browse all categories.</p>
          </div>
        ) : (
          <div className="listings-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card animate-fade-in">
                <div className="card-image">
                  <img 
                    src={service.image_url || service.image || "https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=500&auto=format&fit=crop"} 
                    alt={service.name} 
                  />
                  <span className="price-tag">{service.price}</span>
                </div>
                <div className="card-content">
                  <p className="card-category">{service.category}</p>
                  <h3 className="card-title">{service.name}</h3>
                  <p className="card-provider">by {service.provider} | <span className="location-text">{service.location}</span></p>
                  <div className="card-footer">
                    <div className="rating">
                      <span className="star">★</span>
                      <span className="rating-value">{service.rating}</span>
                      <span className="reviews">({service.reviews} reviews)</span>
                    </div>
                    <button className="book-btn">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="view-all">
          <button className="btn-outline">View All Services</button>
        </div>
      </div>
      <style>{`
        .listings-section {
          padding: var(--section-padding);
        }
        .grey-bg { background-color: #f8fafc; }
        .text-primary { color: var(--primary); }
        .listings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .service-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid var(--border);
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .card-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .service-card:hover .card-image img {
          transform: scale(1.1);
        }
        .price-tag {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          padding: 6px 14px;
          border-radius: 100px;
          font-weight: 700;
          color: var(--text-main);
          font-size: 0.9rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .card-content {
          padding: 1.5rem;
        }
        .card-category {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--primary);
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .card-title {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
          color: var(--text-main);
        }
        .card-provider {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
        .location-text { font-style: italic; color: var(--primary); font-weight: 500; }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
        }
        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .star { color: var(--accent); font-size: 1.1rem; }
        .rating-value { font-weight: 700; font-size: 0.9rem; }
        .reviews { color: var(--text-muted); font-size: 0.8rem; margin-top: 1px; }
        .book-btn {
          background: var(--primary-light);
          color: var(--primary);
          padding: 8px 16px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .book-btn:hover {
          background: var(--primary);
          color: white;
        }
        .no-results {
          text-align: center;
          padding: 4rem 0;
          color: var(--text-muted);
        }
        .view-all {
          text-align: center;
          margin-top: 4rem;
        }
        .btn-outline {
          background: transparent;
          border: 1.5px solid var(--border);
          padding: 14px 32px;
          border-radius: 14px;
          font-weight: 600;
          color: var(--text-main);
        }
        .btn-outline:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--primary-light);
        }
      `}</style>
    </section>
  );
};

export default FeaturedListings;
