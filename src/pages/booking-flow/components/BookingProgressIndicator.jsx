import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingProgressIndicator = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: 'Details', icon: 'FileText' },
    { id: 2, label: 'Payment', icon: 'CreditCard' },
    { id: 3, label: 'Confirmation', icon: 'CheckCircle' }
  ];

  return (
    <div className="w-full bg-card border-b border-border py-4 mb-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                  currentStep >= step.id 
                    ? 'bg-primary border-primary text-white' :'bg-background border-border text-text-secondary'
                }`}>
                  <Icon 
                    name={currentStep > step.id ? 'Check' : step.icon} 
                    size={16} 
                  />
                </div>
                <div className="hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-primary' : 'text-text-secondary'
                  }`}>
                    {step.label}
                  </p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Mobile step labels */}
        <div className="sm:hidden mt-3 text-center">
          <p className="text-sm font-medium text-primary">
            Step {currentStep}: {steps[currentStep - 1]?.label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingProgressIndicator;