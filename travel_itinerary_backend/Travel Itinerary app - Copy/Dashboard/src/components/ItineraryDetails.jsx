import React, { useState } from 'react';
import ExpenseChart from './ExpenseChart';
import WeatherWidget from './WeatherWidget';
import DragDropSchedule from './DragDropSchedule';

export default function ItineraryDetails({ trip, onAddActivity, onDeleteActivity, onBack }) {
  const [activity, setActivity] = useState({
    dayNumber: 1,
    time: '',
    title: '',
    location: '',
    cost: '',
    category: 'Sightseeing'
  });

  if (!trip) return null;

  const handleChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trip.id) {
      alert("Error: Missing Trip ID. Please go back to dashboard and re-select the trip.");
      return;
    }
    onAddActivity(trip.id, {
      ...activity,
      dayNumber: parseInt(activity.dayNumber) || 1,
      cost: parseFloat(activity.cost) || 0,
      category: activity.category || 'Sightseeing'
    });
    setActivity({ dayNumber: 1, time: '', title: '', location: '', cost: '', category: 'Sightseeing' });
  };

  return (
    <div>
      <button className="nav-btn" onClick={onBack} style={{ marginBottom: '20px', color: '#333' }}>
        ← Back to Dashboard
      </button>

      <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{trip.title || 'Trip Details'}</h2>
      
      {/* Live Weather Box */}
      <WeatherWidget destination={trip.destination} />

      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <div className="card">
            <h3>Add New Activity</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Day Number</label>
                <input type="number" min="1" name="dayNumber" value={activity.dayNumber} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="text" placeholder="e.g. 10:00 AM" name="time" value={activity.time} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Activity Title</label>
                <input name="title" value={activity.title} onChange={handleChange} placeholder="e.g. Gateway of India" required />
              </div>
              <div className="form-group">
                <label>Location / Route</label>
                <input name="location" value={activity.location} onChange={handleChange} placeholder="e.g. Apollo Bandar, Colaba" />
              </div>
              
              {/* Category Dropdown */}
              <div className="form-group">
                <label>Expense Category</label>
                <select 
                  name="category" 
                  value={activity.category} 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem' }}
                >
                  <option value="Sightseeing">Sightseeing</option>
                  <option value="Food">Food & Dining</option>
                  <option value="Transport">Transport</option>
                  <option value="Lodging">Lodging</option>
                </select>
              </div>

              <div className="form-group">
                <label>Cost ($)</label>
                <input type="number" name="cost" value={activity.cost} onChange={handleChange} placeholder="0" />
              </div>
              <button type="submit" className="btn-submit">Add Activity</button>
            </form>
          </div>

          <ExpenseChart activities={trip.activities || []} />
        </div>

        <div className="card">
          <h3>Interactive Schedule (Drag to Reorder)</h3>
          {trip.activities && trip.activities.length > 0 ? (
            <DragDropSchedule 
              activities={trip.activities} 
              onDeleteActivity={(actId) => onDeleteActivity(trip.id, actId)} 
              onReorder={() => {}}
            />
          ) : (
            <p style={{ color: '#64748b', marginTop: '10px' }}>No activities added to this itinerary yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}