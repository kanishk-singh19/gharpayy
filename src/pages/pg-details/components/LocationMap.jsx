import React from 'react';
import Icon from '../../../components/AppIcon';

const LocationMap = ({ pgData }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-text-primary mb-3">Location & Nearby</h3>
      
      {/* Map */}
      <div className="w-full h-64 mb-4 rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={pgData.name}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${pgData.coordinates.lat},${pgData.coordinates.lng}&z=14&output=embed`}
          className="border-0"
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <div className="flex items-start space-x-2">
          <Icon name="MapPin" size={16} className="text-primary mt-1" />
          <div>
            <p className="text-text-primary font-medium">{pgData.fullAddress}</p>
            <p className="text-text-secondary text-sm">{pgData.location}</p>
          </div>
        </div>
      </div>

      {/* Nearby Places */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Nearby Landmarks</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pgData.nearbyPlaces.map((place, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name={place.icon} size={14} className="text-text-secondary" />
                <span className="text-sm text-text-primary">{place.name}</span>
              </div>
              <span className="text-xs text-text-secondary">{place.distance}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transportation */}
      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="font-medium text-text-primary mb-3">Transportation</h4>
        <div className="space-y-2">
          {pgData.transportation.map((transport, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name={transport.icon} size={14} className="text-text-secondary" />
                <span className="text-sm text-text-primary">{transport.name}</span>
              </div>
              <span className="text-xs text-text-secondary">{transport.distance}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;