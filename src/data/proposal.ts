/**
 * Contenido de "Nuestra propuesta" y "Sostenibilidad e impacto" exigido por la estructura mínima del sitio:
 * aporte de cada componente STEM, lienzo resumido y acciones en las tres dimensiones de la sostenibilidad.
 * Todo es PROPUESTO o PROYECTADO: no hay ventas, alianzas ni resultados de ensayo confirmados.
 */

export const stemComponents = [
  {
    letter: 'S',
    name: 'Ciencia',
    contribution:
      'Caracterización de la biomasa (humedad, fibra, tamaño de partícula), estudio de la absorción de hidrocarburos y de los microorganismos nativos para el compost.',
    evidence: 'Diseño de ensayos de absorción y flotabilidad',
  },
  {
    letter: 'T',
    name: 'Tecnología',
    contribution:
      'Plataforma web de trazabilidad (origen, recepción, humedad, inventario), sensores de humedad con Arduino y Python, y marketplace B2B.',
    evidence: 'Demostración funcional en este sitio',
  },
  {
    letter: 'E',
    name: 'Ingeniería',
    contribution:
      'Diseño del proceso productivo (trituración, secado solar híbrido y prensado), de los prototipos BioPads y BioBooms y del centro comunitario.',
    evidence: 'Proceso y equipos definidos en el inventario',
  },
  {
    letter: 'M',
    name: 'Matemáticas',
    contribution:
      'Presupuesto y viabilidad, balance de biomasa (kg/mes) e indicador de capacidad de absorción en kg de hidrocarburo por kg de absorbente.',
    evidence: 'Totales del presupuesto calculados y verificados',
  },
] as const;

/** Lienzo del modelo de negocio, versión resumida (9 bloques). */
export const canvasBlocks = [
  {
    key: 'socios',
    title: 'Socios clave',
    items: ['Productores rurales y cooperativas de cacao y plátano (potenciales)', 'Aliados académicos para ensayos', 'Gestores ambientales autorizados'],
  },
  {
    key: 'actividades',
    title: 'Actividades clave',
    items: ['Acopio y registro de biomasa', 'Secado, trituración y prensado', 'Ensayos de absorción', 'Capacitación comunitaria'],
  },
  {
    key: 'recursos',
    title: 'Recursos clave',
    items: ['Centro comunitario de procesamiento', 'Secadores solares, trituradora y prensa', 'Plataforma de trazabilidad'],
  },
  {
    key: 'valor',
    title: 'Propuesta de valor',
    items: [
      'Absorbentes de origen agrícola local, en validación',
      'Trazabilidad digital del origen de la biomasa',
      'Ingreso adicional para productores por sus residuos',
    ],
  },
  {
    key: 'relaciones',
    title: 'Relación con clientes',
    items: ['Atención directa B2B', 'Pruebas piloto con clientes interesados', 'Kits de respuesta a la medida'],
  },
  {
    key: 'canales',
    title: 'Canales',
    items: ['Marketplace B2B en línea', 'Contacto directo con empresas', 'Distribuidores de insumos industriales'],
  },
  {
    key: 'segmentos',
    title: 'Segmentos de clientes',
    items: ['Empresas petroleras e industriales', 'Empresas de mantenimiento', 'Empresas de gestión ambiental'],
  },
  {
    key: 'costos',
    title: 'Estructura de costos',
    items: ['Inversión inicial en equipos', 'Nómina y operación (12 meses)', 'Compra de biomasa e insumos'],
  },
  {
    key: 'ingresos',
    title: 'Fuentes de ingresos',
    items: ['Venta de BioPads, BioBooms y BioGranulado', 'Venta de BioCompost', 'Kits de respuesta'],
  },
] as const;

export type DimensionKey = 'ambiental' | 'social' | 'economica';

export const dimensions: { key: DimensionKey; title: string; actions: string[] }[] = [
  {
    key: 'ambiental',
    title: 'Ambiental',
    actions: [
      'Aprovechar 18.000 kg/año proyectados de residuos de cacao, plátano y yuca.',
      'Secar la biomasa con energía solar híbrida.',
      'Separar los absorbentes usados y entregarlos a un gestor autorizado.',
      'Elaborar compost solo con biomasa limpia.',
    ],
  },
  {
    key: 'social',
    title: 'Social',
    actions: [
      'Centros comunitarios de procesamiento en Tibú.',
      'Capacitación de jóvenes y familias campesinas.',
      '11 cargos proyectados para operar el piloto.',
      'Validación del proyecto con las comunidades.',
    ],
  },
  {
    key: 'economica',
    title: 'Económica',
    actions: [
      'Pago de referencia de $100 a $150 por kg de biomasa entregada.',
      'Comercialización B2B de bioproductos tras su validación.',
      'Usos diversificados para no depender de los derrames.',
      'Costo de producción por kg medido en el piloto.',
    ],
  },
];
