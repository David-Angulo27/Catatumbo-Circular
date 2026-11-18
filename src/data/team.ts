/**
 * Equipo académico (3 integrantes). Áreas de contribución tomadas del registro de aportes
 * del presupuesto verde. No incluir cargos, experiencia ni alianzas no verificadas.
 * Para usar fotografías reales, agregue `photo` solo con autorización expresa.
 */
export interface TeamMember {
  name: string;
  initials: string;
  program: string;
  area: string;
  contribution: string;
  photo?: string;
}

export const team: TeamMember[] = [
  {
    name: 'Kevin Sebastian Lopez Ramirez',
    initials: 'KL',
    program: 'Ingeniería de Sistemas',
    area: 'Impactos y presupuesto',
    contribution: 'Matriz de impactos y su relación con los ODS, medidas de prevención y presupuesto verde.',
  },
  {
    name: 'David Alejandro Angulo Sanchez',
    initials: 'DA',
    program: 'Ingeniería de Sistemas',
    area: 'Tecnología y trazabilidad',
    contribution: 'Plataforma de trazabilidad, modelo B2B y propuesta de monitoreo de humedad con Arduino y Python.',
  },
  {
    name: 'Nicolas Felipe Rodriguez Moreno',
    initials: 'NR',
    program: 'Ingeniería de Sistemas',
    area: 'Análisis y organización del proyecto',
    contribution: 'Matriz de riesgos, medidas de mitigación e integración del proyecto en el presupuesto.',
  },
];
