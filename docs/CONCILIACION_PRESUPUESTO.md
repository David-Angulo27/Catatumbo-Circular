# Conciliación pendiente del presupuesto y de los datos

Documento interno. Registra diferencias entre los documentos del proyecto que deben resolverse
antes de presentar cifras como definitivas. **No modificar `src/data/budget.ts` sin revisar este archivo.**

Fuentes revisadas (18/11/2026):

- `Presupuesto catatumbo circular Archivo corregido.docx` (Paso 5, presupuesto verde).
- `Plantilla_STEM_Segunda_Entrega_Final.docx` (apartado 13 y 15.3).

## 1. Presupuesto total de referencia

| Documento | Total (12 meses, con 5 % de imprevistos) |
|---|---:|
| Presupuesto corregido (valor superior del rango) | **$402.207.116** ← usado en el sitio |
| Presupuesto corregido (valor inferior del rango) | $395.240.366 |
| Segunda entrega (apartado 13) | $395.097.931 – $400.174.681 |

- El sitio usa **exclusivamente $402.207.116**, por instrucción del equipo.
- Ese total corresponde a los valores superiores de los rangos: energía $1.500.000/mes,
  servidor $150.000/mes y cilindro de gas $155.000.
- La diferencia con $400.174.681 (segunda entrega) es de $2.032.435 y no se ha conciliado.
  La operación de la segunda entrega reporta $301.341.396 – $306.141.396, frente a $307.941.396 del
  presupuesto corregido.

Verificación aritmética (comprobada con `npm run verify`):

| Concepto | Valor |
|---|---:|
| Inversión inicial | $75.113.000 |
| Operación 12 meses | $307.941.396 |
| Subtotal general | $383.054.396 |
| Imprevistos 5 % | $19.152.720 (19.152.719,8 redondeado) |
| **Total** | **$402.207.116** |

## 2. Subtotal parcial de $61.770.400

La tabla de la segunda entrega (apartado 13) suma $61.770.400: inversión inicial parcial, biomasa,
microorganismos y elementos de protección. **Es un subtotal monetario parcial**, no el presupuesto integral;
no incluye nómina, servicios, internet ni transporte. No se muestra en el sitio.

## 3. Posible duplicidad: secadores solares y componentes solares

- Secadores solares híbridos: 2 × $12.000.000 = **$24.000.000**.
- Paneles ($6.500.000) + baterías ($10.600.000) + inversores ($3.600.000) = **$20.700.000**.
- Si el precio de los secadores ya incluye esos componentes, la inversión inicial bajaría en $20.700.000
  (total aprox. $380,5 millones con imprevistos). **No se ha cambiado el presupuesto**: requiere cotización.

## 4. Otras partidas por confirmar

- Vehículo/transporte: aparece en el inventario (1 camión + vehículo de respaldo), pero **no tiene costo**
  en el presupuesto.
- Recargas de gas: no incluidas (solo la compra inicial del cilindro).
- Gestión de absorbentes contaminados (gestor autorizado): pendiente de cotización.
- Pruebas de laboratorio (absorción, flotabilidad, caracterización): sin costo asignado.
- Microorganismos: el precio público consultado (ProBioVita, $276.200 por 30 L) no coincide con los
  $150.000/mes presupuestados; recalcular según dosis.
- Valor del lote inicial ($30.000 por cordón, $5.000 por almohadilla): confirmar si es costo de producción.

## 5. Datos de contenido verificados o por verificar

| Dato | Estado |
|---|---|
| 570 km de líneas del Campo Tibú | Verificado en Rodríguez Escalante (2018), Introducción, p. 9. Dato histórico. |
| 91 incidentes ambientales en 2017 | Verificado en Rodríguez Escalante (2018), tabla de consolidado. |
| Año de Vera Infante et al. | **Inconsistente.** El sitio usa 2025 por instrucción. La segunda entrega usa 2023 en las referencias y 2025 en el texto. Los metadatos del DOI indican volumen 72(2) de **2023**, publicado en línea el 19/03/2024. Para APA 7 lo correcto sería **(2023)**. Se cambia en `src/data/sources.ts` (id `vera-2025`). |
| 68.802 habitantes (Tibú, 2025) | Tomado de las instrucciones del equipo; no se encontró en los documentos. Confirmar en las proyecciones del DANE. |
| 4 a 7 L de petróleo/kg de fibra seca | Meta preliminar de diseño, no un resultado. |
