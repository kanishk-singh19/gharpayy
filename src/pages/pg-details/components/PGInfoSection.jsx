import React from 'react';
import Icon from '../../../components/AppIcon';

const PGInfoSection = ({ pgData }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          {pgData.name}
        </h1>
        <div className="flex items-center space-x-4 text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={16} />
            <span className="text-sm">{pgData.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="text-yellow-500" />
            <span className="text-sm font-medium">{pgData.rating}</span>
            <span className="text-sm">({pgData.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-3">Pricing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Single Occupancy</span>
            <span className="text-lg font-bold text-primary">
              {formatPrice(pgData.pricing.single)}/month
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Double Occupancy</span>
            <span className="text-lg font-bold text-primary">
              {formatPrice(pgData.pricing.double)}/month
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Security Deposit</span>
            <span className="text-text-primary font-medium">
              {formatPrice(pgData.pricing.deposit)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Maintenance</span>
            <span className="text-text-primary font-medium">
              {formatPrice(pgData.pricing.maintenance)}/month
            </span>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-3">Amenities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {pgData.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name={amenity.icon} size={16} className="text-primary" />
              <span className="text-sm text-text-primary">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* House Rules */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-3">House Rules</h3>
        <div className="space-y-2">
          {pgData.houseRules.map((rule, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5" />
              <span className="text-sm text-text-primary">{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PGInfoSection;