import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersonalization, type Filter } from '@/hooks/usePersonalization';

const filters: { id: Filter; label: string }[] = [
  { id: 'para-voce', label: 'Para Você' },
  { id: 'local', label: 'Local' },
  { id: 'tecnologia', label: 'Tecnologia' },
  { id: 'saude', label: 'Saúde' },
  { id: 'negocios', label: 'Negócios' },
  { id: 'educacao', label: 'Educação' },
  { id: 'meio-ambiente', label: 'Meio Ambiente' },
];

interface PersonalizationBarProps {
  activeFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export const PersonalizationBar = ({ activeFilter, onFilterChange }: PersonalizationBarProps) => {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex items-center gap-3 overflow-x-auto py-3 scrollbar-hide">
          {/* Filter Chips */}
          <div className="flex gap-2 flex-shrink-0">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => onFilterChange(filter.id)}
                className="rounded-full transition-all duration-200 hover:scale-105"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Jornais Personalizados CTA */}
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 flex-shrink-0 ml-auto"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Jornais Personalizados
          </Button>
        </div>
      </div>
    </div>
  );
};
