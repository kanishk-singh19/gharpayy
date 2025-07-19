import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SortAndView = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  resultsCount,
  isLoading = false 
}) => {
  const [isMapView, setIsMapView] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'newest', label: 'Newest First' }
  ];

  const handleMapToggle = () => {
    setIsMapView(!isMapView);
    onViewModeChange(isMapView ? 'grid' : 'map');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Results Count and Status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-text-secondary">Searching...</span>
              </>
            ) : (
              <>
                <Icon name="Search" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-primary font-medium">
                  {resultsCount.toLocaleString()} PGs found
                </span>
              </>
            )}
          </div>
          
          {/* Save Search Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Heart"
            iconPosition="left"
            className="text-text-secondary hover:text-primary"
            onClick={() => {
              // Handle save search
              console.log('Save search clicked');
            }}
          >
            Save Search
          </Button>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              placeholder="Sort by"
              className="min-w-[140px]"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="px-3"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="px-3"
            >
              <Icon name="List" size={16} />
            </Button>
          </div>

          {/* Map View Toggle */}
          <Button
            variant={isMapView ? 'default' : 'outline'}
            size="sm"
            onClick={handleMapToggle}
            iconName="Map"
            iconPosition="left"
          >
            {isMapView ? 'List View' : 'Map View'}
          </Button>
        </div>
      </div>

      {/* Active Filters Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={14} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Active filters:</span>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Bangalore
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                ₹5,000 - ₹10,000
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Boys
              </span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            className="text-text-secondary hover:text-error"
            onClick={() => {
              // Handle clear all filters
              console.log('Clear all filters');
            }}
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortAndView;