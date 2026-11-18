/**
 * Verificación de las cifras del sitio. Ejecutar con: npm run verify
 * Falla (código 1) si alguna suma o dato obligatorio no coincide.
 */
import {
  investmentTotal,
  operationTotal,
  subtotal,
  contingency,
  budgetTotal,
  budgetReference,
} from '../src/data/budget';
import { biomassPerMonth, biomassPerYear, biomasses, initialBatch } from '../src/data/pilot';
import { odsItems } from '../src/data/ods';
import { team } from '../src/data/team';
import { sources } from '../src/data/sources';
import { narrative } from '../src/data/narrative';

let failures = 0;
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures += 1;
};
const eq = (name: string, actual: number, expected: number) => check(name, actual === expected, `${actual} vs ${expected}`);

eq('Inversión inicial', investmentTotal, budgetReference.investment);
eq('Operación 12 meses', operationTotal, budgetReference.operation);
eq('Subtotal general', subtotal, budgetReference.subtotal);
eq('Imprevistos 5 %', contingency, budgetReference.contingency);
eq('Presupuesto total', budgetTotal, budgetReference.total);
eq('Total = 402.207.116', budgetTotal, 402_207_116);

eq('Biomasa mensual', biomassPerMonth, 1500);
eq('Biomasa anual', biomassPerYear, 18000);
check('Distribución 450/450/300/300', biomasses.map((b) => b.kgPerMonth).join('/') === '450/450/300/300');
check('Lote inicial 100 + 100', initialBatch.every((b) => b.units === 100) && initialBatch.length === 2);

check('ODS 6 principal con meta 6.3', odsItems[0].number === 6 && odsItems[0].primary === true && odsItems[0].target === 'Meta 6.3');
check('ODS complementarios 12, 8, 10, 7', odsItems.slice(1).map((o) => o.number).join(',') === '12,8,10,7');

check(
  'Integrantes del equipo',
  team.map((t) => t.name).join('|') ===
    'Kevin Sebastian Lopez Ramirez|David Alejandro Angulo Sanchez|Nicolas Felipe Rodriguez Moreno' &&
    team.every((t) => t.program === 'Ingeniería de Sistemas'),
);

check('Cinco frases narrativas', Object.values(narrative).length === 5 && Object.values(narrative).every((s) => s.length > 40));
check('Fuentes con URL https', sources.every((s) => /^https:\/\//.test(s.url)), `${sources.length} fuentes`);
check('Fuentes sin parámetros de rastreo', sources.every((s) => !s.url.includes('utm_')));
for (const id of ['wradio-2024', 'rodriguez-2018', 'vera-2025', 'dane', 'onu-2015']) {
  check(`Fuente obligatoria ${id}`, sources.some((s) => s.id === id));
}

console.log(failures ? `\n${failures} verificación(es) fallida(s).` : '\nTodas las verificaciones pasaron.');
process.exit(failures ? 1 : 0);
