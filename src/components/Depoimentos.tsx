import { depoimentos as todos, type Depoimento } from '@/content/depoimentos'

/**
 * Relatos de quem foi atendido, no formato de conversa.
 *
 * A textura de mensagem é o que dá credibilidade a um depoimento, então ela foi
 * reconstruída em HTML em vez de entrar como print. O texto é o mesmo que a
 * pessoa escreveu, e assim ele é lido por quem usa leitor de tela, encontrado
 * pela busca do site, indexado pelo Google, ajustado a qualquer tela e corrigido
 * sem precisar de editor de imagem.
 */
function Tique() {
  return (
    <svg viewBox="0 0 20 12" className="h-3 w-4 shrink-0 text-[#53bdeb]" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M1 6.8L4.2 10 11 2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.2 6.8L11.4 10 18.2 2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Depoimentos({ lista = todos, className = '' }: { lista?: Depoimento[]; className?: string }) {
  if (!lista.length) return null

  return (
    <div className={className}>
      <div className="grid gap-6 lg:grid-cols-2">
        {lista.map((d) => (
          <figure key={d.id} className="flex h-full flex-col">
            <div className="flex flex-1 flex-col justify-end rounded-2xl border border-areia-200 bg-[#efe7dd] p-4 sm:p-5">
              <div className="relative max-w-[95%] rounded-xl rounded-tl-sm bg-white px-4 py-3 shadow-[0_1px_1px_rgba(11,20,26,0.13)]">
                <blockquote>
                  {d.texto.map((linha, i) => (
                    <p key={i} className={`text-[1rem] leading-[1.55] text-[#111b21] ${i ? 'mt-2.5' : ''}`}>
                      {linha}
                    </p>
                  ))}
                </blockquote>
                <p className="mt-1.5 flex items-center justify-end gap-1 text-[0.68rem] text-[#667781]">
                  {d.hora}
                  <Tique />
                </p>
              </div>
            </div>
            <figcaption className="mt-3 px-1 text-[0.85rem] text-tinta-500">
              <span className="font-semibold text-tinta-700">{d.autor}</span>
              {d.contexto ? `, ${d.contexto}` : ''}
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-7 max-w-3xl text-[0.85rem] leading-relaxed text-tinta-500">
        Mensagens recebidas por WhatsApp, publicadas com autorização de quem escreveu. Cada uma
        conta uma experiência pessoal, e o que uma pessoa viveu não é promessa do que a próxima
        vai viver. Estas práticas não substituem acompanhamento médico ou psicológico.
      </p>
    </div>
  )
}
