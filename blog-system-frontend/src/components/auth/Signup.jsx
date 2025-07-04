import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ navigate }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  const passwordValue = watch('password');

  const onSubmit = async (data) => {
    const { confirmPassword, ...userData } = data; 

    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const result = await res.json();
      if (res.ok) {
        setServerMessage('Registered successfully!');
        setMessageType('success');
        reset();
      } else {
        setServerMessage(result.message || 'Registration failed');
        setMessageType('error');
      }
    } catch (error) {
      setServerMessage(' Sorry something is happen.please Try Again ');
      setMessageType('error');
    }
  };

  const isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/.test(passwordValue || '');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gray-100 dark:bg-gray-900">
      <div className="relative flex flex-col lg:flex-row w-full max-w-5xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">

        {/* Left Panel */}
        <div className="relative lg:w-2/5 bg-gradient-to-br from-green-400 to-teal-500 text-white p-8 sm:p-12 flex flex-col justify-center items-center text-center lg:rounded-tr-none z-10">
          <div className="absolute top-6 left-8 flex items-center text-white text-xl font-bold">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
              <path d="M7 12L10 15L17 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            YegnaBlog
          </div>
          <h2 className="text-4xl font-bold mb-4 mt-16 lg:mt-0">Welcome Back!</h2>
          <p className="text-lg mb-8 opacity-90">To keep connected with us please login with your personal info</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-teal-600 font-semibold py-3 px-10 rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            <Link to="/login">Log In</Link>
          </button>
        </div>

        {/* Right Panel */}
        <div className="lg:w-3/5 p-8 sm:p-12 bg-white dark:bg-gray-800 rounded-r-3xl rounded-bl-3xl lg:rounded-bl-none">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-8">Register Now</h2>

          {serverMessage && (
            <div className={`text-sm text-center mb-6 py-2 px-4 rounded-md ${messageType === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'}`}>
              {serverMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="User Name"
                {...register('username', { required: 'User Name is required' })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
              {errors.username && <p className="text-sm text-red-500 mt-2 ml-2">{errors.username.message}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
              {errors.email && <p className="text-sm text-red-500 mt-2 ml-2">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'At least 8 characters' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
                    message: 'Must include uppercase, lowercase, number & special character',
                  },
                })}
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="text-sm text-red-500 mt-2 ml-2">{errors.password.message}</p>}
              {!errors.password && passwordValue && isStrongPassword && (
                <div className="flex items-center gap-2 mt-2 text-sm text-green-500 ml-2">
                  <FaCheckCircle className="text-base" />
                  Password is valid and strong
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === passwordValue || 'Passwords do not match',
                })}
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-2 ml-2">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
