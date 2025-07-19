import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfileManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Arjun Patel",
    email: "arjun.patel@email.com",
    phone: "+91 98765 43210",
    gender: "male",
    occupation: "Software Engineer",
    company: "Tech Solutions Pvt Ltd",
    emergencyContact: "+91 87654 32109",
    preferences: {
      foodType: "vegetarian",
      roomType: "single",
      budget: "10000-15000"
    }
  });

  const [verificationStatus, setVerificationStatus] = useState({
    email: true,
    phone: true,
    aadhar: false,
    pan: false
  });

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" }
  ];

  const foodTypeOptions = [
    { value: "vegetarian", label: "Vegetarian" },
    { value: "non-vegetarian", label: "Non-Vegetarian" },
    { value: "both", label: "Both" }
  ];

  const roomTypeOptions = [
    { value: "single", label: "Single Room" },
    { value: "shared", label: "Shared Room" },
    { value: "triple", label: "Triple Sharing" }
  ];

  const budgetOptions = [
    { value: "5000-10000", label: "₹5,000 - ₹10,000" },
    { value: "10000-15000", label: "₹10,000 - ₹15,000" },
    { value: "15000-20000", label: "₹15,000 - ₹20,000" },
    { value: "20000+", label: "₹20,000+" }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    // Mock save functionality
    setIsEditing(false);
    // Show success message
  };

  const getVerificationIcon = (isVerified) => {
    return isVerified ? (
      <Icon name="CheckCircle" size={16} className="text-success" />
    ) : (
      <Icon name="AlertCircle" size={16} className="text-warning" />
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border elevation-1 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
          <Icon name="User" size={20} className="text-primary" />
          Profile Management
        </h2>
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          iconName={isEditing ? "Save" : "Edit"}
          iconPosition="left"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <div className="lg:col-span-1">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="User" size={32} color="white" />
            </div>
            <h3 className="font-semibold text-text-primary">{profileData.name}</h3>
            <p className="text-sm text-text-secondary">{profileData.occupation}</p>
            {isEditing && (
              <Button variant="ghost" size="sm" className="mt-2" iconName="Camera" iconPosition="left">
                Change Photo
              </Button>
            )}
          </div>

          {/* Verification Status */}
          <div className="space-y-3">
            <h4 className="font-medium text-text-primary">Verification Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Email</span>
                <div className="flex items-center gap-1">
                  {getVerificationIcon(verificationStatus.email)}
                  <span className="text-xs text-success">Verified</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Phone</span>
                <div className="flex items-center gap-1">
                  {getVerificationIcon(verificationStatus.phone)}
                  <span className="text-xs text-success">Verified</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Aadhar Card</span>
                <div className="flex items-center gap-1">
                  {getVerificationIcon(verificationStatus.aadhar)}
                  <Button variant="ghost" size="xs" className="text-xs text-warning">
                    Upload
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">PAN Card</span>
                <div className="flex items-center gap-1">
                  {getVerificationIcon(verificationStatus.pan)}
                  <Button variant="ghost" size="xs" className="text-xs text-warning">
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h4 className="font-medium text-text-primary mb-4">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Email Address"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Phone Number"
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
              />
              <Select
                label="Gender"
                options={genderOptions}
                value={profileData.gender}
                onChange={(value) => handleInputChange('gender', value)}
                disabled={!isEditing}
              />
              <Input
                label="Occupation"
                type="text"
                value={profileData.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Company"
                type="text"
                value={profileData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Emergency Contact"
                type="tel"
                value={profileData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                disabled={!isEditing}
                className="md:col-span-2"
              />
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h4 className="font-medium text-text-primary mb-4">Accommodation Preferences</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Food Preference"
                options={foodTypeOptions}
                value={profileData.preferences.foodType}
                onChange={(value) => handleInputChange('preferences.foodType', value)}
                disabled={!isEditing}
              />
              <Select
                label="Room Type Preference"
                options={roomTypeOptions}
                value={profileData.preferences.roomType}
                onChange={(value) => handleInputChange('preferences.roomType', value)}
                disabled={!isEditing}
              />
              <Select
                label="Budget Range"
                options={budgetOptions}
                value={profileData.preferences.budget}
                onChange={(value) => handleInputChange('preferences.budget', value)}
                disabled={!isEditing}
                className="md:col-span-2"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4">
              <Button
                variant="default"
                onClick={handleSave}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;