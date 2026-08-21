/**
 * Galeria de formação e trajetória.
 *
 * As imagens vivem em `public/galeria/`: `gNN.webp` é a versão grande, aberta
 * ao clicar, e `gNN-mini.webp` é a miniatura quadrada da grade.
 *
 * Para acrescentar uma foto: gere os dois arquivos, acrescente um item aqui com
 * legenda e ano — a grade, o lightbox e os dados estruturados se atualizam sozinhos.
 */
export type ItemGaleria = {
  id: string
  legenda: string
  contexto: string
  ano?: string
}

export const galeria: ItemGaleria[] = [
  { id: 'g17', legenda: 'Meditação no jardim', contexto: 'A prática diária que sustenta o trabalho terapêutico' },
  { id: 'g18', legenda: 'Silêncio da manhã', contexto: 'Momento de recolhimento antes dos atendimentos' },
  { id: 'g19', legenda: 'O jardim', contexto: 'O lugar de prática, entre a pedra e o verde' },
  { id: 'g16', legenda: 'Caio Gracco em seu consultório', contexto: 'Retrato profissional, com os certificados de formação ao fundo', ano: '2016' },
  { id: 'g01', legenda: 'Formatura do curso de Acupuntura', contexto: 'Centro de Estudos de Medicina Tradicional e Cultura Chinesa — CEMETRAC', ano: '2011' },
  { id: 'g04', legenda: 'Com o mestre, na formatura', contexto: 'Entrega dos certificados do curso de Acupuntura', ano: '2011' },
  { id: 'g07', legenda: 'IV Exame Internacional de Qualificação', contexto: 'Federação Mundial das Sociedades de Medicina Chinesa — WFCMS, São Paulo', ano: '2011' },
  { id: 'g09', legenda: 'Com o examinador da WFCMS', contexto: 'Exame internacional de proficiência em Medicina Chinesa e Acupuntura', ano: '2011' },
  { id: 'g14', legenda: 'Aula de Acupuntura', contexto: 'Estudo dos meridianos e dos pontos, em sala de formação' },
  { id: 'g15', legenda: 'Prática de terapia manual', contexto: 'Treinamento de técnicas de toque sobre futon', ano: '2018' },
  { id: 'g05', legenda: 'Confraternização da turma', contexto: 'Encerramento do ciclo de formação em Medicina Chinesa', ano: '2011' },
  { id: 'g08', legenda: 'Turma do exame internacional', contexto: 'Candidatos brasileiros ao exame da WFCMS', ano: '2011' },
  { id: 'g02', legenda: 'Certificados em mãos', contexto: 'Formatura do curso de Acupuntura do CEMETRAC', ano: '2011' },
  { id: 'g03', legenda: 'A turma completa', contexto: 'Formatura do curso de Acupuntura do CEMETRAC', ano: '2011' },
  { id: 'g06', legenda: 'Colegas de formação', contexto: 'Bastidores do exame internacional' },
  { id: 'g10', legenda: 'Entre colegas terapeutas', contexto: 'Intervalo do exame da WFCMS', ano: '2011' },
  { id: 'g11', legenda: 'No exame internacional', contexto: 'Federação Mundial das Sociedades de Medicina Chinesa', ano: '2011' },
  { id: 'g12', legenda: 'Reconhecimento do mestre', contexto: 'Encerramento do exame internacional', ano: '2011' },
  { id: 'g13', legenda: 'Encontro de formação', contexto: 'Estudos continuados em terapias integrativas', ano: '2016' },
]

export const mini = (id: string) => `/galeria/${id}-mini.webp`
export const grande = (id: string) => `/galeria/${id}.webp`
