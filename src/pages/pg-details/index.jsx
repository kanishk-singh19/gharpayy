import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';

import Button from '../../components/ui/Button';
import ImageCarousel from './components/ImageCarousel';
import PGInfoSection from './components/PGInfoSection';
import LocationMap from './components/LocationMap';
import OwnerInfo from './components/OwnerInfo';
import BookingSection from './components/BookingSection';
import ReviewsSection from './components/ReviewsSection';
import SafetySection from './components/SafetySection';

const PGDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBookingSectionVisible, setIsBookingSectionVisible] = useState(false);

  // Mock PG data
  const pgData = {
    id: "pg-001",
    name: "Sunrise Residency",
    location: "Koramangala, Bangalore",
    fullAddress: "123, 5th Block, Koramangala, Bangalore, Karnataka 560095",
    rating: 4.5,
    reviewCount: 127,
    coordinates: {
      lat: 12.9352,
      lng: 77.6245
    },
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    pricing: {
      single: 12000,
      double: 8000,
      deposit: 15000,
      maintenance: 1500
    },
    amenities: [
      { name: "WiFi", icon: "Wifi" },
      { name: "AC", icon: "Snowflake" },
      { name: "Laundry", icon: "Shirt" },
      { name: "Meals", icon: "Utensils" },
      { name: "Parking", icon: "Car" },
      { name: "Security", icon: "Shield" },
      { name: "Housekeeping", icon: "Broom" },
      { name: "Power Backup", icon: "Zap" },
      { name: "Water Purifier", icon: "Droplets" },
      { name: "Common Area", icon: "Users" },
      { name: "Gym", icon: "Dumbbell" },
      { name: "TV", icon: "Tv" }
    ],
    houseRules: [
      "No smoking inside the premises",
      "Visitors allowed till 9 PM",
      "Maintain cleanliness in common areas",
      "No loud music after 10 PM",
      "Monthly rent to be paid by 5th of every month",
      "One month notice period for vacating",
      "No pets allowed",
      "Alcohol consumption not permitted"
    ],
    nearbyPlaces: [
      { name: "Forum Mall", distance: "0.5 km", icon: "ShoppingBag" },
      { name: "Koramangala Metro", distance: "0.8 km", icon: "Train" },
      { name: "Apollo Hospital", distance: "1.2 km", icon: "Heart" },
      { name: "Christ University", distance: "2.1 km", icon: "GraduationCap" },
      { name: "Lalbagh Garden", distance: "3.5 km", icon: "Trees" },
      { name: "Bangalore Central", distance: "4.2 km", icon: "Building" }
    ],
    transportation: [
      { name: "Bus Stop", distance: "100 m", icon: "Bus" },
      { name: "Metro Station", distance: "800 m", icon: "Train" },
      { name: "Auto Stand", distance: "200 m", icon: "Car" },
      { name: "Taxi Service", distance: "Available", icon: "Navigation" }
    ],
    owner: {
      name: "Rajesh Kumar",
      title: "Property Manager",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      phone: "+91 98765 43210",
      experience: 8,
      rating: 4.7,
      isVerified: true,
      certifications: ["Licensed Property Manager", "Safety Certified"]
    },
    safetyFeatures: [
      { name: "24/7 Security Guard", icon: "Shield" },
      { name: "CCTV Surveillance", icon: "Camera" },
      { name: "Fire Safety Equipment", icon: "Flame" },
      { name: "Emergency Exit", icon: "DoorOpen" },
      { name: "First Aid Kit", icon: "Heart" },
      { name: "Secure Entry System", icon: "Lock" },
      { name: "Well-lit Premises", icon: "Lightbulb" },
      { name: "Intercom System", icon: "Phone" }
    ],
    certifications: [
      { name: "Fire Safety Certificate", issuer: "Karnataka Fire Department" },
      { name: "Building Approval", issuer: "BBMP" },
      { name: "Electrical Safety", issuer: "BESCOM" },
      { name: "Water Quality Test", issuer: "BWSSB" }
    ]
  };

  // Mock reviews data
  const reviewsData = [
    {
      id: 1,
      user: {
        name: "Priya Sharma",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        isVerified: true
      },
      rating: 5,
      date: "2024-01-15",
      stayDuration: "8 months",
      comment: `Excellent PG with all modern amenities. The food quality is outstanding and the staff is very helpful. The location is perfect for working professionals with easy access to metro and bus stops. Highly recommended!`,
      categories: {
        cleanliness: 5,
        food: 5,
        location: 5,
        staff: 4
      },
      helpfulCount: 12
    },
    {
      id: 2,
      user: {
        name: "Amit Patel",
        avatar: "https://randomuser.me/api/portraits/men/28.jpg",
        isVerified: true
      },
      rating: 4,
      date: "2024-01-10",
      stayDuration: "6 months",
      comment: `Good PG with decent facilities. The rooms are spacious and well-maintained. WiFi speed could be better but overall a comfortable stay. The owner is very responsive to any issues.`,
      categories: {
        cleanliness: 4,
        food: 4,
        location: 5,
        staff: 4
      },
      helpfulCount: 8
    },
    {
      id: 3,
      user: {
        name: "Sneha Reddy",
        avatar: "https://randomuser.me/api/portraits/women/25.jpg",
        isVerified: false
      },
      rating: 5,
      date: "2024-01-05",
      stayDuration: "1 year",
      comment: `Been staying here for a year now and it feels like home. The security is excellent and I feel very safe. The common areas are well-maintained and there's a good sense of community among residents.`,
      categories: {
        cleanliness: 5,
        food: 4,
        location: 4,
        staff: 5
      },
      helpfulCount: 15
    },
    {
      id: 4,
      user: {
        name: "Rohit Singh",
        avatar: "https://randomuser.me/api/portraits/men/35.jpg",
        isVerified: true
      },
      rating: 4,
      date: "2023-12-28",
      stayDuration: "4 months",
      comment: `Great location and good amenities. The gym facility is a nice addition. Food timing could be more flexible but the quality is good. Overall satisfied with the stay.`,
      categories: {
        cleanliness: 4,
        food: 3,
        location: 5,
        staff: 4
      },
      helpfulCount: 6
    },
    {
      id: 5,
      user: {
        name: "Kavya Nair",
        avatar: "https://randomuser.me/api/portraits/women/29.jpg",
        isVerified: true
      },
      rating: 3,
      date: "2023-12-20",
      stayDuration: "3 months",
      comment: `Average experience. The rooms are okay but could be better maintained. The location is the main advantage. Staff is helpful but response time for maintenance issues needs improvement.`,
      categories: {
        cleanliness: 3,
        food: 3,
        location: 5,
        staff: 3
      },
      helpfulCount: 4
    }
  ];

  const customBreadcrumbs = [
    { label: 'Home', path: '/home-page' },
    { label: 'Search PGs', path: '/pg-listings' },
    { label: pgData.name, path: '/pg-details' }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  // Handle scroll to show/hide mobile booking section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsBookingSectionVisible(scrollPosition > windowHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="content-offset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Button & Breadcrumbs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back
              </Button>
              <div className="hidden sm:block">
                <BreadcrumbNavigation customBreadcrumbs={customBreadcrumbs} />
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Carousel */}
              <ImageCarousel images={pgData.images} pgName={pgData.name} />
              
              {/* PG Information */}
              <PGInfoSection pgData={pgData} />
              
              {/* Location & Map */}
              <LocationMap pgData={pgData} />
              
              {/* Owner Information */}
              <OwnerInfo ownerData={pgData.owner} />
              
              {/* Safety & Security */}
              <SafetySection 
                safetyFeatures={pgData.safetyFeatures}
                certifications={pgData.certifications}
              />
              
              {/* Reviews Section */}
              <ReviewsSection 
                reviews={reviewsData}
                overallRating={pgData.rating}
                totalReviews={pgData.reviewCount}
              />
            </div>

            {/* Right Column - Booking Section (Desktop) */}
            <div className="hidden lg:block">
              <BookingSection pgData={pgData} />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Booking Section - Fixed Bottom */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isBookingSectionVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="bg-card border-t border-border p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Starting from</p>
              <p className="text-lg font-bold text-primary">
                ₹{pgData.pricing.single.toLocaleString('en-IN')}/month
              </p>
            </div>
            <Button
              variant="default"
              onClick={() => {
                const bookingData = {
                  pgId: pgData.id,
                  pgName: pgData.name,
                  occupancy: 'single',
                  pricing: {
                    rent: pgData.pricing.single,
                    deposit: pgData.pricing.deposit,
                    maintenance: pgData.pricing.maintenance,
                    total: pgData.pricing.single + pgData.pricing.deposit + pgData.pricing.maintenance
                  }
                };
                localStorage.setItem('bookingData', JSON.stringify(bookingData));
                navigate('/booking-flow');
              }}
              iconName="Calendar"
              iconPosition="left"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGDetails;