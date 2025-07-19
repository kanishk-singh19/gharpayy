import React from 'react';
import FeaturedPGCard from './FeaturedPGCard';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const FeaturedPGsSection = () => {
  const navigate = useNavigate();

  const featuredPGs = [
    {
      id: 1,
      name: "Sunrise PG for Girls",
      location: "Koramangala, Bangalore",
      price: 12000,
      rating: 4.5,
      reviewCount: 128,
      gender: "Female",
      isVerified: true,
      isNew: false,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      amenities: [
        { name: "WiFi", icon: "Wifi" },
        { name: "AC", icon: "Snowflake" },
        { name: "Meals", icon: "Utensils" },
        { name: "Laundry", icon: "Shirt" },
        { name: "Security", icon: "Shield" }
      ]
    },
    {
      id: 2,
      name: "Metro Boys Hostel",
      location: "Gurgaon Sector 14, Delhi NCR",
      price: 15000,
      rating: 4.2,
      reviewCount: 89,
      gender: "Male",
      isVerified: true,
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      amenities: [
        { name: "WiFi", icon: "Wifi" },
        { name: "Gym", icon: "Dumbbell" },
        { name: "Parking", icon: "Car" },
        { name: "Meals", icon: "Utensils" }
      ]
    },
    {
      id: 3,
      name: "Green Valley Co-living",
      location: "Bandra West, Mumbai",
      price: 18000,
      rating: 4.7,
      reviewCount: 156,
      gender: "Unisex",
      isVerified: true,
      isNew: false,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      amenities: [
        { name: "WiFi", icon: "Wifi" },
        { name: "AC", icon: "Snowflake" },
        { name: "Pool", icon: "Waves" },
        { name: "Meals", icon: "Utensils" },
        { name: "Housekeeping", icon: "Sparkles" }
      ]
    },
    {
      id: 4,
      name: "Tech Hub PG",
      location: "Whitefield, Bangalore",
      price: 11000,
      rating: 4.3,
      reviewCount: 94,
      gender: "Male",
      isVerified: true,
      isNew: false,
      images: [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      amenities: [
        { name: "WiFi", icon: "Wifi" },
        { name: "AC", icon: "Snowflake" },
        { name: "Laundry", icon: "Shirt" },
        { name: "Security", icon: "Shield" }
      ]
    },
    {
      id: 5,
      name: "Comfort Inn Girls PG",
      location: "Powai, Mumbai",
      price: 16000,
      rating: 4.6,
      reviewCount: 112,
      gender: "Female",
      isVerified: true,
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      amenities: [
        { name: "WiFi", icon: "Wifi" },
        { name: "AC", icon: "Snowflake" },
        { name: "Meals", icon: "Utensils" },
        { name: "Gym", icon: "Dumbbell" },
        { name: "Security", icon: "Shield" }
      ]
    },
    {
      id: 6,
      name: "Urban Nest Co-living",
      location: "Hitech City, Hyderabad",
      price: 13500,
      rating: 4.4,
      reviewCount: 87,
      gender: "Unisex",
      isVerified: true,
      isNew: false,
      images: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      amenities: [
        { name: "WiFi", icon: "Wifi" },
        { name: "AC", icon: "Snowflake" },
        { name: "Parking", icon: "Car" },
        { name: "Meals", icon: "Utensils" }
      ]
    }
  ];

  const handleViewAllPGs = () => {
    navigate('/pg-listings');
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Featured PG Accommodations
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Handpicked premium PGs with verified safety standards, modern amenities, and excellent reviews from our community.
          </p>
        </div>

        {/* PG Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredPGs.map((pg) => (
            <FeaturedPGCard key={pg.id} pg={pg} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleViewAllPGs}
            iconName="ArrowRight"
            iconPosition="right"
          >
            View All PGs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPGsSection;