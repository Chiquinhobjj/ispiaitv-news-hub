import { EventType } from '@ag-ui/client';

export interface AgentStep {
  id: string;
  description: string;
  checked: boolean;
  status: 'pending' | 'running' | 'completed' | 'skipped';
}

export interface AgentState {
  steps: AgentStep[];
  currentMessage: string;
  isRunning: boolean;
  requiresApproval: boolean;
}

export type AgentEvent = 
  | { type: EventType.RUN_STARTED; data: { runId: string } }
  | { type: EventType.TEXT_MESSAGE_START; data: { messageId: string } }
  | { type: EventType.TEXT_MESSAGE_CONTENT; data: { content: string } }
  | { type: EventType.TEXT_MESSAGE_END; data: { messageId: string } }
  | { type: EventType.TOOL_CALL_START; data: { toolName: string; callId: string } }
  | { type: EventType.TOOL_CALL_ARGS; data: { args: string } }
  | { type: EventType.TOOL_CALL_END; data: { callId: string; result: any } }
  | { type: EventType.STATE_SNAPSHOT; data: AgentState }
  | { type: EventType.STATE_DELTA; data: Partial<AgentState> }
  | { type: EventType.RUN_FINISHED; data: { runId: string } }
  | { type: EventType.RUN_ERROR; data: { error: string } }
  | { type: 'CUSTOM/INTERRUPT'; data: { steps: AgentStep[] } };
