import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AgentSidebar } from '@/components/AgentSidebar';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonalizationBar } from '@/components/Personalization/PersonalizationBar';
import { usePersonalization } from '@/hooks/usePersonalization';

interface ShellProps {
  children: React.ReactNode;
  showPersonalization?: boolean;
}

/**
 * Main layout shell with Header, Footer, and XomanoAI agent
 */
export const Shell = ({ children, showPersonalization = false }: ShellProps) => {
  const [showAgent, setShowAgent] = useState(false);
  const { activeFilter, setActiveFilter } = usePersonalization();

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      
      {showPersonalization && (
        <PersonalizationBar 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      )}

      <main className="flex-1">
        {children}
      </main>

      <Footer />

      {/* XomanoAI Agent Sidebar */}
      {showAgent && (
        <div className="fixed right-0 top-0 h-screen w-96 z-40 bg-background border-l shadow-lg">
          <AgentSidebar />
        </div>
      )}

      {/* Floating Agent Button */}
      <Button
        onClick={() => setShowAgent(!showAgent)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-elevated hover:shadow-elevated hover:scale-110 transition-all duration-200 z-50"
        size="icon"
        aria-label={showAgent ? "Fechar assistente" : "Abrir assistente IspiAI"}
      >
        {showAgent ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
};
