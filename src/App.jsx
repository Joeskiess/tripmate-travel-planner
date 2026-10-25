import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateTripPage from './pages/CreateTripPage';
import PlannerPage from './pages/PlannerPage';
import BackendDashboardPage from './pages/BackendDashboardPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/plan/create" element={<CreateTripPage />} />
      <Route path="/plan/new" element={<CreateTripPage />} />
      <Route path="/plan" element={<PlannerPage />} />
      <Route path="/plan/:destination" element={<PlannerPage />} />
      <Route path="/dashboard" element={<BackendDashboardPage />} />
      <Route path="/trips" element={<BackendDashboardPage />} />
      <Route path="/database" element={<BackendDashboardPage />} />
      <Route path="/view/:id/:slug/shared" element={<PlannerPage />} />
      <Route path="/explore/:id/:slug" element={<PlannerPage />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}