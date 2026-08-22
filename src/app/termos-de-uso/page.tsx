import Link from 'next/link'
import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { JsonLd } from '@/components/JsonLd'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { schemaBreadcrumb } from '@/lib/estrutura'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Termos de uso',
  description:
    'Condições de uso do site de Caio Gracco: natureza do conteúdo, limites das terapias, propriedade intelectual, responsabilidades e foro.',
  alternates: { canonical: '/termos-de-uso' },
}

const ATUALIZACAO = '17 de agosto de 2026'

export default function PaginaTermos() {
  return (
    <>
      <JsonLd
        dados={[
          schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Termos de uso', href: '/termos-de-uso' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Termos de uso, Terapias da Completude',
            url: `${site.url}/termos-de-uso`,
            dateModified: '2026-08-17',
            publisher: { '@id': `${site.url}/#espaco` },
          },
        ]}
      />
      <BarraCompartilhar titulo="Termos de uso, Caio Gracco" />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            nivel={1}
            icone="livro"
            sobretitulo="Documento legal"
            titulo="Termos de uso"
            texto={`Última atualização: ${ATUALIZACAO}. Ao navegar neste site, você concorda com as condições abaixo.`}
          />
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <div className="prosa max-w-3xl">
          <h2 className="font-display text-2xl text-noite-800">1. Quem oferece este site</h2>
          <p>
            Este site é mantido por {site.nomeCompleto}, inscrito no CNPJ {site.cnpj}, responsável
            pelo {site.nome}, com endereço em {site.endereco.rua}, {site.endereco.bairro},{' '}
            {site.endereco.cidade}/{site.endereco.estado}, CEP {site.endereco.cep}. Contato:{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a> e WhatsApp {site.telefoneFormatado}.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">2. Do que trata este site</h2>
          <p>
            O site apresenta as práticas integrativas oferecidas no {site.nome} e reúne conteúdo
            informativo sobre cada uma delas. Seu propósito é <strong>exclusivamente informativo</strong>:
            navegar por estas páginas não cria relação terapêutica, contrato de prestação de serviço
            nem obrigação de atendimento.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">3. Natureza das práticas e limites</h2>
          <p>
            As terapias descritas são <strong>práticas complementares de bem-estar</strong>, baseadas
            em tradições próprias de sua origem, com níveis de comprovação científica diferentes entre
            si, o que está declarado em cada página. Elas <strong>não constituem tratamento
            médico</strong> e não substituem diagnóstico, exame, medicação, cirurgia, psicoterapia ou
            acompanhamento psiquiátrico.
          </p>
          <p>
            Nenhum conteúdo deste site deve ser interpretado como prescrição, promessa de cura ou
            garantia de resultado. Nenhum tratamento de saúde em curso deve ser interrompido em razão
            do que se lê aqui. Em caso de sintoma físico ou psíquico, procure um profissional
            habilitado; em emergência, procure o SAMU (192) ou a unidade de saúde mais próxima. A
            íntegra dessa posição está no <Link href="/aviso-de-cuidado">Aviso de cuidado</Link>.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">4. Uso permitido</h2>
          <p>Ao usar este site, você se compromete a:</p>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5">
            <li>não empregá-lo para finalidade ilícita ou que viole direitos de terceiros;</li>
            <li>não tentar obter acesso não autorizado a sistemas, servidores ou dados;</li>
            <li>não realizar coleta automatizada em massa que comprometa o funcionamento do site;</li>
            <li>não reproduzir o conteúdo como se fosse seu, nem removê-lo de contexto de forma a induzir a erro;</li>
            <li>fornecer informações verdadeiras ao entrar em contato.</li>
          </ul>

          <h2 className="mt-10 font-display text-2xl text-noite-800">5. Propriedade intelectual</h2>
          <p>
            Os textos, a identidade visual, o símbolo, as marcas nominativas e a organização do
            conteúdo deste site são protegidos pela Lei nº 9.610/1998 (Direitos Autorais) e pela Lei
            nº 9.279/1996 (Propriedade Industrial). É permitido citar trechos com indicação clara da
            fonte e link para a página original. É vedada a reprodução integral, a adaptação ou o uso
            comercial sem autorização escrita.
          </p>
          <p>
            &ldquo;EMF Balancing Technique&rdquo; é marca registrada de sua titular, mencionada aqui
            apenas para identificar a prática. As demais denominações de técnicas pertencem a suas
            respectivas tradições e instituições.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">6. Conteúdo e serviços de terceiros</h2>
          <p>
            Algumas páginas incorporam recursos externos: vídeos do YouTube, em modo sem cookies, e o
            mapa do Google Maps na página de contato. Ao interagir com esses elementos, aplicam-se as
            políticas dos respectivos fornecedores. Links para sites de terceiros são oferecidos como
            referência; não temos controle sobre o conteúdo deles nem respondemos por ele.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">7. Contato pelo formulário e pelo WhatsApp</h2>
          <p>
            O formulário da página de contato não envia dados para este site: ele apenas monta uma
            mensagem e abre o seu programa de e-mail ou o WhatsApp. A partir daí, a comunicação passa
            a ser regida pelas políticas do serviço que você escolheu. O tratamento dos dados que você
            compartilha voluntariamente está descrito na{' '}
            <Link href="/privacidade">Política de Privacidade</Link>.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">8. Disponibilidade e alterações</h2>
          <p>
            Procuramos manter o site no ar e as informações corretas e atualizadas, mas não garantimos
            disponibilidade ininterrupta nem ausência de erros. O conteúdo pode ser alterado, ampliado
            ou removido a qualquer momento, sem aviso prévio.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">9. Limitação de responsabilidade</h2>
          <p>
            Na máxima extensão permitida pela lei brasileira, não respondemos por danos decorrentes do
            uso ou da impossibilidade de uso deste site, de decisões tomadas com base em seu conteúdo
            informativo, ou de indisponibilidade de serviços de terceiros nele incorporados. Esta
            limitação não afasta as responsabilidades que o Código de Defesa do Consumidor atribui de
            forma inafastável ao fornecedor.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">10. Público</h2>
          <p>
            Este site é destinado a pessoas maiores de 18 anos. O atendimento de menores depende de
            acompanhamento e consentimento de quem detém a responsabilidade legal.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">11. Alterações destes termos</h2>
          <p>
            Estes termos podem ser revisados a qualquer tempo. A versão publicada nesta página é sempre
            a vigente, e a data de atualização fica indicada no topo. O uso continuado do site após
            mudanças significa concordância com a versão vigente.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">12. Lei aplicável e foro</h2>
          <p>
            Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro
            da comarca de {site.endereco.cidade}/{site.endereco.estado} para dirimir controvérsias,
            ressalvado o direito do consumidor de propor ação no foro de seu domicílio, nos termos do
            artigo 101, inciso I, do Código de Defesa do Consumidor.
          </p>

          <h2 className="mt-10 font-display text-2xl text-noite-800">13. Dúvidas</h2>
          <p>
            Qualquer dúvida sobre estes termos pode ser enviada para{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </Secao>
    </>
  )
}
