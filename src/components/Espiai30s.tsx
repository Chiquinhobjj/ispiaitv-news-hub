import { Clock, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Espiai30sProps {
  summary: string;
  lastUpdate: string;
  sources: { title: string; url: string }[];
}

const Espiai30s = ({ summary, lastUpdate, sources }: Espiai30sProps) => {
  return (
    <Card className="p-6 space-y-4 border-l-4 border-l-accent">
      <div className="flex items-center space-x-2 text-accent">
        <Clock className="h-5 w-5" />
        <h3 className="font-bold text-lg">Espiai em 30s</h3>
      </div>

      <p className="text-sm leading-relaxed">{summary}</p>

      <div className="pt-4 border-t space-y-2">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          Atualizado: {lastUpdate}
        </div>

        {sources.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Fontes:</p>
            {sources.map((source, idx) => (
              <a
                key={idx}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-primary hover:text-primary-hover transition-smooth"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                {source.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Espiai30s;
