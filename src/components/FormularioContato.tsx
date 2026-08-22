'use client'

import { useState } from 'react'
import { Icone } from './Icone'
import { site, whatsappLink } from '@/content/site'
import { terapias } from '@/content/terapias'

/**
 * Formulário de contato sem servidor: monta a mensagem e abre o cliente de
 * e-mail do visitante já preenchido, endereçado ao Caio. Nada é enviado para
 * terceiros nem armazenado, o que também simplifica a conformidade com a LGPD.
 * Quem preferir, tem o atalho de enviar o mesmo texto pelo WhatsApp.
 */
export function FormularioContato() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [interesse, setInteresse] = useState('')
  const [formato, setFormato] = useState('Ainda não sei')
  const [mensagem, setMensagem] = useState('')
  const [consentimento, setConsentimento] = useState(false)
  const [erro, setErro] = useState('')

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

  const enviarEmail = (e: React.FormEvent) => {
    e.preventDefault()
    const problema = validar()
    setErro(problema)
    if (problema) return
    const assunto = encodeURIComponent(`Contato pelo site: ${nome}${interesse ? `, ${interesse}` : ''}`)
    window.location.href = `mailto:${site.email}?subject=${assunto}&body=${encodeURIComponent(corpo())}`
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
    <form onSubmit={enviarEmail} noValidate className="rounded-2xl border border-noite-100 bg-cartao p-6 sm:p-8">
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/retrato-caio-gracco.webp"
          alt="Caio Gracco, terapeuta integrativo"
          width={72}
          height={72}
          className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-areia-200 sm:h-[4.5rem] sm:w-[4.5rem]"
        />
        <h2 className="font-display text-2xl text-noite-800">Escreva para o Caio</h2>
      </div>
      <p className="mt-3 text-[1rem] leading-relaxed text-tinta-700">
        Preencha e o seu programa de e-mail abre com a mensagem pronta, endereçada ao Caio. Nada é
        enviado a terceiros nem fica guardado neste site.
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
            <option>Presencial, no espaço do Caio</option>
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

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-noite-600 px-6 py-3.5 text-[1rem] font-semibold text-areia-50 transition hover:bg-noite-400">
          <Icone nome="email" tamanho={19} />
          Enviar por e-mail
        </button>
        <button type="button" onClick={enviarWhatsapp}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0E7267] px-6 py-3.5 text-[1rem] font-semibold text-white transition hover:bg-[#0B5C53]">
          <Icone nome="whatsapp" tamanho={19} />
          Enviar pelo WhatsApp
        </button>
      </div>

      <p className="mt-4 text-[0.85rem] text-tinta-500">
        Campos com <span className="text-brasa-500">*</span> são obrigatórios. Se o seu e-mail não
        abrir sozinho, escreva direto para{' '}
        <a href={`mailto:${site.email}`} className="underline underline-offset-2">{site.email}</a>.
      </p>
    </form>
  )
}
