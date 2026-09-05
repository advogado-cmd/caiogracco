# Terapias da Completude — Caio Gracco

Site institucional do terapeuta **Caio Gracco** (Santa Rosa de Viterbo, SP), construído em
Next.js 16 (App Router) + TypeScript + Tailwind CSS 4, 100% estático e pronto para a Vercel.

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
public/marca/             marca 2.0 em PNG/WebP: símbolo, assinatura horizontal,
                          assinatura vertical, avatar e ícones
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


## Marca

Identidade 2.0, de agosto de 2026, conforme o Manual de Marca 1.0.

O símbolo são duas mãos abertas sustentando uma luz. Substituiu o sol da
identidade anterior, que saiu do site inteiro, animação incluída.

Regras do manual que o código precisa respeitar:

- **Nunca dentro de círculo, quadrado ou moldura.** O círculo é exclusividade
  do avatar de perfil (`public/marca/avatar-512.png`).
- **Sem sombra, contorno, brilho, rotação ou distorção acrescentados.** Foi por
  isso que a animação dos raios morreu junto com o sol.
- **Não remontar a assinatura.** O cabeçalho e o rodapé usam os arquivos
  oficiais inteiros, e não símbolo + nome em tipografia própria.
- **Tamanhos mínimos:** assinatura horizontal 160px, símbolo 40px.
- **Paleta:** seis cores, em `globals.css`. Fundo claro 55%, azul 30%, dourado
  10% só como acento, areia 5%. O dourado nunca é fundo de área grande.
- **Tipografia:** Cinzel nos títulos, Jost no texto. Cormorant Garamond
  sobrevive só nas duas linhas em itálico da marca, porque Cinzel não tem
  itálico e falsear um é deformação proibida.

Pendência registrada no próprio manual: a marca ainda é imagem, não vetor.
Para impressão grande e reduções abaixo de 25 mm é preciso redesenhar símbolo
e logotipo em vetor, sem alterar o traço.


## Painel de administração

O conteúdo do site é editado em `/admin`, sem terminal e sem Git à vista.

- **Para quem edita:** `docs/PAINEL-PASSO-A-PASSO-CAIO.md`
- **Para ligar o painel:** `docs/CONFIGURAR-PAINEL-CARLOS.md`

Decap CMS 3.8.4, servido do próprio site em `public/admin/`, com login pelo
GitHub. Cada salvamento vira um commit e a Vercel reconstrói sozinha.

Duas variáveis de ambiente, só no servidor:

```
GITHUB_OAUTH_ID
GITHUB_OAUTH_SECRET
```

O conteúdo mora em `src/content/dados/` (JSON) e `src/content/blog/`
(Markdown). Os tipos em TypeScript continuam mandando no formato: arquivo
com campo faltando quebra a build, antes de ir ao ar.
