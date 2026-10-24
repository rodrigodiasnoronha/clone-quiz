import { CertificatePage } from './CertificatePage';

export const generateStaticParams = () => [{ tipo: 'semana1' }, { tipo: 'final' }];

export default function Page({ params }: { params: { tipo: 'semana1' | 'final' } }) {
  return <CertificatePage kind={params.tipo} />;
}
