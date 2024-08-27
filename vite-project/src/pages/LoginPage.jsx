import React from 'react';
import LoginForm from '../components/LoginForm';
import Illustration from '../components/Illustration';

const LoginPage = ({ setIsAuthenticated }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-4">
        <LoginForm setIsAuthenticated={setIsAuthenticated} />
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-100">
        <Illustration />
      </div>
    </div>
  );
};

export default LoginPage;
