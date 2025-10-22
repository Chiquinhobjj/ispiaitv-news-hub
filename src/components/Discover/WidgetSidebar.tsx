import { Cloud, TrendingUp, Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * Sidebar with weather, market, and trending widgets
 */
export const WidgetSidebar = () => {
  return (
    <aside className="hidden lg:block space-y-6 sticky top-20">
      {/* Weather Widget */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Clima</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">São Paulo</span>
            <span className="text-2xl font-bold">24°C</span>
          </div>
          <p className="text-xs text-muted-foreground">Parcialmente nublado</p>
        </div>
      </Card>

      {/* Market Widget */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Mercados</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">IBOV</span>
            <div className="text-right">
              <p className="text-sm font-medium">125.432</p>
              <p className="text-xs text-green-500">+1.2%</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">USD/BRL</span>
            <div className="text-right">
              <p className="text-sm font-medium">5.42</p>
              <p className="text-xs text-red-500">-0.8%</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Trending Topics */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Em Alta</h3>
        </div>
        <div className="space-y-2">
          {['IA Generativa', 'Sustentabilidade', 'Web3', 'Saúde Digital'].map((topic, i) => (
            <Badge key={i} variant="secondary" className="mr-2">
              {topic}
            </Badge>
          ))}
        </div>
      </Card>
    </aside>
  );
};
