import { DAYS } from '@/content/program';
import { DayDetail } from './DayDetail';

export const generateStaticParams = () => DAYS.map(d => ({ n: String(d.n) }));

export default function Page({ params }: { params: { n: string } }) {
  return <DayDetail n={Number(params.n)} />;
}
