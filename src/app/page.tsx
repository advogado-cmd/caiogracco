import Link from 'next/link'
import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { CartaoTerapia } from '@/components/CartaoTerapia'
import { BuscaIA } from '@/components/BuscaIA'
import { Perguntas } from '@/components/Perguntas'
import { AvisoCuidado } from '@/components/AvisoCuidado'
import { JsonLd } from '@/components/JsonLd'
import { terapias, terapiasDestaque } from '@/content/terapias'
import { site, whatsappLink } from '@/content/site'
import { construirIndice } from '@/lib/busca'
import { schemaFAQ } from '@/lib/estrutura'

export const metadata: Metadata = {
  title: 'Espaço da Completude — Caio Gracco | Terapias Integrativas em Santa Rosa de Viterbo',
  description: site.descricao,
  alternates: { canonical: '/' },
}

const PERGUNTAS_GERAIS = [
  {
    pergunta: 'Quem é Caio Gracco?',
    resposta:
      'Caio Gracco é terapeuta integrativo em Santa Rosa de Viterbo, interior de São Paulo. Começou sua caminhada como terapeuta aos 14 anos e hoje se dedica sobretudo ao Osatoshi, técnica japonesa da Shinri, além de EMF Balancing Technique®, Elementoterapia Magnética, Reiki, Shiatsu, Acupuntura sistêmica, Auriculoterapia e Seitai. Atende no Espaço da Completude e também à distância.',
  },
  {
    pergunta: 'Quais terapias são oferecidas no Espaço da Completude?',
    resposta:
      'Oito abordagens: Osatoshi, EMF Balancing Technique®, Elementoterapia Magnética, Reiki, Massagem Shiatsu, Acupuntura sistêmica, Auriculoterapia e Seitai. Osatoshi, EMF Balancing e Reiki podem ser feitos à distância; as demais são presenciais.',
  },
  {
    pergunta: 'O atendimento pode ser feito online?',
    resposta:
      'Sim, para as práticas que a tradição permite à distância — Osatoshi, EMF Balancing Technique® e Reiki. As terapias manuais (Shiatsu, Seitai, Acupuntura e Auriculoterapia) exigem presença física em Santa Rosa de Viterbo.',
  },
  {
    pergunta: 'Como escolher a terapia certa para o meu caso?',
    resposta:
      'Não é preciso escolher sozinho. Escreva contando o que está acontecendo e o Caio indica o caminho que faz mais sentido — inclusive dizendo quando o melhor caminho é outro profissional, e não uma sessão.',
  },
  {
    pergunta: 'Essas terapias substituem tratamento médico?',
    resposta:
      'Não, em nenhuma hipótese. São práticas complementares de bem-estar. Não substituem diagnóstico, medicação, cirurgia, psicoterapia ou acompanhamento psiquiátrico, e nenhum tratamento em curso deve ser interrompido por causa delas.',
  },
  {
    pergunta: 'Onde fica o Espaço da Completude?',
    resposta: `Na ${site.endereco.rua}, ${site.endereco.bairro}, ${site.endereco.cidade}/${site.endereco.estado}, CEP ${site.endereco.cep}. O atendimento é feito com hora marcada.`,
  },
]

export default function Home() {
  const indice = construirIndice()

  return (
    <>
      <JsonLd dados={schemaFAQ(PERGUNTAS_GERAIS)} />

      {/* ---------- Abertura ---------- */}
      <div className="aurora relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-ouro-400">
              Terapias integrativas · Santa Rosa de Viterbo, SP
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] text-areia-50 sm:text-5xl lg:text-[3.4rem]">
              Um lugar para você <span className="texto-ouro">voltar a ser inteiro</span>.
            </h1>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-noite-200">
              Comecei minha missão como terapeuta aos 14 anos e não parei mais. Hoje, no Espaço da
              Completude, reúno oito caminhos de cuidado — do Osatoshi japonês ao toque do Shiatsu —
              para acompanhar quem está atravessando algo difícil e quer recomeçar com clareza.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ouro-400 px-6 py-3.5 text-[0.95rem] font-semibold text-noite-900 transition hover:bg-ouro-300"
              >
                Conversar pelo WhatsApp
              </a>
              <Link
                href="/terapias"
                className="rounded-full border border-noite-300/50 px-6 py-3.5 text-[0.95rem] font-medium text-areia-100 transition hover:border-ouro-400 hover:text-ouro-300"
              >
                Ver as terapias
              </Link>
            </div>

            <div className="mt-10 max-w-xl">
              <p className="mb-2.5 text-[0.78rem] uppercase tracking-[0.2em] text-noite-300">
                Ou pergunte com suas palavras
              </p>
              <BuscaIA indice={indice} variante="escura" />
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 -z-10 rounded-full bg-noite-400/25 blur-3xl" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-mark.svg"
              alt="Símbolo do Espaço da Completude: uma figura humana de braços erguidos que é o tronco da árvore da vida, coroada por um sol de chamas e envolvida por asas de fogo."
              width={420}
              height={420}
              className="w-[16rem] max-w-full drop-shadow-2xl sm:w-[21rem] lg:w-[25rem]"
            />
          </div>
        </div>
      </div>

      {/* ---------- Para quem ---------- */}
      <Secao className="py-16 lg:py-24">
        <TituloSecao
          sobretitulo="Quando procurar"
          titulo="Talvez você tenha chegado até aqui por um destes motivos"
          texto="Não é preciso saber o nome da terapia. Basta reconhecer onde dói."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Algo trava e você não sabe o quê', 'Dificuldades que se repetem em ciclo, sem desfecho, mesmo quando você faz tudo certo.'],
            ['O corpo pesa', 'Dores nas costas, no pescoço, nos ombros. Cansaço que dormir não resolve.'],
            ['A cabeça não desliga', 'Ansiedade, pensamento acelerado, noites em claro, aperto no peito sem causa aparente.'],
            ['A casa anda pesada', 'Brigas que se repetem, clima carregado no ambiente, relações que se desgastam.'],
            ['O trabalho não flui', 'Negócios que emperram, projetos que não saem do lugar, dificuldade financeira recorrente.'],
            ['Você quer se conhecer', 'Nada está errado — você só sente que existe mais, e quer caminhar com mais consciência.'],
          ].map(([titulo, texto]) => (
            <li key={titulo} className="rounded-2xl border border-noite-100 bg-white p-6">
              <h3 className="font-display text-lg text-noite-800">{titulo}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-tinta-700">{texto}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 max-w-3xl">
          <AvisoCuidado compacto />
        </div>
      </Secao>

      {/* ---------- Destaque ---------- */}
      <div className="bg-areia-100/70 py-16 lg:py-24">
        <Secao>
          <TituloSecao
            sobretitulo="O trabalho principal"
            titulo="Osatoshi, e o que mais tem sido pedido hoje"
            texto="Três abordagens concentram a maior parte dos atendimentos. O Osatoshi, técnica japonesa da Shinri, é o trabalho ao qual Caio mais tem se dedicado."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {terapiasDestaque.map((t) => (
              <CartaoTerapia key={t.slug} terapia={t} destaque />
            ))}
          </div>
        </Secao>
      </div>

      {/* ---------- Todas ---------- */}
      <Secao className="py-16 lg:py-24">
        <TituloSecao
          sobretitulo="Todas as abordagens"
          titulo="Oito caminhos, um mesmo cuidado"
          texto="Cada tradição olha para a pessoa de um ângulo diferente. Em muitos casos, elas se combinam."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {terapias.filter((t) => !t.destaque).map((t) => (
            <CartaoTerapia key={t.slug} terapia={t} />
          ))}
        </div>
        <Link
          href="/terapias"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-noite-200 px-6 py-3 text-sm font-medium text-noite-700 transition hover:border-ouro-400 hover:text-noite-800"
        >
          Comparar todas as terapias
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </Secao>

      {/* ---------- Como funciona ---------- */}
      <div className="aurora py-16 text-areia-100 lg:py-24">
        <Secao>
          <TituloSecao
            claro
            sobretitulo="Como começa"
            titulo="Do primeiro contato à sessão"
            texto="Sem formulário longo, sem burocracia. Uma conversa basta para saber se faz sentido."
          />
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              ['Você escreve', 'Manda uma mensagem no WhatsApp contando, com suas palavras, o que está acontecendo.'],
              ['Conversamos', 'Caio ouve, tira dúvidas e indica qual abordagem faz sentido — ou se o caminho é outro.'],
              ['Marcamos', 'Presencial em Santa Rosa de Viterbo ou online, conforme a terapia e a sua disponibilidade.'],
              ['Seguimos juntos', 'Algumas práticas pedem um ciclo. Você é orientado sobre o que esperar em cada etapa.'],
            ].map(([titulo, texto], i) => (
              <li key={titulo} className="relative rounded-2xl border border-noite-400/30 bg-noite-900/25 p-6">
                <span className="font-display text-3xl text-ouro-400">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-lg text-areia-50">{titulo}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-noite-200">{texto}</p>
              </li>
            ))}
          </ol>
        </Secao>
      </div>

      {/* ---------- Perguntas ---------- */}
      <Secao className="py-16 lg:py-24">
        <TituloSecao
          sobretitulo="Perguntas frequentes"
          titulo="O que costumam querer saber antes de marcar"
        />
        <div className="mt-8">
          <Perguntas perguntas={PERGUNTAS_GERAIS} />
        </div>
        <Link href="/perguntas-frequentes" className="mt-6 inline-block text-sm font-medium text-noite-600 underline underline-offset-4">
          Ver todas as perguntas, terapia por terapia
        </Link>
      </Secao>

      {/* ---------- Chamada final ---------- */}
      <Secao className="pb-20">
        <div className="rounded-3xl border border-ouro-300/70 bg-gradient-to-br from-ouro-200/50 to-areia-100 px-6 py-12 text-center sm:px-12">
          <h2 className="font-display text-3xl text-noite-800 sm:text-4xl">
            Se você chegou até aqui, já deu o primeiro passo.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-tinta-700">
            Escreva sem compromisso. Contar o que está acontecendo já é parte do processo — e o Caio
            responde pessoalmente.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-noite-800 px-8 py-4 text-[0.95rem] font-semibold text-areia-50 transition hover:bg-noite-700"
          >
            Falar com Caio Gracco
          </a>
          <p className="mt-4 text-sm text-tinta-500">{site.telefoneFormatado} · {site.atendimento.horario}</p>
        </div>
      </Secao>
    </>
  )
}
