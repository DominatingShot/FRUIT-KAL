import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = ({ setIsAuthenticated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Send signup request to Flask backend with name, email, and password
      const response = await axios.post('http://127.0.0.1:5000/register', { 
        name,
        email,
        password 
      });

      // If signup is successful, save the userId and navigate to the dashboard
      if (response.status === 201) {
        const { user_id } = response.data;

        // Save the userId in localStorage
        localStorage.setItem('userId', user_id);

        // Set authentication status
        setIsAuthenticated(true);

        // Navigate to the dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      // Handle error (e.g., user already exists)
      if (err.response) {
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800">CREATE ACCOUNT</h2>
      <p className="text-gray-600">Sign up to get started!</p>
      <form className="space-y-4" onSubmit={handleSignup}>
        <div>
          <label className="block text-left font-semibold text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
        <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
          Sign up
        </button>
      </form>
      <p className="text-gray-600 text-center">
        Already have an account?{' '}
        <Link to="/" className="text-red-500 hover:underline">
          Log in here!
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
