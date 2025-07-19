import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CurrentBookings = () => {
  const currentBookings = [
    {
      id: 1,
      pgName: "Sunrise PG for Women",
      location: "Koramangala, Bangalore",
      roomType: "Single AC Room",
      checkIn: "2025-01-15",
      checkOut: "2025-07-15",
      rent: "₹12,000",
      status: "Active",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
      pgOwner: "Priya Sharma",
      contact: "+91 98765 43210"
    },
    {
      id: 2,
      pgName: "Metro Boys Hostel",
      location: "Gurgaon Sector 14",
      roomType: "Shared Room",
      checkIn: "2025-02-01",
      checkOut: "2025-08-01",
      rent: "₹8,500",
      status: "Upcoming",
      image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400",
      pgOwner: "Rajesh Kumar",
      contact: "+91 87654 32109"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-success bg-success/10';
      case 'Upcoming':
        return 'text-warning bg-warning/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border elevation-1 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
          <Icon name="Calendar" size={20} className="text-primary" />
          Current Bookings
        </h2>
        <Link to="/pg-listings">
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Book New PG
          </Button>
        </Link>
      </div>

      {currentBookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={24} className="text-text-secondary" />
          </div>
          <p className="text-text-secondary mb-4">No active bookings found</p>
          <Link to="/pg-listings">
            <Button variant="default" iconName="Search" iconPosition="left">
              Find PG Accommodation
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentBookings.map((booking) => (
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
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-text-secondary">Room Type</p>
                      <p className="font-medium text-text-primary">{booking.roomType}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Check-in</p>
                      <p className="font-medium text-text-primary">{formatDate(booking.checkIn)}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Check-out</p>
                      <p className="font-medium text-text-primary">{formatDate(booking.checkOut)}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Monthly Rent</p>
                      <p className="font-medium text-primary">{booking.rent}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button variant="outline" size="sm" iconName="Phone" iconPosition="left">
                      Contact Owner
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MessageCircle" iconPosition="left">
                      Message
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Edit" iconPosition="left">
                      Modify Booking
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentBookings;