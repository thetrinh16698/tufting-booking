'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

// This hook provides member data in a format compatible with the old Wix members API
export const useCurrentMember = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['member', session?.user?.id],
    queryFn: async () => {
      if (!session?.user) {
        return null;
      }

      // Return member data in the format expected by the old Wix components
      return {
        member: {
          _id: session.user.id,
          profile: {
            photo: session.user.image ? { url: session.user.image } : null,
            firstName: session.user.name?.split(' ')[0] || '',
            lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
            email: session.user.email,
          },
          loginEmail: session.user.email,
        },
      };
    },
    enabled: !!session?.user,
  });
};
