import { DAYS } from '@/content/program';
import { MissionRunner } from './MissionRunner';

export const generateStaticParams = () => DAYS.flatMap(d => [{ id: d.extra.id }, { id: d.surprise.id }]);

export default function Page({ params }: { params: { id: string } }) {
  return <MissionRunner id={params.id} />;
}
