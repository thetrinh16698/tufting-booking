'use client';

import { useSession } from 'next-auth/react';

// This hook provides a NextAuth.js session in a format compatible with the old Wix client
export const useClientAuthSession = () => {
  const { data: session, status } = useSession();

  // Return a mock object that matches the expected Wix client interface
  // This allows existing components to work without major refactoring
  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
    // Mock wixClient for components that expect it
    wixClient: {
      auth: {
        loggedIn: () => !!session,
      },
      redirects: {
        createRedirectSession: async (options: any) => {
          // For now, we'll handle redirects differently since we're not using Wix
          // This could be replaced with a custom checkout flow
          console.warn('Wix redirects not implemented - redirecting to custom checkout');
          
          // Simulate a redirect to a custom checkout page
          // In a real implementation, you would create a booking and redirect to payment
          const checkoutUrl = `/checkout?service=${options.bookingsCheckout?.slotAvailability?.slot?.resource?.name || 'tufting'}&time=${new Date().toISOString()}`;
          
          return { 
            redirectSession: { 
              fullUrl: `${window.location.origin}${checkoutUrl}` 
            } 
          };
        },
      },
    },
  };
};
