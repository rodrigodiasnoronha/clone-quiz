import { DAYS } from '@/content/program';
import { TrainDay } from './TrainDay';

export const generateStaticParams = () => DAYS.map(d => ({ n: String(d.n) }));

export default function Page({ params }: { params: { n: string } }) {
  return <TrainDay n={Number(params.n)} />;
}
