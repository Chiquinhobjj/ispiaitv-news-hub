import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { ArrowLeft, FileText } from "lucide-react";

const Dossier = () => {
  const { id } = useParams();

  // Mock data
  const dossier = {
    title: "O Impacto da IA na Sociedade Brasileira",
    description: "Uma investigação completa sobre como a inteligência artificial está transformando setores-chave da sociedade brasileira, desde a saúde até a educação.",
    publishDate: "2025-10-15",
    updateDate: "2025-10-22",
  };

  const articles = [
    {
      slug: "ia-revoluciona-diagnostico-medico",
      title: "IA revoluciona diagnóstico médico",
      excerpt: "Sistema brasileiro atinge 95% de precisão.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600",
      category: "Saúde",
      publishDate: "2025-10-22",
    },
    {
      slug: "educacao-publica-adota-ia",
      title: "Educação pública adota IA",
      excerpt: "500 escolas em programa piloto.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
      category: "Educação",
      publishDate: "2025-10-19",
    },
    {
      slug: "startup-brasileira-capta-investimento",
      title: "Startup brasileira capta R$ 100 milhões",
      excerpt: "Investimento impulsiona IA generativa.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600",
      category: "Negócios",
      publishDate: "2025-10-20",
    },
  ];

  return (
    <>
      <SEOHead 
        title={dossier.title}
        description={dossier.description}
        canonical={`https://ispiai.com/dossies/${id}`}
      />
      
      <div className="min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-smooth">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para Home
            </Link>
          </nav>

          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center space-x-2 text-accent mb-4">
              <FileText className="h-6 w-6" />
              <span className="text-sm font-medium uppercase tracking-wide">Dossiê</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {dossier.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {dossier.description}
            </p>

            <div className="text-sm text-muted-foreground">
              Publicado em <time dateTime={dossier.publishDate}>15 de outubro de 2025</time>
              {" • "}
              Atualizado em <time dateTime={dossier.updateDate}>22 de outubro de 2025</time>
            </div>
          </div>

          {/* Articles */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Matérias do dossiê</h2>
            
            <div className="space-y-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dossier;
