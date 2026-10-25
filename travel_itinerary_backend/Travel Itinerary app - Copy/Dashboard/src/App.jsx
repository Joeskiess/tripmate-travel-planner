import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TripList from './components/TripList';
import TripForm from './components/TripForm';
import AuthModal from './components/AuthModal';
import ItineraryDetails from './components/ItineraryDetails';

export default function App() {
  const [trips, setTrips] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user_info')) || null;
    } catch {
      return null;
    }
  });

  // Fetch trips from Spring Boot / PostgreSQL Backend
  const fetchTrips = () => {
    axios.get('http://localhost:8080/api/trips')
      .then(res => setTrips(res.data))
      .catch(err => console.error("Error loading trips:", err));
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleCreateTrip = (newTrip) => {
    axios.post('http://localhost:8080/api/trips', newTrip)
      .then(() => {
        fetchTrips();
        setActiveTab('all');
      })
      .catch(err => console.error("Error creating trip:", err));
  };

  const handleDeleteTrip = (id) => {
    axios.delete(`http://localhost:8080/api/trips/${id}`)
      .then(() => {
        if (selectedTrip && selectedTrip.id === id) setSelectedTrip(null);
        fetchTrips();
      })
      .catch(err => console.error("Error deleting trip:", err));
  };

  const handleAddActivity = (tripId, activity) => {
    axios.post(`http://localhost:8080/api/trips/${tripId}/activities`, activity)
      .then(res => {
        const updatedTrip = res.data;
        setSelectedTrip(updatedTrip);
        setTrips(trips.map(t => t.id === tripId ? updatedTrip : t));
      })
      .catch(err => console.error("Error adding activity:", err));
  };

  const handleDeleteActivity = (tripId, activityId) => {
    axios.delete(`http://localhost:8080/api/trips/${tripId}/activities/${activityId}`)
      .then(res => {
        const updatedTrip = res.data;
        setSelectedTrip(updatedTrip);
        setTrips(trips.map(t => t.id === tripId ? updatedTrip : t));
      })
      .catch(err => console.error("Error removing activity:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_info');
    setUser(null);
  };

  // Filter Active vs All trips
  const displayedTrips = activeTab === 'active' 
    ? trips.filter(t => t.status === 'Active' || !t.status)
    : trips;

  // Calculate high-level stats
  const totalBudget = trips.reduce((sum, t) => {
    const tripCost = t.activities ? t.activities.reduce((acc, a) => acc + (a.cost || 0), 0) : 0;
    return sum + tripCost;
  }, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
      {/* Top Navbar */}
      <nav className="navbar" style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px 32px',
        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
        color: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', cursor: 'pointer' }} onClick={() => { setSelectedTrip(null); setActiveTab('all'); }}>
          ✈️ TravelPlanner
        </h1>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className={`nav-btn ${activeTab === 'all' && !selectedTrip ? 'active' : ''}`}
            onClick={() => { setSelectedTrip(null); setActiveTab('all'); }}
          >
            🗺️ All Trips ({trips.length})
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'active' && !selectedTrip ? 'active' : ''}`}
            onClick={() => { setSelectedTrip(null); setActiveTab('active'); }}
          >
            🔥 Active Trips
          </button>

          <button 
            className={`nav-btn ${activeTab === 'create' && !selectedTrip ? 'active' : ''}`}
            onClick={() => { setSelectedTrip(null); setActiveTab('create'); }}
          >
            ➕ Create Trip
          </button>

          {user ? (
            <button className="nav-btn" onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.2)' }}>
              👤 {user.name} (Logout)
            </button>
          ) : (
            <button className="nav-btn" onClick={() => setShowAuthModal(true)} style={{ background: 'rgba(255,255,255,0.2)' }}>
              🔒 Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Main Container */}
      <div className="container" style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
        
        {/* Metric Cards Banner */}
        {!selectedTrip && (
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
            <div className="stat-card">
              <h5>TOTAL TRIPS SAVED</h5>
              <p className="stat-number">{trips.length}</p>
            </div>
            <div className="stat-card">
              <h5>ACTIVE DESTINATIONS</h5>
              <p className="stat-number">{trips.filter(t => t.status === 'Active' || !t.status).length}</p>
            </div>
            <div className="stat-card">
              <h5>TOTAL PLANNED BUDGET</h5>
              <p className="stat-number">${totalBudget.toFixed(0)}</p>
            </div>
          </div>
        )}

        {/* Dynamic Route View Rendering */}
        {selectedTrip ? (
          <ItineraryDetails 
            trip={selectedTrip} 
            onAddActivity={handleAddActivity}
            onDeleteActivity={handleDeleteActivity}
            onBack={() => setSelectedTrip(null)}
          />
        ) : activeTab === 'create' ? (
          <TripForm onCreateTrip={handleCreateTrip} />
        ) : (
          <TripList 
            trips={displayedTrips} 
            onSelectTrip={(trip) => setSelectedTrip(trip)} 
            onDeleteTrip={handleDeleteTrip}
          />
        )}
      </div>

      {/* Sign In / Sign Up Modal */}
      {showAuthModal && (
        <AuthModal 
          onLogin={(userData) => { setUser(userData); setShowAuthModal(false); }} 
          onClose={() => setShowAuthModal(false)} 
        />
      )}
    </div>
  );
}