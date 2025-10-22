import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
};

interface AgentStep {
  id: string;
  description: string;
  checked: boolean;
  status: 'pending' | 'running' | 'completed' | 'skipped';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const { context = [], tools = [], metadata = {} } = await req.json();
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  const AI_MODEL = 'google/gemini-2.5-flash'; // Lovable AI default model

  // Extract metadata from context if present
  let approvedSteps: string[] | null = null;
  const cleanContext = context.filter((item: any) => {
    if (item.description === 'metadata') {
      try {
        const meta = JSON.parse(item.value);
        approvedSteps = meta.approvedSteps || null;
        return false;
      } catch {
        return true;
      }
    }
    return true;
  });

  if (!LOVABLE_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'LOVABLE_API_KEY not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (type: string, data: any) => {
        const event = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(event));
      };

      try {
        // 1. Emit RUN_STARTED
        const runId = crypto.randomUUID();
        sendEvent('RUN_STARTED', { runId });

        // 2. Check if we need to generate a plan (no approvedSteps)
        if (!approvedSteps) {
          // Generate planning steps
          const userPrompt = cleanContext[cleanContext.length - 1]?.value || 'Sem contexto';
          const planningPrompt = `Generate 5-10 actionable steps for: "${userPrompt}". Return ONLY a JSON array with format: [{"id":"step_1","description":"...","checked":true,"status":"pending"}]. No markdown, no explanations, just the JSON array.`;
          
          const planningResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${LOVABLE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: AI_MODEL,
              messages: [
                { role: 'system', content: 'You are a planning assistant. Generate concise, actionable steps in JSON format.' },
                { role: 'user', content: planningPrompt }
              ],
            }),
          });

          const planData = await planningResponse.json();
          const stepsText = planData.choices[0]?.message?.content || '[]';
          
          let steps: AgentStep[];
          try {
            // Remove markdown code blocks if present
            const cleanedText = stepsText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            steps = JSON.parse(cleanedText);
          } catch (e) {
            console.error('Failed to parse steps:', e, stepsText);
            // Fallback if JSON parsing fails
            steps = [
              { id: 'step_1', description: 'Analisar requisitos', checked: true, status: 'pending' },
              { id: 'step_2', description: 'Gerar solução', checked: true, status: 'pending' },
              { id: 'step_3', description: 'Validar resultado', checked: true, status: 'pending' },
            ];
          }

          // Emit STATE_SNAPSHOT with steps
          sendEvent('STATE_SNAPSHOT', { steps, requiresApproval: true });

          // Emit CUSTOM/INTERRUPT to pause and wait for approval
          sendEvent('CUSTOM/INTERRUPT', { steps });

          controller.close();
          return;
        }

        // 3. Execute approved steps
        sendEvent('TEXT_MESSAGE_START', { messageId: 'msg_1' });

        const executionPrompt = `Execute the following approved steps: ${approvedSteps.join(', ')}. Context: ${JSON.stringify(cleanContext)}`;

        const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: AI_MODEL,
            messages: [
              { role: 'system', content: 'You are XomanoAI, a helpful assistant for IspiAI journalism platform.' },
              ...cleanContext.map((item: any) => ({ role: item.description, content: item.value })),
              { role: 'user', content: executionPrompt }
            ],
            stream: true,
            tools: tools.length > 0 ? tools : undefined,
          }),
        });

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (!line.trim() || line.startsWith(':')) continue;
            if (!line.startsWith('data: ')) continue;

            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;

              if (content) {
                sendEvent('TEXT_MESSAGE_CONTENT', { content });
              }

              // Handle tool calls if present
              const toolCall = parsed.choices?.[0]?.delta?.tool_calls?.[0];
              if (toolCall) {
                if (toolCall.function?.name) {
                  sendEvent('TOOL_CALL_START', { 
                    toolName: toolCall.function.name, 
                    callId: toolCall.id 
                  });
                }
                if (toolCall.function?.arguments) {
                  sendEvent('TOOL_CALL_ARGS', { args: toolCall.function.arguments });
                }
              }
            } catch (e) {
              console.error('Parse error:', e);
            }
          }
        }

        sendEvent('TEXT_MESSAGE_END', { messageId: 'msg_1' });
        sendEvent('RUN_FINISHED', { runId });
        controller.close();

      } catch (error) {
        console.error('Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        sendEvent('RUN_ERROR', { error: errorMessage });
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: corsHeaders });
});
