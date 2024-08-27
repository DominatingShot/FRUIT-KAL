import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import SignUpPage from './pages/SignUpPage'; // Updated the import

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Redirect to dashboard if authenticated */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        {/* Dashboard page, protected */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        {/* Signup page */}
        <Route
          path="/signup"
          element={<SignUpPage setIsAuthenticated={setIsAuthenticated} />} // Updated to match the correct component name
        />
      </Routes>
    </Router>
  );
}

export default App;
