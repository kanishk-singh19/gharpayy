import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import AuthToggle from './components/AuthToggle';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TrustSignals from './components/TrustSignals';

const Authentication = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/user-dashboard');
    }
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Helmet>
        <title>{activeTab === 'login' ? 'Login' : 'Register'} - GharPayy | Your Home Away From Home</title>
        <meta name="description" content="Secure login and registration for GharPayy. Find and book verified PG accommodations across major Indian cities." />
        <meta name="keywords" content="login, register, PG booking, student accommodation, paying guest, India" />
      </Helmet>

      <NavigationHeader />
      
      <div className="min-h-screen bg-background content-offset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNavigation />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-200px)]">
            {/* Left Side - Hero Image & Trust Signals */}
            <div className="lg:col-span-7 hidden lg:block">
              <div className="h-full bg-card rounded-2xl overflow-hidden elevation-2">
                <div className="relative h-2/3">
                  <Image
                    src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Modern PG accommodation with comfortable living spaces"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">Feel at Home, Anywhere</h2>
                    <p className="text-lg opacity-90">
                      Join thousands of students and professionals who found their perfect PG through GharPayy
                    </p>
                  </div>
                </div>
                <div className="p-6 h-1/3 overflow-y-auto">
                  <TrustSignals />
                </div>
              </div>
            </div>

            {/* Right Side - Authentication Forms */}
            <div className="lg:col-span-5">
              <div className="bg-card rounded-2xl p-6 lg:p-8 elevation-2 h-full">
                {/* Header */}
                <div className="text-center mb-8">
                  <Link to="/home-page" className="inline-flex items-center space-x-2 mb-6">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Icon name="Home" size={24} color="white" />
                    </div>
                    <span className="text-2xl font-bold text-primary">GharPayy</span>
                  </Link>
                  
                  <h1 className="text-2xl font-bold text-text-primary mb-2">
                    {activeTab === 'login' ? 'Welcome Back!' : 'Create Account'}
                  </h1>
                  <p className="text-text-secondary">
                    {activeTab === 'login' ?'Sign in to access your dashboard and bookings' :'Join GharPayy to find your perfect PG accommodation'
                    }
                  </p>
                </div>

                {/* Auth Toggle */}
                <AuthToggle activeTab={activeTab} onTabChange={handleTabChange} />

                {/* Forms */}
                <div className="space-y-6">
                  {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
                </div>

                {/* Mobile Trust Signals */}
                <div className="lg:hidden mt-8 pt-6 border-t border-border">
                  <TrustSignals />
                </div>

                {/* Footer Links */}
                <div className="mt-8 pt-6 border-t border-border text-center">
                  <p className="text-xs text-text-secondary">
                    By continuing, you agree to our{' '}
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Booking Option */}
          <div className="mt-8 text-center">
            <div className="bg-card rounded-lg p-6 elevation-1">
              <h3 className="font-semibold text-text-primary mb-2">Want to book without an account?</h3>
              <p className="text-text-secondary text-sm mb-4">
                You can browse and book PGs as a guest, but creating an account gives you access to booking history and exclusive offers.
              </p>
              <Link
                to="/pg-listings"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium"
              >
                <Icon name="Search" size={16} />
                <span>Continue as Guest</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;