import React from 'react';
import Icon from '../../../components/AppIcon';

const SafetySection = ({ safetyFeatures, certifications }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Safety & Security</h3>
      
      {/* Safety Features */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">Safety Features</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {safetyFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name={feature.icon} size={16} className="text-success" />
              <span className="text-sm text-text-primary">{feature.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Certifications</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-success/5 rounded-md">
              <Icon name="Award" size={16} className="text-success" />
              <div>
                <span className="text-sm font-medium text-text-primary">{cert.name}</span>
                <p className="text-xs text-text-secondary">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="font-medium text-text-primary mb-3">Emergency Contacts</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={14} className="text-error" />
            <div>
              <span className="text-sm font-medium text-text-primary">Police</span>
              <p className="text-xs text-text-secondary">100</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={14} className="text-error" />
            <div>
              <span className="text-sm font-medium text-text-primary">Fire Department</span>
              <p className="text-xs text-text-secondary">101</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={14} className="text-error" />
            <div>
              <span className="text-sm font-medium text-text-primary">Ambulance</span>
              <p className="text-xs text-text-secondary">108</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={14} className="text-primary" />
            <div>
              <span className="text-sm font-medium text-text-primary">PG Manager</span>
              <p className="text-xs text-text-secondary">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetySection;