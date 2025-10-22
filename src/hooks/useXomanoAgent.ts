import { useState, useCallback } from 'react';
import { runXomano, continueXomano } from '@/ai/agentClient';
import { AgentState, AgentStep, AgentEvent } from '@/types/ag-ui';
import { EventType } from '@ag-ui/client';
import { useToast } from '@/hooks/use-toast';

export function useXomanoAgent() {
  const { toast } = useToast();
  const [state, setState] = useState<AgentState>({
    steps: [],
    currentMessage: '',
    isRunning: false,
    requiresApproval: false,
  });
  const [logs, setLogs] = useState<Array<{ timestamp: Date; type: string; message: string }>>([]);
  const [currentRunId, setCurrentRunId] = useState<string | null>(null);

  const addLog = useCallback((type: string, message: string) => {
    setLogs(prev => [...prev, { timestamp: new Date(), type, message }]);
  }, []);

  const startAgent = useCallback((prompt: string, tools: any[] = []) => {
    setState(prev => ({ ...prev, isRunning: true, currentMessage: '' }));
    addLog('info', `Starting agent with prompt: ${prompt}`);

    const subscription = runXomano({
      context: [{ role: 'user', content: prompt }],
      tools,
    }).subscribe({
      next: (event: AgentEvent) => {
        console.log('[AG-UI Event]', event);

        switch (event.type) {
          case EventType.RUN_STARTED:
            setCurrentRunId(event.data.runId);
            addLog('success', `Run started: ${event.data.runId}`);
            break;

          case EventType.TEXT_MESSAGE_CONTENT:
            setState(prev => ({
              ...prev,
              currentMessage: prev.currentMessage + event.data.content,
            }));
            break;

          case EventType.TEXT_MESSAGE_END:
            addLog('info', 'Message completed');
            break;

          case EventType.TOOL_CALL_START:
            addLog('tool', `Tool called: ${event.data.toolName}`);
            break;

          case EventType.STATE_SNAPSHOT:
            setState(prev => ({ ...prev, ...event.data }));
            break;

          case EventType.STATE_DELTA:
            setState(prev => ({ ...prev, ...event.data }));
            break;

          case 'CUSTOM/INTERRUPT':
            setState(prev => ({
              ...prev,
              steps: event.data.steps,
              requiresApproval: true,
              isRunning: false,
            }));
            addLog('warning', 'Plan requires approval');
            break;

          case EventType.RUN_FINISHED:
            setState(prev => ({ ...prev, isRunning: false }));
            addLog('success', 'Run completed');
            break;

          case EventType.RUN_ERROR:
            setState(prev => ({ ...prev, isRunning: false }));
            addLog('error', `Error: ${event.data.error}`);
            toast({
              title: 'Erro no Agente',
              description: event.data.error,
              variant: 'destructive',
            });
            break;
        }
      },
      error: (err) => {
        console.error('[AG-UI Error]', err);
        addLog('error', err.message);
        setState(prev => ({ ...prev, isRunning: false }));
        toast({
          title: 'Erro de Conexão',
          description: 'Não foi possível conectar ao agente',
          variant: 'destructive',
        });
      },
    });

    return () => subscription.unsubscribe();
  }, [addLog, toast]);

  const approveSteps = useCallback((approvedStepIds: string[]) => {
    if (!currentRunId) return;

    setState(prev => ({ ...prev, isRunning: true, requiresApproval: false }));
    addLog('info', `Approved steps: ${approvedStepIds.join(', ')}`);

    const subscription = continueXomano(currentRunId, approvedStepIds).subscribe({
      next: (event: AgentEvent) => {
        console.log('[AG-UI Continue]', event);

        switch (event.type) {
          case EventType.TEXT_MESSAGE_CONTENT:
            setState(prev => ({
              ...prev,
              currentMessage: prev.currentMessage + event.data.content,
            }));
            break;

          case EventType.RUN_FINISHED:
            setState(prev => ({ ...prev, isRunning: false }));
            addLog('success', 'Execution completed');
            break;

          case EventType.RUN_ERROR:
            setState(prev => ({ ...prev, isRunning: false }));
            addLog('error', `Error: ${event.data.error}`);
            break;
        }
      },
      error: (err) => {
        console.error('[AG-UI Continue Error]', err);
        addLog('error', err.message);
        setState(prev => ({ ...prev, isRunning: false }));
      },
    });

    return () => subscription.unsubscribe();
  }, [currentRunId, addLog]);

  return {
    state,
    logs,
    startAgent,
    approveSteps,
  };
}
