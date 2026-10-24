'use client';

import { Page, TopBar } from '@/components/ui';
import { ArticleView } from '@/components/ArticleView';
import { ARTICLE } from '@/content/library';

export function ArticlePage({ slug }: { slug: string }) {
  const a = ARTICLE(slug)!;
  return (
    <Page>
      <TopBar back={true} title="Biblioteca VIP" />
      <ArticleView article={a} />
    </Page>
  );
}
