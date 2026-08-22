import type { NomeIcone } from '@/components/Icone'

export type ItemNav = { href: string; rotulo: string; icone: NomeIcone; descricao?: string }

/** Links principais, visíveis na barra superior em telas grandes. */
export const navPrincipal: ItemNav[] = [
  { href: '/', rotulo: 'Início', icone: 'sol' },
  { href: '/sobre', rotulo: 'Quem eu sou', icone: 'coracao' },
  { href: '/terapias', rotulo: 'Terapias', icone: 'folha' },
  { href: '/blog', rotulo: 'Blog', icone: 'artigo' },
  { href: '/contato', rotulo: 'Contato', icone: 'conversa' },
]

/** Conteúdo de apoio, reunido no painel lateral. */
export const navDrawer: ItemNav[] = [
  { href: '/glossario', rotulo: 'Glossário', icone: 'livro', descricao: 'Os termos das tradições, explicados em linguagem simples' },
  { href: '/videos', rotulo: 'Vídeos', icone: 'video', descricao: 'O Caio explicando cada terapia, no canal do YouTube' },
  { href: '/sobre#galeria', rotulo: 'Formação e trajetória', icone: 'foto', descricao: 'Cursos, formaturas e exames internacionais em imagens' },
  { href: '/perguntas-frequentes', rotulo: 'Perguntas Frequentes', icone: 'mente', descricao: 'Dúvidas respondidas, terapia por terapia' },
  { href: '/aviso-de-cuidado', rotulo: 'Aviso de cuidado', icone: 'escudo', descricao: 'O que estas práticas são e o que não são' },
]

export const navLegal: ItemNav[] = [
  { href: '/termos-de-uso', rotulo: 'Termos de uso', icone: 'livro' },
  { href: '/privacidade', rotulo: 'Privacidade e LGPD', icone: 'escudo' },
]

/** Tudo junto, para o rodapé e o mapa do site, sem repetir o que aparece nos dois grupos. */
export const navegacao = [...navPrincipal, ...navDrawer].filter(
  (item, i, lista) => lista.findIndex((x) => x.href === item.href) === i,
)
