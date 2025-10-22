import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Search from "./pages/Search";
import Dossier from "./pages/Dossier";
import Campaign from "./pages/Campaign";
import NotFound from "./pages/NotFound";
import { AgentSidebar } from "./components/AgentSidebar";

const queryClient = new QueryClient();

const App = () => {
  const [showAgent, setShowAgent] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="flex h-screen w-full overflow-hidden">
          <div className="flex-1 overflow-auto">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/noticias/:slug" element={<Article />} />
                <Route path="/dossies/:id" element={<Dossier />} />
                <Route path="/busca" element={<Search />} />
                <Route path="/campanhas/:id?" element={<Campaign />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>

          {/* Agent Sidebar */}
          {showAgent && (
            <div className="w-96 h-screen">
              <AgentSidebar />
            </div>
          )}

          {/* Toggle Button */}
          <Button
            onClick={() => setShowAgent(!showAgent)}
            className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
            size="icon"
            aria-label={showAgent ? "Fechar XomanoAI" : "Abrir XomanoAI"}
          >
            {showAgent ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
          </Button>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
