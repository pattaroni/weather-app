import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../css/swiper-overrides.css";
import spriteUrl from "../img/sprite.svg";
import type { DayWeather, WeatherTodayApiResponse } from "../types/types";
import { refs } from "./refs";

type WeatherIcon =
  | "icon-cloud"
  | "icon-rain"
  | "icon-windy"
  | "icon-cloud-with-sun"
  | "icon-sun"
  | "icon-snow"
  | "icon-sun-ice";

export function renderWeatherSlider(data: DayWeather[]) {
  let iconHref: WeatherIcon = "icon-sun";
  const markup = `
    <div class="swiper-wrapper">
    ${data
      .map((item) => {
        switch (item.main) {
          case "Clouds":
            iconHref = "icon-cloud";
            break;
          case "Rain":
            iconHref = "icon-rain";
            break;
          case "Clear":
            iconHref = "icon-sun";
            break;
          case "Snow":
            iconHref = "icon-snow";
            break;
        }
        return `<div class="swiper-slide">
            <p class="day-of-week">${item.dayName}</p>
            <p class="day-of-month">${item.formattedDate}</p>
            <svg class="weather-icon" width="35" height="35">
              <use href="${spriteUrl}#${iconHref}"></use>
            </svg>
            <ul class="min-max-temp-list">
              <li class="min-max-temp-list-item">
                <p class="text-temp">min</p>
                <p class="value-temp">${Math.round(item.min)}°</p>
              </li>
              <li class="min-max-temp-list-item">
                <svg class="line-icon" width="2" height="38">
                  <use href="${spriteUrl}#icon-line"></use>
                </svg>
              </li>
              <li class="min-max-temp-list-item">
                <p class="text-temp">max</p>
                <p class="value-temp">${Math.round(item.max)}°</p>
              </li>
            </ul>
            <button type="button" class="more-info-btn">more info</button>
          </div>`;
      })
      .join("")}
          </div>
          <div class="swiper-button-next">
            <svg class="icon" width="7" height="10">
              <use href="${spriteUrl}#icon-right-arrow"></use>
            </svg>
          </div>
          <div class="swiper-button-prev">
            <svg class="icon" width="7" height="10">
              <use href="${spriteUrl}#icon-left-arrow"></use>
            </svg>
          </div>`;
  if (refs.swiperEl) refs.swiperEl.innerHTML = "";
  refs.swiperEl?.insertAdjacentHTML("beforeend", markup);

  new Swiper(".mySwiper", {
    modules: [Navigation],
    slidesPerView: 3,
    spaceBetween: 17,
    cssMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    mousewheel: true,
    keyboard: true,
  });
}

export function renderTodayWeather(data: WeatherTodayApiResponse): void {
  let iconHref: WeatherIcon = "icon-sun";
  switch (data.weather[0].main) {
    case "Clouds":
      iconHref = "icon-cloud";
      break;
    case "Rain":
      iconHref = "icon-rain";
      break;
    case "Clear":
      iconHref = "icon-sun";
      break;
    case "Snow":
      iconHref = "icon-snow";
      break;
  }
  const markup = `
    <div class='today-weather-icon-box'>
      <svg class="weather-icon-today" width="35" height="35">
        <use href="${spriteUrl}#${iconHref}"></use>
      </svg>
      <p class="today-location">${data.name}, ${data.sys.country}</p>
    </div>
    <div class="temp-today">
      <p class="avg-temp-today">${Math.round(data.main.temp)}°</p>
      <ul class="min-max-temp-today">
        <li class="min-max-temp-today-item">
          <p class="min-max-text-today">min</p>
          <p class="min-max-value-today">${Math.round(data.main.temp_min)}°</p>
        </li>
        <li class="min-max-temp-today-item">
          <svg class="line-icon" width="2" height="38">
            <use href="${spriteUrl}#icon-line"></use>
          </svg>
        </li>
        <li class="min-max-temp-today-item">
          <p class="min-max-text-today">max</p>
          <p class="min-max-value-today">${Math.round(data.main.temp_max)}°</p>
        </li>
      </ul>
    </div>
  `;
  refs.todayWeatherBoxEl.innerHTML = "";
  refs.todayWeatherBoxEl.insertAdjacentHTML("beforeend", markup);
}
