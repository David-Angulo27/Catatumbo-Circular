/**
 * Alineación POTENCIAL con los Objetivos de Desarrollo Sostenible (Naciones Unidas, 2015).
 * Íconos oficiales en /public/ods (versión en español publicada por Naciones Unidas).
 * El uso de los íconos no implica respaldo ni certificación de Naciones Unidas.
 */
export interface OdsItem {
  number: number;
  name: string;
  icon: string;
  target: string;
  targetText: string;
  relation: string;
  primary?: boolean;
}

export const odsItems: OdsItem[] = [
  {
    number: 6,
    name: 'Agua limpia y saneamiento',
    icon: `${import.meta.env.BASE_URL}ods/ods-06.jpg`,
    target: 'Meta 6.3',
    targetText:
      'Mejorar la calidad del agua reduciendo la contaminación, eliminando los vertimientos y minimizando la emisión de productos químicos y materiales peligrosos.',
    relation:
      'Catatumbo Circular busca contribuir potencialmente a esta meta desarrollando materiales para explorar la captación de hidrocarburos y apoyar acciones de protección ambiental. La contribución depende de que los ensayos confirmen la absorción y de que los materiales usados se gestionen de forma adecuada.',
    primary: true,
  },
  {
    number: 12,
    name: 'Producción y consumo responsables',
    icon: `${import.meta.env.BASE_URL}ods/ods-12.jpg`,
    target: 'Meta 12.5',
    targetText: 'Reducir considerablemente la generación de desechos mediante prevención, reducción, reciclado y reutilización.',
    relation: 'Aprovechamiento de residuos agrícolas de cacao, plátano y yuca como materia prima.',
  },
  {
    number: 8,
    name: 'Trabajo decente y crecimiento económico',
    icon: `${import.meta.env.BASE_URL}ods/ods-08.jpg`,
    target: 'Meta 8.5',
    targetText: 'Lograr el empleo pleno y productivo y el trabajo decente para todas las personas.',
    relation: 'Oportunidades productivas proyectadas en recolección, transformación, logística y comercialización.',
  },
  {
    number: 10,
    name: 'Reducción de las desigualdades',
    icon: `${import.meta.env.BASE_URL}ods/ods-10.jpg`,
    target: 'Meta 10.2',
    targetText: 'Potenciar y promover la inclusión social, económica y política de todas las personas.',
    relation: 'Capacitación e inclusión económica de familias campesinas y jóvenes rurales de Tibú.',
  },
  {
    number: 7,
    name: 'Energía asequible y no contaminante',
    icon: `${import.meta.env.BASE_URL}ods/ods-07.jpg`,
    target: 'Meta 7.2',
    targetText: 'Aumentar considerablemente la proporción de energía renovable en el conjunto de fuentes energéticas.',
    relation: 'Secado de la biomasa con sistemas solares híbridos, cuyo desempeño energético deberá medirse.',
  },
];
