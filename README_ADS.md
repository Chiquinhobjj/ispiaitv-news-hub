# 📰 IspiAI - Ad System Documentation

Sistema de anúncios do IspiAI usando Google Publisher Tag (GPT) com otimizações para performance, viewability e Better Ads compliance.

---

## 🚀 Quick Start

### 1. Configurar Variáveis de Ambiente

Copie `.env.example` para `.env` e preencha:

```bash
VITE_GPT_NETWORK_CODE=12345678        # Seu Network Code do Ad Manager
VITE_GPT_PUBLISHER_ID=pub-XXXXXXXXXX  # Seu Publisher ID (se usar AdSense)
VITE_GPT_LIMITED_ADS=true             # Ativar ads não personalizados (GDPR)
```

### 2. Atualizar ads.txt

Edite `public/ads.txt` com seu Publisher ID:

```
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
```

### 3. Validar e Build

```bash
npm run validate:ads  # Validar configuração
npm run build         # Build incluirá validação
```

---

## 📍 Ad Placements

| Slot | Página | Dispositivo | Tamanhos | Posição |
|------|--------|-------------|----------|---------|
| `top_leaderboard` | Home | Desktop/Tablet | 970×250, 728×90 | Above-the-fold |
| `infeed_home_[1-2]` | Home | Todos | 300×250, 320×250 | Entre blocos |
| `sidebar_mpu_[1-2]` | Home | Desktop | 300×250, 300×600 | Sidebar direita |
| `article_mid` | Article | Todos | 728×90, 300×250 | Após 1º bloco |
| `inarticle_[1-2]` | Article | Todos | 300×250, 336×280 | Meio do conteúdo |
| `sticky_bottom_mobile` | Todas | Mobile | 320×50, 320×100 | Rodapé fixo |

---

## 🛠️ Tecnologias e Otimizações

### Performance
- ✅ **Lazy Load**: Ads carregam apenas quando próximos do viewport (25% margin)
- ✅ **SRA (Single Request Architecture)**: Reduz latência
- ✅ **CLS Prevention**: Todos os slots têm `min-height` reservado
- ✅ **Size Mapping**: Ads responsivos por breakpoint

### Compliance
- ✅ **Better Ads Standards**: Densidade mobile ≤30%
- ✅ **GDPR/CCPA**: Opção de ads não personalizados
- ✅ **Accessibility**: Rótulos "Publicidade" + `aria-label`
- ✅ **ads.txt**: Validação automática

### Monitoramento
- ✅ **Publisher Console**: Debug via `?google_console=1`
- ✅ **Validação Automatizada**: Script pre-build
- ✅ **Density Logging**: Warnings se >30% mobile

---

## 🐛 Troubleshooting Rápido

### Ads não aparecem?
1. Verifique `VITE_GPT_NETWORK_CODE` em `.env`
2. Abra `/?google_console=1` para debug
3. Verifique Line Items ativos no Ad Manager

### CLS alto?
1. Verifique `min-height` em `src/lib/gpt-config.ts`
2. Teste com PageSpeed Insights (target: <0.1)

### Erro de ads.txt?
1. Arquivo deve estar em `https://SEU_DOMINIO/ads.txt`
2. Valide em [adstxt.guru](https://adstxt.guru)

---

## 📚 Documentação Completa

Para setup detalhado, troubleshooting avançado e monitoramento, veja:

👉 **[GPT_SETUP.md](./GPT_SETUP.md)** - Guia completo

---

## 🔗 Links Úteis

- [Google Ad Manager](https://admanager.google.com)
- [GPT Reference](https://developers.google.com/publisher-tag/reference)
- [Better Ads Standards](https://www.betterads.org/standards/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 📋 Checklist de Deploy

- [ ] `.env` configurado com Network Code e Publisher ID
- [ ] `ads.txt` atualizado e publicado no root
- [ ] Ad units criados no Ad Manager
- [ ] Line Items ativos com inventory
- [ ] `npm run validate:ads` passa sem erros
- [ ] CLS <0.1 no PageSpeed Insights
- [ ] Publisher Console funciona (`?google_console=1`)

---

**Need help?** Veja [GPT_SETUP.md](./GPT_SETUP.md) ou [Ad Manager Support](https://support.google.com/admanager)
