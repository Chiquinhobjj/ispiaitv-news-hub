import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Shell } from '@/components/Layout/Shell';
import SEOHead from '@/components/SEOHead';
import { ShortsRail } from '@/components/Shorts/ShortsRail';
import { FeedList } from '@/components/Feed/FeedList';
import AdSlot from '@/components/AdSlot';
import { useGPT } from '@/hooks/useGPT';
import { mockShorts } from '@/lib/mock-data';
import { usePersonalization } from '@/hooks/usePersonalization';

const Home = () => {
  useGPT();
  const [searchParams] = useSearchParams();
  const [useMockAds] = useState(searchParams.get('mocks') === '1');
  const { activeFilter } = usePersonalization();

  return (
    <Shell showPersonalization>
      <SEOHead
        title="IspiAI - Jornalismo em Inteligência Artificial"
        description="Notícias, análises e shorts sobre IA. Jornalismo investigativo moderno."
      />

      {/* Shorts Hero Section */}
      <section className="container py-8">
        <h2 className="heading-lg mb-6">Últimas em 30s</h2>
        <ShortsRail shorts={mockShorts} />
      </section>

      {/* Top Leaderboard Ad */}
      <div className="container">
        <AdSlot slotId="top_leaderboard" useMock={useMockAds} />
      </div>

      {/* Infinite Feed with Ads */}
      <FeedList filter={activeFilter} useMockAds={useMockAds} />

      {/* Sticky Bottom Mobile Ad */}
      <AdSlot slotId="sticky_bottom_mobile" className="md:hidden" useMock={useMockAds} />
    </Shell>
  );
};

export default Home;
