import React, { useState } from 'react';
import { simulateS3Upload, simulateRDSInsert, simulateLambdaTrigger, simulateCloudWatchLog } from '../cloud/AWSUtils';
import CONFIG from '../config'

const ServiceModal = ({ isOpen, onClose, onAddService }) => {
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    category: 'Electrician',
    price: '',
    location: 'Mumbai, MH',
    image: null,
    imagePreview: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: AWS Processing, 3: Success

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStep(2);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('provider', formData.provider);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch(`${CONFIG.API_URL}/api/services`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const savedService = await response.json();
      onAddService(savedService);
      setStep(3);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to list service. Make sure backend is running.");
      setStep(1);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-effect animate-fade-in">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        {step === 1 && (
          <>
            <h2 className="modal-title">List Your <span className="text-primary">Service</span></h2>
            <form onSubmit={handleSubmit} className="service-form">
              <div className="form-group">
                <label>Service Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. John's Plumbing" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>Electrician</option>
                    <option>Handyman</option>
                    <option>Cleaner</option>
                    <option>Tutor</option>
                    <option>Painter</option>
                    <option>Fitness</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price Range</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹500/hr" 
                    required 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Provider Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Your name or business"
                  value={formData.provider}
                  onChange={(e) => setFormData({...formData, provider: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Service Image</label>
                <div className="image-upload-wrapper">
                  <input 
                    type="file" 
                    id="image-upload"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFormData({
                          ...formData, 
                          image: file,
                          imagePreview: URL.createObjectURL(file)
                        });
                      }
                    }}
                    hidden
                  />
                  <label htmlFor="image-upload" className="upload-area">
                    {formData.imagePreview ? (
                      <img src={formData.imagePreview} alt="Preview" className="preview-img" />
                    ) : (
                      <div className="upload-placeholder">
                        <span className="upload-icon">📷</span>
                        <span>Click to Upload Photo</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <button type="submit" className="btn-primary-full">Submit Listing</button>
            </form>
          </>
        )}

        {step === 2 && (
          <div className="processing-view">
            <div className="spinner"></div>
            <h3>Processing Your Listing...</h3>
            <p className="status-msg">Safely storing your data and optimizing images</p>
            <div className="status-steps">
              <div className="status-step done">✓ Image Upload Complete</div>
              <div className="status-step done">✓ Data Securely Stored</div>
              <div className="status-step active">⟳ Finalizing Verification</div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="success-view">
            <div className="success-icon">✓</div>
            <h3>Service Listed Successfully!</h3>
            <p>Your listing is now live and visible to customers in your area.</p>
            <button className="btn-primary" onClick={onClose}>Finish</button>
          </div>
        )}
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex; justify-content: center; align-items: center;
          z-index: 2000;
          backdrop-filter: blur(5px);
        }
        .modal-content {
          background: white; padding: 3rem; border-radius: 24px;
          width: 100%; max-width: 550px; position: relative;
        }
        .close-btn {
          position: absolute; top: 20px; right: 20px;
          background: transparent; font-size: 2rem; color: var(--text-muted);
        }
        .modal-title { margin-bottom: 2rem; text-align: center; }
        .form-group { margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 8px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        input, select {
          padding: 12px 16px; border: 1px solid var(--border);
          border-radius: 12px; font-family: var(--font-main);
        }
        .btn-primary-full {
          width: 100%; padding: 16px; background: var(--primary);
          color: white; border-radius: 14px; font-weight: 700; margin-top: 1rem;
        }
        .processing-view, .success-view { text-align: center; padding: 2rem 0; }
        .spinner {
          width: 50px; height: 50px; border: 4px solid var(--primary-light);
          border-top: 4px solid var(--primary); border-radius: 50%;
          animation: spin 1s linear infinite; margin: 0 auto 1.5rem;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .status-steps { margin-top: 2rem; text-align: left; background: #f8fafc; padding: 1.5rem; border-radius: 12px; }
        .status-step { margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem; }
        .status-step.done { color: var(--secondary); }
        .status-step.active { color: var(--primary); font-weight: 700; }
        .success-icon {
          width: 80px; height: 80px; background: var(--secondary);
          color: white; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-size: 3rem; margin: 0 auto 1.5rem;
        }
        /* Image Upload Styles */
        .image-upload-wrapper { margin-bottom: 0.5rem; }
        .upload-area {
          border: 2px dashed var(--border); border-radius: 16px;
          height: 120px; display: flex; align-items: center;
          justify-content: center; cursor: pointer; overflow: hidden;
          transition: all 0.3s ease; background: #fbfcfe;
        }
        .upload-area:hover { border-color: var(--primary); background: var(--primary-light); }
        .preview-img { width: 100%; height: 100%; object-fit: cover; }
        .upload-placeholder { display: flex; flex-direction: column; align-items: center; color: var(--text-muted); font-size: 0.9rem; gap: 4px; }
        .upload-icon { font-size: 1.5rem; }
      `}</style>
    </div>
  );
};

export default ServiceModal;
