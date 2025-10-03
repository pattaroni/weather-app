export const refs = {
  weatherContainerEl: document.querySelector(
    ".weather-container"
  ) as HTMLDivElement,
  swiperEl: document.querySelector(".mySwiper") as HTMLDivElement,
  formEl: document.querySelector(".header-form") as HTMLFormElement | null,
  weatherTitleEl: document.querySelector(".weather-title"),
  locationIconEl: document.querySelector(".location-icon"),
  todayBtnEl: document.querySelector(".today-btn") as HTMLButtonElement,
  fiveDaysBtnEl: document.querySelector(".five-days-btn") as HTMLButtonElement,
  daysBtnBoxEl: document.querySelector(".days-btn-box"),
  todayWeatherBoxEl: document.querySelector(
    ".today-weather-container"
  ) as HTMLDivElement,
  fiveDaysWeatherBoxEl: document.querySelector(
    ".five-days-weather-container"
  ) as HTMLDivElement,
};
