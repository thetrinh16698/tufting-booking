// Service API functions to replace Wix service functionality
import { ServiceInfoViewModel, mapServiceToViewModel } from './service.mapper';

export const getServiceBySlug = async (
  session: any,
  slug: string
): Promise<{ data: ServiceInfoViewModel | null }> => {
  // For now, this is a placeholder that returns mock service data
  // In a real implementation, this would call your custom service API
  
  console.warn('Service API not implemented - returning mock data');
  
  // Mock service data - you can replace this with actual API calls
  const mockService = {
    id: 'mock-service-1',
    slug: slug,
    name: 'Advanced Tufting Workshop',
    description: 'Learn advanced tufting techniques in our comprehensive workshop',
    duration: 120, // 2 hours
    price: 75.00,
    category: {
      id: 'category-1',
      name: 'Workshops',
      slug: 'workshops',
    },
  };

  // Return the service in the expected format
  return {
    data: mapServiceToViewModel(mockService),
  };
};

export const getServiceById = async (
  session: any,
  serviceId: string
): Promise<{ data: ServiceInfoViewModel | null }> => {
  // Mock service data by ID
  const mockService = {
    id: serviceId,
    slug: `service-${serviceId}`,
    name: 'Advanced Tufting Workshop',
    description: 'Learn advanced tufting techniques in our comprehensive workshop',
    duration: 120, // 2 hours
    price: 75.00,
    category: {
      id: 'category-1',
      name: 'Workshops',
      slug: 'workshops',
    },
  };

  return {
    data: mapServiceToViewModel(mockService),
  };
};

export const getServices = async (
  session: any,
  options?: { categoryId?: string }
): Promise<{ data: ServiceInfoViewModel[] }> => {
  // Mock services data
  const mockServices = [
    {
      id: 'mock-service-1',
      name: 'Advanced Tufting Workshop',
      description: 'Learn advanced tufting techniques',
      duration: 120,
      price: 75.00,
      category: {
        id: 'category-1',
        name: 'Workshops',
        slug: 'workshops',
      },
    },
    {
      id: 'mock-service-2',
      name: 'Beginner Tufting Class',
      description: 'Perfect for beginners',
      duration: 90,
      price: 50.00,
      category: {
        id: 'category-1',
        name: 'Workshops',
        slug: 'workshops',
      },
    },
  ];

  return {
    data: mockServices.map(mapServiceToViewModel),
  };
};
