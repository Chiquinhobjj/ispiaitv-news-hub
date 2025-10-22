import { Shell } from '@/components/Layout/Shell';
import SEOHead from '@/components/SEOHead';
import { HeroArticle } from '@/components/Discover/HeroArticle';
import { DiscoverGrid } from '@/components/Discover/DiscoverGrid';
import { ShortsToggle } from '@/components/Discover/ShortsToggle';
import { WidgetSidebar } from '@/components/Discover/WidgetSidebar';
import AdSlot from '@/components/AdSlot';
import { useGPT } from '@/hooks/useGPT';
import { useAdMode } from '@/hooks/useAdMode';
import { mockShorts, mockArticles } from '@/lib/mock-data';

const Home = () => {
  useGPT();
  const { useMockAds } = useAdMode();

  const heroArticle = mockArticles[0];
  const gridArticles = mockArticles.slice(1);

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
          <section className="container py-8">
            <HeroArticle article={heroArticle} />
          </section>

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
