export const WEEK_STARTS_ON = 1;

const pad = (n) => String(n).padStart(2, "0");

export function toDateString(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function todayString() {
  return toDateString(new Date());
}

export function parseDateString(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatShortDate(value) {
  return parseDateString(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatLongDate(value) {
  return parseDateString(value).toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTimestamp(ms) {
  return new Date(ms).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function monthLabel(year, month) {
  return new Date(year, month, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

export function weekdayLabels() {
  return Array.from({ length: 7 }, (_, i) =>
    new Date(2023, 0, 1 + ((i + WEEK_STARTS_ON) % 7)).toLocaleDateString(undefined, {
      weekday: "short",
    })
  );
}

export function buildMonthGrid(year, month) {
  const offset = (new Date(year, month, 1).getDay() - WEEK_STARTS_ON + 7) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((offset + daysInMonth) / 7) * 7;

  const cells = [];
  for (let i = 0; i < totalCells; i++) {
    const date = new Date(year, month, 1 - offset + i);
    cells.push({ date: toDateString(date), inMonth: date.getMonth() === month });
  }
  return cells;
}

export function shiftMonth({ year, month }, delta) {
  const date = new Date(year, month + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() };
}