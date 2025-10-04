export const refs = {
  weatherContainerEl: document.querySelector(
    ".weather-container"
  ) as HTMLDivElement,
  swiperEl: document.querySelector(".mySwiper") as HTMLDivElement,
  formEl: document.querySelector(".header-form") as HTMLFormElement,
  weatherTitleEl: document.querySelector(
    ".weather-title"
  ) as HTMLParagraphElement,
  locationIconEl: document.querySelector(".location-icon") as HTMLElement,
  todayBtnEl: document.querySelector(".today-btn") as HTMLButtonElement,
  fiveDaysBtnEl: document.querySelector(".five-days-btn") as HTMLButtonElement,
  daysBtnBoxEl: document.querySelector(".days-btn-box") as HTMLDivElement,
  todayWeatherBoxEl: document.querySelector(
    ".today-weather-container"
  ) as HTMLDivElement,
  fiveDaysWeatherBoxEl: document.querySelector(
    ".five-days-weather-container"
  ) as HTMLDivElement,
  todayWeatherMoreContainer: document.querySelector(
    ".today-weather-more-container"
  ) as HTMLDivElement,
  todayWeatherMoreContent: document.querySelector(
    ".today-weather-more-content"
  ) as HTMLDivElement,
  clockEl: document.querySelector(".clock") as HTMLParagraphElement,
};
