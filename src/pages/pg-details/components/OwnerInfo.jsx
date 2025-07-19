import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OwnerInfo = ({ ownerData }) => {
  const handleCall = () => {
    window.location.href = `tel:${ownerData.phone}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/91${ownerData.phone.replace(/\D/g, '')}`, '_blank');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Owner Information</h3>
      
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Image
            src={ownerData.avatar}
            alt={ownerData.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {ownerData.isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-1">
              <Icon name="Check" size={12} color="white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-medium text-text-primary">{ownerData.name}</h4>
            {ownerData.isVerified && (
              <div className="verification-indicator">
                <Icon name="ShieldCheck" size={14} />
                <span>Verified</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-text-secondary mb-2">{ownerData.title}</p>
          
          <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{ownerData.experience} years experience</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-yellow-500" />
              <span>{ownerData.rating}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCall}
              iconName="Phone"
              iconPosition="left"
              className="flex-1"
            >
              Call
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleWhatsApp}
              iconName="MessageCircle"
              iconPosition="left"
              className="flex-1"
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
      
      {/* Certifications */}
      {ownerData.certifications && ownerData.certifications.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h5 className="font-medium text-text-primary mb-2">Certifications</h5>
          <div className="flex flex-wrap gap-2">
            {ownerData.certifications.map((cert, index) => (
              <div key={index} className="trust-badge">
                <Icon name="Award" size={12} />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerInfo;