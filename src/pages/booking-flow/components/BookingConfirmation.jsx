import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingConfirmation = ({ bookingData, formData }) => {
  const bookingReference = "GHP" + Date.now().toString().slice(-8);
  
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
      month: 'long',
      year: 'numeric'
    });
  };

  const pgOwnerContact = {
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya.sharma@sunrisepg.com"
  };

  const nextSteps = [
    {
      icon: "Phone",
      title: "Contact PG Owner",
      description: "Call or message the PG owner to confirm your arrival time",
      action: "Call Now"
    },
    {
      icon: "FileText",
      title: "Prepare Documents",
      description: "Keep your ID proof, passport size photos, and this booking confirmation ready",
      action: "View Checklist"
    },
    {
      icon: "MapPin",
      title: "Get Directions",
      description: "Save the PG location and plan your route for check-in day",
      action: "Open Maps"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Booking Confirmed!</h2>
        <p className="text-text-secondary">
          Your PG accommodation has been successfully booked
        </p>
      </div>

      {/* Booking Reference */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Booking Reference</p>
            <p className="text-xl font-bold text-primary font-mono">{bookingReference}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Copy"
            onClick={() => navigator.clipboard.writeText(bookingReference)}
          >
            Copy
          </Button>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Booking Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-text-secondary">Guest Name</p>
              <p className="font-medium text-text-primary">{formData.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Check-in Date</p>
              <p className="font-medium text-text-primary">{formatDate(formData.checkInDate)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Check-out Date</p>
              <p className="font-medium text-text-primary">{formatDate(formData.checkOutDate)}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-text-secondary">PG Name</p>
              <p className="font-medium text-text-primary">{bookingData.pgName}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Room Type</p>
              <p className="font-medium text-text-primary">{bookingData.roomType}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Amount Paid</p>
              <p className="font-medium text-primary">{formatCurrency(bookingData.total)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PG Owner Contact */}
      <div className="bg-muted p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="User" size={16} className="mr-2" />
          PG Owner Contact
        </h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="User" size={14} className="text-text-secondary" />
            <span className="text-sm text-text-primary">{pgOwnerContact.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={14} className="text-text-secondary" />
            <a href={`tel:${pgOwnerContact.phone}`} className="text-sm text-primary hover:underline">
              {pgOwnerContact.phone}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={14} className="text-text-secondary" />
            <a href={`mailto:${pgOwnerContact.email}`} className="text-sm text-primary hover:underline">
              {pgOwnerContact.email}
            </a>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mb-6">
        <h4 className="font-semibold text-text-primary mb-4">What's Next?</h4>
        <div className="space-y-3">
          {nextSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-background rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={step.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-text-primary">{step.title}</h5>
                <p className="text-sm text-text-secondary mt-1">{step.description}</p>
              </div>
              <Button variant="outline" size="sm">
                {step.action}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-warning mb-1">Important Reminders</p>
            <ul className="text-text-secondary space-y-1">
              <li>• Carry original ID proof for verification</li>
              <li>• Check-in time: 12:00 PM onwards</li>
              <li>• Security deposit receipt will be provided</li>
              <li>• Contact PG owner 1 day before arrival</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          className="sm:flex-1"
        >
          Download Receipt
        </Button>
        
        <Link to="/user-dashboard" className="sm:flex-1">
          <Button
            variant="default"
            iconName="LayoutDashboard"
            iconPosition="left"
            fullWidth
          >
            Go to Dashboard
          </Button>
        </Link>
      </div>

      {/* Support */}
      <div className="mt-6 pt-4 border-t border-border text-center">
        <p className="text-sm text-text-secondary mb-2">Need help with your booking?</p>
        <div className="flex justify-center space-x-4">
          <a href="tel:+911800123456" className="text-primary hover:underline text-sm">
            Call Support
          </a>
          <span className="text-text-secondary">•</span>
          <a href="mailto:support@gharpayy.com" className="text-primary hover:underline text-sm">
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;