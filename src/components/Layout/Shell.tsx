import { useState } from 'react';
import Header from '@/components/Header';
import { Footer } from './Footer';
import { AgentSidebar } from '@/components/AgentSidebar';
import { MessageCircle } from 'lucide-react';
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
      {showAgent && <AgentSidebar />}

      {/* Floating Agent Button */}
      <Button
        onClick={() => setShowAgent(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-elevated hover:shadow-elevated hover:scale-110 transition-all duration-200 z-50"
        size="icon"
        aria-label="Abrir assistente IspiAI"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};
