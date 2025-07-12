import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SocialLogin = ({ isRegister = false }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState({ google: false, facebook: false });

  const handleGoogleLogin = async () => {
    setLoading({ ...loading, google: true });
    
    try {
      // Simulate Google OAuth flow
      setTimeout(() => {
        const mockGoogleUser = {
          id: Date.now(),
          name: 'John Doe',
          email: 'john.doe@gmail.com',
          role: 'user',
          provider: 'google',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
        };
        
        localStorage.setItem('user', JSON.stringify(mockGoogleUser));
        login(mockGoogleUser.email, 'google_auth');
        navigate('/');
        setLoading({ ...loading, google: false });
      }, 1500);
    } catch (error) {
      console.error('Google login error:', error);
      setLoading({ ...loading, google: false });
    }
  };

  const handleFacebookLogin = async () => {
    setLoading({ ...loading, facebook: true });
    
    try {
      // Simulate Facebook OAuth flow
      setTimeout(() => {
        const mockFacebookUser = {
          id: Date.now(),
          name: 'Jane Smith',
          email: 'jane.smith@facebook.com',
          role: 'user',
          provider: 'facebook',
          avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150'
        };
        
        localStorage.setItem('user', JSON.stringify(mockFacebookUser));
        login(mockFacebookUser.email, 'facebook_auth');
        navigate('/');
        setLoading({ ...loading, facebook: false });
      }, 1500);
    } catch (error) {
      console.error('Facebook login error:', error);
      setLoading({ ...loading, facebook: false });
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Or {isRegister ? 'sign up' : 'sign in'} with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={handleGoogleLogin}
          disabled={loading.google}
          className={`w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors ${
            loading.google ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading.google ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2" />
          ) : (
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          Continue with Google
        </button>

        <button
          onClick={handleFacebookLogin}
          disabled={loading.facebook}
          className={`w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors ${
            loading.facebook ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading.facebook ? (
            <div className="w-5 h-5 border-2 border-blue-200 border-t-white rounded-full animate-spin mr-2" />
          ) : (
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          )}
          Continue with Facebook
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;