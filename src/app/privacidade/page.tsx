import Link from 'next/link'
import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { JsonLd } from '@/components/JsonLd'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { schemaBreadcrumb } from '@/lib/estrutura'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Como o Espaço da Completude trata seus dados: o que é coletado, com que base legal, por quanto tempo, com quem é compartilhado e como exercer os direitos da LGPD.',
  alternates: { canonical: '/privacidade' },
}

const ATUALIZACAO = '17 de agosto de 2026'

export default function PaginaPrivacidade() {
  return (
    <>
      <JsonLd
        dados={[
          schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Política de Privacidade', href: '/privacidade' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Política de Privacidade — Espaço da Completude',
            url: `${site.url}/privacidade`,
            dateModified: '2026-08-17',
            publisher: { '@id': `${site.url}/#espaco` },
          },
        ]}
      />
      <BarraCompartilhar titulo="Política de Privacidade — Espaço da Completude" />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            nivel={1}
            icone="escudo"
            sobretitulo="LGPD · Lei nº 13.709/2018"
            titulo="Política de Privacidade"
            texto={`Última atualização: ${ATUALIZACAO}. Em resumo: este site não coleta dados por conta própria, não usa cookies de rastreamento e não faz publicidade.`}
          />
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <div className="prosa max-w-3xl">
          <div className="not-prose rounded-2xl border border-ouro-300/70 bg-ouro-200/25 p-6">
            <p className="font-display text-xl text-noite-800">O essencial em cinco linhas</p>
            <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-[1rem] leading-relaxed text-tinta-700">
              <li>As páginas são estáticas: não há cadastro, login nem cookie de rastreamento.</li>
              <li>A busca do site roda no seu navegador — o que você digita não sai dele.</li>
              <li>O formulário de contato não envia nada para este site: ele abre o seu e-mail ou o WhatsApp.</li>
              <li>Os dados que você compartilha ao escrever servem só para responder e atender você.</li>
              <li>Você pode pedir acesso, correção ou exclusão a qualquer momento.</li>
            </ul>
          </div>

          <h2 className="mt-12 font-display text-2xl text-noite-800">1. Controlador dos dados</h2>
          <p>
            {site.nomeCompleto}, CNPJ {site.cnpj}, responsável pelo {site.nome}, com endereço em{' '}
            {site.endereco.rua}, {site.endereco.bairro}, {site.endereco.cidade}/{site.endereco.estado},
            CEP {site.endereco.cep}. Canal para assuntos de privacidade e exercício de direitos:{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">2. Este site não coleta dados por conta própria</h2>
          <p>
            As páginas são geradas de forma estática e servidas sem processamento do seu comportamento.
            Não há formulário que grave dados em servidor, não há cadastro, não há login, não há
            cookies de rastreamento, nem ferramentas de analytics ou publicidade instaladas. A busca
            interna funciona inteiramente no seu navegador: o texto digitado não é transmitido a
            servidor algum.
          </p>
          <p>
            O provedor de hospedagem registra, por segurança e por necessidade técnica de operação,
            dados de acesso como endereço IP, data e hora e tipo de navegador — tratamento fundado no
            legítimo interesse (art. 7º, IX, da LGPD) e limitado ao funcionamento e à segurança do
            serviço.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">3. Cookies</h2>
          <p>
            Não utilizamos cookies próprios de rastreamento, de perfil ou de publicidade. Podem ser
            gravados cookies por serviços de terceiros incorporados, apenas se você interagir com eles:
            o player do YouTube (carregado em modo <em>sem cookies</em>, que não grava nada antes do
            play) e o mapa do Google Maps na página de contato. Você pode bloquear ou apagar cookies
            nas configurações do seu navegador, sem prejuízo à leitura do site.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">4. Dados que você fornece ao entrar em contato</h2>
          <p>
            Ao escrever por WhatsApp, e-mail ou pelo formulário, você compartilha voluntariamente dados
            como nome, telefone, e-mail e o relato do que busca. Em algumas práticas — o Osatoshi, por
            exemplo — também são solicitados data e local de nascimento, necessários ao próprio
            trabalho.
          </p>
          <p>
            <strong>Finalidades:</strong> responder ao contato, avaliar se a prática procurada faz
            sentido, agendar e conduzir o atendimento, e manter o histórico necessário à continuidade
            do acompanhamento.
          </p>
          <p>
            <strong>Bases legais:</strong> consentimento (art. 7º, I), execução de contrato ou de
            diligências preliminares a pedido do titular (art. 7º, V) e, quando aplicável, cumprimento
            de obrigação legal ou regulatória (art. 7º, II).
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">5. Dados sensíveis</h2>
          <p>
            Relatos sobre saúde física ou mental, convicção religiosa e temas correlatos são{' '}
            <strong>dados pessoais sensíveis</strong> (art. 11 da LGPD) e recebem tratamento reservado:
            acesso restrito ao terapeuta, guarda pelo tempo necessário ao acompanhamento, sigilo
            profissional e descarte quando não houver mais finalidade. Esses dados nunca são usados
            para publicidade, segmentação ou compartilhamento comercial.
          </p>
          <p>
            Não publicamos relato, foto, depoimento ou qualquer informação de quem é atendido sem
            autorização escrita e específica.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">6. Com quem os dados são compartilhados</h2>
          <p>
            Não vendemos, alugamos nem cedemos dados pessoais. O compartilhamento se limita ao que é
            inerente ao meio que você escolheu para falar conosco — o provedor do seu e-mail, o
            WhatsApp (Meta Platforms), o provedor de hospedagem do site — e a autoridades públicas,
            quando houver determinação legal ou judicial. Alguns desses serviços operam servidores fora
            do Brasil; a transferência internacional, quando ocorre, observa o Capítulo V da LGPD.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">7. Por quanto tempo guardamos</h2>
          <p>
            Mensagens de contato que não resultam em atendimento são descartadas em até 12 meses.
            Registros ligados a atendimentos realizados são mantidos pelo prazo necessário à
            continuidade do acompanhamento e ao cumprimento de obrigações legais, e depois eliminados
            ou anonimizados.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">8. Segurança</h2>
          <p>
            Adotamos medidas técnicas e administrativas compatíveis com o porte da atividade: acesso
            restrito, dispositivos protegidos por senha, conexão do site em HTTPS e sigilo profissional.
            Nenhum sistema é infalível; havendo incidente com risco relevante, comunicaremos os
            titulares afetados e a ANPD, na forma do art. 48 da LGPD.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">9. Seus direitos</h2>
          <p>Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:</p>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5">
            <li>confirmação de que tratamos seus dados e acesso a eles;</li>
            <li>correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
            <li>portabilidade a outro fornecedor;</li>
            <li>eliminação dos dados tratados com base em consentimento;</li>
            <li>informação sobre com quem compartilhamos seus dados;</li>
            <li>revogação do consentimento, a qualquer momento e sem custo;</li>
            <li>oposição a tratamento feito com outra base legal.</li>
          </ul>
          <p className="mt-4">
            Basta escrever para <a href={`mailto:${site.email}`}>{site.email}</a>. Respondemos no menor
            prazo possível, e em até 15 dias nos casos em que a lei fixa esse limite. Podemos pedir
            confirmação de identidade antes de atender ao pedido — é uma proteção para você.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">10. Crianças e adolescentes</h2>
          <p>
            Este site é destinado a maiores de 18 anos e não coleta dados de menores de forma
            intencional. O atendimento de menores exige consentimento específico de ao menos um dos
            pais ou do responsável legal, na forma do art. 14 da LGPD.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">11. Alterações desta política</h2>
          <p>
            Esta política pode ser atualizada. A versão publicada aqui é sempre a vigente, com a data de
            revisão indicada no topo. Mudanças relevantes serão sinalizadas de forma visível no site.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">12. Encarregado e autoridade</h2>
          <p>
            Por se tratar de atividade de pequeno porte, as funções de encarregado são exercidas
            diretamente por {site.terapeuta}, pelo e-mail acima. Você também pode dirigir reclamações à
            Autoridade Nacional de Proteção de Dados (ANPD).
          </p>

          <p className="mt-10">
            Veja também os <Link href="/termos-de-uso">Termos de uso</Link> e o{' '}
            <Link href="/aviso-de-cuidado">Aviso de cuidado</Link>.
          </p>
        </div>
      </Secao>
    </>
  )
}
