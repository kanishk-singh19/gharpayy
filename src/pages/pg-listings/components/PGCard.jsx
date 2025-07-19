import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PGCard = ({ pg }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === pg.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? pg.images.length - 1 : prev - 1
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={14} className="text-warning fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      'WiFi': 'Wifi',
      'AC': 'Snowflake',
      'Parking': 'Car',
      'Laundry': 'Shirt',
      'Meals': 'Utensils',
      'Gym': 'Dumbbell',
      'Security': 'Shield',
      'Housekeeping': 'Sparkles'
    };
    return iconMap[amenity] || 'Check';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover-lift hover:shadow-lg transition-all duration-300">
      <Link to="/pg-details" state={{ pgId: pg.id }}>
        {/* Image Carousel */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={pg.images[currentImageIndex]}
            alt={`${pg.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Image Navigation */}
          {pg.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
                aria-label="Previous image"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
                aria-label="Next image"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                {pg.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {pg.isVerified && (
              <div className="bg-success text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <Icon name="Shield" size={12} />
                <span>Verified</span>
              </div>
            )}
            {pg.isNew && (
              <div className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
                New
              </div>
            )}
          </div>

          {/* Gender Badge */}
          <div className="absolute top-2 right-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              pg.gender === 'male' ? 'bg-blue-100 text-blue-800' :
              pg.gender === 'female'? 'bg-pink-100 text-pink-800' : 'bg-purple-100 text-purple-800'
            }`}>
              {pg.gender === 'male' ? 'Boys' : pg.gender === 'female' ? 'Girls' : 'Unisex'}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Header */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-1">
              {pg.name}
            </h3>
            <div className="flex items-center space-x-1 text-text-secondary text-sm">
              <Icon name="MapPin" size={14} />
              <span className="line-clamp-1">{pg.location}</span>
            </div>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(pg.rating)}
            </div>
            <span className="text-sm font-medium text-text-primary">{pg.rating}</span>
            <span className="text-sm text-text-secondary">({pg.reviewCount} reviews)</span>
          </div>

          {/* Amenities */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {pg.amenities.slice(0, 4).map((amenity, index) => (
                <div key={index} className="flex items-center space-x-1 text-xs text-text-secondary">
                  <Icon name={getAmenityIcon(amenity)} size={12} />
                  <span>{amenity}</span>
                </div>
              ))}
              {pg.amenities.length > 4 && (
                <span className="text-xs text-text-secondary">
                  +{pg.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-bold text-text-primary">₹{pg.price.toLocaleString()}</span>
                <span className="text-sm text-text-secondary">/month</span>
              </div>
              {pg.originalPrice && pg.originalPrice > pg.price && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary line-through">
                    ₹{pg.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-success font-medium">
                    {Math.round(((pg.originalPrice - pg.price) / pg.originalPrice) * 100)}% off
                  </span>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-text-secondary">Distance</div>
              <div className="text-sm font-medium text-text-primary">{pg.distance}</div>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                pg.availability > 5 ? 'bg-success' : 
                pg.availability > 0 ? 'bg-warning' : 'bg-error'
              }`} />
              <span className="text-sm text-text-secondary">
                {pg.availability > 0 ? `${pg.availability} beds available` : 'No vacancy'}
              </span>
            </div>
            {pg.lastUpdated && (
              <span className="text-xs text-text-secondary">
                Updated {pg.lastUpdated}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-4 pb-4 flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          iconName="Phone"
          iconPosition="left"
          onClick={(e) => {
            e.preventDefault();
            window.open(`tel:${pg.contactNumber}`);
          }}
        >
          Call
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          iconName="Calendar"
          iconPosition="left"
          onClick={(e) => {
            e.preventDefault();
            // Navigate to booking flow
            window.location.href = '/booking-flow';
          }}
          disabled={pg.availability === 0}
        >
          {pg.availability === 0 ? 'No Vacancy' : 'Book Now'}
        </Button>
      </div>
    </div>
  );
};

export default PGCard;