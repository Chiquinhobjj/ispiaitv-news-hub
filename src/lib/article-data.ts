import type { Article } from './sitemap-generator';

/**
 * Mock data para desenvolvimento
 * Em produção: substituir por fetch da API/CMS/Supabase
 */
export async function fetchAllArticles(): Promise<Article[]> {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 47 * 60 * 60 * 1000);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return [
    {
      slug: "ia-revoluciona-diagnostico-medico",
      title: "Inteligência Artificial revoluciona diagnóstico médico no Brasil",
      category: "Tecnologia",
      publishDate: yesterday.toISOString(),
      modifiedDate: now.toISOString(),
      keywords: ["inteligência artificial", "saúde", "startups", "brasil"]
    },
    {
      slug: "algoritmos-reconhecimento-facial-discriminacao",
      title: "Algoritmos de reconhecimento facial e casos de discriminação aumentam 40%",
      category: "Sociedade",
      publishDate: twoDaysAgo.toISOString(),
      modifiedDate: twoDaysAgo.toISOString(),
      keywords: ["reconhecimento facial", "discriminação", "privacidade"]
    },
    {
      slug: "startup-brasileira-levanta-milhoes",
      title: "Startup brasileira de IA levanta R$ 50 milhões em rodada Série A",
      category: "Negócios",
      publishDate: weekAgo.toISOString(),
      modifiedDate: weekAgo.toISOString(),
      keywords: ["startups", "investimentos", "brasil", "venture capital"]
    }
  ];
}
