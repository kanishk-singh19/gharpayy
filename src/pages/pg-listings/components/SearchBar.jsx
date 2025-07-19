import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchBar = ({ onSearch, initialValues = {} }) => {
  const [searchData, setSearchData] = useState({
    city: initialValues.city || '',
    budget: initialValues.budget || '',
    gender: initialValues.gender || '',
    moveInDate: initialValues.moveInDate || ''
  });

  const cities = [
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'ahmedabad', label: 'Ahmedabad' }
  ];

  const budgetRanges = [
    { value: '0-5000', label: 'Under ₹5,000' },
    { value: '5000-10000', label: '₹5,000 - ₹10,000' },
    { value: '10000-15000', label: '₹10,000 - ₹15,000' },
    { value: '15000-20000', label: '₹15,000 - ₹20,000' },
    { value: '20000+', label: 'Above ₹20,000' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Boys' },
    { value: 'female', label: 'Girls' },
    { value: 'unisex', label: 'Unisex' }
  ];

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    onSearch(searchData);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* City Selection */}
        <div className="lg:col-span-1">
          <Select
            label="City"
            options={cities}
            value={searchData.city}
            onChange={(value) => handleInputChange('city', value)}
            placeholder="Select city"
            searchable
          />
        </div>

        {/* Budget Range */}
        <div className="lg:col-span-1">
          <Select
            label="Budget"
            options={budgetRanges}
            value={searchData.budget}
            onChange={(value) => handleInputChange('budget', value)}
            placeholder="Select budget"
          />
        </div>

        {/* Gender Preference */}
        <div className="lg:col-span-1">
          <Select
            label="Gender"
            options={genderOptions}
            value={searchData.gender}
            onChange={(value) => handleInputChange('gender', value)}
            placeholder="Select preference"
          />
        </div>

        {/* Move-in Date */}
        <div className="lg:col-span-1">
          <Input
            label="Move-in Date"
            type="date"
            value={searchData.moveInDate}
            onChange={(e) => handleInputChange('moveInDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Search Button */}
        <div className="lg:col-span-1 flex items-end">
          <Button
            variant="default"
            fullWidth
            onClick={handleSearch}
            iconName="Search"
            iconPosition="left"
            className="h-10"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
          <Icon name="Zap" size={14} />
          <span>Quick Filters:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Near Metro', value: 'metro' },
            { label: 'WiFi Included', value: 'wifi' },
            { label: 'Meals Included', value: 'meals' },
            { label: 'AC Rooms', value: 'ac' },
            { label: 'Parking Available', value: 'parking' }
          ].map((filter) => (
            <button
              key={filter.value}
              className="px-3 py-1 text-xs border border-border rounded-full hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
              onClick={() => {
                // Handle quick filter selection
                console.log('Quick filter selected:', filter.value);
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;