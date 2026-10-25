import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/trips';

export const getTrips = () => axios.get(API_BASE_URL);

export const getTripById = (id) => axios.get(`${API_BASE_URL}/${id}`);

export const createTrip = (tripData) => axios.post(API_BASE_URL, tripData);

export const deleteTrip = (id) => axios.delete(`${API_BASE_URL}/${id}`);

export const addActivity = (tripId, activityData) => 
  axios.post(`${API_BASE_URL}/${tripId}/activities`, activityData);

export const deleteActivity = (tripId, activityId) =>
  axios.delete(`${API_BASE_URL}/${tripId}/activities/${activityId}`);