import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { getServiceById } from '@app/model/service/service-api';
import { ServicePageWithFallback } from '@app/service/[slug]/page';

export default async function ServicePage({ params }: any) {
  const wixSession = await useServerAuthSession();
  const resolvedParams = await params;
  const { data: service } = resolvedParams.serviceId
    ? await getServiceById(wixSession, resolvedParams.serviceId)
    : { data: null };

  return <ServicePageWithFallback service={service} />;
}
