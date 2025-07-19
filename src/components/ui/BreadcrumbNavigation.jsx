import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  // Default breadcrumb mapping based on routes
  const routeBreadcrumbs = {
    '/home-page': [
      { label: 'Home', path: '/home-page' }
    ],
    '/pg-listings': [
      { label: 'Home', path: '/home-page' },
      { label: 'Search PGs', path: '/pg-listings' }
    ],
    '/pg-details': [
      { label: 'Home', path: '/home-page' },
      { label: 'Search PGs', path: '/pg-listings' },
      { label: 'PG Details', path: '/pg-details' }
    ],
    '/booking-flow': [
      { label: 'Home', path: '/home-page' },
      { label: 'Search PGs', path: '/pg-listings' },
      { label: 'PG Details', path: '/pg-details' },
      { label: 'Book Now', path: '/booking-flow' }
    ],
    '/user-dashboard': [
      { label: 'Home', path: '/home-page' },
      { label: 'Dashboard', path: '/user-dashboard' }
    ],
    '/authentication': [
      { label: 'Home', path: '/home-page' },
      { label: 'Account', path: '/authentication' }
    ]
  };

  // Use custom breadcrumbs if provided, otherwise use route-based breadcrumbs
  const breadcrumbs = customBreadcrumbs || routeBreadcrumbs[location.pathname] || [
    { label: 'Home', path: '/home-page' }
  ];

  // Don't show breadcrumbs on home page
  if (location.pathname === '/home-page' && !customBreadcrumbs) {
    return null;
  }

  const truncateLabel = (label, maxLength = 20) => {
    if (label.length <= maxLength) return label;
    return `${label.substring(0, maxLength)}...`;
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isMiddle = index > 0 && index < breadcrumbs.length - 1 && breadcrumbs.length > 3;
          
          return (
            <li key={index} className="flex items-center space-x-2">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-text-secondary/60" 
                />
              )}
              
              {isLast ? (
                <span 
                  className="text-text-primary font-medium"
                  aria-current="page"
                >
                  {truncateLabel(crumb.label)}
                </span>
              ) : isMiddle && breadcrumbs.length > 4 ? (
                // Show ellipsis for middle items when there are many breadcrumbs
                <span className="text-text-secondary/60 px-1">...</span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded-sm px-1 py-0.5"
                >
                  {index === 0 ? (
                    <div className="flex items-center space-x-1">
                      <Icon name="Home" size={14} />
                      <span className="hidden sm:inline">{truncateLabel(crumb.label)}</span>
                    </div>
                  ) : (
                    <span>{truncateLabel(crumb.label, 15)}</span>
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;