import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedPGCard = ({ pg }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    localStorage.setItem('selectedPG', JSON.stringify(pg));
    navigate('/pg-details');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={16} className="text-yellow-400 fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={pg.images[0]}
          alt={pg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {pg.isVerified && (
            <div className="bg-success text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Icon name="Shield" size={12} />
              Verified
            </div>
          )}
          {pg.isNew && (
            <div className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
              New
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
          <Icon name="Heart" size={16} className="text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-2">
          <h3 className="font-semibold text-lg text-text-primary mb-1 line-clamp-1">
            {pg.name}
          </h3>
          <div className="flex items-center gap-1 text-text-secondary text-sm">
            <Icon name="MapPin" size={14} />
            <span className="line-clamp-1">{pg.location}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(pg.rating)}
          </div>
          <span className="text-sm font-medium text-text-primary">{pg.rating}</span>
          <span className="text-sm text-text-secondary">({pg.reviewCount} reviews)</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-3">
          {pg.amenities.slice(0, 3).map((amenity, index) => (
            <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs text-text-secondary">
              <Icon name={amenity.icon} size={12} />
              <span>{amenity.name}</span>
            </div>
          ))}
          {pg.amenities.length > 3 && (
            <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-text-secondary">
              +{pg.amenities.length - 3} more
            </div>
          )}
        </div>

        {/* Price and Gender */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xl font-bold text-primary">
              {formatPrice(pg.price)}
            </div>
            <div className="text-xs text-text-secondary">per month</div>
          </div>
          <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
            <Icon name="Users" size={12} />
            {pg.gender}
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="default"
          size="sm"
          onClick={handleViewDetails}
          className="w-full"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default FeaturedPGCard;