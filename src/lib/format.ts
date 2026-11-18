const cop = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });
const dec1 = new Intl.NumberFormat('es-CO', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** 402207116 → "$402.207.116" */
export const formatCOP = (n: number) => `$${cop.format(Math.round(n))}`;
/** 1500 → "1.500" */
export const formatNumber = (n: number) => cop.format(n);
/** 0.1867 → "18,7 %" */
export const formatPct = (ratio: number) => `${dec1.format(ratio * 100)} %`;
/** 75113000 → "$75,1 M" (para etiquetas cortas en gráficos) */
export const formatMillions = (n: number) => `$${dec1.format(n / 1_000_000)} M`;
