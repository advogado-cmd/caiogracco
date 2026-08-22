'use client'

import { useState } from 'react'
import { Icone } from './Icone'
import { site, whatsappLink } from '@/content/site'
import { terapias } from '@/content/terapias'

/**
 * Formulário de contato que envia de verdade, sem back-end próprio.
 *
 * O site é estático (SSG na Vercel), então não há servidor nosso para receber
 * um POST. Antes, o botão de e-mail abria um link mailto, e mailto só funciona
 * em quem tem um programa de e-mail configurado no aparelho. Em celular com
 * Gmail no navegador, ou em desktop sem Outlook/Mail, não acontecia nada.
 *
 * Agora a mensagem vai por HTTP para um serviço de formulário, que a entrega
 * na caixa de entrada do Caio. O padrão é o FormSubmit, escolhido porque não
 * exige cadastro nem chave: o endereço já é o endpoint. Na primeira mensagem
 * o serviço manda um e-mail de ativação para o Caio; depois que ele clica no
 * link, tudo passa a chegar direto.
 *
 * Trocar de serviço não exige mexer aqui. Basta definir, nas variáveis de
 * ambiente da Vercel:
 *   NEXT_PUBLIC_FORMULARIO_ENDPOINT  URL completa (Web3Forms, Formspree, ...)
 *   NEXT_PUBLIC_FORMULARIO_CHAVE     chave, quando o serviço pedir uma
 *   NEXT_PUBLIC_FORMULARIO_ALVO      o alias do FormSubmit, para tirar o
 *                                    e-mail do código e reduzir spam
 *
 * O mailto e o texto para copiar continuam existindo, mas só aparecem se o
 * envio falhar. Ninguém fica sem saída.
 */

const ALVO = process.env.NEXT_PUBLIC_FORMULARIO_ALVO || site.email
const ENDPOINT =
  process.env.NEXT_PUBLIC_FORMULARIO_ENDPOINT || `https://formsubmit.co/ajax/${ALVO}`

/** Resposta do visitante, enviada na hora pelo próprio serviço. */
const RESPOSTA_AUTOMATICA = [
  'Recebi a sua mensagem, obrigado por escrever.',
  '',
  'Leio tudo pessoalmente e costumo responder no mesmo dia. Se for algo urgente,',
  `me chame no WhatsApp: ${site.telefoneFormatado}.`,
  '',
  'Caio Gracco',
  'Terapias da Completude',
].join('\n')

export function FormularioContato() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [interesse, setInteresse] = useState('')
  const [formato, setFormato] = useState('Ainda não sei')
  const [mensagem, setMensagem] = useState('')
  const [consentimento, setConsentimento] = useState(false)
  /** Campo invisível. Se vier preenchido, quem preencheu foi um robô. */
  const [armadilha, setArmadilha] = useState('')
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

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault()
    const problema = validar()
    setErro(problema)
    if (problema) return

    // Robô preencheu o campo escondido: fingimos que deu certo e não mandamos nada.
    if (armadilha) {
      setEstado('enviado')
      return
    }

    setEstado('enviando')
    setMostrarSaida(false)

    // Sem isto, uma rede ruim deixa o botão em "Enviando" para sempre.
    const cancelar = new AbortController()
    const relogio = setTimeout(() => cancelar.abort(), 20000)

    try {
      const resposta = await fetch(ENDPOINT, {
        method: 'POST',
        signal: cancelar.signal,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          // Diretivas do FormSubmit. Outros serviços ignoram o que não conhecem.
          _subject: assunto(),
          _template: 'table',
          _captcha: 'false',
          _autoresponse: RESPOSTA_AUTOMATICA,
          _honey: '',
          // Web3Forms e Formspree leem estes.
          access_key: process.env.NEXT_PUBLIC_FORMULARIO_CHAVE || undefined,
          subject: assunto(),
          from_name: nome,
          message: corpo(),
          // O corpo do e-mail que o Caio recebe, com os rótulos em português.
          Nome: nome,
          'E-mail': email,
          Telefone: telefone || 'não informou',
          'Terapia de interesse': interesse || 'ainda não sabe, quer orientação',
          'Formato preferido': formato,
          Mensagem: mensagem,
          // O serviço usa este campo para o Responder ir direto para a pessoa.
          email,
        }),
      })

      let deuCerto = resposta.ok
      try {
        const json = await resposta.json()
        if (json && (json.success === false || json.success === 'false')) deuCerto = false
      } catch {
        // Resposta sem JSON. O status HTTP já basta.
      }

      if (!deuCerto) throw new Error('envio recusado')
      setEstado('enviado')
    } catch {
      setEstado('falhou')
      setMostrarSaida(true)
    } finally {
      clearTimeout(relogio)
    }
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
    <form onSubmit={enviar} noValidate className="rounded-2xl border border-noite-100 bg-cartao p-6 sm:p-8">
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
        Preencha e a sua mensagem chega direto no meu e-mail. Eu leio tudo e respondo
        pessoalmente. Se preferir o WhatsApp, o botão ao lado manda o mesmo texto por lá.
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

      {/* Armadilha para robôs. Fica fora da tela e fora da navegação por teclado. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="_honey">Deixe este campo em branco</label>
        <input id="_honey" name="_honey" type="text" tabIndex={-1} autoComplete="off"
          value={armadilha} onChange={(e) => setArmadilha(e.target.value)} />
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
          Sua mensagem chegou. Eu leio pessoalmente e costumo responder no mesmo dia. Se quiser
          adiantar alguma coisa, me chame no WhatsApp.
        </p>
      )}
      {estado === 'falhou' && (
        <p role="alert" className="mt-4 rounded-xl border border-brasa-400/40 bg-brasa-400/10 px-4 py-3 text-[0.92rem] text-brasa-500">
          Não consegui enviar agora. Pode ser a conexão. Tente de novo, use o WhatsApp aqui embaixo
          ou copie a mensagem e me mande por e-mail.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={estado === 'enviando'}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-noite-600 px-6 py-3.5 text-[1rem] font-semibold text-areia-50 transition hover:bg-noite-400 disabled:opacity-60"
        >
          <Icone nome="email" tamanho={19} />
          {estado === 'enviando' ? 'Enviando' : estado === 'enviado' ? 'Mensagem enviada' : 'Enviar mensagem'}
        </button>
        <button type="button" onClick={enviarWhatsapp}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0E7267] px-6 py-3.5 text-[1rem] font-semibold text-white transition hover:bg-[#0B5C53]">
          <Icone nome="whatsapp" tamanho={19} />
          Enviar pelo WhatsApp
        </button>
      </div>

      {mostrarSaida && estado !== 'enviado' && (
        <div className="mt-5 rounded-xl border border-noite-200 bg-areia-100/70 p-5">
          <p className="text-[0.95rem] font-medium text-noite-800">Se preferir, mande você mesmo</p>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-tinta-700">
            Copie o texto abaixo e me envie por WhatsApp ou para{' '}
            <a href={`mailto:${site.email}`} className="underline underline-offset-2">{site.email}</a>.
          </p>
          <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-areia-200 bg-cartao p-3 font-sans text-[0.85rem] leading-relaxed text-tinta-700">
{`${assunto()}

${corpo()}`}
          </pre>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={copiar}
              className="inline-flex items-center gap-2 rounded-full border border-noite-200 px-4 py-2 text-[0.88rem] font-medium text-noite-700 transition hover:border-ouro-400">
              <Icone nome="link" tamanho={16} />
              {copiado ? 'Copiado' : 'Copiar a mensagem'}
            </button>
            <a href={linkMailto()}
              className="inline-flex items-center gap-2 rounded-full border border-noite-200 px-4 py-2 text-[0.88rem] font-medium text-noite-700 transition hover:border-ouro-400">
              <Icone nome="email" tamanho={16} />
              Abrir no meu programa de e-mail
            </a>
          </div>
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
