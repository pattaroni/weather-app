import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import type {
  DayWeather,
  WeatherApiResponse,
  WeatherTodayApiResponse,
  WeatherType,
} from "../types/types";
import { fetchTodayWeather, fetchWeather } from "./api";
import { groupByDay } from "./helpers";
import { refs } from "./refs";
import {
  renderFiveDaysHoursWeather,
  renderTodayMoreWeather,
  renderTodayWeather,
  renderWeatherSlider,
} from "./render-functions";

const DEFAULT_CITY: string = "Kyiv";
let QUERY: string = "";

let todayCache: WeatherTodayApiResponse | null = null;
let fiveDaysCache: DayWeather[] | null = null;
let fiveDaysResponseCache: WeatherApiResponse | null = null;
let savedAttribute: string = "";
let swiperClickHandler: ((e: Event) => void) | null = null;

export async function weatherHandleSearch(): Promise<void> {
  const form = refs.formEl as HTMLFormElement;
  const input = form?.elements.namedItem("searchInput") as HTMLInputElement;
  if (!form) return;

  // SEARCH FUNCTION
  async function handleSearch(city: string): Promise<void> {
    todayCache = null;
    fiveDaysCache = null;

    try {
      if (refs.todayBtnEl.classList.contains("active")) {
        // TODAY WEATHER
        refs.swiperEl.innerHTML = "";
        const list = await fetchTodayWeather(city);
        renderTodayWeather(list);
        renderTodayMoreWeather(list);
        QUERY = city;
        todayCache = list;
      } else if (refs.fiveDaysBtnEl.classList.contains("active")) {
        // FIVE DAYS WEATHER
        refs.todayWeatherBoxEl.innerHTML = "";
        const list = await fetchWeather(city);
        const groupList: DayWeather[] = groupByDay(list.list);

        if (refs.weatherTitleEl) {
          refs.weatherTitleEl.innerHTML = `${list.city.name}, ${list.city.country}`;
        }

        renderWeatherSlider(groupList);
        QUERY = city;
        fiveDaysCache = groupList;
        fiveDaysResponseCache = list;

        if (swiperClickHandler) {
          refs.swiperEl.removeEventListener("click", swiperClickHandler);
        }
        swiperClickHandler = (e: Event) => handleSwiperClick(e, list);
        refs.swiperEl.addEventListener("click", swiperClickHandler);

        savedAttribute = "";
        refs.weatherContainerEl.style.height = "272px";
      }
    } catch (error) {
      iziToast.error({
        message: "City not found. Please try again.",
        position: "bottomCenter",
      });
    }
  }

  // FORM SUBMIT
  refs.formEl?.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (city === "") {
      iziToast.info({
        message: "Please enter a city name.",
        position: "bottomCenter",
      });
      return;
    }
    handleSearch(city);
    input.value = "";
  });

  // LOCATION ICON SUBMIT
  refs.locationIconEl?.addEventListener("click", () => {
    const city = input.value.trim();
    if (city === "") {
      iziToast.info({
        message: "Please enter a city name.",
        position: "bottomCenter",
      });
      return;
    }
    handleSearch(city);
    input.value = "";
  });

  // DEFAULT TODAY RENDER
  try {
    const defaultList = await fetchTodayWeather(DEFAULT_CITY);
    renderTodayWeather(defaultList);
    renderTodayMoreWeather(defaultList);
    QUERY = DEFAULT_CITY;
    todayCache = defaultList;
  } catch (error) {
    iziToast.error({
      message: "Error loading default weather data",
      position: "bottomCenter",
    });
  }

  // TODAY / 5 DAYS
  refs.daysBtnBoxEl?.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    if (target === e.currentTarget) return;

    // TODAY BUTTON
    if (target.nodeName === "BUTTON" && target.id === "today-btn") {
      if (swiperClickHandler) {
        refs.swiperEl.removeEventListener("click", swiperClickHandler);
        swiperClickHandler = null;
      }
      savedAttribute = "";

      refs.todayBtnEl.classList.add("active");
      refs.fiveDaysBtnEl.classList.remove("active");
      refs.todayWeatherBoxEl.style.display = "block";
      refs.fiveDaysWeatherBoxEl.style.display = "none";
      refs.weatherContainerEl.style.height = "193px";
      refs.weatherContainerEl.style.background = "#102136";
      refs.weatherTitleEl?.classList.add("hidden");
      refs.swiperEl?.classList.add("hidden");
      refs.todayWeatherMoreContainer.style.height = "184px";
      refs.todayWeatherMoreContainer.style.marginBottom = "20px";
      refs.todayCitationContainerEl.style.height = "97px";
      refs.daysBtnBoxEl.classList.remove("top");
      refs.weatherContainerEl.classList.remove("bottom");

      if (todayCache) {
        renderTodayWeather(todayCache);
      } else {
        try {
          const city = QUERY || DEFAULT_CITY;
          const list = await fetchTodayWeather(city);
          renderTodayWeather(list);
          renderTodayMoreWeather(list);
          todayCache = list;
        } catch (error) {
          iziToast.error({
            message: "Error loading weather data",
            position: "bottomCenter",
          });
        }
      }
    }

    // FIVE DAYS BUTTON
    if (target.nodeName === "BUTTON" && target.id === "five-days-btn") {
      refs.todayBtnEl.classList.remove("active");
      refs.fiveDaysBtnEl.classList.add("active");
      refs.fiveDaysWeatherBoxEl.style.display = "block";
      refs.todayWeatherBoxEl.style.display = "none";
      refs.weatherContainerEl.style.height = "272px";
      refs.weatherContainerEl.style.background = "rgba(16, 33, 54, 0.8)";
      refs.weatherTitleEl?.classList.remove("hidden");
      refs.swiperEl?.classList.remove("hidden");
      refs.todayWeatherMoreContainer.style.height = "0";
      refs.todayWeatherMoreContainer.style.marginBottom = "0";
      refs.todayCitationContainerEl.style.height = "0";
      refs.daysBtnBoxEl.classList.add("top");
      refs.weatherContainerEl.classList.add("bottom");

      savedAttribute = "";
      const city = QUERY || DEFAULT_CITY;

      if (fiveDaysCache) {
        renderWeatherSlider(fiveDaysCache);
        if (swiperClickHandler) {
          refs.swiperEl.removeEventListener("click", swiperClickHandler);
        }
        if (fiveDaysResponseCache) {
          swiperClickHandler = (e: Event) =>
            handleSwiperClick(e, fiveDaysResponseCache!);
          refs.swiperEl.addEventListener("click", swiperClickHandler);
        }
      } else {
        try {
          const list = await fetchWeather(city);
          const groupList: DayWeather[] = groupByDay(list.list);
          if (refs.weatherTitleEl) {
            refs.weatherTitleEl.innerHTML = `${list.city.name}, ${list.city.country}`;
          }

          renderWeatherSlider(groupList);
          fiveDaysCache = groupList;
          fiveDaysResponseCache = list;
          if (swiperClickHandler) {
            refs.swiperEl.removeEventListener("click", swiperClickHandler);
          }
          swiperClickHandler = (e: Event) => handleSwiperClick(e, list);
          refs.swiperEl.addEventListener("click", swiperClickHandler);
        } catch (error) {
          iziToast.error({
            message: "Error loading weather data",
            position: "bottomCenter",
          });
        }
      }
    }
  });
}

function handleSwiperClick(e: Event, list: WeatherApiResponse) {
  const target = e.target as HTMLElement;
  const dateAttribute = target.getAttribute("data-date");
  if (target.nodeName !== "BUTTON" || !dateAttribute) return;

  if (savedAttribute === dateAttribute) {
    refs.weatherContainerEl.style.height = "272px";
    savedAttribute = "";
    return;
  }

  const dateList: WeatherType[] = list.list.filter((item) =>
    item.dt_txt.startsWith(dateAttribute)
  );

  refs.weatherContainerEl.style.height = "541px";
  renderFiveDaysHoursWeather(dateList);
  refs.hoursBoxEl.scrollLeft = 0;
  savedAttribute = dateAttribute;
}
