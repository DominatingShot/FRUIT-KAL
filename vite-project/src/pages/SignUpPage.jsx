import React from 'react';
import SignupForm from '../components/SignupForm';
import Illustration from '../components/Illustration';

const SignupPage = ({ setIsAuthenticated }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-4">
        <SignupForm setIsAuthenticated={setIsAuthenticated} />
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-100">
        <Illustration />
      </div>
    </div>
  );
};

export default SignupPage;
