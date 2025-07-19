import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { useNavigate } from 'react-router-dom';

const BookingSection = ({ pgData }) => {
  const navigate = useNavigate();
  const [selectedOccupancy, setSelectedOccupancy] = useState('single');
  const [checkInDate, setCheckInDate] = useState('');
  const [duration, setDuration] = useState('1');

  const occupancyOptions = [
    { value: 'single', label: 'Single Occupancy' },
    { value: 'double', label: 'Double Occupancy' }
  ];

  const durationOptions = [
    { value: '1', label: '1 Month' },
    { value: '3', label: '3 Months' },
    { value: '6', label: '6 Months' },
    { value: '12', label: '12 Months' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCurrentPrice = () => {
    return selectedOccupancy === 'single' ? pgData.pricing.single : pgData.pricing.double;
  };

  const getTotalAmount = () => {
    const monthlyRent = getCurrentPrice();
    const months = parseInt(duration);
    const totalRent = monthlyRent * months;
    const deposit = pgData.pricing.deposit;
    const maintenance = pgData.pricing.maintenance * months;
    
    return {
      rent: totalRent,
      deposit,
      maintenance,
      total: totalRent + deposit + maintenance
    };
  };

  const handleBookNow = () => {
    const bookingData = {
      pgId: pgData.id,
      pgName: pgData.name,
      occupancy: selectedOccupancy,
      checkInDate,
      duration: parseInt(duration),
      pricing: getTotalAmount()
    };
    
    // Store booking data in localStorage for the booking flow
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    navigate('/booking-flow');
  };

  const totals = getTotalAmount();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-card border border-border rounded-lg p-4 sticky top-20">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Book Your Stay</h3>
      
      {/* Occupancy Selection */}
      <div className="mb-4">
        <Select
          label="Occupancy Type"
          options={occupancyOptions}
          value={selectedOccupancy}
          onChange={setSelectedOccupancy}
        />
      </div>

      {/* Check-in Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Check-in Date
        </label>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          min={today}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Duration */}
      <div className="mb-4">
        <Select
          label="Duration"
          options={durationOptions}
          value={duration}
          onChange={setDuration}
        />
      </div>

      {/* Price Breakdown */}
      <div className="mb-4 p-3 bg-muted rounded-md">
        <h4 className="font-medium text-text-primary mb-2">Price Breakdown</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">
              Monthly Rent × {duration} month{duration !== '1' ? 's' : ''}
            </span>
            <span className="text-text-primary">{formatPrice(totals.rent)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Security Deposit</span>
            <span className="text-text-primary">{formatPrice(totals.deposit)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">
              Maintenance × {duration} month{duration !== '1' ? 's' : ''}
            </span>
            <span className="text-text-primary">{formatPrice(totals.maintenance)}</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between font-medium">
            <span className="text-text-primary">Total Amount</span>
            <span className="text-primary text-lg">{formatPrice(totals.total)}</span>
          </div>
        </div>
      </div>

      {/* Availability Status */}
      <div className="mb-4 flex items-center space-x-2">
        <Icon name="CheckCircle" size={16} className="text-success" />
        <span className="text-sm text-success font-medium">Available for immediate booking</span>
      </div>

      {/* Book Now Button */}
      <Button
        variant="default"
        fullWidth
        onClick={handleBookNow}
        disabled={!checkInDate}
        iconName="Calendar"
        iconPosition="left"
        className="mb-3"
      >
        Book Now
      </Button>

      {/* Contact Options */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = `tel:${pgData.owner.phone}`}
          iconName="Phone"
          iconPosition="left"
        >
          Call
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(`https://wa.me/91${pgData.owner.phone.replace(/\D/g, '')}`, '_blank')}
          iconName="MessageCircle"
          iconPosition="left"
        >
          WhatsApp
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="RefreshCw" size={12} />
            <span>Free Cancellation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;