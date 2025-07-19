import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignalsSection = () => {
  const trustFeatures = [
    {
      id: 1,
      icon: "Shield",
      title: "Verified Properties",
      description: "Every PG is physically verified by our team for safety and hygiene standards",
      stats: "500+ Verified PGs"
    },
    {
      id: 2,
      icon: "Users",
      title: "Trusted Community",
      description: "Join thousands of satisfied residents who found their perfect home",
      stats: "10,000+ Happy Residents"
    },
    {
      id: 3,
      icon: "Clock",
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you with any queries",
      stats: "Available Always"
    },
    {
      id: 4,
      icon: "CreditCard",
      title: "Secure Payments",
      description: "Safe and secure payment processing with multiple payment options",
      stats: "100% Secure"
    },
    {
      id: 5,
      icon: "Star",
      title: "Quality Assurance",
      description: "Regular quality checks and resident feedback ensure maintained standards",
      stats: "4.8/5 Average Rating"
    },
    {
      id: 6,
      icon: "MapPin",
      title: "Prime Locations",
      description: "PGs located in safe neighborhoods with easy access to offices and colleges",
      stats: "8 Major Cities"
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "ISO 27001",
      description: "Information Security Management",
      icon: "Award"
    },
    {
      id: 2,
      name: "SSL Secured",
      description: "256-bit Encryption",
      icon: "Lock"
    },
    {
      id: 3,
      name: "PCI DSS",
      description: "Payment Card Industry Compliant",
      icon: "CreditCard"
    },
    {
      id: 4,
      name: "GDPR",
      description: "Data Protection Compliant",
      icon: "Shield"
    }
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Why Choose GharPayy?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Your safety and satisfaction are our top priorities. Here's what makes us India's most trusted PG booking platform.
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {trustFeatures.map((feature) => (
            <div key={feature.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={feature.icon} size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-3 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="text-primary font-medium text-sm">
                    {feature.stats}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Certified & Compliant
            </h3>
            <p className="text-text-secondary">
              We maintain the highest standards of security and compliance
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name={cert.icon} size={24} className="text-success" />
                </div>
                <h4 className="font-semibold text-text-primary mb-1">{cert.name}</h4>
                <p className="text-xs text-text-secondary">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6">
          <div className="trust-badge">
            <Icon name="Shield" size={16} />
            Verified Safe
          </div>
          <div className="trust-badge">
            <Icon name="Users" size={16} />
            10K+ Users
          </div>
          <div className="trust-badge">
            <Icon name="Star" size={16} />
            4.8 Rating
          </div>
          <div className="trust-badge">
            <Icon name="Clock" size={16} />
            24/7 Support
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;