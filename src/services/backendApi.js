/**
 * TripMate Backend API Service
 * Connects React Frontend (localhost:5173) to Spring Boot Backend (localhost:8080)
 * backing PostgreSQL / pgAdmin ("Traveldb")
 */

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Check if the Spring Boot backend server and PostgreSQL are reachable
 */
export async function checkBackendStatus() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE_URL}/trips`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    return false;
  }
}

/**
 * GET /api/trips - Fetch all trips from PostgreSQL
 */
export async function fetchAllTrips() {
  const res = await fetch(`${API_BASE_URL}/trips`, {
    headers: { 'Accept': 'application/json' }
  });
  if (!res.ok) throw new Error(`Failed to fetch trips: ${res.statusText}`);
  return await res.json();
}

/**
 * GET /api/trips/{id} - Fetch single trip with its associated activities
 */
export async function fetchTripById(id) {
  const res = await fetch(`${API_BASE_URL}/trips/${id}`, {
    headers: { 'Accept': 'application/json' }
  });
  if (!res.ok) throw new Error(`Trip not found (HTTP ${res.status})`);
  return await res.json();
}

/**
 * POST /api/trips - Create new trip in PostgreSQL
 * @param {{ title: string, destination: string, startDate: string, endDate: string, status?: string }} tripData
 */
export async function createBackendTrip(tripData) {
  const res = await fetch(`${API_BASE_URL}/trips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      title: tripData.title || 'My Trip',
      destination: tripData.destination || 'Paris, France',
      startDate: tripData.startDate || '10/12',
      endDate: tripData.endDate || '10/13',
      status: tripData.status || 'Active'
    })
  });
  if (!res.ok) throw new Error(`Failed to create trip in database: ${res.statusText}`);
  return await res.json();
}

/**
 * DELETE /api/trips/{id} - Delete trip and cascade delete all activities in PostgreSQL
 */
export async function deleteBackendTrip(id) {
  const res = await fetch(`${API_BASE_URL}/trips/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error(`Failed to delete trip: ${res.statusText}`);
  return true;
}

/**
 * POST /api/trips/{tripId}/activities - Add an activity / expense to trip
 * Updates PostgreSQL table 'activities' with FK trip_id
 * @param {number|string} tripId
 * @param {{ dayNumber: number, time: string, title: string, location: string, cost: number, category: string }} activityData
 */
export async function addBackendActivity(tripId, activityData) {
  const res = await fetch(`${API_BASE_URL}/trips/${tripId}/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      dayNumber: parseInt(activityData.dayNumber, 10) || 1,
      time: activityData.time || '10:00 AM',
      title: activityData.title || activityData.name || 'Activity',
      location: activityData.location || activityData.address || '',
      cost: parseFloat(activityData.cost) || parseFloat(activityData.amount) || 0,
      category: activityData.category || 'Sightseeing'
    })
  });
  if (!res.ok) throw new Error(`Failed to save activity in PostgreSQL: ${res.statusText}`);
  return await res.json();
}

/**
 * DELETE /api/trips/{tripId}/activities/{activityId} - Remove activity from PostgreSQL
 */
export async function deleteBackendActivity(tripId, activityId) {
  const res = await fetch(`${API_BASE_URL}/trips/${tripId}/activities/${activityId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error(`Failed to delete activity from PostgreSQL: ${res.statusText}`);
  return await res.json();
}

/**
 * GET /api/weather?city={city} - Fetch live weather via WeatherController
 */
export async function fetchBackendWeather(city) {
  const cleanCity = city.includes(',') ? city.split(',')[0].trim() : city.trim();
  try {
    const res = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(cleanCity)}`);
    if (!res.ok) throw new Error(`Backend weather failed (${res.status})`);
    return await res.json();
  } catch (err) {
    // Graceful fallback to direct OpenWeather endpoint if Spring Boot is offline
    const apiKey = '215684d31be5e083a73eaf0a051a50b1';
    const directRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cleanCity)}&units=metric&appid=${apiKey}`);
    if (!directRes.ok) throw new Error('Live weather service unavailable');
    return await directRes.json();
  }
}
