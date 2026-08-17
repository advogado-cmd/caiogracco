import Link from 'next/link'
import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { JsonLd } from '@/components/JsonLd'
import { schemaBreadcrumb } from '@/lib/estrutura'
import { site } from '@/content/site'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { CTA } from '@/components/CTA'

export const metadata: Metadata = {
  title: 'Aviso de cuidado',
  description:
    'Limites, evidência e responsabilidade: as terapias do Espaço da Completude são complementares e não substituem acompanhamento médico ou psicológico.',
  alternates: { canonical: '/aviso-de-cuidado' },
  openGraph: { url: `${site.url}/aviso-de-cuidado`, title: 'Aviso de cuidado — Espaço da Completude' },
}

export default function PaginaAviso() {
  return (
    <>
      <BarraCompartilhar titulo="Aviso de cuidado — Espaço da Completude" />
      <JsonLd dados={schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Aviso de cuidado', href: '/aviso-de-cuidado' }])} />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            icone="escudo"
            sobretitulo="Transparência"
            titulo="O que estas práticas são — e o que elas não são"
            nivel={1}
            texto="Esta página existe porque respeito você o bastante para não prometer o que não posso entregar."
          />
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <div className="prosa max-w-3xl">
          <h2 className="font-display text-2xl text-noite-800">São práticas complementares</h2>
          <p>
            Tudo o que é oferecido no Espaço da Completude pertence ao campo das práticas
            complementares de bem-estar. Isso significa que elas podem caminhar <strong>ao lado</strong>{' '}
            do seu cuidado de saúde — nunca no lugar dele. Nenhuma sessão aqui diagnostica doença,
            prescreve medicamento ou substitui exame, consulta, cirurgia, psicoterapia ou
            acompanhamento psiquiátrico.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">Nenhum tratamento deve ser interrompido</h2>
          <p>
            Se você faz uso de medicação, acompanhamento psicológico, psiquiátrico ou qualquer
            tratamento médico, mantenha. Nada do que acontece numa sessão justifica suspender o que
            um profissional de saúde indicou. Se em algum momento alguém — inclusive um terapeuta —
            sugerir o contrário, desconfie.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">Nem todas têm o mesmo respaldo</h2>
          <p>
            As oito abordagens praticadas aqui têm origens e níveis de comprovação muito diferentes
            entre si, e isso é dito com clareza em cada página:
          </p>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5">
            <li>
              A <strong>acupuntura sistêmica</strong> é especialidade médica reconhecida no Brasil desde
              1995 e tem o corpo de evidência mais consistente, sobretudo no manejo da dor.
            </li>
            <li>
              A <strong>auriculoterapia</strong> tem evidência favorável, ainda que não conclusiva, e
              reconhecimento institucional consolidado no SUS.
            </li>
            <li>
              O <strong>Reiki</strong> integra as práticas do SUS desde 2017 — o que é reconhecimento de
              política pública, e não validação científica de eficácia.
            </li>
            <li>
              O <strong>Shiatsu</strong> e o <strong>Seitai</strong> têm evidência limitada; o alívio
              relatado é compatível com o de terapias manuais em geral.
            </li>
            <li>
              A <strong>EMF Balancing Technique®</strong> e a <strong>Elementoterapia Magnética</strong>{' '}
              não têm estudos controlados que comprovem os efeitos que propõem.
            </li>
            <li>
              O <strong>Osatoshi</strong> é uma prática espiritual e religiosa, pertencente à cosmovisão
              da Shinri, sem qualquer pretensão de comprovação científica.
            </li>
          </ul>
          <p className="mt-4">
            Dizer isso não diminui nenhuma dessas práticas. Só coloca cada uma no seu lugar — que é
            onde ela funciona melhor.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">Quando o caminho é outro</h2>
          <p>
            Há situações em que a resposta honesta não é marcar uma sessão. Sinais de sofrimento
            psíquico intenso, pensamentos de morte, dores persistentes sem investigação, febre, perda
            de peso inexplicada, alterações neurológicas — tudo isso pede avaliação profissional
            imediata. Em caso de crise emocional, o <strong>CVV</strong> atende gratuitamente pelo
            telefone <strong>188</strong>, 24 horas por dia. Em emergência, procure o SAMU (192) ou a
            unidade de saúde mais próxima.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">Sem promessa de resultado</h2>
          <p>
            Não há garantia de resultado em nenhuma das práticas oferecidas. As respostas variam de
            pessoa para pessoa, e parte do que se sente numa sessão é subjetivo por natureza. Você
            será sempre informado sobre o que esperar, o que não esperar e quantas sessões costumam
            fazer sentido — sem pressão para continuar.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">Perguntas são bem-vindas</h2>
          <p>
            Se algo neste site não ficou claro, ou se você quer entender melhor os limites de alguma
            prática antes de marcar, <Link href="/contato">escreva</Link>. Perguntar é parte do
            cuidado.
          </p>
        </div>

        <CTA className="mt-16" />
      </Secao>
    </>
  )
}
