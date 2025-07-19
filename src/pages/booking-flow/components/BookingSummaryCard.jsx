import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BookingSummaryCard = ({ bookingData, onEdit }) => {
  const {
    pgName = "Sunrise PG for Women",
    pgImage = "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    location = "Koramangala, Bangalore",
    roomType = "Single Occupancy",
    checkIn = "2025-01-20",
    checkOut = "2025-07-20",
    duration = "6 months",
    baseRent = 12000,
    securityDeposit = 24000,
    maintenanceCharges = 1500,
    gst = 2430,
    total = 39930
  } = bookingData || {};

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Booking Summary</h3>
        <button
          onClick={onEdit}
          className="text-primary hover:text-primary/80 transition-colors duration-200"
        >
          <Icon name="Edit2" size={16} />
        </button>
      </div>

      {/* PG Details */}
      <div className="flex space-x-3 mb-6">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={pgImage}
            alt={pgName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-text-primary truncate">{pgName}</h4>
          <p className="text-sm text-text-secondary flex items-center mt-1">
            <Icon name="MapPin" size={12} className="mr-1" />
            {location}
          </p>
          <p className="text-sm text-text-secondary mt-1">{roomType}</p>
        </div>
      </div>

      {/* Stay Details */}
      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Check-in</span>
          <span className="text-sm font-medium text-text-primary">{formatDate(checkIn)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Check-out</span>
          <span className="text-sm font-medium text-text-primary">{formatDate(checkOut)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Duration</span>
          <span className="text-sm font-medium text-text-primary">{duration}</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Monthly Rent × 6</span>
          <span className="text-sm text-text-primary">{formatCurrency(baseRent)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Security Deposit</span>
          <span className="text-sm text-text-primary">{formatCurrency(securityDeposit)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Maintenance Charges</span>
          <span className="text-sm text-text-primary">{formatCurrency(maintenanceCharges)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">GST (18%)</span>
          <span className="text-sm text-text-primary">{formatCurrency(gst)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-text-primary">Total Amount</span>
          <span className="text-lg font-bold text-primary">{formatCurrency(total)}</span>
        </div>
        <p className="text-xs text-text-secondary mt-1">
          *Security deposit will be refunded after checkout
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-success text-xs">
          <Icon name="Shield" size={14} />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center space-x-2 text-success text-xs mt-2">
          <Icon name="Clock" size={14} />
          <span>Instant Confirmation</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryCard;