import { prisma } from "./db"

export interface ServiceInfo {
  id: string
  name: string
  slug: string
  description?: string
  shortDescription?: string
  image?: string
  price: number
  duration: number
  isActive: boolean
  category: {
    id: string
    name: string
    slug: string
  }
}

export const getServices = async (categoryId?: string): Promise<ServiceInfo[]> => {
  const services = await prisma.service.findMany({
    where: {
      isActive: true,
      ...(categoryId && { categoryId }),
    },
    include: {
      category: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return services.map(service => ({
    id: service.id,
    name: service.name,
    slug: service.slug,
    description: service.description || undefined,
    shortDescription: service.shortDescription || undefined,
    image: service.image || undefined,
    price: Number(service.price),
    duration: service.duration,
    isActive: service.isActive,
    category: {
      id: service.category.id,
      name: service.category.name,
      slug: service.category.slug,
    },
  }))
}

export const getServiceBySlug = async (slug: string): Promise<ServiceInfo | null> => {
  const service = await prisma.service.findUnique({
    where: {
      slug,
      isActive: true,
    },
    include: {
      category: true,
    },
  })

  if (!service) return null

  return {
    id: service.id,
    name: service.name,
    slug: service.slug,
    description: service.description || undefined,
    shortDescription: service.shortDescription || undefined,
    image: service.image || undefined,
    price: Number(service.price),
    duration: service.duration,
    isActive: service.isActive,
    category: {
      id: service.category.id,
      name: service.category.name,
      slug: service.category.slug,
    },
  }
}

export const getCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })
}
