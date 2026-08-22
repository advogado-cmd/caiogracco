'use client'

import { useState } from 'react'
import { Icone } from './Icone'
import { site, whatsappLink } from '@/content/site'
import { terapias } from '@/content/terapias'

/**
 * Formulário de contato, em três camadas, da mais confiável para a menos.
 *
 * 1. Se houver um endpoint configurado em NEXT_PUBLIC_FORMULARIO_ENDPOINT, a
 *    mensagem é enviada de verdade, por HTTP, e a pessoa vê a confirmação sem
 *    sair da página. Funciona com Web3Forms, Formspree, Getform e similares.
 * 2. Sem endpoint, o botão de e-mail é um link mailto de verdade, e não uma
 *    navegação por JavaScript. Isso importa: mailto disparado por script é
 *    ignorado em parte dos navegadores, e era por isso que o formulário parecia
 *    não fazer nada.
 * 3. Em qualquer um dos casos, depois de tentar enviar aparece a saída de
 *    emergência: a mensagem inteira em texto, com botão de copiar e o endereço
 *    de e-mail à vista. Ninguém fica preso.
 *
 * O WhatsApp continua ao lado, porque no Brasil é por onde a maioria escreve.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_FORMULARIO_ENDPOINT ?? ''

export function FormularioContato() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [interesse, setInteresse] = useState('')
  const [formato, setFormato] = useState('Ainda não sei')
  const [mensagem, setMensagem] = useState('')
  const [consentimento, setConsentimento] = useState(false)
  const [erro, setErro] = useState('')
  const [estado, setEstado] = useState<'parado' | 'enviando' | 'enviado' | 'falhou'>('parado')
  const [mostrarSaida, setMostrarSaida] = useState(false)
  const [copiado, setCopiado] = useState(false)

  const corpo = () =>
    [
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      telefone ? `Telefone/WhatsApp: ${telefone}` : null,
      interesse ? `Terapia de interesse: ${interesse}` : null,
      `Formato preferido: ${formato}`,
      '',
      'Mensagem:',
      mensagem,
      '',
      'Enviado pelo formulário do site caiogracco',
    ]
      .filter(Boolean)
      .join('\n')

  const validar = () => {
    if (!nome.trim()) return 'Por favor, escreva seu nome.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Confira o e-mail: ele parece incompleto.'
    if (mensagem.trim().length < 10) return 'Conte um pouco mais sobre o que você busca. Algumas linhas bastam.'
    if (!consentimento) return 'Para continuar, é preciso concordar com o uso dos dados para responder ao contato.'
    return ''
  }

  const assunto = () => `Contato pelo site: ${nome}${interesse ? `, ${interesse}` : ''}`

  const linkMailto = () =>
    `mailto:${site.email}?subject=${encodeURIComponent(assunto())}&body=${encodeURIComponent(corpo())}`

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(`${assunto()}\n\n${corpo()}`)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch {
      setCopiado(false)
    }
  }

  /** Só usado quando há endpoint configurado. Sem ele, o botão vira link mailto. */
  const enviarPeloServidor = async (e: React.FormEvent) => {
    e.preventDefault()
    const problema = validar()
    setErro(problema)
    if (problema) return

    setEstado('enviando')
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          // O primeiro campo é o que o Web3Forms espera; os outros serviços ignoram.
          access_key: process.env.NEXT_PUBLIC_FORMULARIO_CHAVE ?? undefined,
          subject: assunto(),
          from_name: nome,
          nome,
          email,
          telefone,
          interesse: interesse || 'Ainda não sei',
          formato,
          mensagem,
          message: corpo(),
        }),
      })
      if (!r.ok) throw new Error(String(r.status))
      setEstado('enviado')
    } catch {
      setEstado('falhou')
      setMostrarSaida(true)
    }
  }

  const aoClicarEmail = () => {
    const problema = validar()
    setErro(problema)
    if (problema) return false
    // O navegador segue o href sozinho. A saída de emergência aparece logo depois,
    // para quem não tiver programa de e-mail configurado.
    setTimeout(() => setMostrarSaida(true), 900)
    return true
  }

  const enviarWhatsapp = () => {
    const problema = validar()
    setErro(problema)
    if (problema) return
    window.open(whatsappLink(corpo()), '_blank', 'noopener,noreferrer')
  }

  const campo =
    'mt-1.5 w-full rounded-xl border border-noite-200 bg-cartao px-4 py-3 text-[1rem] text-tinta-900 outline-none transition placeholder:text-tinta-500 focus:border-ouro-400'
  const rotulo = 'block text-[0.9rem] font-medium text-noite-800'

  return (
    <form
      onSubmit={ENDPOINT ? enviarPeloServidor : (e) => e.preventDefault()}
      noValidate
      className="rounded-2xl border border-noite-100 bg-cartao p-6 sm:p-8"
    >
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/retrato-caio-gracco.webp"
          alt="Caio Gracco, terapeuta integrativo"
          width={72}
          height={72}
          className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-areia-200 sm:h-[4.5rem] sm:w-[4.5rem]"
        />
        <h2 className="font-display text-2xl text-noite-800">Escreva para mim</h2>
      </div>
      <p className="mt-3 text-[1rem] leading-relaxed text-tinta-700">
        {ENDPOINT
          ? 'Preencha e eu recebo a sua mensagem direto no meu e-mail. Se preferir, o botão do WhatsApp manda o mesmo texto por lá.'
          : 'Preencha e escolha por onde prefere mandar. Pelo WhatsApp costuma ser mais rápido; por e-mail abre o seu programa de mensagens com tudo pronto.'}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="nome" className={rotulo}>Como você se chama <span className="text-brasa-500">*</span></label>
          <input id="nome" name="nome" type="text" autoComplete="name" required value={nome}
            onChange={(e) => setNome(e.target.value)} className={campo} placeholder="Seu nome" />
        </div>

        <div>
          <label htmlFor="email" className={rotulo}>E-mail <span className="text-brasa-500">*</span></label>
          <input id="email" name="email" type="email" autoComplete="email" required value={email}
            onChange={(e) => setEmail(e.target.value)} className={campo} placeholder="voce@email.com" />
        </div>

        <div>
          <label htmlFor="telefone" className={rotulo}>Telefone ou WhatsApp</label>
          <input id="telefone" name="telefone" type="tel" autoComplete="tel" value={telefone}
            onChange={(e) => setTelefone(e.target.value)} className={campo} placeholder="(00) 00000-0000" />
        </div>

        <div>
          <label htmlFor="interesse" className={rotulo}>Terapia de interesse</label>
          <select id="interesse" name="interesse" value={interesse}
            onChange={(e) => setInteresse(e.target.value)} className={campo}>
            <option value="">Ainda não sei, quero orientação</option>
            {terapias.map((t) => <option key={t.slug} value={t.nome}>{t.nome}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="formato" className={rotulo}>Formato preferido</label>
          <select id="formato" name="formato" value={formato}
            onChange={(e) => setFormato(e.target.value)} className={campo}>
            <option>Ainda não sei</option>
            <option>Presencial, no meu espaço</option>
            <option>À distância (online)</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="mensagem" className={rotulo}>
            O que está acontecendo <span className="text-brasa-500">*</span>
          </label>
          <textarea id="mensagem" name="mensagem" required rows={6} value={mensagem}
            onChange={(e) => setMensagem(e.target.value)} className={`${campo} resize-y`}
            placeholder="Conte com suas palavras. Não precisa usar termos técnicos. Há quanto tempo isso vem acontecendo já ajuda muito." />
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-xl bg-areia-200/35 p-4">
        <input id="consentimento" name="consentimento" type="checkbox" required checked={consentimento}
          onChange={(e) => setConsentimento(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 rounded border-noite-300 accent-[#9c5d08]" />
        <label htmlFor="consentimento" className="text-[0.92rem] leading-relaxed text-tinta-700">
          Concordo que meus dados sejam usados apenas para responder a este contato, conforme a{' '}
          <a href="/privacidade" className="underline underline-offset-2 hover:text-noite-600">Política de Privacidade</a>.
          <span className="text-brasa-500"> *</span>
        </label>
      </div>

      {erro && (
        <p role="alert" className="mt-4 rounded-xl border border-brasa-400/40 bg-brasa-400/10 px-4 py-3 text-[0.92rem] text-brasa-500">
          {erro}
        </p>
      )}

      {estado === 'enviado' && (
        <p role="status" className="mt-4 rounded-xl border border-ouro-500/45 bg-areia-200/40 px-4 py-3 text-[0.95rem] text-noite-800">
          Recebi a sua mensagem. Respondo pessoalmente, em geral no mesmo dia.
        </p>
      )}
      {estado === 'falhou' && (
        <p role="alert" className="mt-4 rounded-xl border border-brasa-400/40 bg-brasa-400/10 px-4 py-3 text-[0.92rem] text-brasa-500">
          O envio não foi. Use o WhatsApp aqui embaixo, ou copie a mensagem e me mande por e-mail.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {ENDPOINT ? (
          <button
            type="submit"
            disabled={estado === 'enviando'}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-noite-600 px-6 py-3.5 text-[1rem] font-semibold text-areia-50 transition hover:bg-noite-400 disabled:opacity-60"
          >
            <Icone nome="email" tamanho={19} />
            {estado === 'enviando' ? 'Enviando' : 'Enviar mensagem'}
          </button>
        ) : (
          <a
            href={linkMailto()}
            onClick={(e) => { if (!aoClicarEmail()) e.preventDefault() }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-noite-600 px-6 py-3.5 text-[1rem] font-semibold text-areia-50 transition hover:bg-noite-400"
          >
            <Icone nome="email" tamanho={19} />
            Enviar por e-mail
          </a>
        )}
        <button type="button" onClick={enviarWhatsapp}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0E7267] px-6 py-3.5 text-[1rem] font-semibold text-white transition hover:bg-[#0B5C53]">
          <Icone nome="whatsapp" tamanho={19} />
          Enviar pelo WhatsApp
        </button>
      </div>

      {mostrarSaida && estado !== 'enviado' && (
        <div className="mt-5 rounded-xl border border-noite-200 bg-areia-100/70 p-5">
          <p className="text-[0.95rem] font-medium text-noite-800">
            Não abriu nada no seu aparelho?
          </p>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-tinta-700">
            Acontece quando não há um programa de e-mail configurado. Copie a mensagem abaixo e me
            mande por WhatsApp ou para{' '}
            <a href={`mailto:${site.email}`} className="underline underline-offset-2">{site.email}</a>.
          </p>
          <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-areia-200 bg-cartao p-3 font-sans text-[0.85rem] leading-relaxed text-tinta-700">
{`${assunto()}

${corpo()}`}
          </pre>
          <button
            type="button"
            onClick={copiar}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-noite-200 px-4 py-2 text-[0.88rem] font-medium text-noite-700 transition hover:border-ouro-400"
          >
            <Icone nome="link" tamanho={16} />
            {copiado ? 'Copiado' : 'Copiar a mensagem'}
          </button>
        </div>
      )}

      <p className="mt-4 text-[0.85rem] text-tinta-500">
        Campos com <span className="text-brasa-500">*</span> são obrigatórios. Prefere escrever do
        seu jeito? Meu e-mail é{' '}
        <a href={`mailto:${site.email}`} className="underline underline-offset-2">{site.email}</a>.
      </p>
    </form>
  )
}
