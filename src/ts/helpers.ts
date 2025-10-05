import type { DayWeather, WeatherType } from "../types/types";

export function groupByDay(list: WeatherType[]): DayWeather[] {
  const map = new Map<string, WeatherType[]>();

  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!map.has(date)) {
      map.set(date, []);
    }
    map.get(date)!.push(item);
  });

  const result: DayWeather[] = [];
  map.forEach((items, date) => {
    const min = Math.min(...items.map((i) => i.main.temp_min));
    const max = Math.max(...items.map((i) => i.main.temp_max));
    const { description, id, main, icon } = items[0].weather[0];

    const dayName = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][new Date(date).getDay()];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    result.push({
      date,
      min,
      max,
      description,
      id,
      main,
      icon,
      dayName,
      formattedDate: `${new Date(date).getDate()} ${
        months[new Date(date).getMonth()]
      }`,
    });
  });
  return result;
}

let clockIntervalId: ReturnType<typeof setInterval> | null = null;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function updateClock(el: HTMLParagraphElement, offsetSeconds: number) {
  const targetMs = Date.now() + offsetSeconds * 1000;
  const d = new Date(targetMs);
  const h = d.getUTCHours();
  const m = d.getUTCMinutes();
  const s = d.getUTCSeconds();

  el.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function clock(el: HTMLParagraphElement, timezone: number): void {
  const offsetSeconds = timezone;

  if (clockIntervalId !== null) {
    clearInterval(clockIntervalId);
  }

  updateClock(el, offsetSeconds);

  clockIntervalId = setInterval(() => {
    updateClock(el, offsetSeconds);
  }, 1000);
}

export function getDayOfMonth(
  timestampSec: number,
  timezoneOffsetSec: number
): number {
  const date = new Date(timestampSec * 1000);
  const localTimeMs = date.getTime() + timezoneOffsetSec * 1000;
  const localDate = new Date(localTimeMs);
  return localDate.getUTCDate();
}

export function getShortWeekdayName(
  timestampSec: number,
  timezoneOffsetSec: number
): string {
  const date = new Date((timestampSec + timezoneOffsetSec) * 1000);

  const weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdaysShort[date.getUTCDay()];
}

export function getTimeString(
  timestampSec: number,
  timezoneOffsetSec: number
): string {
  const localTimeMs = (timestampSec + timezoneOffsetSec) * 1000;
  const localDate = new Date(localTimeMs);

  const hours = String(localDate.getUTCHours()).padStart(2, "0");
  const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function getMonthName(
  timestampSec: number,
  timezoneOffsetSec: number
): string {
  const date = new Date((timestampSec + timezoneOffsetSec) * 1000);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[date.getUTCMonth()];
}
