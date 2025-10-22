import { useState } from "react";
import { Shell } from "@/components/Layout/Shell";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [query, setQuery] = useState("");

  // Mock search results
  const results = [
    {
      slug: "ia-revoluciona-diagnostico-medico",
      title: "Inteligência Artificial revoluciona diagnóstico médico no Brasil",
      excerpt: "Sistema desenvolvido por startup brasileira atinge taxa de precisão de 95%.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600",
      category: "Tecnologia",
      publishDate: "2025-10-22",
    },
    {
      slug: "nova-politica-privacidade-europa",
      title: "Europa aprova nova política de privacidade para IA",
      excerpt: "Legislação mais restritiva do mundo entra em vigor em 2026.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
      category: "Política",
      publishDate: "2025-10-21",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <Shell>
      <SEOHead 
        title="Busca"
        description="Busque notícias, análises e dossiês no portal IspiAI"
        canonical="https://ispiai.com/busca"
      />
      
      <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="heading-xl mb-8">Buscar</h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-12">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    type="search"
                    placeholder="Digite sua busca..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <Button type="submit" size="lg" className="px-8">
                  Buscar
                </Button>
              </div>
            </form>

            {/* Results */}
            {query && (
              <div className="space-y-6">
                <p className="body-base text-muted-foreground">
                  Encontrados <strong>{results.length} resultados</strong> para "{query}"
                </p>

                <div className="space-y-6">
                  {results.map((result) => (
                    <ArticleCard key={result.slug} {...result} />
                  ))}
                </div>
              </div>
            )}

            {!query && (
              <div className="text-center py-12">
                <SearchIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <p className="body-base text-muted-foreground">
                  Digite algo para começar a busca
                </p>
              </div>
            )}
          </div>
      </div>
    </Shell>
  );
};

export default Search;
