import Link from 'next/link'

/** Ressalva ética exibida em toda página de terapia. Não é rodapé jurídico: é parte do cuidado. */
export function AvisoCuidado({ compacto = false }: { compacto?: boolean }) {
  return (
    <aside
      className={`rounded-2xl border border-ouro-500/45 bg-areia-200/40 ${compacto ? 'p-4' : 'p-5 sm:p-6'}`}
      aria-labelledby="aviso-titulo"
    >
      <p id="aviso-titulo" className="text-sm font-semibold tracking-wide text-noite-800">
        Antes de tudo, um cuidado
      </p>
      <p className={`mt-2 ${compacto ? 'text-[0.85rem]' : 'text-sm'} leading-relaxed text-tinta-700`}>
        As práticas oferecidas aqui são abordagens complementares de bem-estar, baseadas em tradições
        próprias de sua origem. Elas <strong className="font-semibold">não substituem</strong> diagnóstico,
        tratamento ou acompanhamento médico, psicológico ou psiquiátrico. Diante de qualquer sintoma físico
        ou mental, procure um profissional habilitado — e não interrompa nenhum tratamento em curso.{' '}
        <Link href="/aviso-de-cuidado" className="underline underline-offset-2 hover:text-noite-600">
          Entenda melhor
        </Link>
        .
      </p>
    </aside>
  )
}
