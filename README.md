# Espaço da Completude — Caio Gracco

Site institucional do terapeuta **Caio Gracco** (Santa Rosa de Viterbo, SP), construído em
Next.js 15 (App Router) + TypeScript + Tailwind CSS 4, 100% estático e pronto para a Vercel.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

## Estrutura

```
src/
  app/                    rotas (App Router)
    terapias/[slug]/      uma página por terapia, geradas de src/content/terapias.ts
    llms.txt/             resumo do site em texto puro, para IAs (estratégia GEO)
    sitemap.ts robots.ts  gerados automaticamente do conteúdo
  components/             Cabeçalho, Rodapé, BuscaIA, WhatsApp flutuante, cartões
  content/                TODO o conteúdo editorial fica aqui
    terapias.ts           as 8 terapias: texto, FAQ, glossário, palavras-chave, fontes
    site.ts               contatos, endereço, redes, credenciais
    videos.ts             vídeos do YouTube (ver "Publicar vídeos")
  lib/
    busca.ts              índice e motor da busca embarcada
    estrutura.ts          dados estruturados JSON-LD
public/brand/             logo em SVG: marca, horizontal, vertical, monocromática, ícone
```

## Editar conteúdo

Quase tudo se edita em `src/content/`. Alterar um texto de terapia, um item do FAQ ou um termo do
glossário atualiza **automaticamente** a página da terapia, o glossário, a página de perguntas, o
sitemap, os dados estruturados, o `llms.txt` e a busca do site.

## Publicar vídeos

1. Copie o ID do vídeo no YouTube (a parte depois de `v=`).
2. Adicione um item ao array `videos` em `src/content/videos.ts`.

Para importar o canal inteiro de uma vez:

```bash
YOUTUBE_API_KEY=... YOUTUBE_CHANNEL_ID=UCqSwKBMOCEGFCJch2e_jD9w node scripts/importar-videos.mjs
```

## Deploy na Vercel

1. Importe este repositório em vercel.com → New Project.
2. Framework: Next.js (detectado sozinho). Build: `npm run build`.
3. Variáveis de ambiente:
   - `NEXT_PUBLIC_SITE_URL` — a URL pública deste ambiente
   - `NEXT_PUBLIC_AMBIENTE` — `producao` libera a indexação; **qualquer outro valor
     (ex.: `beta`) marca o site inteiro como noindex**, o que é obrigatório em
     ambientes de teste para não competir com o site oficial no Google.
4. Aponte o domínio em Settings → Domains.

### Ambiente de homologação (beta)

```
NEXT_PUBLIC_SITE_URL=https://beta.droliveira.adv.br
NEXT_PUBLIC_AMBIENTE=beta
```

Com `NEXT_PUBLIC_AMBIENTE=beta`, o `robots.txt` passa a bloquear tudo, as páginas
recebem `noindex, nofollow` e o `/llms.txt` deixa de expor o conteúdo às IAs.

Rollback: Deployments → escolha o deploy anterior → **Promote to Production**.

## SEO e GEO

- `generateMetadata` em todas as rotas, com title, description, canonical, Open Graph e Twitter.
- JSON-LD: `HealthAndBeautyBusiness`, `Person`, `Service`, `FAQPage`, `BreadcrumbList`,
  `DefinedTermSet`, `ItemList`, `VideoObject`.
- `sitemap.xml` e `robots.txt` gerados do conteúdo; crawlers de IA liberados de propósito.
- `/llms.txt` entrega aos modelos os fatos do negócio já com a ressalva ética.

## Acessibilidade

Contraste WCAG 2.1 AA, foco visível, navegação por teclado, `prefers-reduced-motion`,
landmarks e headings semânticos, skip link.

## Nota ética

As terapias aqui descritas são práticas complementares de bem-estar. Nenhum texto do site promete
cura ou resultado, e todas as páginas trazem a ressalva de que não substituem acompanhamento
médico, psicológico ou psiquiátrico. Mantenha esse padrão ao editar.
