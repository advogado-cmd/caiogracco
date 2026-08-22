import Link from 'next/link'
import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { CartaoTerapia } from '@/components/CartaoTerapia'
import { BuscaIA } from '@/components/BuscaIA'
import { Perguntas } from '@/components/Perguntas'
import { AvisoCuidado } from '@/components/AvisoCuidado'
import { JsonLd } from '@/components/JsonLd'
import { Icone, type NomeIcone } from '@/components/Icone'
import { Foto } from '@/components/Foto'
import { CTA } from '@/components/CTA'
import { SecaoVideos } from '@/components/SecaoVideos'
import { SecaoBlog } from '@/components/SecaoBlog'
import { Carrossel } from '@/components/Carrossel'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { terapias, terapiasDestaque } from '@/content/terapias'
import { site, whatsappLink } from '@/content/site'
import { construirIndice } from '@/lib/indice'
import { schemaFAQ } from '@/lib/estrutura'

export const metadata: Metadata = {
  // Título da aba do navegador, pedido pelo cliente. As palavras-chave ficam no H1
  // e na descrição. O Google usa os dois para montar o resultado de busca.
  title: 'Caio Gracco - Terapias da Completude',
  description:
    'Osatoshi, EMF Balancing Technique®, Reiki, Shiatsu e mais quatro terapias com Caio Gracco. Atendimento online para todo o Brasil e presencial, com hora marcada.',
  alternates: { canonical: '/' },
}

const MOTIVOS: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: 'bussola', titulo: 'Algo trava e você não sabe o quê', texto: 'Dificuldades que se repetem em ciclo, sem desfecho, mesmo quando você faz tudo certo.' },
  { icone: 'onda', titulo: 'O corpo pesa', texto: 'Dores nas costas, no pescoço, nos ombros. Cansaço que dormir não resolve.' },
  { icone: 'mente', titulo: 'A cabeça não desliga', texto: 'Ansiedade, pensamento acelerado, noites em claro, aperto no peito sem causa aparente.' },
  { icone: 'casa', titulo: 'A casa anda pesada', texto: 'Brigas que se repetem, clima carregado no ambiente, relações que se desgastam.' },
  { icone: 'trabalho', titulo: 'O trabalho não flui', texto: 'Negócios que emperram, projetos que não saem do lugar, dificuldade financeira recorrente.' },
  { icone: 'semente', titulo: 'Você quer se conhecer', texto: 'Nada está errado. Você só sente que existe mais, e quer caminhar com mais consciência.' },
]

const ETAPAS: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: 'conversa', titulo: 'Você escreve', texto: 'Manda uma mensagem no WhatsApp contando, com suas palavras, o que está acontecendo.' },
  { icone: 'coracao', titulo: 'Conversamos', texto: 'Caio ouve, tira dúvidas e indica qual abordagem faz sentido, ou se o caminho é outro.' },
  { icone: 'relogio', titulo: 'Marcamos', texto: 'Online, de onde você estiver, ou presencial, conforme a terapia e a sua disponibilidade.' },
  { icone: 'folha', titulo: 'Seguimos juntos', texto: 'Algumas práticas pedem um ciclo. Você é orientado sobre o que esperar em cada etapa.' },
]

const PERGUNTAS_GERAIS = [
  { pergunta: 'Quem é Caio Gracco?', resposta: 'Caio Gracco é terapeuta integrativo. Começou sua caminhada como terapeuta aos 14 anos e hoje se dedica sobretudo ao Osatoshi, técnica japonesa da Shinri, além de EMF Balancing Technique®, Elementoterapia Magnética, Reiki, Shiatsu, Acupuntura sistêmica, Auriculoterapia e Seitai. Atende à distância, para todo o Brasil, e também presencialmente em seu espaço.' },
  { pergunta: 'Quais terapias Caio Gracco oferece?', resposta: 'Oito abordagens: Osatoshi, EMF Balancing Technique®, Elementoterapia Magnética, Reiki, Massagem Shiatsu, Acupuntura sistêmica, Auriculoterapia e Seitai. Osatoshi, EMF Balancing e Reiki podem ser feitos à distância; as demais são presenciais.' },
  { pergunta: 'O atendimento pode ser feito online?', resposta: 'Sim. Osatoshi, EMF Balancing Technique® e Reiki são atendidos à distância, para qualquer lugar do Brasil, porque a tradição permite. Já as terapias manuais (Shiatsu, Seitai, Acupuntura e Auriculoterapia) dependem do toque e por isso são presenciais.' },
  { pergunta: 'Como escolher a terapia certa para o meu caso?', resposta: 'Não é preciso escolher sozinho. Escreva contando o que está acontecendo e o Caio indica o caminho que faz mais sentido, inclusive dizendo quando o melhor caminho é outro profissional, e não uma sessão.' },
  { pergunta: 'Essas terapias substituem tratamento médico?', resposta: 'Não, em nenhuma hipótese. São práticas complementares de bem-estar. Não substituem diagnóstico, medicação, cirurgia, psicoterapia ou acompanhamento psiquiátrico, e nenhum tratamento em curso deve ser interrompido por causa delas.' },
  { pergunta: 'Onde Caio Gracco atende?', resposta: `As terapias à distância (Osatoshi, EMF Balancing Technique® e Reiki) atendem todo o Brasil, por WhatsApp ou chamada de vídeo. As presenciais acontecem no espaço do Caio, na ${site.endereco.rua}, ${site.endereco.bairro}, ${site.endereco.cidade}/${site.endereco.estado}, CEP ${site.endereco.cep}, sempre com hora marcada.` },
]

export default function Home() {
  const indice = construirIndice()

  return (
    <>
      <JsonLd dados={schemaFAQ(PERGUNTAS_GERAIS)} />
      <BarraCompartilhar titulo="Caio Gracco, Terapias da Completude" />

      {/* ---------- Abertura ---------- */}
      <div className="aurora relative">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-ouro-400">
              Terapias integrativas · online para todo o Brasil
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] text-areia-50 sm:text-5xl lg:text-[3.5rem]">
              Um lugar para você <span className="texto-ouro">voltar a ser inteiro</span>.
            </h1>
            <p className="mt-6 max-w-xl text-[1.15rem] leading-relaxed text-noite-200">
              Comecei minha missão como terapeuta aos 14 anos e não parei mais. Hoje reúno oito
              caminhos de cuidado, do Osatoshi japonês ao toque do Shiatsu, para acompanhar
              quem está atravessando algo difícil e quer recomeçar com clareza.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-ouro-400 px-6 py-3.5 text-[1rem] font-semibold text-noite-900 transition hover:bg-ouro-300"
              >
                <Icone nome="whatsapp" tamanho={20} />
                Quero iniciar minha terapia agora
              </a>
              <Link
                href="/terapias"
                className="inline-flex items-center gap-2 rounded-full border border-noite-300/50 px-6 py-3.5 text-[1rem] font-medium text-areia-100 transition hover:border-ouro-400 hover:text-ouro-300"
              >
                Ver as terapias
                <Icone nome="seta" tamanho={18} />
              </Link>
            </div>

            <div className="relative mt-10 max-w-xl">
              <p className="mb-2.5 text-[0.82rem] uppercase tracking-[0.2em] text-noite-300">
                Ou pergunte com suas palavras
              </p>
              <BuscaIA indice={indice} variante="escura" />
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <Foto numero={1} prioridade className="max-w-[22rem] border border-noite-400/25" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-mark-escuro.svg"
              alt="Símbolo de Caio Gracco: um sol de raios dourados e rosados irradiando de um núcleo de ouro, dentro de um círculo delicado."
              width={220}
              height={220}
              className="w-32 drop-shadow-2xl sm:w-40"
            />
          </div>
        </div>
      </div>

      {/* ---------- Para quem ---------- */}
      <Secao className="py-16 lg:py-24">
        <TituloSecao
          icone="bussola"
          sobretitulo="Quando procurar"
          titulo="Talvez você tenha chegado até aqui por um destes motivos"
          texto="Não é preciso saber o nome da terapia. Basta reconhecer onde dói."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {MOTIVOS.map((m) => (
              <li key={m.titulo} className="rounded-2xl border border-noite-100 bg-cartao p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-areia-200/55 text-brasa-500">
                  <Icone nome={m.icone} tamanho={21} />
                </span>
                <h3 className="mt-4 font-display text-xl text-noite-800">{m.titulo}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-tinta-700">{m.texto}</p>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-6">
            <Foto numero={2} />
            <AvisoCuidado compacto />
          </div>
        </div>

        <CTA
          variante="discreto"
          className="mt-10"
          titulo="Reconheceu o seu caso em algum desses?"
          rotulo="Quero iniciar minha terapia agora"
        />
      </Secao>

      {/* ---------- Destaque ---------- */}
      <div className="border-y border-areia-200 bg-areia-200/25 py-16 lg:py-24">
        <Secao>
          <TituloSecao
            icone="estrela"
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
          icone="folha"
          sobretitulo="Todas as abordagens"
          titulo="Oito caminhos, um mesmo cuidado"
          texto="Cada tradição olha para a pessoa de um ângulo diferente. Em muitos casos, elas se combinam."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {terapias.map((t) => (
            <CartaoTerapia key={t.slug} terapia={t} />
          ))}
        </div>
        <Link
          href="/terapias"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-noite-200 px-6 py-3 text-[0.95rem] font-medium text-noite-700 transition hover:border-ouro-400 hover:text-noite-800"
        >
          Comparar todas as terapias
          <Icone nome="seta" tamanho={17} />
        </Link>
      </Secao>

      {/* ---------- Formação em imagens ---------- */}
      <div className="aurora py-16 text-areia-100 lg:py-24">
        <Secao>
          <TituloSecao
            claro
            icone="foto"
            sobretitulo="Formação e trajetória"
            titulo="Décadas de estudo deixam rastro"
            texto="Cursos, formaturas e exames internacionais, do curso de Acupuntura do CEMETRAC ao exame de proficiência da Federação Mundial das Sociedades de Medicina Chinesa."
          />
          <div className="mt-10">
            <Carrossel />
          </div>
        </Secao>
      </div>

      {/* ---------- Blog ---------- */}
      <Secao className="py-16 lg:py-24">
        <TituloSecao
          icone="artigo"
          sobretitulo="Do blog"
          titulo="Talvez você reconheça alguma coisa aqui"
          texto="O que se repete na família. A dor que os exames não explicam. O dinheiro que não para na mão. O vínculo que não se desfaz."
        />
        <div className="mt-10">
          <SecaoBlog />
        </div>
      </Secao>

      {/* ---------- Vídeos ---------- */}
      <div className="border-y border-areia-200 bg-areia-200/25 py-16 lg:py-24">
        <Secao>
          <TituloSecao
            icone="video"
            sobretitulo="No canal"
            titulo="O Caio explicando, com as próprias palavras"
            texto="Conversas curtas sobre carmas, proteção, como funciona o Osatoshi e o que esperar de cada terapia."
          />
          <div className="mt-10">
            <SecaoVideos />
          </div>
        </Secao>
      </div>

      {/* ---------- Como funciona ---------- */}
      <Secao className="py-16 lg:py-24">
        <TituloSecao
          icone="mapa"
          sobretitulo="Como começa"
          titulo="Do primeiro contato à sessão"
          texto="Sem formulário longo, sem burocracia. Uma conversa basta para saber se faz sentido."
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {ETAPAS.map((e, i) => (
            <li key={e.titulo} className="rounded-2xl border border-noite-100 bg-cartao p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-areia-200/55 text-brasa-500">
                  <Icone nome={e.icone} tamanho={21} />
                </span>
                <span className="font-display text-3xl text-ouro-500">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-4 font-display text-xl text-noite-800">{e.titulo}</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-tinta-700">{e.texto}</p>
            </li>
          ))}
        </ol>
      </Secao>

      {/* ---------- Perguntas ---------- */}
      <div className="border-y border-areia-200 bg-areia-200/25 py-16 lg:py-24">
        <Secao>
          <TituloSecao
            icone="mente"
            sobretitulo="Perguntas frequentes"
            titulo="O que costumam querer saber antes de marcar"
          />
          <div className="mt-8">
            <Perguntas perguntas={PERGUNTAS_GERAIS} />
          </div>
          <Link href="/perguntas-frequentes" className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-medium text-noite-600 underline underline-offset-4">
            Ver todas as perguntas, terapia por terapia
            <Icone nome="seta" tamanho={16} />
          </Link>
        </Secao>
      </div>

      {/* ---------- Chamada final ---------- */}
      <Secao className="py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <Foto numero={3} />
          <CTA
            titulo="Se você chegou até aqui, já deu o primeiro passo"
            texto="Escreva sem compromisso. Contar o que está acontecendo já é parte do processo, e o Caio responde pessoalmente."
          />
        </div>
      </Secao>
    </>
  )
}
