import { Shell } from '@/components/Layout/Shell';
import SEOHead from '@/components/SEOHead';
import { HeroArticle } from '@/components/Discover/HeroArticle';
import { DiscoverGrid } from '@/components/Discover/DiscoverGrid';
import { ShortsToggle } from '@/components/Discover/ShortsToggle';
import { WidgetSidebar } from '@/components/Discover/WidgetSidebar';
import AdSlot from '@/components/AdSlot';
import { useGPT } from '@/hooks/useGPT';
import { useAdMode } from '@/hooks/useAdMode';
import { mockShorts } from '@/lib/mock-data';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { mapArticleFromDB } from '@/lib/article-mapper';

const Home = () => {
  useGPT();
  const { useMockAds } = useAdMode();

  // Fetch real articles from Supabase
  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data?.map(mapArticleFromDB) || [];
    },
  });

  const heroArticle = articles?.[0];
  const gridArticles = articles?.slice(1) || [];

  if (isLoading) {
    return (
      <Shell showPersonalization>
        <div className="container py-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Shell>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <Shell showPersonalization>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">
            Nenhum artigo publicado ainda. Crie seu primeiro artigo no{' '}
            <a href="/admin" className="text-primary hover:underline">
              painel administrativo
            </a>
            .
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell showPersonalization>
      <SEOHead
        title="IspiAI - Jornalismo em Inteligência Artificial"
        description="Notícias, análises e shorts sobre IA. Jornalismo investigativo moderno."
      />

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Hero Article */}
          {heroArticle && (
            <section className="container py-8">
              <HeroArticle article={heroArticle} />
            </section>
          )}

          {/* Billboard Ad */}
          <div className="container mb-8">
            <AdSlot slotId="billboard_hero" useMock={useMockAds} />
          </div>

          {/* Shorts Toggle */}
          <ShortsToggle shorts={mockShorts} />

          {/* Discover Grid */}
          <DiscoverGrid articles={gridArticles} useMockAds={useMockAds} />

          {/* Sticky Bottom Mobile Ad */}
          <AdSlot slotId="sticky_bottom_mobile" className="md:hidden" useMock={useMockAds} />
        </div>

        {/* Sidebar Widgets */}
        <div className="w-80 flex-shrink-0">
          <WidgetSidebar />
        </div>
      </div>
    </Shell>
  );
};

export default Home;
