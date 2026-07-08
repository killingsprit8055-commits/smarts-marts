import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/api';

const Login = () => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.sendOTP(phoneNumber);
      setStep('otp');
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.verifyOTP(phoneNumber, otp);
      const { token, user } = response.data;
      login(token, user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">A2Z Mart</h1>

        {step === 'phone' ? (
          <form onSubmit={handleSendOTP}>
            <h2 className="text-xl font-semibold mb-6">Enter Phone Number</h2>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
              required
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <h2 className="text-xl font-semibold mb-6">Enter OTP</h2>
            <p className="text-gray-600 mb-4">OTP sent to {phoneNumber}</p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
              required
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full mt-2 text-blue-600 hover:text-blue-700 text-sm"
            >
              Use different number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
