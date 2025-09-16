import { getServiceBySlug } from '@app/lib/services'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface ServicePageProps {
  params: {
    slug: string
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {service.image && (
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}
          
          <div className="p-8">
            <div className="mb-6">
              <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                {service.category.name}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {service.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-indigo-600">
                ${service.price}
              </span>
              <span className="text-gray-500">
                {service.duration} minutes
              </span>
            </div>
            
            {service.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              </div>
            )}
            
            <div className="flex gap-4">
              <Link
                href={`/book-now?service=${service.slug}`}
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Book Now
              </Link>
              <Link
                href="/services"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
              >
                Back to Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
