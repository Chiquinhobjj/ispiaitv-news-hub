import { HttpAgent } from '@ag-ui/client';
import { Observable } from 'rxjs';
import { AgentEvent } from '@/types/ag-ui';

export const xomano = new HttpAgent({
  url: import.meta.env.VITE_AGENT_URL || '/api/agent/xomano_ai',
});

export interface RunXomanoOptions {
  tools?: Array<{ name: string; description: string; parameters: any }>;
  context?: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
  approvedSteps?: string[];
}

export function runXomano(options: RunXomanoOptions = {}): Observable<AgentEvent> {
  // Convert context to AG-UI format and inject metadata
  const agContext: Array<{ value: string; description: string }> = (options.context || []).map(msg => ({
    value: msg.content,
    description: msg.role,
  }));

  // Add approvedSteps to context if present
  if (options.approvedSteps && options.approvedSteps.length > 0) {
    agContext.push({
      value: JSON.stringify({ approvedSteps: options.approvedSteps }),
      description: 'metadata',
    });
  }

  const result = xomano.runAgent({
    tools: options.tools || [],
    context: agContext,
  });

  // Handle both Promise and Observable return types
  if ('then' in result) {
    // If it's a Promise, convert to Observable
    return new Observable((subscriber) => {
      result.then((data: any) => {
        subscriber.next(data as AgentEvent);
        subscriber.complete();
      }).catch((error: any) => {
        subscriber.error(error);
      });
    });
  }

  return result as Observable<AgentEvent>;
}

export function continueXomano(runId: string, approvedSteps: string[]): Observable<AgentEvent> {
  return runXomano({
    context: [{ role: 'system', content: `Continue execution with approved steps: ${approvedSteps.join(', ')}` }],
    approvedSteps,
  });
}
