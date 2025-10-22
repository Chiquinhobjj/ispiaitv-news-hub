import Header from "@/components/Header";
import ShortPlayer from "@/components/ShortPlayer";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import SEOHead from "@/components/SEOHead";

const Home = () => {
  // Mock data - será substituído por dados reais
  const shorts = [
    { id: 1, videoUrl: "", title: "IA revoluciona setor de saúde", captions: "Novo modelo prevê doenças com 95% de precisão" },
    { id: 2, videoUrl: "", title: "Tech gigantes investem em chips", captions: "Investimento de US$ 50 bi em semicondutores" },
    { id: 3, videoUrl: "", title: "Mudanças climáticas aceleram", captions: "ONU alerta para ação urgente" },
  ];

  const featuredArticle = {
    slug: "ia-revoluciona-diagnostico-medico",
    title: "Inteligência Artificial revoluciona diagnóstico médico no Brasil",
    excerpt: "Sistema desenvolvido por startup brasileira atinge taxa de precisão de 95% na detecção precoce de câncer, superando especialistas humanos em testes clínicos.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    category: "Tecnologia",
    publishDate: "2025-10-22",
  };

  const articles = [
    {
      slug: "nova-politica-privacidade-europa",
      title: "Europa aprova nova política de privacidade para IA",
      excerpt: "Legislação mais restritiva do mundo entra em vigor em 2026.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
      category: "Política",
      publishDate: "2025-10-21",
    },
    {
      slug: "startup-brasileira-capta-investimento",
      title: "Startup brasileira capta R$ 100 milhões para IA generativa",
      excerpt: "Rodada liderada por fundos internacionais impulsiona expansão.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600",
      category: "Negócios",
      publishDate: "2025-10-20",
    },
    {
      slug: "educacao-publica-adota-ia",
      title: "Educação pública adota IA para personalizar ensino",
      excerpt: "Programa piloto em 500 escolas mostra resultados promissores.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
      category: "Educação",
      publishDate: "2025-10-19",
    },
  ];

  return (
    <>
      <SEOHead 
        title="IspiAI - Notícias e Análises sobre Inteligência Artificial"
        description="Portal de jornalismo investigativo focado em inteligência artificial, tecnologia e sociedade. Shorts informativos, dossiês e análises aprofundadas."
        canonical="https://ispiai.com"
      />
      
      <div className="min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Top Leaderboard Ad */}
          <AdSlot slotId="top_leaderboard" minHeight="90px" className="mb-8 max-w-[970px] mx-auto" />

          {/* Hero Section - Shorts */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Shorts IspiAI</h2>
              <span className="text-sm text-muted-foreground">Notícias em 30 segundos</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shorts.map((short, idx) => (
                <div key={short.id}>
                  <ShortPlayer {...short} />
                  {idx === 1 && (
                    <AdSlot 
                      slotId={`infeed_home_${idx}`} 
                      minHeight="250px" 
                      className="mt-6 md:hidden"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Infeed Ad - Mobile only */}
          <AdSlot slotId="infeed_home_1" minHeight="250px" className="mb-8 md:hidden" />

          {/* Featured Article */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Destaque</h2>
            <ArticleCard {...featuredArticle} featured />
          </section>

          {/* Articles Grid */}
          <section className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold">Últimas Notícias</h2>
              
              <div className="space-y-6">
                {articles.map((article, idx) => (
                  <div key={article.slug}>
                    <ArticleCard {...article} />
                    {idx === 1 && (
                      <AdSlot 
                        slotId={`infeed_home_${idx + 2}`} 
                        minHeight="250px" 
                        className="mt-6"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar - Desktop only */}
            <aside className="hidden md:block space-y-6">
              <AdSlot slotId="sidebar_mpu_1" minHeight="250px" />
              <AdSlot slotId="sidebar_mpu_2" minHeight="250px" />
            </aside>
          </section>

          {/* Sticky Bottom Ad - Mobile only */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
            <AdSlot slotId="sticky_bottom_mobile" minHeight="50px" />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
