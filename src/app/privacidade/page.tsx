import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { JsonLd } from '@/components/JsonLd'
import { schemaBreadcrumb } from '@/lib/estrutura'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Privacidade e proteção de dados (LGPD)',
  description:
    'Como o Espaço da Completude trata os dados de quem entra em contato: quais dados são coletados, para quê, por quanto tempo e como exercer seus direitos previstos na LGPD.',
  alternates: { canonical: '/privacidade' },
  robots: { index: true, follow: true },
}

export default function PaginaPrivacidade() {
  return (
    <>
      <JsonLd dados={schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Privacidade', href: '/privacidade' }])} />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            sobretitulo="LGPD"
            titulo="Privacidade e proteção de dados"
            texto="O que acontece com as informações que você compartilha ao entrar em contato."
          />
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <div className="prosa max-w-3xl">
          <h2 className="font-display text-2xl text-noite-800">Quem trata os dados</h2>
          <p>
            {site.nomeCompleto} (CNPJ {site.cnpj}), responsável pelo {site.nome}, com endereço em{' '}
            {site.endereco.rua}, {site.endereco.bairro}, {site.endereco.cidade}/{site.endereco.estado}.
            Contato para assuntos de privacidade: <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">Este site não coleta dados por conta própria</h2>
          <p>
            As páginas são estáticas e não possuem formulários, cadastro, login, cookies de
            rastreamento ou ferramentas de publicidade. A busca do site funciona inteiramente no seu
            navegador: o que você digita não é enviado a nenhum servidor.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">Conteúdos de terceiros</h2>
          <p>
            Duas exceções envolvem serviços externos, e é justo que você saiba: os vídeos são
            incorporados do YouTube em modo sem cookies (<em>youtube-nocookie</em>), e a página de
            contato mostra um mapa do Google Maps. Ao interagir com esses elementos, aplicam-se as
            políticas de privacidade do Google. O botão de WhatsApp apenas abre o aplicativo — a
            conversa passa a ser regida pela política do WhatsApp.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">Dados que você envia ao entrar em contato</h2>
          <p>
            Quando você escreve por WhatsApp ou e-mail, compartilha voluntariamente informações como
            nome, telefone e o relato do que busca. Em algumas práticas — o Osatoshi, por exemplo —
            também são solicitados data e local de nascimento. Esses dados são usados{' '}
            <strong>exclusivamente</strong> para o atendimento, com base legal no artigo 7º, incisos I
            e V, da Lei nº 13.709/2018 (LGPD), e não são vendidos, cedidos ou usados para publicidade.
          </p>
          <p>
            Relatos sobre saúde são dados pessoais sensíveis (art. 11 da LGPD) e recebem tratamento
            reservado: acesso restrito ao terapeuta, guarda pelo tempo necessário ao acompanhamento e
            descarte quando não houver mais finalidade.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">Seus direitos</h2>
          <p>
            Você pode, a qualquer momento, pedir confirmação do tratamento, acesso, correção,
            anonimização, portabilidade ou eliminação dos seus dados, além de revogar o consentimento.
            Basta escrever para <a href={`mailto:${site.email}`}>{site.email}</a>. O pedido é atendido
            no menor prazo possível.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">Atualizações</h2>
          <p>
            Se esta política mudar, a versão publicada aqui é sempre a vigente. Última revisão: agosto
            de 2026.
          </p>
        </div>
      </Secao>
    </>
  )
}
