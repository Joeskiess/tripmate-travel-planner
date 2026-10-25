import React, { useState } from 'react';

export default function TripForm({ onCreateTrip }) {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    status: 'Active'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTrip(formData);
    setFormData({ title: '', destination: '', startDate: '', endDate: '', status: 'Active' });
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ marginBottom: '20px' }}>➕ Create New Trip</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Trip Name / Title</label>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="e.g. Summer Vacation in Goa" 
            value={formData.title} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label>Destination City</label>
          <input 
            type="text" 
            name="destination" 
            required 
            placeholder="e.g. Mumbai" 
            value={formData.destination} 
            onChange={handleChange} 
          />
        </div>

        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div className="form-group">
            <label>Start Date</label>
            <input 
              type="date" 
              name="startDate" 
              value={formData.startDate} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input 
              type="date" 
              name="endDate" 
              value={formData.endDate} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <button type="submit" className="btn-submit" style={{ marginTop: '15px' }}>
          Save Trip
        </button>
      </form>
    </div>
  );
}