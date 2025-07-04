import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        // Save tokenes and user data
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        setMessage('Login successful');
        setMessageType('success');

        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(result.message || 'Login failed');
        setMessageType('error');
      }
    } catch (err) {
      setMessage('Error Occured: ' + err.message);
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gray-100 dark:bg-gray-900">
      <div className="relative flex flex-col lg:flex-row-reverse w-full max-w-5xl bg-white dark:bg-gray-800  shadow-2xl overflow-hidden">
        
        <div className="relative lg:w-2/5 bg-gradient-to-br from-green-400 to-teal-500 text-white p-8 sm:p-12 flex flex-col justify-center items-center text-center  lg:rounded-bl-none z-10">
          <div className="absolute top-6 left-8 flex items-center text-white text-xl font-bold">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
              <path d="M7 12L10 15L17 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            YegnaBlog
          </div>

          <h2 className="text-4xl font-bold mb-4 mt-16 lg:mt-0">Hello, Friend!</h2>
          <p className="text-lg mb-8 opacity-90">Enter your personal details and start your journey with us</p>
          <Link
            to="/register"
            className="bg-white text-teal-600 font-semibold py-3 px-10 rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            Register
          </Link>

          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

       
        <div className="lg:w-3/5 p-8 sm:p-12 flex flex-col justify-center bg-white dark:bg-gray-800 rounded-l-3xl rounded-tr-3xl lg:rounded-tr-none">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-8">
            Sign in to YegnaBlog
          </h2>

         
          {/* display messages */}
          {message && (
            <div
              className={`text-sm text-center mb-6 py-2 px-4 rounded-md ${
                messageType === 'success'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
              }`}
            >
              {message}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-teal-400"
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-2 ml-2">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500 mt-2 ml-2">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <Link to="" className="text-gray-500 hover:underline dark:text-gray-400">
                Forgot your password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
