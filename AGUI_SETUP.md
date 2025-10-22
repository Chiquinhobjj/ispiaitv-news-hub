# 🤖 AG-UI Protocol + XomanoAI Setup

## Visão Geral
XomanoAI é o agente conversacional do IspiAI, implementado usando o protocolo AG-UI puro (sem CopilotKit).

## Arquitetura

### Frontend (`@ag-ui/client`)
- **Cliente HTTP**: `src/ai/agentClient.ts`
- **Hook React**: `src/hooks/useXomanoAgent.ts`
- **UI Components**: `src/components/AgentSidebar.tsx`, `src/components/AgentStepChecklist.tsx`

### Backend (Edge Function)
- **Endpoint SSE**: `supabase/functions/xomano-ai/index.ts`
- **Provider**: Lovable AI (Google Gemini 2.5 Flash streaming)

## Eventos Suportados (AG-UI)

### Lifecycle Events
- `RUN_STARTED`: Início da execução
- `RUN_FINISHED`: Conclusão bem-sucedida
- `RUN_ERROR`: Erro durante execução

### Message Events
- `TEXT_MESSAGE_START`: Início de mensagem do agente
- `TEXT_MESSAGE_CONTENT`: Fragmento de texto (streaming)
- `TEXT_MESSAGE_END`: Fim da mensagem

### Tool Events
- `TOOL_CALL_START`: Início de chamada de ferramenta
- `TOOL_CALL_ARGS`: Argumentos da ferramenta (streaming)
- `TOOL_CALL_END`: Fim da chamada + resultado

### State Events
- `STATE_SNAPSHOT`: Estado completo do agente
- `STATE_DELTA`: Atualização incremental

### Custom Events (HITL)
- `CUSTOM/INTERRUPT`: Pausa para aprovação de plano
  - Payload: `{ steps: AgentStep[] }`

## Fluxo HITL (Human-in-the-Loop)

1. **Usuário envia prompt** → `startAgent(prompt)`
2. **Backend gera plano** → 5-10 passos estruturados
3. **Frontend exibe checklist** → `AgentStepChecklist`
4. **Usuário aprova passos** → `approveSteps(selectedIds)`
5. **Backend executa** → Streaming de resultados

## Configuração

### Variáveis de Ambiente
```env
# Frontend (.env)
VITE_AGENT_URL=/api/agent/xomano_ai

# Backend (Lovable Cloud)
LOVABLE_API_KEY=<auto-provisionado>
```

**Nota:** O `LOVABLE_API_KEY` é automaticamente provisionado pelo Lovable Cloud. Não é necessário configurá-lo manualmente.

### Uso Básico
```typescript
import { useXomanoAgent } from '@/hooks/useXomanoAgent';

function MyComponent() {
  const { state, startAgent, approveSteps } = useXomanoAgent();

  const handlePrompt = () => {
    startAgent('Crie um artigo sobre IA');
  };

  const handleApprove = () => {
    const selectedIds = state.steps
      .filter(s => s.checked)
      .map(s => s.id);
    approveSteps(selectedIds);
  };

  return (
    <div>
      {state.requiresApproval && (
        <AgentStepChecklist
          steps={state.steps}
          onApprove={handleApprove}
          isRunning={state.isRunning}
        />
      )}
    </div>
  );
}
```

## Integração no Layout

Para adicionar o XomanoAI ao seu aplicativo:

```typescript
import { useState } from 'react';
import { AgentSidebar } from '@/components/AgentSidebar';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

function App() {
  const [showAgent, setShowAgent] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <main className="flex-1">{/* Seu conteúdo */}</main>

      {showAgent && (
        <div className="w-96">
          <AgentSidebar />
        </div>
      )}

      <Button
        onClick={() => setShowAgent(!showAgent)}
        className="fixed bottom-4 right-4"
        size="icon"
      >
        <Bot />
      </Button>
    </div>
  );
}
```

## Arquivos Principais

| Arquivo | Descrição |
|---------|-----------|
| `src/ai/agentClient.ts` | Cliente HTTP AG-UI |
| `src/hooks/useXomanoAgent.ts` | Estado e lógica do agente |
| `src/components/AgentSidebar.tsx` | Interface principal |
| `src/components/AgentStepChecklist.tsx` | HITL checklist |
| `supabase/functions/xomano-ai/index.ts` | Backend SSE |
| `src/types/ag-ui.ts` | Tipos TypeScript |

## Configuração do Backend

### 1. Habilitar Lovable Cloud

✅ Lovable Cloud já está habilitado! Ele fornece acesso às Edge Functions e ao Lovable AI Gateway.

### 2. Habilitar Lovable AI

✅ Lovable AI já está habilitado! O `LOVABLE_API_KEY` é automaticamente provisionado - sem necessidade de configuração manual.

### 3. Deploy da Edge Function

A edge function `xomano-ai` será automaticamente deployada após suas alterações.

## Troubleshooting

### Erro: "Cannot connect to agent"
- Verifique se a Edge Function está deployada
- Confirme que Lovable Cloud e Lovable AI estão habilitados
- Verifique logs da Edge Function

### Checklist não aparece
- Verifique se `state.requiresApproval === true`
- Confira logs do console (`[AG-UI Event]`)

### Streaming não funciona
- Garanta que o backend está enviando eventos SSE corretos
- Formato: `event: TYPE\ndata: JSON\n\n`

### Erro de CORS
- A edge function já inclui headers CORS apropriados
- Verifique se `VITE_AGENT_URL` está configurado corretamente

## Próximos Passos

1. **Adicionar Tools Customizadas**
   - Busca de artigos
   - Geração de conteúdo
   - Análise de dados

2. **Melhorar HITL**
   - Editor de passos inline
   - Reordenação de passos
   - Estimativa de tempo

3. **Analytics**
   - Tracking de uso do agente
   - Métricas de aprovação de planos
   - Taxa de sucesso de execuções
