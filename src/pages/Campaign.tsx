import { useParams, Link } from "react-router-dom";
import { Shell } from "@/components/Layout/Shell";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { ArrowLeft, Megaphone } from "lucide-react";
import { Card } from "@/components/ui/card";

const Campaign = () => {
  const { id } = useParams();

  // Mock data
  const campaign = {
    title: "Transparência em IA: Por que importa?",
    description: "Campanha de conscientização sobre a importância da transparência e explicabilidade em sistemas de inteligência artificial.",
    startDate: "2025-10-01",
    objectives: [
      "Educar o público sobre IA transparente",
      "Pressionar empresas por mais clareza",
      "Promover legislação adequada",
    ],
  };

  const articles = [
    {
      slug: "o-que-e-ia-explicavel",
      title: "O que é IA explicável e por que você deve se importar",
      excerpt: "Entenda como sistemas transparentes protegem seus direitos.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
      category: "Educação",
      publishDate: "2025-10-05",
    },
    {
      slug: "empresas-ocultam-algoritmos",
      title: "Investigação: empresas ocultam como seus algoritmos funcionam",
      excerpt: "Levantamento revela falta de transparência em big techs.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
      category: "Investigação",
      publishDate: "2025-10-10",
    },
  ];

  return (
    <Shell>
      <SEOHead 
        title={campaign.title}
        description={campaign.description}
        canonical={`https://ispiai.com/campanhas/${id}`}
      />
      
      <div className="container mx-auto px-4 py-8">
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
              <Megaphone className="h-6 w-6" />
              <span className="label">Campanha</span>
            </div>

            <h1 className="heading-xl mb-6">
              {campaign.title}
            </h1>

            <p className="lead mb-8">
              {campaign.description}
            </p>

            {/* Objectives */}
            <Card className="p-6 bg-secondary/50">
              <h3 className="heading-sm mb-4">Objetivos da campanha</h3>
              <ul className="space-y-2">
                {campaign.objectives.map((objective, idx) => (
                  <li key={idx} className="flex items-start body-base">
                    <span className="inline-block w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Articles */}
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-md mb-6">Conteúdo da campanha</h2>
            
            <div className="space-y-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </div>
      </div>
    </Shell>
  );
};

export default Campaign;
