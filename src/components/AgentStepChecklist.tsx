import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AgentStep } from '@/types/ag-ui';
import { CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react';

interface AgentStepChecklistProps {
  steps: AgentStep[];
  onApprove: (approvedStepIds: string[]) => void;
  isRunning: boolean;
}

export function AgentStepChecklist({ steps, onApprove, isRunning }: AgentStepChecklistProps) {
  const [selectedSteps, setSelectedSteps] = useState<Set<string>>(
    new Set(steps.filter(s => s.checked).map(s => s.id))
  );

  const toggleStep = (stepId: string) => {
    setSelectedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  const handleApprove = () => {
    onApprove(Array.from(selectedSteps));
  };

  const getStepIcon = (step: AgentStep) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'running':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'skipped':
        return <XCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <Circle className="h-4 w-4 text-gray-300" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plano de Ação do XomanoAI</CardTitle>
        <CardDescription>
          Revise e aprove os passos que o agente deve executar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
            <Checkbox
              id={step.id}
              checked={selectedSteps.has(step.id)}
              onCheckedChange={() => toggleStep(step.id)}
              disabled={isRunning}
            />
            {getStepIcon(step)}
            <label
              htmlFor={step.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
            >
              {step.description}
            </label>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleApprove} 
          disabled={isRunning || selectedSteps.size === 0}
          className="w-full"
        >
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Executando...
            </>
          ) : (
            `Executar ${selectedSteps.size} ${selectedSteps.size === 1 ? 'passo' : 'passos'}`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
