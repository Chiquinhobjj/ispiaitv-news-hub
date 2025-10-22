import { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useXomanoAgent } from '@/hooks/useXomanoAgent';
import { AgentStepChecklist } from './AgentStepChecklist';

export function AgentSidebar() {
  const [input, setInput] = useState('');
  const { state, logs, startAgent, approveSteps } = useXomanoAgent();

  const handleSend = () => {
    if (!input.trim()) return;
    startAgent(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full border-l bg-background">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">XomanoAI</h2>
        </div>
        <Badge variant={state.isRunning ? 'default' : 'secondary'}>
          {state.isRunning ? 'Executando' : 'Pronto'}
        </Badge>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Current Message */}
          {state.currentMessage && (
            <Card className="p-3">
              <p className="text-sm whitespace-pre-wrap">{state.currentMessage}</p>
            </Card>
          )}

          {/* Checklist de Aprovação */}
          {state.requiresApproval && state.steps.length > 0 && (
            <AgentStepChecklist
              steps={state.steps}
              onApprove={approveSteps}
              isRunning={state.isRunning}
            />
          )}

          {/* Logs */}
          <div className="space-y-1">
            {logs.slice(-10).map((log, i) => (
              <div key={i} className="text-xs flex items-center gap-2">
                <Badge variant={log.type === 'error' ? 'destructive' : 'outline'} className="text-xs">
                  {log.type}
                </Badge>
                <span className="text-muted-foreground">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite seu comando..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={state.isRunning}
        />
        <Button onClick={handleSend} disabled={state.isRunning} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
