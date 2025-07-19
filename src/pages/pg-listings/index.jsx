import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';

import Button from '../../components/ui/Button';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import SortAndView from './components/SortAndView';
import PGGrid from './components/PGGrid';
import Pagination from './components/Pagination';

const PGListings = () => {
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  
  const [filters, setFilters] = useState({
    priceRange: '',
    gender: '',
    amenities: [],
    rating: '',
    distance: ''
  });

  const [searchParams, setSearchParams] = useState({
    city: 'bangalore',
    budget: '5000-10000',
    gender: 'male',
    moveInDate: ''
  });

  // Mock PG data
  const mockPGs = [
    {
      id: 1,
      name: "Zolo Stays Premium",
      location: "Koramangala, Bangalore",
      price: 8500,
      originalPrice: 10000,
      rating: 4.5,
      reviewCount: 128,
      images: [
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg"
      ],
      amenities: ["WiFi", "AC", "Meals", "Laundry", "Security"],
      gender: "male",
      availability: 3,
      distance: "2.5 km",
      isVerified: true,
      isNew: false,
      contactNumber: "+91 9876543210",
      lastUpdated: "2 hours ago"
    },
    {
      id: 2,
      name: "Stanza Living Riverside",
      location: "HSR Layout, Bangalore",
      price: 12000,
      originalPrice: null,
      rating: 4.2,
      reviewCount: 89,
      images: [
        "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
        "https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg"
      ],
      amenities: ["WiFi", "AC", "Gym", "Parking", "Housekeeping"],
      gender: "male",
      availability: 1,
      distance: "1.8 km",
      isVerified: true,
      isNew: true,
      contactNumber: "+91 9876543211",
      lastUpdated: "1 hour ago"
    },
    {
      id: 3,
      name: "OYO Life Comfort",
      location: "Indiranagar, Bangalore",
      price: 6500,
      originalPrice: 7500,
      rating: 3.8,
      reviewCount: 156,
      images: [
        "https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg",
        "https://images.pexels.com/photos/1571464/pexels-photo-1571464.jpeg",
        "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg"
      ],
      amenities: ["WiFi", "Meals", "Laundry", "Security"],
      gender: "male",
      availability: 5,
      distance: "3.2 km",
      isVerified: false,
      isNew: false,
      contactNumber: "+91 9876543212",
      lastUpdated: "3 hours ago"
    },
    {
      id: 4,
      name: "Colive Premium Residences",
      location: "Whitefield, Bangalore",
      price: 15000,
      originalPrice: null,
      rating: 4.7,
      reviewCount: 203,
      images: [
        "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg",
        "https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg"
      ],
      amenities: ["WiFi", "AC", "Gym", "Parking", "Meals", "Housekeeping"],
      gender: "male",
      availability: 2,
      distance: "5.1 km",
      isVerified: true,
      isNew: false,
      contactNumber: "+91 9876543213",
      lastUpdated: "30 minutes ago"
    },
    {
      id: 5,
      name: "Nestaway Comfort",
      location: "Electronic City, Bangalore",
      price: 7200,
      originalPrice: 8000,
      rating: 4.0,
      reviewCount: 94,
      images: [
        "https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg",
        "https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg",
        "https://images.pexels.com/photos/1571456/pexels-photo-1571456.jpeg"
      ],
      amenities: ["WiFi", "AC", "Parking", "Security", "Laundry"],
      gender: "male",
      availability: 0,
      distance: "4.7 km",
      isVerified: true,
      isNew: false,
      contactNumber: "+91 9876543214",
      lastUpdated: "1 day ago"
    },
    {
      id: 6,
      name: "Hello World PG",
      location: "Marathahalli, Bangalore",
      price: 9500,
      originalPrice: null,
      rating: 4.3,
      reviewCount: 67,
      images: [
        "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg",
        "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg"
      ],
      amenities: ["WiFi", "Meals", "Gym", "Security", "Housekeeping"],
      gender: "male",
      availability: 4,
      distance: "3.8 km",
      isVerified: true,
      isNew: true,
      contactNumber: "+91 9876543215",
      lastUpdated: "4 hours ago"
    }
  ];

  const resultsPerPage = 12;
  const totalResults = mockPGs.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get search params from location state
  useEffect(() => {
    if (location.state?.searchParams) {
      setSearchParams(location.state.searchParams);
    }
  }, [location.state]);

  const handleSearch = (newSearchParams) => {
    setIsLoading(true);
    setSearchParams(newSearchParams);
    setCurrentPage(1);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleFiltersChange = (newFilters) => {
    setIsLoading(true);
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleClearFilters = () => {
    setFilters({
      priceRange: '',
      gender: '',
      amenities: [],
      rating: '',
      distance: ''
    });
  };

  const handleSortChange = (newSortBy) => {
    setIsLoading(true);
    setSortBy(newSortBy);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Custom breadcrumbs
  const breadcrumbs = [
    { label: 'Home', path: '/home-page' },
    { label: 'Search PGs', path: '/pg-listings' },
    { label: searchParams.city ? searchParams.city.charAt(0).toUpperCase() + searchParams.city.slice(1) : 'Results', path: '/pg-listings' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="content-offset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
          
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} initialValues={searchParams} />
          
          <div className="flex gap-6">
            {/* Filter Sidebar */}
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              isMobile={isMobile}
            />
            
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={toggleFilter}
                  iconName="Filter"
                  iconPosition="left"
                  fullWidth
                >
                  Filters & Sort
                </Button>
              </div>
              
              {/* Desktop Filter Toggle */}
              <div className="hidden lg:block mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFilter}
                  iconName={isFilterOpen ? "ChevronLeft" : "ChevronRight"}
                  iconPosition="left"
                >
                  {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
              
              {/* Sort and View Controls */}
              <SortAndView
                sortBy={sortBy}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
                resultsCount={totalResults}
                isLoading={isLoading}
              />
              
              {/* PG Grid */}
              <PGGrid
                pgs={mockPGs}
                viewMode={viewMode}
                isLoading={isLoading}
              />
              
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGListings;