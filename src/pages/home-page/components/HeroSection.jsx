import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    city: "",
    budget: "",
    gender: "",
    amenities: [],
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const cityOptions = [
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
    { value: "pune", label: "Pune" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "chennai", label: "Chennai" },
    { value: "kolkata", label: "Kolkata" },
    { value: "ahmedabad", label: "Ahmedabad" },
  ];

  const budgetOptions = [
    { value: "5000-10000", label: "₹5,000 - ₹10,000" },
    { value: "10000-15000", label: "₹10,000 - ₹15,000" },
    { value: "15000-20000", label: "₹15,000 - ₹20,000" },
    { value: "20000-25000", label: "₹20,000 - ₹25,000" },
    { value: "25000+", label: "₹25,000+" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "unisex", label: "Unisex" },
  ];

  const amenityOptions = [
    { value: "wifi", label: "WiFi" },
    { value: "ac", label: "AC" },
    { value: "meals", label: "Meals" },
    { value: "laundry", label: "Laundry" },
    { value: "parking", label: "Parking" },
    { value: "security", label: "24/7 Security" },
  ];

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    localStorage.setItem("searchFilters", JSON.stringify(searchData));
    navigate("/pg-listings");
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          alt="Cozy PG accommodation interior"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Text */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Feel at Home,
            <span className="block text-primary opacity-100">Anywhere.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
            Discover safe, hygienic, and affordable PG accommodations across
            major Indian cities. Your perfect home away from home awaits.
          </p>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:block bg-white rounded-2xl p-6 shadow-2xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Select
                label={
                  <span className="text-primary text-sm font-medium ml-3">City</span>
                }
                placeholder={
                  <span className=" text-sm font-medium  opacity-30 ">
                    
                    Select City
                  </span>
                }
                options={cityOptions}
                value={searchData.city}
                onChange={(value) => handleInputChange("city", value)}
                searchable
              className="text-left"
              />
            </div>
            <div>
              <Select
                label={
                  <span className="text-primary text-sm font-medium ml-3.5">
                    Budget Range
                  </span>
                }
                placeholder={
                  <span className=" text-sm font-medium  opacity-30">
                    {" "}
                    Select Budget
                  </span>
                }
                options={budgetOptions}
                value={searchData.budget}
                onChange={(value) => handleInputChange("budget", value)}
              className="text-left"
              />
            </div>
            <div>
              <Select
                label={
                  <span className="text-primary text-sm font-medium ml-3.5">
                    Gender Preference
                  </span>
                }
                placeholder={
                  <span className=" text-sm font-medium  opacity-30">
                    {" "}
                    Select Gender
                  </span>
                }
                options={genderOptions}
                value={searchData.gender}
                onChange={(value) => handleInputChange("gender", value)}
              className="text-left"
              />
            </div>
            <div>
              <Select
                label={
                  <span className="text-primary text-sm font-medium ml-4">
                    Amenities
                  </span>
                }
                placeholder={
                  <span className=" text-sm font-medium  opacity-30">
                    {" "}
                    Select Amenities
                  </span>
                }
                options={amenityOptions}
                value={searchData.amenities}
                onChange={(value) => handleInputChange("amenities", value)}
                multiple
                searchable
                className="text-left"
              />
            </div>
          </div>
          <Button
            variant="default"
            size="lg"
            onClick={handleSearch}
            iconName="Search"
            iconPosition="left"
            className="w-full"
          >
            Search PGs
          </Button>
        </div>

        {/* Search Bar - Mobile */}
        <div className="lg:hidden bg-white rounded-2xl p-4 shadow-2xl">
          <div className="mb-4">
            <Select
              label="City"
              placeholder="Select city"
              options={cityOptions}
              value={searchData.city}
              onChange={(value) => handleInputChange("city", value)}
              searchable
            />
          </div>

          <Button
            variant="outline"
            onClick={toggleMobileFilters}
            iconName={showMobileFilters ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="w-full mb-4"
          >
            {showMobileFilters ? "Hide Filters" : "More Filters"}
          </Button>

          {showMobileFilters && (
            <div className="space-y-4 mb-4">
              <Select
                label="Budget Range"
                placeholder="Select budget"
                options={budgetOptions}
                value={searchData.budget}
                onChange={(value) => handleInputChange("budget", value)}
              />
              <Select
                label="Gender Preference"
                placeholder="Select preference"
                options={genderOptions}
                value={searchData.gender}
                onChange={(value) => handleInputChange("gender", value)}
              />
              <Select
                label="Amenities"
                placeholder="Select amenities"
                options={amenityOptions}
                value={searchData.amenities}
                onChange={(value) => handleInputChange("amenities", value)}
                multiple
                searchable
              />
            </div>
          )}

          <Button
            variant="default"
            size="lg"
            onClick={handleSearch}
            iconName="Search"
            iconPosition="left"
            className="w-full"
          >
            Search PGs
          </Button>
        </div>

        {/* Quick Stats - Polished and Brand-Aligned */}
        <div className="mt-8 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-white">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-extrabold text-primary">
              500+
            </div>
            <div className="text-sm lg:text-base text-white/80">
              Verified PGs across India
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-extrabold text-primary">
              8 Cities
            </div>
            <div className="text-sm lg:text-base text-white/80">
              Metro & Tier-1 coverage
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-extrabold text-primary">
              10K+
            </div>
            <div className="text-sm lg:text-base text-white/80">
              Happy residents and growing
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-extrabold text-violet-400">
              ★ 4.8/5
            </div>
            <div className="text-sm lg:text-base text-white/80">
              Average rating from real users
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
