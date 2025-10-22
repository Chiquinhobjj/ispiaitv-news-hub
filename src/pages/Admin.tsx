import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Shell } from '@/components/Layout/Shell';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArticleForm } from '@/components/Admin/ArticleForm';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Admin = () => {
  const { user, role, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || (role !== 'admin' && role !== 'editor'))) {
      navigate('/auth');
    }
  }, [user, role, authLoading, navigate]);

  const { data: articles, isLoading, refetch } = useQuery({
    queryKey: ['admin-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user && (role === 'admin' || role === 'editor'),
  });

  if (authLoading || !user) {
    return (
      <Shell>
        <div className="container py-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <SEOHead
        title="Admin - IspiAI"
        description="Painel administrativo do IspiAI"
      />

      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie artigos, shorts e campanhas</p>
          </div>

          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Artigo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Criar Novo Artigo</DialogTitle>
                <DialogDescription>
                  Preencha os dados do artigo abaixo
                </DialogDescription>
              </DialogHeader>
              <ArticleForm
                onSuccess={() => {
                  setShowForm(false);
                  refetch();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList>
            <TabsTrigger value="articles">Artigos</TabsTrigger>
            <TabsTrigger value="shorts">Shorts</TabsTrigger>
            <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="mt-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {articles?.map((article) => (
                  <div
                    key={article.id}
                    className="border rounded-lg p-4 hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                            {article.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {article.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(article.created_at).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="shorts" className="mt-6">
            <p className="text-muted-foreground">Gerenciamento de shorts em breve...</p>
          </TabsContent>

          <TabsContent value="campaigns" className="mt-6">
            <p className="text-muted-foreground">Gerenciamento de campanhas em breve...</p>
          </TabsContent>
        </Tabs>
      </div>
    </Shell>
  );
};

export default Admin;
