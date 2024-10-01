import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/PrivateRoute';
import UserProfile from './pages/UserProfile'; // Import komponentu UserProfile

function App() {
  return (
    <Router>
      <Routes>
        {/* Dodaj trasę domyślną dla ścieżki "/" */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Trasa logowania */}
        <Route path="/login" element={<Login />} />

        {/* Trasa dla dashboardu, dostępna tylko dla zalogowanych użytkowników */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Trasa dla profilu użytkownika */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;



