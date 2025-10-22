import { Shield, Info } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BoxTransparenciaProps {
  author?: string;
  publishDate?: string;
  updateDate?: string;
  sources?: string[];
  disclaimer?: string;
}

const BoxTransparencia = ({ 
  author = "Redação IspiAI",
  publishDate,
  updateDate,
  sources = [],
  disclaimer
}: BoxTransparenciaProps) => {
  return (
    <Card className="p-6 bg-secondary/50 border-l-4 border-l-primary space-y-4">
      <div className="flex items-center space-x-2 text-primary">
        <Shield className="h-5 w-5" />
        <h3 className="font-bold text-lg">Transparência</h3>
      </div>

      <div className="space-y-3 text-sm">
        {author && (
          <div>
            <span className="font-medium">Autor:</span> {author}
          </div>
        )}

        {publishDate && (
          <div>
            <span className="font-medium">Publicado:</span>{" "}
            <time dateTime={publishDate}>{publishDate}</time>
          </div>
        )}

        {updateDate && (
          <div>
            <span className="font-medium">Atualizado:</span>{" "}
            <time dateTime={updateDate}>{updateDate}</time>
          </div>
        )}

        {sources.length > 0 && (
          <div>
            <span className="font-medium">Fontes consultadas:</span>
            <ul className="mt-1 ml-4 list-disc space-y-1">
              {sources.map((source, idx) => (
                <li key={idx} className="text-muted-foreground">{source}</li>
              ))}
            </ul>
          </div>
        )}

        {disclaimer && (
          <div className="flex gap-2 pt-3 border-t">
            <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">{disclaimer}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BoxTransparencia;
