type Props = { nome: NomeIcone; className?: string; tamanho?: number }

export type NomeIcone =
  | 'osatoshi' | 'emf' | 'elementoterapia' | 'reiki' | 'shiatsu'
  | 'acupuntura' | 'auriculoterapia' | 'seitai'
  | 'bussola' | 'coracao' | 'mente' | 'casa' | 'trabalho' | 'semente'
  | 'sol' | 'onda' | 'maos' | 'livro' | 'artigo' | 'video' | 'conversa' | 'mapa'
  | 'escudo' | 'relogio' | 'estrela' | 'folha' | 'instagram' | 'youtube'
  | 'facebook' | 'whatsapp' | 'compartilhar' | 'link' | 'menu' | 'fechar'
  | 'seta' | 'foto' | 'email' | 'telefone'

/** Traços do sistema: 1.6px, cantos arredondados, sem preenchimento — leves sobre fundo claro e escuro. */
const CAMINHOS: Record<NomeIcone, React.ReactNode> = {
  // --- terapias ---
  osatoshi: <><circle cx="12" cy="8" r="4.2" /><path d="M12 12.2v8.3M8.4 15.4h7.2M6 20.5c1.6-1.4 3.7-2.2 6-2.2s4.4.8 6 2.2" /></>,
  emf: <><circle cx="12" cy="12" r="2.4" /><ellipse cx="12" cy="12" rx="9" ry="4.4" /><ellipse cx="12" cy="12" rx="9" ry="4.4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="4.4" transform="rotate(120 12 12)" /></>,
  elementoterapia: <><path d="M6 4v9a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4M6 4h5M6 8h5" /><path d="M13 4v9a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4M13 4h5M13 8h5" /><path d="M9 15v5M17 15v5" /></>,
  reiki: <><path d="M9 21V11.5a1.5 1.5 0 0 1 3 0V21M12 21v-8.5a1.5 1.5 0 0 1 3 0V21" /><path d="M6 21v-6a1.5 1.5 0 0 1 3 0" /><path d="M12 8.5c0-2 1.4-3.4 3-4-.6 1.8-1.2 3-3 4zM12 8.5c0-2-1.4-3.4-3-4 .6 1.8 1.2 3 3 4z" /></>,
  shiatsu: <><path d="M4 15c2.5-1.6 5.2-2.4 8-2.4s5.5.8 8 2.4" /><circle cx="9" cy="9.5" r="1.4" /><circle cx="15" cy="9.5" r="1.4" /><circle cx="12" cy="6" r="1.4" /><path d="M4 19c2.5-1.6 5.2-2.4 8-2.4s5.5.8 8 2.4" /></>,
  acupuntura: <><path d="M5 19L19 5M17 3.5l3.5 3.5" /><path d="M5 19l-1.5 1.5M9 15l1.5 1.5M13 11l1.5 1.5" /><circle cx="7" cy="8" r="1.2" /><circle cx="12" cy="18" r="1.2" /></>,
  auriculoterapia: <><path d="M8.5 20c0-3-1.5-3.5-1.5-7a5 5 0 0 1 10 0c0 2.4-1.6 3-3 4" /><circle cx="11.5" cy="11.5" r="1.3" /><circle cx="14.5" cy="8.5" r="1" /><circle cx="9.5" cy="15" r="1" /></>,
  seitai: <><path d="M12 3v18" /><path d="M9 6h6M8.5 10h7M8.5 14h7M9 18h6" /><path d="M6 8.5c-1.2 2.4-1.2 4.6 0 7M18 8.5c1.2 2.4 1.2 4.6 0 7" /></>,
  // --- seções ---
  bussola: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>,
  coracao: <><path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20z" /></>,
  mente: <><path d="M15 20v-2.2c2.4-1 4-3.3 4-6A6.8 6.8 0 0 0 5.4 11c0 1.4.4 2.5 1.1 3.4L5 17h2.4v3" /><path d="M12 8.5v3M12 14.5h.01" /></>,
  casa: <><path d="M4 11l8-6.5 8 6.5" /><path d="M6.5 10v9.5h11V10" /><path d="M10 19.5V14h4v5.5" /></>,
  trabalho: <><rect x="3.5" y="7.5" width="17" height="12" rx="2" /><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 12.5h17" /></>,
  semente: <><path d="M12 21c0-5 1-9 8-12-1 7-3 9-8 12z" /><path d="M12 21c0-4-1-7-6-9 1 5 2.5 7 6 9z" /><path d="M12 21v-4" /></>,
  sol: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" /></>,
  onda: <><path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /></>,
  maos: <><path d="M7 13V7.5a1.5 1.5 0 0 1 3 0V12M10 12V6a1.5 1.5 0 0 1 3 0v6M13 12V7.5a1.5 1.5 0 0 1 3 0V15c0 3-2.2 5.5-5.5 5.5S5 18 5 15v-2.5a1.5 1.5 0 0 1 2-1.4" /></>,
  artigo: <><path d="M5 4.5h11l3 3V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19z" /><path d="M15.5 4.5V8h3.2" /><path d="M8.5 12h7M8.5 15.5h7M8.5 8.5h3.5" /></>,
  livro: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M4 5.5v15M19 18v3H6.5" /></>,
  video: <><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M10.5 9.5l4.5 2.5-4.5 2.5z" /></>,
  conversa: <><path d="M20 12.5c0 3.6-3.6 6.5-8 6.5-1 0-2-.15-2.9-.42L4 20.5l1.4-3.6C4.5 15.7 4 14.2 4 12.5 4 8.9 7.6 6 12 6s8 2.9 8 6.5z" /></>,
  mapa: <><path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></>,
  escudo: <><path d="M12 21s7-3.2 7-9V5.8L12 3 5 5.8V12c0 5.8 7 9 7 9z" /><path d="M9.2 11.8l2 2 3.6-3.8" /></>,
  relogio: <><circle cx="12" cy="12" r="9" /><path d="M12 7.2V12l3.2 2" /></>,
  estrela: <><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" /></>,
  folha: <><path d="M20 4c0 9-5.5 13-11 13-2 0-4-.7-5-1.5C4 8 10 4 20 4z" /><path d="M4 20c2-4.5 5-7.5 9-9.5" /></>,
  foto: <><rect x="3" y="5.5" width="18" height="14" rx="2.5" /><circle cx="9" cy="10.5" r="1.8" /><path d="M3.5 17l4.5-4 3.5 3 3.5-4 5.5 5.5" /></>,
  email: <><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M3.6 7.5l8.4 6 8.4-6" /></>,
  telefone: <><path d="M5.5 4h3l1.6 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2C10.6 18.8 5.2 13.4 4.5 6.2A2 2 0 0 1 5.5 4z" /></>,
  compartilhar: <><circle cx="18" cy="5.5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="18.5" r="2.5" /><path d="M8.2 10.8l7.6-4.1M8.2 13.2l7.6 4.1" /></>,
  link: <><path d="M10 13.5a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 0 0-5.7-5.7L11.2 6.6" /><path d="M14 10.5a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.4-1.4" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  fechar: <><path d="M6 6l12 12M18 6L6 18" /></>,
  seta: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  // --- redes (preenchidas, tratadas à parte) ---
  instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="4.6" /><circle cx="12" cy="12" r="4" /><circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none" /></>,
  youtube: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10.2 9.4l5 2.6-5 2.6z" /></>,
  facebook: <><path d="M14.5 21v-8h2.7l.5-3.2h-3.2V7.7c0-.9.3-1.6 1.7-1.6h1.6V3.2C17.5 3.1 16.6 3 15.5 3c-2.4 0-4 1.5-4 4.2v2.6H8.7V13h2.8v8z" /></>,
  whatsapp: <><path d="M20.5 11.7c0 4.6-3.8 8.3-8.4 8.3-1.5 0-2.8-.4-4-1L3.5 20.5l1.6-4.4a8.1 8.1 0 0 1-1.1-4.4C4 7.1 7.8 3.4 12.4 3.4s8.1 3.7 8.1 8.3z" /><path d="M9.4 8.4c.2 0 .4 0 .6.4l.8 1.8c.1.2 0 .4-.1.6l-.6.7c.7 1.3 1.7 2.2 3 2.8l.7-.7c.2-.2.4-.2.6-.1l1.8.8c.3.2.4.3.4.6 0 1.1-.9 2-2 2-3.9 0-7.1-3.2-7.1-7.1 0-1.1.9-1.9 1.9-1.8z" /></>,
}

const PREENCHIDOS: NomeIcone[] = ['facebook']

export function Icone({ nome, className = '', tamanho = 24 }: Props) {
  const preenchido = PREENCHIDOS.includes(nome)
  return (
    <svg
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      className={className}
      fill={preenchido ? 'currentColor' : 'none'}
      stroke={preenchido ? 'none' : 'currentColor'}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {CAMINHOS[nome]}
    </svg>
  )
}
