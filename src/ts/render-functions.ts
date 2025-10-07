import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../css/swiper-overrides.css";
import spriteUrl from "../img/sprite.svg";
import type {
  DayWeather,
  WeatherTodayApiResponse,
  WeatherType,
} from "../types/types";
import { refs } from "./refs";
import {
  clock,
  getDayOfMonth,
  getMonthName,
  getShortWeekdayName,
  getTimeString,
} from "./helpers";

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
  const markup: string = `
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
            <button type="button" class="more-info-btn" data-date='${
              item.date
            }'>more info</button>
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
  const markup: string = `
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

export function renderTodayMoreWeather(data: WeatherTodayApiResponse) {
  const currentDay: number = getDayOfMonth(data.dt, data.timezone);
  let endDayString: string = "";
  switch (currentDay) {
    case 1:
      endDayString = "st";
      break;
    case 2:
      endDayString = "nd";
      break;
    case 3:
      endDayString = "rd";
      break;
    default:
      endDayString = "th";
  }
  const markup: string = `
    <div class='today-date-container'>
      <p class='today-date-day-p'>${currentDay}<sup class='today-th-sup'>${endDayString}</sup></p>
      <p class='today-date-week-day-p'>${getShortWeekdayName(
        data.dt,
        data.timezone
      )}</p>
    </div>
    <div class='today-month-time-container'>
      <p class='today-month-time-month-p'>${getMonthName(
        data.dt,
        data.timezone
      )}</p>
      <p class='clock'></p>
    </div>
    <div class='today-sunset-container'>
      <div class='today-sunrise'>
         <svg class="sunrise-icon" width="20" height="20">
            <use href="${spriteUrl}#icon-sunrise"></use>
          </svg>
          <p class='today-sunrise-time'>${getTimeString(
            data.sys.sunrise,
            data.timezone
          )}</p>
      </div>
      <div class='today-sunset'>
         <svg class="sunset-icon" width="20" height="20">
            <use href="${spriteUrl}#icon-sunset"></use>
          </svg>
          <p class='today-sunset-time'>${getTimeString(
            data.sys.sunset,
            data.timezone
          )}</p>
      </div>
    </div>
  `;

  refs.todayWeatherMoreContent.innerHTML = "";
  refs.todayWeatherMoreContent.insertAdjacentHTML("beforeend", markup);

  const clockEl = refs.todayWeatherMoreContent.querySelector(
    ".clock"
  ) as HTMLParagraphElement;

  clock(clockEl, data.timezone);
}

export function renderFiveDaysHoursWeather(data: WeatherType[]) {
  let iconHref: WeatherIcon = "icon-sun";
  console.log(iconHref);
  const markup: string = `
    ${data
      .map((item) => {
        switch (item.weather[0].main) {
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
        return `<div class="hours-card">
          <p class='hours-text'>${item.dt_txt.split(" ")[1].slice(0, 5)}</p>
          <svg class="weather-icon" width="35" height="35">
            <use href="${spriteUrl}#${iconHref}"></use>
          </svg>
          <p class='hours-temp'>${Math.round(item.main.temp)}°</p>
          <div class='details-container'>
            <div class='details-box'>
              <svg class="details-icon" width="20" height="20">
                <use href="${spriteUrl}#icon-time"></use>
              </svg>
              <p class='details-value'>${item.main.pressure} mm</p>
            </div>
            <div class='details-box'>
              <svg class="details-icon" width="20" height="20">
                <use href="${spriteUrl}#icon-humidity"></use>
              </svg>
              <p class='details-value'>${item.main.humidity}%</p>
            </div>
            <div class='details-box'>
              <svg class="details-icon" width="20" height="20">
                <use href="${spriteUrl}#icon-windy"></use>
              </svg>
              <p class='details-value'>${item.wind.speed.toFixed(1)} m/s</p>
            </div>
          </div>

        </div>`;
      })
      .join("")}`;
  refs.hoursBoxEl.innerHTML = "";
  refs.hoursBoxEl.insertAdjacentHTML("beforeend", markup);
}
