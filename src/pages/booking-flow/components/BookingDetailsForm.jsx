import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingDetailsForm = ({ onNext, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const occupationOptions = [
    { value: 'student', label: 'Student' },
    { value: 'working_professional', label: 'Working Professional' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'business', label: 'Business Owner' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid Indian mobile number';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    if (!formData.occupation) {
      newErrors.occupation = 'Please select your occupation';
    }

    if (!formData.checkInDate) {
      newErrors.checkInDate = 'Check-in date is required';
    }

    if (!formData.checkOutDate) {
      newErrors.checkOutDate = 'Check-out date is required';
    }

    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkIn < today) {
        newErrors.checkInDate = 'Check-in date cannot be in the past';
      }

      if (checkOut <= checkIn) {
        newErrors.checkOutDate = 'Check-out date must be after check-in date';
      }
    }

    if (!formData.emergencyContact?.trim()) {
      newErrors.emergencyContact = 'Emergency contact is required';
    }

    if (!formData.emergencyPhone?.trim()) {
      newErrors.emergencyPhone = 'Emergency contact number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.emergencyPhone.replace(/\D/g, ''))) {
      newErrors.emergencyPhone = 'Please enter a valid Indian mobile number';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Please accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,5})(\d{0,5})$/);
    if (match) {
      return !match[2] ? match[1] : `${match[1]} ${match[2]}`;
    }
    return value;
  };

  const handlePhoneChange = (field, value) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange(field, formatted);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="FileText" size={20} className="text-primary" />
        <h2 className="text-xl font-semibold text-text-primary">Booking Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName || ''}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              error={errors.fullName}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="98765 43210"
              value={formData.phone || ''}
              onChange={(e) => handlePhoneChange('phone', e.target.value)}
              error={errors.phone}
              maxLength={11}
              required
            />

            <Select
              label="Gender"
              options={genderOptions}
              value={formData.gender || ''}
              onChange={(value) => handleInputChange('gender', value)}
              error={errors.gender}
              placeholder="Select gender"
              required
            />

            <Select
              label="Occupation"
              options={occupationOptions}
              value={formData.occupation || ''}
              onChange={(value) => handleInputChange('occupation', value)}
              error={errors.occupation}
              placeholder="Select occupation"
              required
              className="md:col-span-2"
            />
          </div>
        </div>

        {/* Stay Details */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Stay Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Check-in Date"
              type="date"
              value={formData.checkInDate || ''}
              onChange={(e) => handleInputChange('checkInDate', e.target.value)}
              error={errors.checkInDate}
              min={getTomorrowDate()}
              required
            />

            <Input
              label="Check-out Date"
              type="date"
              value={formData.checkOutDate || ''}
              onChange={(e) => handleInputChange('checkOutDate', e.target.value)}
              error={errors.checkOutDate}
              min={formData.checkInDate || getTomorrowDate()}
              required
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Emergency Contact Name"
              type="text"
              placeholder="Parent/Guardian name"
              value={formData.emergencyContact || ''}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              error={errors.emergencyContact}
              required
            />

            <Input
              label="Emergency Contact Number"
              type="tel"
              placeholder="98765 43210"
              value={formData.emergencyPhone || ''}
              onChange={(e) => handlePhoneChange('emergencyPhone', e.target.value)}
              error={errors.emergencyPhone}
              maxLength={11}
              required
            />
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Special Requests (Optional)</h3>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={3}
            placeholder="Any special requirements or requests..."
            value={formData.specialRequests || ''}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
          />
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <Checkbox
            label="I accept the terms and conditions"
            checked={formData.termsAccepted || false}
            onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
            error={errors.termsAccepted}
            required
          />

          <Checkbox
            label="I agree to the cancellation policy"
            checked={formData.cancellationAccepted || false}
            onChange={(e) => handleInputChange('cancellationAccepted', e.target.checked)}
          />

          <Checkbox
            label="Send me updates about my booking via SMS and email"
            checked={formData.marketingConsent || false}
            onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
          />
        </div>

        {/* Important Information */}
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-text-secondary">
              <p className="font-medium text-text-primary mb-1">Important Information:</p>
              <ul className="space-y-1">
                <li>• Security deposit is refundable after checkout</li>
                <li>• Check-in time: 12:00 PM onwards</li>
                <li>• Check-out time: 11:00 AM</li>
                <li>• Valid ID proof required during check-in</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Continue to Payment</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingDetailsForm;