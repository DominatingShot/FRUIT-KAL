import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to Flask backend
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });

      // If login is successful, set authentication status and navigate to the dashboard
      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
    } catch (err) {
      // Handle error (e.g., invalid credentials)
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800">WELCOME BACK</h2>
      <p className="text-gray-600">Welcome back! Please enter your details.</p>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-left font-semibold text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-left font-semibold text-gray-700">Password</label>
          <input
            type="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 text-gray-700">
              Remember me
            </label>
          </div>
          <a href="/" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
        <button type="submit" className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
          Sign in
        </button>
      </form>
      <p className="text-gray-600 text-center">
        Don’t have an account?{' '}
        <Link to="/signup" className="text-red-500 hover:underline">
          Sign up for free!
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
