import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Shell } from '@/components/Layout/Shell';
import SEOHead from '@/components/SEOHead';
import Espiai30s from '@/components/Espiai30s';
import LinhaDoTempo from '@/components/LinhaDoTempo';
import BoxTransparencia from '@/components/BoxTransparencia';
import RelatedArticles from '@/components/RelatedArticles';
import AdSlot from '@/components/AdSlot';
import { useGPT } from '@/hooks/useGPT';
import { mockArticles } from '@/lib/mock-data';

const Article = () => {
  useGPT();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [useMockAds] = useState(searchParams.get('mocks') === '1');

  const mockArticle = mockArticles[0];

  return (
    <Shell>
      <SEOHead
        title={mockArticle.title}
        description={mockArticle.excerpt}
        image={mockArticle.thumbnail}
        article={{
          headline: mockArticle.title,
          description: mockArticle.excerpt,
          images: [
            {
              "@type": "ImageObject",
              url: mockArticle.thumbnail,
              width: 1200,
              height: 630,
            },
          ],
          datePublished: mockArticle.publishedAt,
          dateModified: mockArticle.publishedAt,
          author: {
            "@type": "Person",
            name: mockArticle.author.name,
            url: `https://ispiai.com/author/${mockArticle.author.name.toLowerCase().replace(' ', '-')}`,
          },
          articleSection: mockArticle.category,
          url: `https://ispiai.com/article/${mockArticle.slug}`,
        }}
      />

      <article className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="heading-lg mb-6">{mockArticle.title}</h1>
        
        <img 
          src={mockArticle.thumbnail} 
          alt={mockArticle.title}
          className="w-full rounded-lg mb-8"
          loading="eager"
        />

        <Espiai30s
          summary="Nova tecnologia de IA desenvolvida por pesquisadores consegue detectar doenças raras com 95% de precisão, superando métodos tradicionais e reduzindo tempo de diagnóstico em até 60%."
          lastUpdate="15 de janeiro de 2025"
          sources={[
            { title: 'Nature Medicine', url: '#' },
            { title: 'Stanford AI Lab', url: '#' },
          ]}
        />

        <AdSlot slotId="article_mid" className="my-8" useMock={useMockAds} />

        <div className="article-body prose prose-lg">
          <p>{mockArticle.excerpt}</p>
        </div>

        <AdSlot slotId="inarticle" className="my-8" useMock={useMockAds} />

        <LinhaDoTempo
          events={[
            { date: 'Janeiro 2024', title: 'Início da pesquisa', description: 'Projeto de IA médica iniciado' },
            { date: 'Junho 2024', title: 'Fase de testes', description: 'Testes com 10.000 casos' },
            { date: 'Janeiro 2025', title: 'Publicação', description: 'Resultados publicados' },
          ]}
        />

        <BoxTransparencia
          author={mockArticle.author.name}
          publishDate="15 de janeiro de 2025"
          updateDate="15 de janeiro de 2025"
          sources={['Nature Medicine', 'Stanford AI Lab', 'WHO']}
          disclaimer="Este artigo foi baseado em pesquisas científicas revisadas por pares."
        />

        <RelatedArticles articles={mockArticles.slice(1, 4)} />
      </article>

      <AdSlot slotId="sticky_bottom_mobile" className="md:hidden" useMock={useMockAds} />
    </Shell>
  );
};

export default Article;
