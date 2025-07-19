import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      title: "Active Bookings",
      value: "2",
      icon: "Calendar",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      title: "Saved Properties",
      value: "8",
      icon: "Heart",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: 3,
      title: "Total Bookings",
      value: "12",
      icon: "MapPin",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 4,
      title: "Account Status",
      value: "Verified",
      icon: "Shield",
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-card rounded-lg p-4 border border-border elevation-1">
          <div className="flex items-center justify-between mb-2">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-sm text-text-secondary">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;