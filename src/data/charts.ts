/**
 * Paleta categórica de los gráficos (validada con el validador de daltonismo para fondo claro).
 * Se asigna en orden fijo a cada entidad; nunca se recicla por posición.
 * El tono dorado tiene contraste < 3:1, por eso todos los gráficos muestran etiquetas visibles y tabla.
 */
export const seriesColors = ['#17704b', '#d9a441', '#3f7fc9', '#b35c8a'] as const;

/** Color único para gráficos de una sola serie (magnitud). */
export const singleSeries = '#17704b';
