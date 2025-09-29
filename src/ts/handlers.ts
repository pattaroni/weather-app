import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import type { DayWeather, WeatherApiResponse } from "../types/types";
import { fetchWeather } from "./api";
import { groupByDay } from "./helpers";
import { refs } from "./refs";
import { renderWeatherSlider } from "./render-functions";

const DEFAULT_CITY: string = "Kyiv";

export async function handleSearch(): Promise<void> {
  const form = refs.formEl as HTMLFormElement;
  const input = form?.elements.namedItem("searchInput") as HTMLInputElement;
  if (!form) return;
  try {
    const defaultList: WeatherApiResponse = await fetchWeather(DEFAULT_CITY);
    const defaultGroupList: DayWeather[] = groupByDay(defaultList.list);
    renderWeatherSlider(defaultGroupList);
    input.value = "";
  } catch (error) {
    input.value = "";
    iziToast.error({
      message: "Error loading default weather data",
      position: "bottomCenter",
    });
  }

  refs.locationIconEl?.addEventListener("click", async () => {
    if (input.value.trim() !== "") {
      try {
        const list: WeatherApiResponse = await fetchWeather(input.value.trim());
        const groupList: DayWeather[] = groupByDay(list.list);
        if (refs.weatherTitleEl)
          refs.weatherTitleEl.innerHTML = `${list.city.name}, ${list.city.country}`;
        renderWeatherSlider(groupList);
        input.value = "";
      } catch (error) {
        input.value = "";
        iziToast.error({
          message: "Error loading default weather data",
          position: "bottomCenter",
        });
      }
    } else {
      iziToast.info({
        message: "Please enter a city name.",
      });
      return;
    }
  });

  refs.formEl?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (input.value.trim() === "") {
      iziToast.info({
        message: "Please enter a city name.",
        position: "bottomCenter",
      });
      return;
    }
    try {
      const list: WeatherApiResponse = await fetchWeather(input.value.trim());
      const groupList: DayWeather[] = groupByDay(list.list);
      if (refs.weatherTitleEl)
        refs.weatherTitleEl.innerHTML = `${list.city.name}, ${list.city.country}`;
      renderWeatherSlider(groupList);
      input.value = "";
    } catch (error) {
      input.value = "";
      iziToast.error({
        message: "City not found. Please try again.",
        position: "bottomCenter",
      });
    }
  });
}
