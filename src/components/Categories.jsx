import React from 'react';

const categories = [
  { id: 1, name: 'Electricians', icon: '⚡', color: '#fef3c7' },
  { id: 2, name: 'Handyman', icon: '🛠️', color: '#e0f2fe' },
  { id: 3, name: 'Cleaners', icon: '🧹', color: '#dcfce7' },
  { id: 4, name: 'Tutors', icon: '📚', color: '#f3e8ff' },
  { id: 5, name: 'Painters', icon: '🎨', color: '#ffedd5' },
  { id: 6, name: 'Fitness', icon: '💪', color: '#fce7f3' },
  { id: 7, name: 'Pet Care', icon: '🐾', color: '#ecfdf5' },
  { id: 8, name: 'IT Support', icon: '💻', color: '#e0f2fe' },
];

const Categories = ({ onSelectCategory }) => {
  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="section-title">Explore by <span className="text-secondary">Category</span></h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="category-card"
              onClick={() => onSelectCategory(cat.name)}
            >
              <div className="category-icon" style={{ backgroundColor: cat.color }}>
                {cat.icon}
              </div>
              <h3 className="category-name">{cat.name}</h3>
              <p className="category-count">12+ Listings</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .categories-section {
          padding: var(--section-padding);
          background-color: var(--surface);
        }
        .text-secondary {
          color: var(--secondary);
        }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1.5rem;
        }
        .category-card {
          padding: 2rem 1rem;
          background: white;
          border-radius: 24px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--border);
          cursor: pointer;
        }
        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
          border-color: var(--primary);
        }
        .category-icon {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 1.25rem;
        }
        .category-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .category-count {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        @media (max-width: 640px) {
          .categories-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
};

export default Categories;
