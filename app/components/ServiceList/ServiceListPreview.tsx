'use client';
import { ServiceInfo } from '@/app/lib/services';

export default function ServiceListPreviewView({
  services,
}: {
  services: ServiceInfo[];
}) {
  const smClassName = (services?.length ?? 0) > 1 ? 'sm:grid-cols-2' : '';
  const mdClassName = (services?.length ?? 0) > 2 ? 'md:grid-cols-3' : '';

  return services?.length ? (
    <>
      <div
        className={`mx-auto flex flex-wrap my-3 m-auto grid grid-cols-1 gap-4 ${smClassName} ${mdClassName}`}
      >
        {services?.map((service, index) => (
          <ServiceCardPreview service={service} key={service.id} />
        ))}
      </div>
    </>
  ) : null;
}

const ServiceCardPreview = ({ service }: { service: ServiceInfo }) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  return (
    <div className="w-full rounded-none overflow-hidden mx-auto border-8 border-black relative h-full min-h-[300px]">
      <div className="p-6 pb-20 text-center h-full">
        <a
          href={`/services/${service.slug}`}
          className="font-bold text-xl hover:text-gray-700"
        >
          {service.name}
        </a>
        <p className="text-sm mt-2">{service.shortDescription}</p>
        <div className="border-top border border-black w-full my-6"></div>
        <p className="text-gray-700 text-base">
          ${service.price}
        </p>
        <p className="text-gray-700 text-base">
          {formatDuration(service.duration)}
        </p>
      </div>
      <div className="w-full mx-auto pb-8 absolute bottom-0 text-center">
        <a href={`/calendar/${service.slug}`} className="btn-main">
          Book Now
        </a>
      </div>
    </div>
  );
};
