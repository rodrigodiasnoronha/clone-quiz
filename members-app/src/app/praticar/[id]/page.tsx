import { EXERCISES } from '@/content/exercises';
import { Practice } from './Practice';

export const generateStaticParams = () => EXERCISES.map(e => ({ id: e.id }));

export default function Page({ params }: { params: { id: string } }) {
  return <Practice id={params.id} />;
}
