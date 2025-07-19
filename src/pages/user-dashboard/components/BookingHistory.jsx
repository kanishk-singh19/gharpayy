import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingHistory = () => {
  const [showAll, setShowAll] = useState(false);

  const bookingHistory = [
    {
      id: 1,
      pgName: "Green Valley PG",
      location: "HSR Layout, Bangalore",
      roomType: "Single AC Room",
      duration: "Jan 2024 - Jul 2024",
      rent: "₹11,500",
      status: "Completed",
      rating: 4,
      image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400",
      hasReview: true
    },
    {
      id: 2,
      pgName: "City Center Hostel",
      location: "Connaught Place, Delhi",
      roomType: "Shared Room",
      duration: "Aug 2023 - Dec 2023",
      rent: "₹9,000",
      status: "Completed",
      rating: 5,
      image: "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=400",
      hasReview: true
    },
    {
      id: 3,
      pgName: "Comfort Stay PG",
      location: "Bandra West, Mumbai",
      roomType: "Single Room",
      duration: "Mar 2023 - Jul 2023",
      rent: "₹15,000",
      status: "Completed",
      rating: 3,
      image: "https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=400",
      hasReview: false
    },
    {
      id: 4,
      pgName: "Student Hub PG",
      location: "Kothrud, Pune",
      roomType: "Triple Sharing",
      duration: "Sep 2022 - Feb 2023",
      rent: "₹7,500",
      status: "Completed",
      rating: 4,
      image: "https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=400",
      hasReview: true
    }
  ];

  const displayedBookings = showAll ? bookingHistory : bookingHistory.slice(0, 3);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? "text-warning fill-current" : "text-text-secondary/30"}
      />
    ));
  };

  return (
    <div className="bg-card rounded-lg border border-border elevation-1 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
          <Icon name="History" size={20} className="text-primary" />
          Booking History
        </h2>
        <span className="text-sm text-text-secondary">
          {bookingHistory.length} total bookings
        </span>
      </div>

      {bookingHistory.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="History" size={24} className="text-text-secondary" />
          </div>
          <p className="text-text-secondary mb-4">No booking history found</p>
          <Link to="/pg-listings">
            <Button variant="default" iconName="Search" iconPosition="left">
              Start Your First Booking
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {displayedBookings.map((booking) => (
              <div key={booking.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-full lg:w-32 h-24 rounded-lg overflow-hidden">
                      <Image
                        src={booking.image}
                        alt={booking.pgName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-text-primary">{booking.pgName}</h3>
                        <p className="text-sm text-text-secondary flex items-center gap-1">
                          <Icon name="MapPin" size={14} />
                          {booking.location}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-success bg-success/10">
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-text-secondary">Room Type</p>
                        <p className="font-medium text-text-primary">{booking.roomType}</p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Duration</p>
                        <p className="font-medium text-text-primary">{booking.duration}</p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Monthly Rent</p>
                        <p className="font-medium text-primary">{booking.rent}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-text-secondary">Your Rating:</span>
                        <div className="flex items-center gap-1">
                          {renderStars(booking.rating)}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link to="/pg-listings">
                          <Button variant="outline" size="sm" iconName="RotateCcw" iconPosition="left">
                            Book Again
                          </Button>
                        </Link>
                        {!booking.hasReview && (
                          <Button variant="ghost" size="sm" iconName="Star" iconPosition="left">
                            Write Review
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
                          Download Receipt
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {bookingHistory.length > 3 && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                iconName={showAll ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {showAll ? "Show Less" : `Show All ${bookingHistory.length} Bookings`}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookingHistory;