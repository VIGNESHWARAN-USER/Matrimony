import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/forgot-password', { email });
      setMessage(response.data.message);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError(err.response.data.message || 'An error occurred');
      setMessage(''); // Clear any previous success messages
    }
  };

  return (
    <div className="relative h-screen bg-gradient-to-br from-amber-300 via-amber-100 to-amber-300 overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <div className="w-full lg:w-1/3 bg-white p-7 rounded-lg shadow-lg border border-purple-300">
          <div className="px-8 mb-4 text-center">
            <h3 className="pt-4 mb-7 text-3xl text-amber-500 font-bold">Forgot Your Password?</h3>
            <p className="mb-4 text-sm text-gray-700">
              We get it, stuff happens. Just enter your email address below and we'll send you a
              link to reset your password!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-2 bg-white rounded-lg">
            <div className="mb-4">
              <label className="block mb-4 text-sm font-bold text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 mb-4 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter Email Address..."
                required
              />
            </div>
            <div className="mb-6 text-center">
              <button
                className="w-full py-4 bg-amber-500 text-white hover:bg-white hover:text-black border border-transparent transition-transform transform font-bold rounded-lg"
                type="submit"
              >
                Reset Password
              </button>
            </div>
            {message && <p className="text-green-500 text-center">{message}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <Link
                to="/signup"
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              >
                Create an Account!
              </Link>
            </div>
            <div className="text-center mt-4">
              <Link
                to="/login"
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              >
                Already have an account? Login!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;