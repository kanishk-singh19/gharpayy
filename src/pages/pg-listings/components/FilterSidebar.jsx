import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  onClearFilters,
  isMobile = false 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const priceRanges = [
    { value: '0-5000', label: '₹0 - ₹5,000' },
    { value: '5000-10000', label: '₹5,000 - ₹10,000' },
    { value: '10000-15000', label: '₹10,000 - ₹15,000' },
    { value: '15000-20000', label: '₹15,000 - ₹20,000' },
    { value: '20000+', label: '₹20,000+' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'unisex', label: 'Unisex' }
  ];

  const amenities = [
    { id: 'wifi', label: 'WiFi', icon: 'Wifi' },
    { id: 'ac', label: 'AC', icon: 'Snowflake' },
    { id: 'parking', label: 'Parking', icon: 'Car' },
    { id: 'laundry', label: 'Laundry', icon: 'Shirt' },
    { id: 'meals', label: 'Meals', icon: 'Utensils' },
    { id: 'gym', label: 'Gym', icon: 'Dumbbell' },
    { id: 'security', label: '24/7 Security', icon: 'Shield' },
    { id: 'housekeeping', label: 'Housekeeping', icon: 'Sparkles' }
  ];

  const handleLocalFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAmenityChange = (amenityId, checked) => {
    const updatedAmenities = checked 
      ? [...localFilters.amenities, amenityId]
      : localFilters.amenities.filter(id => id !== amenityId);
    
    handleLocalFilterChange('amenities', updatedAmenities);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    if (isMobile) {
      onClose();
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRange: '',
      gender: '',
      amenities: [],
      rating: '',
      distance: ''
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        {isMobile && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        )}
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Price Range</h3>
          <Select
            options={priceRanges}
            value={localFilters.priceRange}
            onChange={(value) => handleLocalFilterChange('priceRange', value)}
            placeholder="Select price range"
          />
        </div>

        {/* Gender Preference */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Gender Preference</h3>
          <Select
            options={genderOptions}
            value={localFilters.gender}
            onChange={(value) => handleLocalFilterChange('gender', value)}
            placeholder="Select gender preference"
          />
        </div>

        {/* Rating */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={localFilters.rating === rating.toString()}
                  onChange={(e) => handleLocalFilterChange('rating', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-text-primary">{rating}</span>
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm text-text-secondary">& above</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Distance */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Distance from City Center</h3>
          <div className="space-y-2">
            {['1km', '2km', '5km', '10km'].map((distance) => (
              <label key={distance} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="distance"
                  value={distance}
                  checked={localFilters.distance === distance}
                  onChange={(e) => handleLocalFilterChange('distance', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-text-primary">Within {distance}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Amenities</h3>
          <div className="space-y-3">
            {amenities.map((amenity) => (
              <Checkbox
                key={amenity.id}
                label={
                  <div className="flex items-center space-x-2">
                    <Icon name={amenity.icon} size={16} className="text-text-secondary" />
                    <span>{amenity.label}</span>
                  </div>
                }
                checked={localFilters.amenities.includes(amenity.id)}
                onChange={(e) => handleAmenityChange(amenity.id, e.target.checked)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-3">
        <Button 
          variant="outline" 
          fullWidth 
          onClick={clearAllFilters}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Clear All
        </Button>
        <Button 
          variant="default" 
          fullWidth 
          onClick={applyFilters}
          iconName="Filter"
          iconPosition="left"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
            <div className="fixed left-0 top-0 bottom-0 w-80 bg-card animate-slide-in">
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className={`hidden lg:block transition-all duration-300 ${isOpen ? 'w-80' : 'w-0 overflow-hidden'}`}>
      <div className="w-80 bg-card border-r border-border h-full">
        {sidebarContent}
      </div>
    </div>
  );
};

export default FilterSidebar;