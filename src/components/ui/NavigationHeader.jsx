import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const navigationItems = [
    { label: 'Home', path: '/home-page', icon: 'Home' },
    { label: 'Search PGs', path: '/pg-listings', icon: 'Search' },
  ];

  const accountItems = isAuthenticated 
    ? [
        { label: 'Dashboard', path: '/user-dashboard', icon: 'LayoutDashboard' },
        { label: 'Logout', action: 'logout', icon: 'LogOut' },
      ]
    : [
        { label: 'Login', path: '/authentication', icon: 'LogIn' },
        { label: 'Sign Up', path: '/authentication', icon: 'UserPlus' },
      ]; 

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setIsAccountDropdownOpen(false);
    window.location.href = '/home-page';
  };

  const handleAccountAction = (item) => {
    if (item.action === 'logout') {
      handleLogout();
    } else {
      setIsAccountDropdownOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="nav-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/home-page" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Home" size={20} color="white" />
                </div>
                <span className="text-xl font-bold text-primary">GharPayy</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="desktop-nav items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActiveRoute(item.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop Account Area */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAccountDropdown}
                  className="flex items-center space-x-2"
                >
                  {isAuthenticated ? (
                    <>
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} color="white" />
                      </div>
                      <Icon name="ChevronDown" size={16} />
                    </>
                  ) : (
                    <>
                      <Icon name="User" size={16} />
                      <span>Account</span>
                      <Icon name="ChevronDown" size={16} />
                    </>
                  )}
                </Button>

                {/* Account Dropdown */}
                {isAccountDropdownOpen && (
                  <div className="nav-dropdown mt-2 w-48 py-2 animate-fade-in">
                    {accountItems.map((item, index) => (
                      <div key={index}>
                        {item.path ? (
                          <Link
                            to={item.path}
                            onClick={() => setIsAccountDropdownOpen(false)}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-muted transition-colors duration-200"
                          >
                            <Icon name={item.icon} size={16} />
                            <span>{item.label}</span>
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleAccountAction(item)}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-muted transition-colors duration-200"
                          >
                            <Icon name={item.icon} size={16} />
                            <span>{item.label}</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="mobile-menu-trigger flex items-center space-x-4">
              {/* Mobile Account Icon */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAccountDropdown}
                className="relative"
              >
                {isAuthenticated ? (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                ) : (
                  <Icon name="User" size={20} />
                )}
              </Button>

              {/* Hamburger Menu */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Account Dropdown */}
        {isAccountDropdownOpen && (
          <div className="lg:hidden absolute right-4 top-16 z-[1050] bg-popover border border-border rounded-md shadow-lg w-48 py-2 animate-fade-in">
            {accountItems.map((item, index) => (
              <div key={index}>
                {item.path ? (
                  <Link
                    to={item.path}
                    onClick={() => setIsAccountDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleAccountAction(item)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="nav-mobile-menu lg:hidden animate-slide-in">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Link to="/home-page" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Home" size={20} color="white" />
                </div>
                <span className="text-xl font-bold text-primary">GharPayy</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                aria-label="Close mobile menu"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Mobile Navigation Items */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={toggleMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActiveRoute(item.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Account Section */}
            <div className="border-t border-border p-4">
              <div className="space-y-2">
                {accountItems.map((item, index) => (
                  <div key={index}>
                    {item.path ? (
                      <Link
                        to={item.path}
                        onClick={toggleMobileMenu}
                        className="flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium text-text-primary hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name={item.icon} size={20} />
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          handleAccountAction(item);
                          toggleMobileMenu();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium text-text-primary hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name={item.icon} size={20} />
                        <span>{item.label}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[1099] lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Backdrop for account dropdown */}
      {isAccountDropdownOpen && (
        <div
          className="fixed inset-0 z-[1049]"
          onClick={() => setIsAccountDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default NavigationHeader;