import type { FAQ } from '@/content/tipos'

type Props = { perguntas: FAQ[]; titulo?: string; id?: string }

export function Perguntas({ perguntas, titulo, id = 'perguntas' }: Props) {
  const tituloId = `${id}-titulo`
  return (
    <section id={id} aria-labelledby={titulo ? tituloId : undefined} className="scroll-mt-24">
      {titulo && (
        <h2 id={tituloId} className="font-display text-2xl text-noite-800 sm:text-3xl">
          {titulo}
        </h2>
      )}
      <div className="mt-6 divide-y divide-noite-100 rounded-2xl border border-noite-100 bg-white">
        {perguntas.map((f) => (
          <details key={f.pergunta} className="group px-5 py-4 sm:px-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[0.98rem] font-medium text-noite-800 marker:content-none">
              {f.pergunta}
              <span aria-hidden="true" className="mt-1 shrink-0 text-ouro-500 transition-transform duration-300 group-open:rotate-45">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 max-w-3xl text-[0.94rem] leading-relaxed text-tinta-700">{f.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
