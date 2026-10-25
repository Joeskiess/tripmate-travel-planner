import React from 'react';

export default function TripList({ trips, onSelectTrip, onDeleteTrip }) {
  if (!trips || trips.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <h3>No trips found</h3>
        <p style={{ color: 'var(--text-muted)' }}>Create your first trip using the "+ Create Trip" button above!</p>
      </div>
    );
  }

  return (
    <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
      {trips.map((trip) => (
        <div key={trip.id || Math.random()} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ 
              background: '#e0e7ff', 
              color: '#4338ca', 
              padding: '4px 10px', 
              borderRadius: '12px', 
              fontSize: '0.75rem', 
              fontWeight: '700' 
            }}>
              {trip.status || 'Active'}
            </span>
            <h3 style={{ fontSize: '1.25rem', marginTop: '10px', marginBottom: '6px' }}>{trip.title}</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '15px' }}>📍 {trip.destination}</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button 
              className="btn-submit" 
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }} 
              onClick={() => onSelectTrip(trip)}
            >
              View Itinerary ({trip.activities ? trip.activities.length : 0})
            </button>
            <button 
              style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer' }} 
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTrip(trip.id);
              }}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}