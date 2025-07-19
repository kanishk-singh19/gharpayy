import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure & Safe',
      description: 'Your data is protected with bank-level security'
    },
    {
      icon: 'Users',
      title: '50,000+ Users',
      description: 'Trusted by thousands of students and professionals'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified PGs',
      description: 'All properties are verified for safety and hygiene'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      text: 'Found my perfect PG in just 2 days! The booking process was so smooth.',
      rating: 5
    },
    {
      name: 'Rahul Kumar',
      location: 'Bangalore',
      text: 'Great platform with genuine listings. Highly recommended for working professionals.',
      rating: 5
    }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Features */}
      <div className="grid grid-cols-1 gap-4">
        {trustFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature.icon} size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-sm text-text-primary">{feature.title}</h4>
              <p className="text-xs text-text-secondary mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-4 py-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span className="text-xs text-text-secondary">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-text-secondary">Data Protected</span>
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-text-primary">What our users say</h4>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
              ))}
            </div>
            <p className="text-xs text-text-secondary mb-2">"{testimonial.text}"</p>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-text-primary">{testimonial.name}</p>
                <p className="text-xs text-text-secondary">{testimonial.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-xs text-text-secondary mb-2">Need help?</p>
        <div className="flex items-center justify-center space-x-4">
          <a href="tel:+918888888888" className="flex items-center space-x-1 text-primary hover:text-primary/80">
            <Icon name="Phone" size={12} />
            <span className="text-xs">Call Support</span>
          </a>
          <a href="mailto:help@gharpayy.com" className="flex items-center space-x-1 text-primary hover:text-primary/80">
            <Icon name="Mail" size={12} />
            <span className="text-xs">Email Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;