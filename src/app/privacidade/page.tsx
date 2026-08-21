import Link from 'next/link'
import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { JsonLd } from '@/components/JsonLd'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { BotaoPreferenciasCookies } from '@/components/ConsentimentoCookies'
import { schemaBreadcrumb } from '@/lib/estrutura'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Cookies, Google Analytics, Google Ads e remarketing, bases legais da LGPD, prazos de guarda e como exercer seus direitos no site de Caio Gracco.',
  alternates: { canonical: '/privacidade' },
}

const ATUALIZACAO = '21 de agosto de 2026'

/** Sumário navegável — exigência prática de "informação proeminente e acessível". */
const SUMARIO = [
  ['1', 'Quem trata os seus dados'],
  ['2', 'A quem esta política se aplica'],
  ['3', 'Resumo em linguagem simples'],
  ['4', 'Dados que coletamos'],
  ['5', 'Cookies e tecnologias semelhantes'],
  ['6', 'Google Analytics'],
  ['7', 'Google Ads, remarketing e publicidade personalizada'],
  ['8', 'Dados sensíveis e o cuidado com saúde'],
  ['9', 'Finalidades e bases legais'],
  ['10', 'Compartilhamento de dados'],
  ['11', 'Transferência internacional'],
  ['12', 'Por quanto tempo guardamos'],
  ['13', 'Segurança da informação'],
  ['14', 'Seus direitos como titular'],
  ['15', 'Como revogar o consentimento'],
  ['16', 'Crianças e adolescentes'],
  ['17', 'Decisões automatizadas'],
  ['18', 'Sites de terceiros'],
  ['19', 'Incidentes de segurança'],
  ['20', 'Alterações desta política'],
  ['21', 'Encarregado e canal de contato'],
]

export default function PaginaPrivacidade() {
  return (
    <>
      <JsonLd
        dados={[
          schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Política de Privacidade', href: '/privacidade' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Política de Privacidade — Caio Gracco, Terapias da Completude',
            url: `${site.url}/privacidade`,
            dateModified: '2026-08-21',
            inLanguage: 'pt-BR',
            publisher: { '@id': `${site.url}/#espaco` },
          },
        ]}
      />
      <BarraCompartilhar titulo="Política de Privacidade — Caio Gracco" />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            nivel={1}
            icone="escudo"
            sobretitulo="LGPD · Lei nº 13.709/2018"
            titulo="Política de Privacidade"
            texto={`Última atualização: ${ATUALIZACAO}. Este documento explica, sem rodeios, quais dados este site coleta, por quê, com quem compartilha e o que você pode exigir a respeito.`}
          />
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="Sumário da política" className="lg:sticky lg:top-24 lg:h-fit">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ouro-600">Conteúdo</h2>
            <ol className="mt-4 flex flex-col gap-1.5 text-[0.88rem]">
              {SUMARIO.map(([n, t]) => (
                <li key={n}>
                  <a href={`#s${n}`} className="flex gap-2 text-tinta-700 transition hover:text-noite-600">
                    <span className="tabular-nums text-tinta-500">{n}.</span>
                    <span>{t}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prosa max-w-3xl">
            {/* ------------------------------------------------------------ */}
            <h2 id="s1" className="scroll-mt-24 font-display text-2xl text-noite-800">1. Quem trata os seus dados</h2>
            <p>
              O controlador dos dados pessoais tratados neste site é <strong>{site.nomeCompleto}</strong>,
              inscrito no CNPJ nº {site.cnpj}, responsável pelo {site.nome}, com endereço em{' '}
              {site.endereco.rua}, {site.endereco.bairro}, {site.endereco.cidade}/{site.endereco.estado},
              CEP {site.endereco.cep}, Brasil.
            </p>
            <p>
              Canal exclusivo para assuntos de privacidade, exercício de direitos e revogação de
              consentimento: <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <h2 id="s2" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">2. A quem esta política se aplica</h2>
            <p>
              Esta política vale para qualquer pessoa que acesse{' '}
              <strong>{site.url.replace('https://', '')}</strong> e suas páginas, que clique em um
              anúncio nosso, ou que entre em contato por WhatsApp, e-mail ou pelo formulário do site.
              Ela não se aplica a sites de terceiros que porventura estejam linkados aqui, ainda que
              você chegue neles a partir daqui.
            </p>

            <h2 id="s3" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">3. Resumo em linguagem simples</h2>
            <div className="not-prose mt-4 rounded-2xl border border-ouro-500/45 bg-areia-200/40 p-6">
              <ul className="flex list-disc flex-col gap-2 pl-5 text-[1rem] leading-relaxed text-tinta-700">
                <li>O conteúdo do site funciona <strong>sem nenhum cookie</strong>. Ler qualquer página não exige aceitar nada.</li>
                <li>A busca interna roda no seu navegador. O que você digita <strong>não é enviado</strong> a servidor algum.</li>
                <li>Cookies de medição e de publicidade só existem <strong>se você aceitar</strong> — e começam desligados.</li>
                <li>O formulário de contato não grava nada aqui: ele abre o seu e-mail ou o WhatsApp.</li>
                <li>Não vendemos, alugamos nem cedemos dados pessoais a ninguém.</li>
                <li><strong>Nenhum dado sobre a sua saúde é usado para direcionar anúncios.</strong></li>
                <li>Você pode mudar de ideia quando quiser, em{' '}
                  <BotaoPreferenciasCookies className="underline underline-offset-2 hover:text-noite-600" />.
                </li>
              </ul>
            </div>

            <h2 id="s4" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">4. Dados que coletamos</h2>
            <p><strong>4.1. Dados que você nos fornece.</strong> Quando você escreve por WhatsApp, e-mail ou
            pelo formulário: nome, e-mail, telefone, a terapia de interesse, o formato de atendimento
            desejado e o relato do que você busca. Em algumas práticas — o Osatoshi, por exemplo — a
            tradição pede também data e local de nascimento.</p>

            <p><strong>4.2. Dados coletados automaticamente pelo servidor.</strong> O provedor de
            hospedagem registra, por necessidade técnica e de segurança, endereço IP, data e hora do
            acesso, páginas visitadas, tipo de navegador e sistema operacional, e o site de origem.
            Esses registros são mantidos em caráter técnico e não são usados para criar perfis.</p>

            <p><strong>4.3. Dados coletados por cookies, mediante consentimento.</strong> Se — e somente
            se — você autorizar, ferramentas do Google passam a registrar páginas vistas, tempo de
            permanência, origem da visita, dispositivo, cidade aproximada e interações relevantes
            (como um clique no botão de WhatsApp). Os detalhes estão nas seções 5, 6 e 7.</p>

            <p><strong>4.4. O que nunca coletamos.</strong> Não pedimos nem armazenamos senha, dado
            bancário, número de cartão, documento de identidade ou biometria em nenhum ponto do site.</p>

            <h2 id="s5" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">5. Cookies e tecnologias semelhantes</h2>
            <p>
              Cookies são pequenos arquivos gravados no seu dispositivo. Este site trabalha com três
              categorias, e apenas a primeira é obrigatória:
            </p>
            <div className="not-prose mt-5 overflow-x-auto rounded-2xl border border-noite-100 bg-cartao">
              <table className="w-full min-w-[40rem] text-left text-[0.92rem]">
                <caption className="sr-only">Categorias de cookies utilizadas, finalidade, responsável e prazo</caption>
                <thead className="bg-areia-200/45 text-[0.76rem] uppercase tracking-wider text-tinta-700">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Categoria</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Para que serve</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Quem opera</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Prazo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-noite-100 align-top">
                  <tr>
                    <th scope="row" className="px-5 py-4 font-medium text-noite-800">Essenciais<br /><span className="text-[0.78rem] font-normal text-tinta-500">sempre ativos</span></th>
                    <td className="px-5 py-4 text-tinta-700">Guardam apenas a sua escolha sobre cookies, para não perguntarmos de novo a cada visita. Ficam no seu navegador e não identificam você.</td>
                    <td className="px-5 py-4 text-tinta-700">Este site</td>
                    <td className="px-5 py-4 text-tinta-700">Até você apagar</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-medium text-noite-800">Medição de audiência<br /><span className="text-[0.78rem] font-normal text-tinta-500">opcional</span></th>
                    <td className="px-5 py-4 text-tinta-700">Contam visitas, mostram quais páginas são mais lidas e de onde vêm as pessoas. IP anonimizado.</td>
                    <td className="px-5 py-4 text-tinta-700">Google Analytics (Google LLC)</td>
                    <td className="px-5 py-4 text-tinta-700">Até 14 meses</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-medium text-noite-800">Publicidade<br /><span className="text-[0.78rem] font-normal text-tinta-500">opcional</span></th>
                    <td className="px-5 py-4 text-tinta-700">Medem se um anúncio trouxe alguém até o site e permitem reapresentar o site a quem já visitou (remarketing).</td>
                    <td className="px-5 py-4 text-tinta-700">Google Ads (Google LLC)</td>
                    <td className="px-5 py-4 text-tinta-700">Até 540 dias</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-5">
              <strong>Consentimento prévio de verdade.</strong> Enquanto você não decidir, os sinais de
              publicidade e de medição permanecem <em>negados</em> — usamos o Modo de Consentimento v2
              do Google, que bloqueia a gravação desses cookies antes da sua autorização. Você pode
              rever a escolha a qualquer momento em{' '}
              <BotaoPreferenciasCookies className="underline underline-offset-2 hover:text-noite-600" />,
              ou apagar cookies pelas configurações do seu navegador, sem prejuízo à leitura do site.
            </p>

            <h2 id="s6" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">6. Google Analytics</h2>
            <p>
              Se você autorizar a medição de audiência, utilizamos o <strong>Google Analytics</strong>,
              serviço da Google LLC, para entender de forma agregada como o site é usado. A coleta é
              configurada com <strong>anonimização de IP</strong>, o que impede a identificação direta
              do visitante.
            </p>
            <p>
              Caso os relatórios de Dados Demográficos e Interesses estejam ativos, o Google poderá
              estimar faixa etária, gênero e interesses gerais a partir de cookies de publicidade — sempre
              de forma agregada e nunca vinculada ao seu nome. Você pode desativar essa coleta a
              qualquer momento nas{' '}
              <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer nofollow">
                Configurações de anúncios do Google
              </a>{' '}
              ou instalar o{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer nofollow">
                complemento de desativação do Google Analytics
              </a>.
            </p>

            <h2 id="s7" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">
              7. Google Ads, remarketing e publicidade personalizada
            </h2>
            <p>
              Podemos anunciar no Google. Se você autorizar os cookies de publicidade, valem as
              divulgações abaixo, exigidas pelas políticas do Google para anunciantes:
            </p>
            <ul className="mt-4 flex list-disc flex-col gap-3 pl-5">
              <li>
                Fornecedores terceiros, <strong>incluindo o Google</strong>, exibem anúncios nossos em
                sites espalhados pela internet.
              </li>
              <li>
                Esses fornecedores, incluindo o Google, utilizam <strong>cookies próprios</strong> (como
                o cookie do Google Analytics) e <strong>cookies de terceiros</strong> (como o cookie de
                publicidade do Google) <strong>em conjunto</strong> para informar, otimizar e veicular
                anúncios com base em visitas anteriores a este site.
              </li>
              <li>
                Usamos <strong>remarketing</strong>: quem visitou o site pode voltar a ver nossos
                anúncios em outros sites e aplicativos da rede do Google. Isso <em>não</em> revela quem
                você é para nós — trabalhamos apenas com listas anônimas administradas pelo Google.
              </li>
              <li>
                Usamos <strong>acompanhamento de conversões</strong> para saber se um anúncio resultou
                em contato. O dado que recebemos é estatístico e agregado.
              </li>
              <li>
                <strong>Como recusar:</strong> você pode desativar a personalização de anúncios do
                Google em{' '}
                <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer nofollow">
                  myadcenter.google.com
                </a>
                ; desativar cookies de diversos fornecedores de uma só vez em{' '}
                <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer nofollow">
                  optout.aboutads.info
                </a>{' '}
                e{' '}
                <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer nofollow">
                  optout.networkadvertising.org
                </a>
                ; ou simplesmente recusar a categoria &ldquo;Publicidade&rdquo; em{' '}
                <BotaoPreferenciasCookies className="underline underline-offset-2 hover:text-noite-600" />.
              </li>
              <li>
                Para entender como o Google utiliza dados de sites que usam seus serviços, consulte{' '}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer nofollow">
                  policies.google.com/technologies/partner-sites
                </a>{' '}
                e a{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer nofollow">
                  Política de Privacidade do Google
                </a>.
              </li>
            </ul>

            <h2 id="s8" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">
              8. Dados sensíveis e o cuidado com saúde
            </h2>
            <p>
              Relatos sobre saúde física ou mental e sobre convicção religiosa são{' '}
              <strong>dados pessoais sensíveis</strong> na forma do artigo 11 da LGPD, e recebem aqui
              tratamento reservado: acesso restrito ao terapeuta, sigilo profissional, guarda pelo tempo
              necessário ao acompanhamento e descarte quando a finalidade se encerra.
            </p>
            <p>
              Assumimos um compromisso que vai além do exigido:{' '}
              <strong>nenhuma informação sobre a sua saúde, condição, sintoma ou crença é utilizada
              para segmentar, personalizar ou direcionar anúncios</strong> — nem por nós, nem por meio
              de listas fornecidas a plataformas de publicidade. Não criamos públicos personalizados a
              partir de dados de saúde, em linha com a política do Google que restringe a publicidade
              personalizada em categorias sensíveis.
            </p>
            <p>
              O que você conta em uma conversa de atendimento jamais alimenta ferramenta de anúncio. E
              nada do que é dito, escrito ou fotografado em atendimento é publicado sem autorização
              escrita e específica.
            </p>

            <h2 id="s9" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">9. Finalidades e bases legais</h2>
            <div className="not-prose mt-4 overflow-x-auto rounded-2xl border border-noite-100 bg-cartao">
              <table className="w-full min-w-[38rem] text-left text-[0.92rem]">
                <caption className="sr-only">Finalidade de cada tratamento e a base legal correspondente na LGPD</caption>
                <thead className="bg-areia-200/45 text-[0.76rem] uppercase tracking-wider text-tinta-700">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Para quê</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Base legal (LGPD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-noite-100 align-top">
                  {[
                    ['Responder a mensagens e agendar atendimentos', 'Execução de contrato ou diligências preliminares a pedido do titular — art. 7º, V'],
                    ['Conduzir e acompanhar o atendimento', 'Consentimento específico e destacado — art. 11, I'],
                    ['Manter o site no ar, com segurança', 'Legítimo interesse — art. 7º, IX'],
                    ['Medir audiência com o Google Analytics', 'Consentimento — art. 7º, I'],
                    ['Publicidade, remarketing e conversões', 'Consentimento — art. 7º, I'],
                    ['Cumprir obrigações fiscais e legais', 'Obrigação legal ou regulatória — art. 7º, II'],
                    ['Exercer direitos em processo, se necessário', 'Exercício regular de direitos — art. 7º, VI'],
                  ].map(([f, b]) => (
                    <tr key={f}>
                      <th scope="row" className="px-5 py-4 font-medium text-noite-800">{f}</th>
                      <td className="px-5 py-4 text-tinta-700">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="s10" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">10. Compartilhamento de dados</h2>
            <p>
              <strong>Não vendemos, não alugamos e não cedemos dados pessoais.</strong> O
              compartilhamento se limita ao estritamente necessário, com os seguintes destinatários:
            </p>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5">
              <li><strong>Google LLC</strong> — Analytics e Ads, apenas se você consentir com os cookies correspondentes.</li>
              <li><strong>Vercel Inc.</strong> — hospedagem do site e registros técnicos de acesso.</li>
              <li><strong>Meta Platforms</strong> — se você optar por falar pelo WhatsApp, a conversa passa a ser regida pelas políticas do aplicativo.</li>
              <li><strong>Provedor do seu e-mail</strong> — se você optar por escrever por e-mail.</li>
              <li><strong>Autoridades públicas</strong> — apenas mediante determinação legal ou ordem judicial.</li>
            </ul>

            <h2 id="s11" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">11. Transferência internacional</h2>
            <p>
              Alguns desses fornecedores mantêm servidores fora do Brasil, sobretudo nos Estados
              Unidos. Quando isso ocorre, a transferência observa o Capítulo V da LGPD e se apoia nas
              cláusulas contratuais e nos compromissos de proteção assumidos por esses fornecedores em
              seus termos de tratamento de dados.
            </p>

            <h2 id="s12" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">12. Por quanto tempo guardamos</h2>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5">
              <li><strong>Mensagens que não viraram atendimento:</strong> até 12 meses, depois descartadas.</li>
              <li><strong>Registros de atendimento:</strong> pelo tempo necessário ao acompanhamento e ao cumprimento de obrigações legais, e então eliminados ou anonimizados.</li>
              <li><strong>Registro do seu consentimento sobre cookies:</strong> mantido enquanto valer a escolha, como prova exigida pelas políticas de consentimento.</li>
              <li><strong>Cookies de terceiros:</strong> conforme os prazos da tabela da seção 5.</li>
              <li><strong>Logs de servidor:</strong> pelo prazo técnico do provedor de hospedagem.</li>
            </ul>

            <h2 id="s13" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">13. Segurança da informação</h2>
            <p>
              Adotamos medidas técnicas e administrativas compatíveis com o porte da atividade: tráfego
              cifrado por HTTPS, dispositivos protegidos por senha, acesso restrito ao terapeuta,
              hospedagem em infraestrutura com padrões reconhecidos de segurança e sigilo profissional
              sobre tudo o que é dito em atendimento. Nenhum sistema é infalível, e não prometemos
              segurança absoluta — prometemos diligência e transparência.
            </p>

            <h2 id="s14" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">14. Seus direitos como titular</h2>
            <p>O artigo 18 da LGPD garante a você o direito de solicitar, a qualquer tempo e sem custo:</p>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5">
              <li>confirmação de que tratamos seus dados;</li>
              <li>acesso aos dados que temos sobre você;</li>
              <li>correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li>portabilidade a outro fornecedor de serviço;</li>
              <li>eliminação dos dados tratados com base no consentimento;</li>
              <li>informação sobre com quem compartilhamos seus dados;</li>
              <li>informação sobre a possibilidade de não consentir e as consequências disso;</li>
              <li>revogação do consentimento;</li>
              <li>oposição a tratamento feito com outra base legal, quando houver descumprimento.</li>
            </ul>
            <p className="mt-4">
              Basta escrever para <a href={`mailto:${site.email}`}>{site.email}</a>. Respondemos no
              menor prazo possível e, nos casos em que a lei fixa limite, em até 15 dias. Podemos pedir
              confirmação de identidade antes de atender — é uma proteção para você, não um obstáculo.
            </p>

            <h2 id="s15" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">15. Como revogar o consentimento</h2>
            <p>Revogar é tão simples quanto consentir, e você tem três caminhos:</p>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5">
              <li>
                <strong>Neste site:</strong> abra{' '}
                <BotaoPreferenciasCookies className="underline underline-offset-2 hover:text-noite-600" />{' '}
                e desmarque o que não quiser. A mudança vale na hora.
              </li>
              <li><strong>No seu navegador:</strong> apague os cookies e bloqueie novos nas configurações de privacidade.</li>
              <li><strong>Por escrito:</strong> peça a revogação pelo e-mail acima, para os dados que você já nos enviou.</li>
            </ul>

            <h2 id="s16" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">16. Crianças e adolescentes</h2>
            <p>
              Este site é destinado a pessoas maiores de 18 anos e não coleta dados de menores de forma
              intencional. O atendimento de menores exige consentimento específico e destacado de ao
              menos um dos pais ou do responsável legal, na forma do artigo 14 da LGPD. Menores de 18
              anos também não são elegíveis a publicidade personalizada, conforme as políticas do
              Google. Se você é responsável e identificou dados de um menor aqui, escreva para{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a> e eles serão eliminados.
            </p>

            <h2 id="s17" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">17. Decisões automatizadas</h2>
            <p>
              Não tomamos decisões automatizadas que afetem você. Não há triagem por algoritmo, nota de
              perfil ou classificação automática de quem escreve. Toda leitura de mensagem e toda
              decisão sobre atendimento é feita por uma pessoa.
            </p>

            <h2 id="s18" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">18. Sites de terceiros</h2>
            <p>
              O site incorpora vídeos do YouTube em modo <em>sem cookies</em> — que não gravam nada
              antes de você dar play — e um mapa do Google Maps na página de contato. Ao interagir com
              esses elementos, aplicam-se as políticas do Google. Links para outros sites são oferecidos
              como referência; não controlamos seu conteúdo nem suas práticas de privacidade.
            </p>

            <h2 id="s19" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">19. Incidentes de segurança</h2>
            <p>
              Se ocorrer incidente de segurança com risco relevante aos seus direitos, comunicaremos os
              titulares afetados e a Autoridade Nacional de Proteção de Dados em prazo razoável,
              descrevendo a natureza dos dados envolvidos, os riscos e as medidas adotadas, conforme o
              artigo 48 da LGPD.
            </p>

            <h2 id="s20" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">20. Alterações desta política</h2>
            <p>
              Esta política pode ser revisada. A versão publicada nesta página é sempre a vigente, com a
              data de atualização no topo. Mudanças relevantes serão sinalizadas de forma visível e, se
              afetarem as bases de consentimento, o pedido de autorização será feito novamente.
            </p>

            <h2 id="s21" className="mt-12 scroll-mt-24 font-display text-2xl text-noite-800">21. Encarregado e canal de contato</h2>
            <p>
              Por se tratar de atividade de pequeno porte, as funções de encarregado pelo tratamento de
              dados são exercidas diretamente por <strong>{site.terapeuta}</strong>, pelo e-mail{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a>. Você também pode dirigir reclamações à
              Autoridade Nacional de Proteção de Dados (ANPD), pelos canais oficiais em{' '}
              <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer nofollow">gov.br/anpd</a>.
            </p>

            <p className="mt-12">
              Veja também os <Link href="/termos-de-uso">Termos de uso</Link> e o{' '}
              <Link href="/aviso-de-cuidado">Aviso de cuidado</Link>, que explica os limites das
              práticas oferecidas.
            </p>
          </div>
        </div>
      </Secao>
    </>
  )
}
