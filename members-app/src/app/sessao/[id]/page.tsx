import { SESSIONS } from '@/content/program';
import { TrainSession } from './TrainSession';

export const generateStaticParams = () => Object.keys(SESSIONS).map(id => ({ id }));

export default function Page({ params }: { params: { id: string } }) {
  return <TrainSession id={params.id} />;
}
