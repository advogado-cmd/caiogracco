import type { ReactNode } from 'react'

export function Secao({
  children, className = '', id, rotulo,
}: { children: ReactNode; className?: string; id?: string; rotulo?: string }) {
  return (
    <section id={id} aria-label={rotulo} className={`mx-auto w-full max-w-6xl px-5 lg:px-8 ${className}`}>
      {children}
    </section>
  )
}

export function TituloSecao({
  sobretitulo, titulo, texto, claro = false, id,
}: { sobretitulo?: string; titulo: string; texto?: string; claro?: boolean; id?: string }) {
  return (
    <header className="max-w-2xl">
      {sobretitulo && (
        <p className={`text-[0.72rem] font-semibold uppercase tracking-[0.24em] ${claro ? 'text-ouro-400' : 'text-ouro-600'}`}>
          {sobretitulo}
        </p>
      )}
      <h2 id={id} className={`mt-3 font-display text-3xl leading-tight sm:text-4xl ${claro ? 'text-areia-50' : 'text-noite-800'}`}>
        {titulo}
      </h2>
      {texto && (
        <p className={`mt-4 text-[1.02rem] leading-relaxed ${claro ? 'text-noite-200' : 'text-tinta-700'}`}>{texto}</p>
      )}
    </header>
  )
}
