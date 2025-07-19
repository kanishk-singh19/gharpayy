import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {renderStars(testimonial.rating)}
      </div>

      {/* Review Text */}
      <p className="text-text-primary mb-6 leading-relaxed">
        "{testimonial.review}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {testimonial.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={12} color="white" />
            </div>
          )}
        </div>
        
        <div>
          <div className="font-semibold text-text-primary">{testimonial.name}</div>
          <div className="text-sm text-text-secondary">{testimonial.designation}</div>
          <div className="text-xs text-text-secondary flex items-center gap-1 mt-1">
            <Icon name="MapPin" size={12} />
            {testimonial.location}
          </div>
        </div>
      </div>

      {/* PG Info */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="text-sm text-text-secondary">
          Stayed at: <span className="font-medium text-text-primary">{testimonial.pgName}</span>
        </div>
        <div className="text-xs text-text-secondary mt-1">
          {testimonial.stayDuration}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;