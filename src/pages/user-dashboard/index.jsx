import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import DashboardStats from './components/DashboardStats';
import CurrentBookings from './components/CurrentBookings';
import BookingHistory from './components/BookingHistory';
import ProfileManagement from './components/ProfileManagement';
import FavoritesSection from './components/FavoritesSection';
import PaymentHistory from './components/PaymentHistory';
import SupportTickets from './components/SupportTickets';

const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/authentication');
      return;
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="content-offset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNavigation />
          
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
                <p className="text-text-secondary mt-1">
                  Welcome back! Manage your bookings and profile here.
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-secondary">Last login</p>
                <p className="font-medium text-text-primary">
                  {new Date().toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Stats */}
          <DashboardStats />

          {/* Main Dashboard Content */}
          <div className="space-y-8">
            {/* Current Bookings */}
            <CurrentBookings />

            {/* Profile Management */}
            <ProfileManagement />

            {/* Favorites Section */}
            <FavoritesSection />

            {/* Booking History */}
            <BookingHistory />

            {/* Payment History */}
            <PaymentHistory />

            {/* Support Tickets */}
            <SupportTickets />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;