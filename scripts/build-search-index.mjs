#!/usr/bin/env node
/**
 * O índice de busca é montado em tempo de build, direto do conteúdo TypeScript
 * (ver src/lib/busca.ts → construirIndice). Este script existe apenas para
 * conferência: mostra quantos documentos o índice terá.
 */
console.log(
  'O índice é gerado automaticamente pelo Next durante o build, a partir de src/content/*.\n' +
  'Nenhuma etapa manual é necessária. Rode `npm run build` normalmente.',
)
