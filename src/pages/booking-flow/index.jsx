import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import BookingProgressIndicator from './components/BookingProgressIndicator';
import BookingSummaryCard from './components/BookingSummaryCard';
import BookingDetailsForm from './components/BookingDetailsForm';
import PaymentForm from './components/PaymentForm';
import BookingConfirmation from './components/BookingConfirmation';

const BookingFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [paymentData, setPaymentData] = useState({});

  // Mock booking data (would come from previous page/state)
  const [bookingData] = useState({
    pgName: "Sunrise PG for Women",
    pgImage: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    location: "Koramangala, Bangalore",
    roomType: "Single Occupancy",
    checkIn: "2025-01-20",
    checkOut: "2025-07-20",
    duration: "6 months",
    baseRent: 72000, // 12000 * 6 months
    securityDeposit: 24000,
    maintenanceCharges: 1500,
    gst: 2430,
    total: 99930
  });

  // Custom breadcrumbs for booking flow
  const breadcrumbs = [
    { label: 'Home', path: '/home-page' },
    { label: 'Search PGs', path: '/pg-listings' },
    { label: 'PG Details', path: '/pg-details' },
    { label: 'Book Now', path: '/booking-flow' }
  ];

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/authentication', { 
        state: { 
          redirectTo: '/booking-flow',
          message: 'Please login to continue with your booking'
        }
      });
    }
  }, [navigate]);

  // Handle step navigation
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEditBooking = () => {
    navigate('/pg-details', { state: { editMode: true } });
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BookingDetailsForm
            onNext={handleNextStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <PaymentForm
            onNext={handleNextStep}
            onBack={handlePreviousStep}
            paymentData={paymentData}
            setPaymentData={setPaymentData}
            totalAmount={bookingData.total}
          />
        );
      case 3:
        return (
          <BookingConfirmation
            bookingData={bookingData}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="content-offset">
        <BookingProgressIndicator currentStep={currentStep} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {renderStepContent()}
            </div>
            
            {/* Sidebar - Booking Summary */}
            <div className="lg:col-span-4">
              <BookingSummaryCard
                bookingData={bookingData}
                onEdit={handleEditBooking}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation for Steps */}
      {currentStep < 3 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-text-secondary">
              Step {currentStep} of 3
            </div>
            <div className="text-lg font-bold text-primary">
              ₹{bookingData.total.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingFlow;