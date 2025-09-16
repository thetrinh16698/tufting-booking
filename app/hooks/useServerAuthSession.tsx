// Server-side authentication hook for NextAuth.js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@app/lib/auth';

export const useServerAuthSession = async () => {
  // Get the server session using NextAuth.js
  const session = await getServerSession(authOptions);
  
  // Return a session object that matches the expected interface
  return {
    session,
    isAuthenticated: !!session,
    // Mock wixClient for components that expect it
    wixClient: session ? {
      auth: {
        loggedIn: () => !!session,
      },
    } : null,
  };
};
