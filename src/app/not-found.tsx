import Link from 'next/link'
import { Secao } from '@/components/Secao'

export default function NaoEncontrado() {
  return (
    <div className="aurora">
      <Secao className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-mark-escuro.svg" alt="" aria-hidden="true" width={120} height={120} className="h-28 w-28 opacity-90" />
        <h1 className="mt-8 font-display text-4xl text-areia-50">Esta página não existe</h1>
        <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-noite-200">
          O endereço pode ter mudado. Volte ao início ou veja todas as terapias oferecidas.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-ouro-400 px-6 py-3 text-[0.92rem] font-semibold text-noite-900 transition hover:bg-ouro-300">
            Ir para o início
          </Link>
          <Link href="/terapias" className="rounded-full border border-noite-300/50 px-6 py-3 text-[0.92rem] text-areia-100 transition hover:border-ouro-400">
            Ver as terapias
          </Link>
        </div>
      </Secao>
    </div>
  )
}
