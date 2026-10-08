import type { DailySale } from "./admin-data";

// Pure functions for the analytics page: no React, easy to test

export interface WeeklyRow extends DailySale {
  weekAverage: number;
}
const DAY = 24 * 60 * 60 * 1000;

// Average quantity of the same pizza over the 7 days up to this row's date
export function withWeekAverage(rows: DailySale[]): WeeklyRow[] {
  const quantityByKey = new Map<string, number>();
  for (const row of rows) quantityByKey.set(`${row.pizzaId}|${Date.parse(row.date)}`, row.quantity);

  return rows.map((row) => {
    const end = Date.parse(row.date);
//     const start = end - 6 * 24 * 60 * 60 * 1000;
    let total = 0;
//     for (const other of rows) {
//       if (other.pizzaId !== row.pizzaId) continue;
//       const t = Date.parse(other.date);
//       if (t >= start && t <= end) total += other.quantity;
//     }
    for (let i = 0; i < 7; i++) total += quantityByKey.get(`${row.pizzaId}|${end - i * DAY}`) ?? 0;
    return { ...row, weekAverage: total / 7 };
  });
}

// export function withWeekAverage(rows: DailySale[]): WeeklyRow[] {
//   const quantityByKey = new Map<string, number>();
//   for (const row of rows) quantityByKey.set(`${row.pizzaId}|${Date.parse(row.date)}`, row.quantity);
//   return rows.map((row) => {
//     const end = Date.parse(row.date);
//     let total = 0;
//     for (let i = 0; i < 7; i++) total += quantityByKey.get(`${row.pizzaId}|${end - i * DAY}`) ?? 0;
//     return { ...row, weekAverage: total / 7 };
//   });
// }