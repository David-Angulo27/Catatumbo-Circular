/**
 * Fuentes y referencias del proyecto (APA 7).
 * Los enlaces se publican sin parámetros de rastreo.
 */
export type SourceCategory = 'territorio' | 'ciencia' | 'institucional' | 'precios';

export interface Source {
  id: string;
  category: SourceCategory;
  /** Referencia APA 7 sin la URL. Use *texto* para cursiva. */
  apa: string;
  url: string;
  /** Para qué se usa la fuente en el sitio. */
  usedFor: string;
  /** Fecha de consulta, cuando el documento del proyecto la registra. */
  accessed?: string;
}

export const sourceCategories: Record<SourceCategory, string> = {
  territorio: 'Problemática territorial',
  ciencia: 'Antecedentes científicos',
  institucional: 'Datos institucionales y marco de referencia',
  precios: 'Fuentes de precios del presupuesto',
};

export const sources: Source[] = [
  {
    id: 'wradio-2024',
    category: 'territorio',
    apa: 'W Radio. (2024, 22 de enero). *Emergencia ambiental por derrame de crudo en Tibú*. W Radio.',
    url: 'https://www.wradio.com.co/2024/01/22/emergencia-ambiental-por-derrame-de-crudo-en-tibu/',
    usedFor: 'Dato clave: emergencia ambiental de enero de 2024 en la vereda Guachimán.',
  },
  {
    id: 'rodriguez-2018',
    category: 'territorio',
    apa: 'Rodríguez Escalante, E. D. (2018). *Monitoreo de las afectaciones ambientales originadas por la extracción ilícita del crudo de la infraestructura petrolera en el campo de explotación de hidrocarburos Tibú* [Trabajo académico]. Universidad Libre, Seccional Cúcuta.',
    url: 'https://repository.unilibre.edu.co/bitstream/handle/10901/11714/MONITOREO%20DE%20LAS%20AFECTACIONES%20AMBIENTALES%20ORIGINADAS%20POR%20LA%20EXTRACCI%C3%93N%20IL%C3%8DCITA%20DEL%20CRUDO%20DE%20LA%20INFRAESTRUCTURA%20PETROLERA%20EN%20EL%20CAMPO%20DE%20EXPLOTACI%C3%93N%20DE%20HIDROCARBUROS%20TIB%C3%9A.pdf',
    usedFor: 'Antecedente de los 570 km de líneas del Campo Tibú (Introducción, p. 9) e incidentes 2017–2018.',
  },
  {
    id: 'analisis-urbano',
    category: 'territorio',
    apa: 'Análisis Urbano. (s. f.). *Mexicanos sorprendidos por huachicoleo en Colombia: uso de combustibles para elaborar cocaína*. Análisis Urbano.',
    url: 'https://analisisurbano.org/mexicanos-sorprendidos-por-huachicoleo-en-colombia-uso-de-combustibles-para-elaborar-cocaina/',
    usedFor: 'Fuente periodística complementaria sobre la extracción ilícita de crudo.',
  },
  {
    id: 'vera-2025',
    category: 'ciencia',
    apa: 'Vera Infante, T. G., Ferrer Gutiérrez, J. P., Gadvay Yambay, K. A., Blacio Toro, S. E., y Cuenca-Mayorga, F. P. (2025). Materiales absorbentes elaborados a partir de residuos de la agroindustria del banano, arroz y cacao destinados a la captación de hidrocarburos. *Acta Agronómica, 72*(2), 117–124.',
    url: 'https://doi.org/10.15446/acag.v72n2.111928',
    usedFor: 'Antecedente científico de capacidad de absorción y flotabilidad de residuos agroindustriales.',
  },
  {
    id: 'dane',
    category: 'institucional',
    apa: 'Departamento Administrativo Nacional de Estadística [DANE]. (s. f.). *Proyecciones de población*.',
    url: 'https://www.dane.gov.co/index.php/estadisticas-por-tema/demografia-y-poblacion/proyecciones-de-poblacion',
    usedFor: 'Población municipal estimada de Tibú para 2025 (contexto, no beneficiarios).',
  },
  {
    id: 'onu-2015',
    category: 'institucional',
    apa: 'Naciones Unidas. (2015). *Objetivos de Desarrollo Sostenible*.',
    url: 'https://sdgs.un.org/goals',
    usedFor: 'Metas 6.3, 7.2, 8.5, 10.2 y 12.5 citadas en la sección de sostenibilidad.',
  },
  // ---- Fuentes de precios (Segunda entrega, presupuesto verde preliminar; consulta 22/10/2026) ----
  {
    id: 'equipagro',
    category: 'precios',
    apa: 'Equipagro. (s. f.). *Trituradores de residuos orgánicos*.',
    url: 'https://equipagro.co/categoria-producto/trituradores-de-residuos-organicos/',
    usedFor: 'Referencia para la trituradora. El valor presupuestado no está confirmado por esta fuente.',
    accessed: '22 de octubre de 2026',
  },
  {
    id: 'agrosavia',
    category: 'precios',
    apa: 'AGROSAVIA. (s. f.). *Equipo para el secado de cacao de alta eficiencia energética y fotovoltaico*.',
    url: 'https://www.agrosavia.co/productos-y-servicios/oferta-tecnol%C3%B3gica/l%C3%ADnea-agr%C3%ADcola/cacao/maquinaria-equipos-instrumentos-y-herramientas/841-equipo-para-el-secado-de-cacao-de-alta-eficiencia-energ%C3%A9tica-y-fotovoltaico',
    usedFor: 'Referencia tecnológica del secador solar híbrido (no es una cotización comercial).',
    accessed: '22 de octubre de 2026',
  },
  {
    id: 'autosolar',
    category: 'precios',
    apa: 'AutoSolar Colombia. (s. f.). *Paneles solares, baterías e inversores*.',
    url: 'https://autosolar.co/',
    usedFor: 'Referencia para paneles, baterías e inversores. Cotización pendiente.',
    accessed: '22 de octubre de 2026',
  },
  {
    id: 'coha',
    category: 'precios',
    apa: 'COHA. (s. f.). *Fabricación de prensas y máquinas hidráulicas*.',
    url: 'https://coha.com.co/fabricacion/prensas-maquinas-hidraulicas/',
    usedFor: 'Referencia para la prensa. La página no confirma el precio presupuestado.',
    accessed: '22 de octubre de 2026',
  },
  {
    id: 'gyo',
    category: 'precios',
    apa: 'GYO Ingeniería. (s. f.). *Kits*.',
    url: 'https://www.gyoingenieria.com/tienda/categoria/kits',
    usedFor: 'Precio publicado del kit Arduino ($160.000). No equivale a un medidor de humedad calibrado.',
    accessed: '22 de octubre de 2026',
  },
  {
    id: 'isoplasticos',
    category: 'precios',
    apa: 'ISOPLÁSTICOS. (s. f.). *Envases y piezas plásticas*.',
    url: 'https://isoplasticos.com/',
    usedFor: 'Referencia para recipientes y bandejas. Sin precio público para el modelo exacto.',
    accessed: '22 de octubre de 2026',
  },
  {
    id: 'cootranorsa',
    category: 'precios',
    apa: 'COOTRANORSA. (s. f.). *Cooperativa de cacao y plátano* [Sitio web].',
    url: 'https://cootranorsa.com.co/',
    usedFor: 'Productores potenciales de cáscara de cacao y residuos de plátano. Precio por kg por confirmar.',
    accessed: '22 de octubre de 2026',
  },
  {
    id: 'gobernacion-desarrollo',
    category: 'precios',
    apa: 'Gobernación de Norte de Santander. (s. f.). *Secretaría de Desarrollo Económico y Productividad*.',
    url: 'https://administrador.nortedesantander.gov.co/admin-departamental/secretaria-de-desarrollo-economico-y-productividad/',
    usedFor: 'Directorio de asociaciones (ASODEPT) para gestionar vástago de plátano. Precio no confirmado.',
    accessed: '22 de octubre de 2026',
  },
  {
    id: 'gobernacion-agricultura',
    category: 'precios',
    apa: 'Gobernación de Norte de Santander. (s. f.). *Secretaría de Agricultura y Desarrollo Rural*.',
    url: 'https://administrador.nortedesantander.gov.co/admin-departamental/secretaria-de-agricultura-y-desarrollo-rural/',
    usedFor: 'Canal para identificar procesadores de yuca. No se identificó proveedor de bagazo.',
    accessed: '22 de octubre de 2026',
  },
  {
    id: 'vita',
    category: 'precios',
    apa: 'Vita Company Colombia. (s. f.). *ProBioVita*.',
    url: 'https://www.vitacompanycolombia.com/product-page/probiovita',
    usedFor: 'Microorganismos para compost: precio público de $276.200 por 30 L; el costo mensual debe recalcularse.',
    accessed: '22 de octubre de 2026',
  },
  {
    id: 'kuyk',
    category: 'precios',
    apa: 'Kuyk S. A. S. (s. f.). *Equipos de protección personal y dotación*.',
    url: 'https://kuyk.com.co/',
    usedFor: 'Referencia para gafas, guantes, botas y overoles. Cotización pendiente.',
    accessed: '22 de octubre de 2026',
  },
];
