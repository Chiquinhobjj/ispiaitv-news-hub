-- =====================================================
-- Sitemap Regeneration Cron Job Setup
-- =====================================================
-- Este arquivo configura um cron job para regenerar 
-- os sitemaps diariamente às 2 AM UTC
-- =====================================================

-- 1. Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Agendar regeneração diária de sitemaps
-- Executa todos os dias às 2:00 AM UTC
SELECT cron.schedule(
  'regenerate-sitemaps-daily',
  '0 2 * * *',
  $$
  SELECT net.http_post(
    url := 'https://[SEU-PROJECT-REF].supabase.co/functions/v1/generate-sitemaps',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer [SEU-ANON-KEY]"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);

-- 3. Verificar jobs agendados
-- Execute esta query para ver todos os cron jobs:
-- SELECT * FROM cron.job;

-- 4. Para remover o job (se necessário):
-- SELECT cron.unschedule('regenerate-sitemaps-daily');

-- =====================================================
-- INSTRUÇÕES DE CONFIGURAÇÃO:
-- =====================================================
-- 1. Substitua [SEU-PROJECT-REF] pela referência do seu projeto Supabase
--    Você pode encontrar em: Project Settings > API > Project URL
--    Exemplo: https://xyzcompany.supabase.co
--
-- 2. Substitua [SEU-ANON-KEY] pela sua chave anônima do Supabase
--    Você pode encontrar em: Project Settings > API > anon public
--
-- 3. Execute este SQL no Supabase SQL Editor
--
-- 4. Verifique se o cron job foi criado com sucesso:
--    SELECT * FROM cron.job WHERE jobname = 'regenerate-sitemaps-daily';
--
-- =====================================================
-- FORMATO DO CRON:
-- =====================================================
-- '0 2 * * *' significa:
--   - 0: minuto 0
--   - 2: hora 2 (2 AM)
--   - *: todos os dias do mês
--   - *: todos os meses
--   - *: todos os dias da semana
--
-- Exemplos de outros horários:
--   '0 */6 * * *'  - A cada 6 horas
--   '30 1 * * *'   - Todos os dias às 1:30 AM
--   '0 0 * * 0'    - Todo domingo à meia-noite
-- =====================================================
