import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FavoritesSection = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      pgName: "Luxury PG for Women",
      location: "Whitefield, Bangalore",
      rent: "₹14,000",
      rating: 4.5,
      amenities: ["AC", "WiFi", "Laundry", "Meals"],
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
      availability: "Available",
      savedDate: "2025-01-10"
    },
    {
      id: 2,
      pgName: "Modern Boys Hostel",
      location: "Cyber City, Gurgaon",
      rent: "₹10,500",
      rating: 4.2,
      amenities: ["WiFi", "Gym", "Parking", "Security"],
      image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400",
      availability: "Available",
      savedDate: "2025-01-08"
    },
    {
      id: 3,
      pgName: "Comfort Stay PG",
      location: "Andheri East, Mumbai",
      rent: "₹16,500",
      rating: 4.7,
      amenities: ["AC", "WiFi", "Meals", "Housekeeping"],
      image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400",
      availability: "Full",
      savedDate: "2025-01-05"
    },
    {
      id: 4,
      pgName: "Student Hub PG",
      location: "Kothrud, Pune",
      rent: "₹8,500",
      rating: 4.0,
      amenities: ["WiFi", "Study Room", "Meals", "Security"],
      image: "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=400",
      availability: "Available",
      savedDate: "2025-01-03"
    }
  ]);

  const removeFavorite = (pgId) => {
    setFavorites(prev => prev.filter(pg => pg.id !== pgId));
  };

  const getAvailabilityColor = (availability) => {
    return availability === 'Available' ?'text-success bg-success/10' :'text-error bg-error/10';
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: fullStars }, (_, index) => (
          <Icon key={index} name="Star" size={12} className="text-warning fill-current" />
        ))}
        {hasHalfStar && (
          <Icon name="Star" size={12} className="text-warning fill-current opacity-50" />
        )}
        <span className="text-xs text-text-secondary ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border elevation-1 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
          <Icon name="Heart" size={20} className="text-accent" />
          Saved Properties
        </h2>
        <span className="text-sm text-text-secondary">
          {favorites.length} saved
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={24} className="text-text-secondary" />
          </div>
          <p className="text-text-secondary mb-4">No saved properties yet</p>
          <Link to="/pg-listings">
            <Button variant="default" iconName="Search" iconPosition="left">
              Explore PG Options
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((pg) => (
            <div key={pg.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="relative mb-3">
                <div className="w-full h-32 rounded-lg overflow-hidden">
                  <Image
                    src={pg.image}
                    alt={pg.pgName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeFavorite(pg.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors duration-200"
                >
                  <Icon name="Heart" size={16} className="text-accent fill-current" />
                </button>
                <span className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(pg.availability)}`}>
                  {pg.availability}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-text-primary text-sm">{pg.pgName}</h3>
                  <span className="font-bold text-primary text-sm">{pg.rent}/mo</span>
                </div>

                <p className="text-xs text-text-secondary flex items-center gap-1">
                  <Icon name="MapPin" size={12} />
                  {pg.location}
                </p>

                {renderStars(pg.rating)}

                <div className="flex flex-wrap gap-1">
                  {pg.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-xs text-text-secondary rounded-full">
                      {amenity}
                    </span>
                  ))}
                  {pg.amenities.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-xs text-text-secondary rounded-full">
                      +{pg.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Link to="/pg-details" className="flex-1">
                    <Button variant="outline" size="sm" fullWidth>
                      View Details
                    </Button>
                  </Link>
                  {pg.availability === 'Available' && (
                    <Link to="/booking-flow" className="flex-1">
                      <Button variant="default" size="sm" fullWidth>
                        Book Now
                      </Button>
                    </Link>
                  )}
                </div>

                <p className="text-xs text-text-secondary">
                  Saved on {new Date(pg.savedDate).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesSection;