import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PopularCitiesSection = () => {
  const navigate = useNavigate();

  const popularCities = [
    {
      id: 1,
      name: "Bangalore",
      pgCount: 150,
      averagePrice: 12000,
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "IT Hub with modern PGs"
    },
    {
      id: 2,
      name: "Mumbai",
      pgCount: 120,
      averagePrice: 16000,
      image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Financial capital with premium accommodations"
    },
    {
      id: 3,
      name: "Delhi",
      pgCount: 100,
      averagePrice: 14000,
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Capital city with diverse options"
    },
    {
      id: 4,
      name: "Pune",
      pgCount: 80,
      averagePrice: 10000,
      image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Student-friendly with affordable rates"
    },
    {
      id: 5,
      name: "Hyderabad",
      pgCount: 75,
      averagePrice: 11000,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Tech city with modern facilities"
    },
    {
      id: 6,
      name: "Chennai",
      pgCount: 65,
      averagePrice: 9500,
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Cultural hub with traditional hospitality"
    }
  ];

  const handleCityClick = (cityName) => {
    const searchData = {
      city: cityName.toLowerCase(),
      budget: '',
      gender: '',
      amenities: []
    };
    localStorage.setItem('searchFilters', JSON.stringify(searchData));
    navigate('/pg-listings');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Popular Cities
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Explore PG accommodations in India's major metropolitan cities where opportunities and comfort meet.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCities.map((city) => (
            <div
              key={city.id}
              onClick={() => handleCityClick(city.name)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* City Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={city.image}
                  alt={`${city.name} cityscape`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
                
                {/* City Name Overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1 text-white/80">{city.name}</h3>
                  <p className="text-sm text-white/70">{city.description}</p>
                </div>
              </div>

              {/* City Stats */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Icon name="Building" size={16} />
                    <span className="text-sm">{city.pgCount}+ PGs Available</span>
                  </div>
                  <div className="text-primary font-semibold">
                    {formatPrice(city.averagePrice)}
                  </div>
                </div>

                <div className="text-xs text-text-secondary mb-3">
                  Starting from {formatPrice(city.averagePrice)} per month
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary font-medium">
                    Explore PGs
                  </span>
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="text-primary group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="TrendingUp" size={16} />
            Expanding to more cities soon
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCitiesSection;