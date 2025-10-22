import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import Espiai30s from "@/components/Espiai30s";
import LinhaDoTempo from "@/components/LinhaDoTempo";
import BoxTransparencia from "@/components/BoxTransparencia";
import RelatedArticles from "@/components/RelatedArticles";
import AdSlot from "@/components/AdSlot";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Article = () => {
  const { slug } = useParams();

  // Mock data - será substituído por dados reais
  const article = {
    title: "Inteligência Artificial revoluciona diagnóstico médico no Brasil",
    excerpt: "Sistema desenvolvido por startup brasileira atinge taxa de precisão de 95% na detecção precoce de câncer.",
    content: `
      <p>Um sistema de inteligência artificial desenvolvido por uma startup brasileira está revolucionando o diagnóstico médico no país. O algoritmo, que utiliza deep learning para analisar imagens médicas, atingiu uma taxa de precisão de 95% na detecção precoce de diversos tipos de câncer.</p>

      <p>A tecnologia foi desenvolvida ao longo de três anos por uma equipe de 20 pesquisadores e engenheiros, em parceria com cinco hospitais de referência. O sistema foi treinado com mais de 500 mil exames anonimizados, garantindo a privacidade dos pacientes.</p>

      <h2>Como funciona a tecnologia</h2>

      <p>O algoritmo analisa imagens de tomografias, ressonâncias magnéticas e raios-X, identificando padrões sutis que podem passar despercebidos até mesmo por radiologistas experientes. Em testes clínicos, o sistema demonstrou capacidade de detectar tumores em estágios iniciais, quando as chances de cura são significativamente maiores.</p>

      <p>Segundo a Dra. Maria Silva, oncologista e uma das coordenadoras do projeto, "esta tecnologia não substitui o médico, mas funciona como uma segunda opinião extremamente precisa, ajudando a reduzir o tempo de diagnóstico e aumentar as chances de sucesso no tratamento".</p>

      <h2>Impacto no sistema de saúde</h2>

      <p>A implementação da IA no sistema público de saúde pode representar economia de bilhões de reais, além de salvar milhares de vidas anualmente. O Ministério da Saúde já manifestou interesse em avaliar a tecnologia para possível adoção em hospitais públicos.</p>

      <p>A startup planeja expandir o sistema para outros tipos de diagnósticos médicos nos próximos meses, incluindo doenças cardíacas e neurológicas.</p>
    `,
    images: [
      {
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=675",
        width: 1200,
        height: 675
      },
      {
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=1200",
        width: 1200,
        height: 1200
      }
    ],
    category: "Tecnologia",
    tags: ["inteligência artificial", "saúde", "startups", "brasil", "diagnóstico médico"],
    publishDate: "2025-10-22T10:00:00-03:00",
    updateDate: "2025-10-22T14:30:00-03:00",
    author: {
      name: "João Santos",
      url: "https://ispiai.com/autores/joao-santos"
    },
  };

  // Calcular wordCount do conteúdo HTML
  const calculateWordCount = (html: string): number => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.trim().split(/\s+/).length;
  };

  const wordCount = calculateWordCount(article.content);

  const timelineEvents = [
    {
      date: "2022-03-15",
      title: "Início do projeto",
      description: "Startup anuncia desenvolvimento de IA para diagnóstico médico"
    },
    {
      date: "2023-08-20",
      title: "Parceria com hospitais",
      description: "Cinco hospitais de referência juntam-se ao projeto"
    },
    {
      date: "2024-11-10",
      title: "Fase de testes",
      description: "Início dos testes clínicos com pacientes reais"
    },
    {
      date: "2025-10-22",
      title: "Resultados divulgados",
      description: "Sistema atinge 95% de precisão em detecção precoce"
    },
  ];

  const relatedArticles = [
    {
      slug: "ia-na-medicina-etica",
      title: "Questões éticas do uso de IA na medicina",
      category: "Análise",
    },
    {
      slug: "startups-brasileiras-saude",
      title: "Startups brasileiras lideram inovação em saúde",
      category: "Negócios",
    },
  ];

  return (
    <>
      <SEOHead 
        title={article.title}
        description={article.excerpt}
        image={article.images[0].url}
        canonical={`https://ispiai.com/noticias/${slug}`}
        article={{
          headline: article.title,
          description: article.excerpt,
          images: article.images.map(img => ({
            "@type": "ImageObject",
            url: img.url,
            width: img.width,
            height: img.height
          })),
          datePublished: article.publishDate,
          dateModified: article.updateDate,
          author: {
            "@type": "Person",
            name: article.author.name,
            url: article.author.url
          },
          publisher: {
            name: "IspiAI",
            logo: {
              "@type": "ImageObject",
              url: "https://ispiai.com/logo.png",
              width: 200,
              height: 60
            }
          },
          articleSection: article.category,
          url: `https://ispiai.com/noticias/${slug}`,
          keywords: article.tags,
          wordCount: wordCount
        }}
      />
      
      <div className="min-h-screen">
        <Header />
        
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-smooth">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para Home
            </Link>
          </nav>

          {/* Category */}
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wide mb-4">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b">
            <div className="text-sm text-muted-foreground">
              Por <span className="font-medium text-foreground">{article.author.name}</span>
              {" • "}
              <time dateTime={article.publishDate}>22 de outubro de 2025</time>
            </div>
            
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>

          {/* Featured Image */}
          <div className="aspect-video mb-8 rounded-xl overflow-hidden">
            <img 
              src={article.images[0].url} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Espiai 30s */}
          <Espiai30s 
            summary="Sistema de IA brasileira detecta câncer com 95% de precisão. Desenvolvido em 3 anos com 500 mil exames. Ministério da Saúde avalia adoção no SUS."
            lastUpdate="22/10/2025 14:30"
            sources={[
              { title: "Paper científico publicado", url: "#" },
              { title: "Entrevista com coordenadora", url: "#" },
            ]}
          />

          {/* Mid-article Ad */}
          <AdSlot slotId="article_mid" minHeight="250px" className="my-8" />

          {/* Article Content */}
          <div 
            className="article-content my-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* In-article Ad */}
          <AdSlot slotId="inarticle_1" minHeight="250px" className="my-8" />

          {/* Timeline */}
          <div className="my-12">
            <LinhaDoTempo events={timelineEvents} />
          </div>

          {/* Transparency Box */}
          <BoxTransparencia 
            author={article.author.name}
            publishDate="22 de outubro de 2025"
            updateDate="22 de outubro de 2025, 14:30"
            sources={[
              "Comunicado oficial da startup",
              "Entrevistas com equipe médica",
              "Análise de paper científico",
            ]}
            disclaimer="Esta matéria foi produzida com base em fontes verificadas e informações públicas. Caso identifique algum erro, entre em contato conosco."
          />

          {/* Related Articles */}
          <div className="mt-12">
            <RelatedArticles articles={relatedArticles} />
          </div>
        </article>

        {/* Sticky Bottom Ad - Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
          <AdSlot slotId="sticky_bottom_mobile" minHeight="50px" />
        </div>
      </div>
    </>
  );
};

export default Article;
