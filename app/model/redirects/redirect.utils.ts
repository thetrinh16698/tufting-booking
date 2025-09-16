// Utility functions for handling redirects in the booking system
// This replaces the Wix redirects functionality

export const createRedirectCallbacks = ({ baseUrl }: { baseUrl: string }) => {
  return {
    postFlowUrl: `${baseUrl}/account/my-bookings`,
    thankYouPageUrl: `${baseUrl}/account/my-bookings`,
  };
};

// For now, we'll use simple redirects since we're not using Wix
// This could be enhanced with a custom checkout flow
export const createBookingRedirect = (bookingId: string, baseUrl: string) => {
  return `${baseUrl}/account/my-bookings?booking=${bookingId}`;
};
