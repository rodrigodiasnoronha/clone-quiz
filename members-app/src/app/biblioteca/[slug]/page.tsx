import { ARTICLES } from '@/content/library';
import { ArticlePage } from './ArticlePage';

export const generateStaticParams = () => ARTICLES.map(a => ({ slug: a.slug }));

export default function Page({ params }: { params: { slug: string } }) {
  return <ArticlePage slug={params.slug} />;
}
