import React, { useState } from 'react';

export default function AuthModal({ onLogin, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save authentication state in localStorage
    const userInfo = {
      name: isSignUp ? formData.name : (formData.email.split('@')[0] || 'Traveler'),
      email: formData.email
    };
    localStorage.setItem('user_token', 'jwt_demo_token');
    localStorage.setItem('user_info', JSON.stringify(userInfo));
    onLogin(userInfo);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="card" style={{ width: '400px', position: 'relative', margin: 0 }}>
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute', 
            top: '18px', 
            right: '20px', 
            border: 'none', 
            background: 'none', 
            fontSize: '1.2rem', 
            cursor: 'pointer',
            color: '#64748b'
          }}
        >
          ✕
        </button>

        <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>
          {isSignUp ? '🔑 Create Account' : '🔒 Account Sign In'}
        </h3>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                required 
                placeholder="John Doe" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="user@example.com" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            />
          </div>

          <button type="submit" className="btn-submit" style={{ marginTop: '10px' }}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p 
          style={{ 
            textAlign: 'center', 
            marginTop: '16px', 
            fontSize: '0.85rem', 
            color: '#6366f1', 
            cursor: 'pointer',
            fontWeight: '600'
          }}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}