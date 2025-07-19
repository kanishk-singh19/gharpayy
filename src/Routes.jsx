import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import HomePage from "pages/home-page";
import Authentication from "pages/authentication";
import BookingFlow from "pages/booking-flow";
import PgDetails from "pages/pg-details";
import UserDashboard from "pages/user-dashboard";
import PgListings from "pages/pg-listings";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/booking-flow" element={<BookingFlow />} />
        <Route path="/pg-details" element={<PgDetails />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/pg-listings" element={<PgListings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;