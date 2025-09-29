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
