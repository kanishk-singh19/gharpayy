import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ reviews, overallRating, totalReviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? 'text-yellow-500' : 'text-gray-300'}
      />
    ));
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Reviews & Ratings</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="text-yellow-500" />
            <span className="font-medium text-text-primary">{overallRating}</span>
          </div>
          <span className="text-text-secondary text-sm">({totalReviews} reviews)</span>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">Rating Breakdown</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingDistribution[star];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={star} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm text-text-secondary">{star}</span>
                  <Icon name="Star" size={12} className="text-yellow-500" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-text-secondary w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <Image
                  src={review.user.avatar}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {review.user.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-0.5">
                    <Icon name="Check" size={8} color="white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-text-primary">{review.user.name}</h5>
                    {review.user.isVerified && (
                      <div className="trust-badge">
                        <Icon name="ShieldCheck" size={10} />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-text-secondary">{formatDate(review.date)}</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex space-x-0.5">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-text-secondary">
                    Stayed for {review.stayDuration}
                  </span>
                </div>
                
                <p className="text-sm text-text-primary leading-relaxed mb-2">
                  {review.comment}
                </p>
                
                {/* Review Categories */}
                {review.categories && (
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(review.categories).map(([category, rating]) => (
                      <div key={category} className="flex items-center space-x-1 text-xs">
                        <span className="text-text-secondary capitalize">{category}:</span>
                        <div className="flex space-x-0.5">
                          {renderStars(rating)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Helpful Actions */}
                <div className="flex items-center space-x-4 mt-3">
                  <button className="flex items-center space-x-1 text-xs text-text-secondary hover:text-primary transition-colors">
                    <Icon name="ThumbsUp" size={12} />
                    <span>Helpful ({review.helpfulCount})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-xs text-text-secondary hover:text-primary transition-colors">
                    <Icon name="MessageCircle" size={12} />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 3 && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAllReviews ? 'Show Less' : `Show All ${reviews.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;