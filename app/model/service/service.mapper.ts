// Service mapper to convert between different service formats
// This maintains compatibility with the existing component interfaces

export interface ServiceInfoViewModel {
  id: string;
  slug: string;
  info: {
    name: string;
    formattedDuration: string;
    tagLine?: string;
    description?: string;
    media?: {
      otherMediaItems?: any[];
    };
  };
  payment: {
    paymentDetails: {
      price: number;
      currency: string;
    };
    offeredAs?: string[];
  };
}

// You can add more mapping functions here as needed
export const mapServiceToViewModel = (service: any): ServiceInfoViewModel => {
  return {
    id: service.id,
    slug: service.slug || service.id,
    info: {
      name: service.name,
      formattedDuration: `${service.duration} minutes`,
      tagLine: service.tagLine || '',
      description: service.description || '',
      media: {
        otherMediaItems: service.media?.otherMediaItems || [],
      },
    },
    payment: {
      paymentDetails: {
        price: Number(service.price),
        currency: 'USD', // You can make this configurable
      },
      offeredAs: service.offeredAs || ['BOOKING'],
    },
  };
};
