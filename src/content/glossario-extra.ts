import type { Termo } from './tipos'

/**
 * Verbetes que não pertencem a uma terapia específica.
 *
 * Reúne o vocabulário do campo das práticas integrativas no Brasil: as 29 práticas
 * que constam da Política Nacional de Práticas Integrativas e Complementares (PNPIC)
 * do Ministério da Saúde, o vocabulário das tradições espirituais que aparecem no
 * blog, e os termos institucionais que as pessoas encontram e não sabem o que querem
 * dizer. A lista da PNPIC foi conferida na fonte, em gov.br.
 *
 * O glossário é descritivo: explica o termo, não anuncia serviço. As oito práticas
 * atendidas por Caio Gracco têm páginas próprias, ligadas a partir de cada verbete
 * correspondente.
 */
export type VerbeteExtra = Termo & { grupo: 'pnpic' | 'tradicao' | 'institucional' }

export const glossarioExtra: VerbeteExtra[] = [
  // ---------- As 29 práticas da PNPIC ----------
  { grupo: 'pnpic', termo: 'Apiterapia', definicao: 'Uso terapêutico de produtos das abelhas: mel, própolis, pólen, geleia real e apitoxina. Integra a Política Nacional de Práticas Integrativas e Complementares desde 2018.' },
  { grupo: 'pnpic', termo: 'Aromaterapia', definicao: 'Uso de óleos essenciais extraídos de plantas, por inalação ou aplicação na pele, com finalidade de bem-estar. Consta da PNPIC desde 2018.' },
  { grupo: 'pnpic', termo: 'Arteterapia', definicao: 'Uso de recursos artísticos (desenho, pintura, modelagem, escrita) como via de expressão e elaboração emocional, conduzido por profissional formado. Consta da PNPIC desde 2017.' },
  { grupo: 'pnpic', termo: 'Ayurveda', definicao: 'Sistema médico tradicional indiano, com milênios de história, que organiza o cuidado em torno dos doshas (Vata, Pitta e Kapha), da alimentação, da rotina e de práticas de purificação. Consta da PNPIC desde 2006.' },
  { grupo: 'pnpic', termo: 'Biodança', definicao: 'Prática criada pelo chileno Rolando Toro que usa música, movimento e encontro em grupo para trabalhar expressão e vínculo. Consta da PNPIC desde 2017.' },
  { grupo: 'pnpic', termo: 'Bioenergética', definicao: 'Abordagem que parte da ideia de que tensões emocionais se fixam em padrões musculares, trabalhando o corpo como via de elaboração. Consta da PNPIC desde 2018.' },
  { grupo: 'pnpic', termo: 'Constelação familiar', definicao: 'Método desenvolvido pelo alemão Bert Hellinger que trabalha o sistema familiar e o que nele se repete entre gerações, geralmente em dinâmica de grupo. Consta da PNPIC desde 2018 e é objeto de debate no meio acadêmico.' },
  { grupo: 'pnpic', termo: 'Cromoterapia', definicao: 'Uso de cores com finalidade terapêutica, atribuindo a cada faixa do espectro um efeito sobre o estado da pessoa. Consta da PNPIC desde 2018. Revisões sistemáticas não demonstram efeito além do placebo.' },
  { grupo: 'pnpic', termo: 'Dança circular', definicao: 'Danças em roda, de origem folclórica ou contemporânea, praticadas em grupo com finalidade de integração e bem-estar. Consta da PNPIC desde 2017.' },
  { grupo: 'pnpic', termo: 'Geoterapia', definicao: 'Uso terapêutico de argilas, lamas e minerais, sobretudo em aplicações sobre a pele. Consta da PNPIC desde 2018.' },
  { grupo: 'pnpic', termo: 'Hipnoterapia', definicao: 'Uso clínico da hipnose, um estado de atenção concentrada, como recurso auxiliar em psicoterapia e no manejo de dor e ansiedade. Consta da PNPIC desde 2018 e no Brasil seu uso clínico é restrito a profissionais de saúde habilitados.' },
  { grupo: 'pnpic', termo: 'Homeopatia', definicao: 'Sistema terapêutico criado por Samuel Hahnemann no século XVIII, baseado na semelhança e em diluições sucessivas. É especialidade médica reconhecida no Brasil e consta da PNPIC desde 2006. Sua eficácia além do placebo é objeto de contestação científica persistente.' },
  { grupo: 'pnpic', termo: 'Imposição de mãos', definicao: 'Prática de aproximar ou pousar as mãos sobre a pessoa com intenção de cuidado, presente em várias tradições religiosas e espirituais. Consta da PNPIC desde 2018. É o gênero do qual o Reiki é uma das formas sistematizadas.' },
  { grupo: 'pnpic', termo: 'Medicina antroposófica', definicao: 'Abordagem médica derivada da antroposofia de Rudolf Steiner, que articula a medicina convencional a uma leitura própria do ser humano. Consta da PNPIC desde 2006.' },
  { grupo: 'pnpic', termo: 'Medicina Tradicional Chinesa', definicao: 'Sistema médico com mais de dois mil anos que reúne acupuntura, fitoterapia chinesa, dietética, práticas corporais como o Tai Chi Chuan e técnicas manuais. É a entrada mais antiga da PNPIC, presente desde 2006, e o campo do qual derivam a acupuntura e a auriculoterapia.' },
  { grupo: 'pnpic', termo: 'Meditação', definicao: 'Conjunto de práticas de atenção e regulação da mente, de origens diversas. Consta da PNPIC desde 2017 e é, entre as práticas da política, uma das que reúnem maior volume de pesquisa.' },
  { grupo: 'pnpic', termo: 'Musicoterapia', definicao: 'Uso da música e de seus elementos em processo conduzido por profissional formado, com objetivos de saúde e reabilitação. Consta da PNPIC desde 2017.' },
  { grupo: 'pnpic', termo: 'Naturopatia', definicao: 'Abordagem que reúne recursos naturais (alimentação, plantas, água, movimento) em torno da ideia de estimular a capacidade do organismo de se regular. Consta da PNPIC desde 2017.' },
  { grupo: 'pnpic', termo: 'Osteopatia', definicao: 'Sistema de avaliação e tratamento manual do corpo, com foco na mobilidade das estruturas e nas relações entre elas. Consta da PNPIC desde 2017.' },
  { grupo: 'pnpic', termo: 'Ozonioterapia', definicao: 'Uso terapêutico do gás ozônio por diferentes vias. Consta da PNPIC desde 2018 e é a mais controversa da lista, com restrições regulatórias e alertas de sociedades médicas quanto a indicações sem respaldo.' },
  { grupo: 'pnpic', termo: 'Plantas medicinais e fitoterapia', definicao: 'Uso de plantas e de seus derivados com finalidade terapêutica. Consta da PNPIC desde 2006 e é a prática com maior grau de regulação sanitária no Brasil, com registro de medicamentos fitoterápicos na Anvisa.' },
  { grupo: 'pnpic', termo: 'Quiropraxia', definicao: 'Abordagem manual centrada na coluna e nas articulações, com técnicas de ajuste. Consta da PNPIC desde 2017 e é profissão com formação de nível superior no Brasil.' },
  { grupo: 'pnpic', termo: 'Reflexoterapia', definicao: 'Aplicação de pressão em pontos dos pés, mãos ou orelhas, tomados como correspondentes a regiões do corpo. Consta da PNPIC desde 2017. Também chamada de reflexologia.' },
  { grupo: 'pnpic', termo: 'Shantala', definicao: 'Técnica de massagem para bebês, de origem indiana, difundida no Ocidente pelo obstetra francês Frédérick Leboyer. Consta da PNPIC desde 2017 e costuma ser ensinada aos próprios pais.' },
  { grupo: 'pnpic', termo: 'Terapia Comunitária Integrativa', definicao: 'Rodas de conversa em grupo, criadas no Brasil pelo psiquiatra Adalberto Barreto, em que a comunidade partilha sofrimentos e recursos de enfrentamento. Consta da PNPIC desde 2017.' },
  { grupo: 'pnpic', termo: 'Terapia de florais', definicao: 'Uso de preparações a partir de flores, na linha desenvolvida pelo médico inglês Edward Bach, voltadas a estados emocionais. Consta da PNPIC desde 2018. Revisões sistemáticas não demonstram efeito além do placebo. Estar na política pública é reconhecimento institucional, não atestado de eficácia.' },
  { grupo: 'pnpic', termo: 'Termalismo social e crenoterapia', definicao: 'Uso terapêutico de águas minerais, em banhos e ingestão, em estações de águas. Consta da PNPIC desde 2006.' },
  { grupo: 'pnpic', termo: 'Yoga', definicao: 'Tradição indiana que reúne posturas, respiração, concentração e meditação. Consta da PNPIC desde 2017 e é uma das práticas com maior corpo de pesquisa entre as da política.' },

  // ---------- Termos institucionais ----------
  { grupo: 'institucional', termo: 'PNPIC', definicao: 'Política Nacional de Práticas Integrativas e Complementares, do Ministério da Saúde. Criada pela Portaria GM/MS nº 971, de 2006, e ampliada em 2017 e 2018, reúne hoje 29 práticas que podem ser ofertadas no SUS. Estar na PNPIC significa reconhecimento institucional como recurso de cuidado. Não é atestado de eficácia científica, e as duas coisas são frequentemente confundidas.' },
  { grupo: 'institucional', termo: 'PICS', definicao: 'Sigla de Práticas Integrativas e Complementares em Saúde, o nome oficial do conjunto de abordagens reunidas na PNPIC. No dia a dia também se diz "terapias integrativas" ou "terapias complementares".' },
  { grupo: 'institucional', termo: 'Prática complementar', definicao: 'Prática usada junto com o tratamento de saúde, e não no lugar dele. É diferente de prática alternativa, expressão que sugere substituição. A distinção não é detalhe de linguagem: abandonar tratamento por uma prática complementar é o risco mais concreto deste campo.' },
  { grupo: 'institucional', termo: 'Terapeuta holístico', definicao: 'Ocupação reconhecida na Classificação Brasileira de Ocupações, sem conselho de classe que a regulamente. Isso significa que não há registro profissional obrigatório, e também que o terapeuta não pode diagnosticar, prescrever medicamento nem realizar ato privativo de profissional de saúde.' },
  { grupo: 'institucional', termo: 'Placebo', definicao: 'Efeito de melhora que aparece a partir da expectativa, do cuidado recebido e do próprio ritual do atendimento, e não do recurso específico usado. Não é engano nem imaginação: é um efeito real e mensurável. Em pesquisa clínica, dizer que algo não supera o placebo significa que a melhora observada não pode ser atribuída à técnica.' },
  { grupo: 'institucional', termo: 'Revisão sistemática', definicao: 'Estudo que reúne e avalia de forma estruturada toda a pesquisa disponível sobre uma pergunta. É o nível mais alto de evidência e a razão pela qual um punhado de estudos favoráveis isolados não sustenta uma afirmação de eficácia.' },
  { grupo: 'institucional', termo: 'Cochrane', definicao: 'Rede internacional independente que produz revisões sistemáticas na área da saúde, reconhecida pelo rigor metodológico. É a referência mais citada quando se discute o que a evidência mostra sobre uma prática.' },

  // ---------- Vocabulário das tradições ----------
  { grupo: 'tradicao', termo: 'Egrégora', definicao: 'Nas tradições esotéricas, a energia formada pela reunião de pessoas em torno de um mesmo propósito. Diz-se que existe egrégora de uma empresa, de uma igreja, de uma família, de um time. Quem participa de muitos grupos com valores conflitantes pode sentir isso como dispersão.' },
  { grupo: 'tradicao', termo: 'Carma', definicao: 'Do sânscrito karma, ação. Nas tradições indianas e nas leituras brasileiras que delas derivam, o princípio de que as ações produzem consequências que atravessam existências. Não é castigo nem sentença: a leitura fatalista é a mais difundida e a menos útil.' },
  { grupo: 'tradicao', termo: 'Carma familiar', definicao: 'Ideia de que um padrão atravessa gerações de uma mesma família: o mesmo tipo de casamento, a mesma relação com dinheiro, o mesmo conflito. Tem leitura espiritual e tem leitura psicológica, e as duas descrevem o mesmo fenômeno observado: o que se repete.' },
  { grupo: 'tradicao', termo: 'Vínculo energético', definicao: 'Nas tradições espirituais, a ligação que permanece entre duas pessoas depois do fim de uma relação. O que a psicologia descreve como apego, luto prolongado e dependência emocional é frequentemente o mesmo fenômeno em outro vocabulário.' },
  { grupo: 'tradicao', termo: 'Corte de laços', definicao: 'Trabalho que se propõe a desfazer um vínculo energético com alguém. Não apaga sentimento, não faz a pessoa voltar nem sumir, e não substitui decisão prática nem processo terapêutico.' },
  { grupo: 'tradicao', termo: 'Limpeza energética', definicao: 'Conjunto de práticas voltadas a dissipar o que se descreve como energia acumulada em uma pessoa ou em um ambiente. Vai do gesto simbólico da tradição popular (sal grosso, banho de ervas, defumação) ao trabalho conduzido por um terapeuta.' },
  { grupo: 'tradicao', termo: 'Sinastria', definicao: 'Na astrologia, a comparação entre os mapas de duas pessoas para descrever a dinâmica entre elas. É uma das linguagens com que se tenta responder por que alguém mexe tanto com a gente, ao lado da linguagem psicológica e da espiritual.' },
  { grupo: 'tradicao', termo: 'Chama gêmea', definicao: 'Expressão do vocabulário espiritual contemporâneo para uma ligação descrita como intensa e transformadora. Circula muito em redes sociais e às vezes é usada para justificar relações que machucam, o que merece atenção.' },
  { grupo: 'tradicao', termo: 'Relacionamento kármico', definicao: 'Relação lida como continuação de um vínculo de outra existência, marcada por atração forte e conflito recorrente. Descreve, em outro vocabulário, muito do que a psicologia chama de padrão de repetição e de dependência emocional.' },
]
