// import Swiper from "swiper";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
import type { DayWeather } from "../types/types";
import { refs } from "./refs";

export function renderWeatherSlider(data: DayWeather[]) {
  const markup = data
    .map(
      (item) =>
        `<div class="swiper-slide">
      <p class="day-of-week">${item.dayName}</p>
      <p class="day-of-month">${item.formattedDate}</p>
      <svg class="weather-icon" width="35" height="35">
        <use href=""></use>
      </svg>
      <ul class="min-max-temp-list">
        <li class="min-max-temp-list-item">
            <p class="text-temp">min</p>
            <p class="value-temp">${item.min}</p>
        </li>
        <li class="min-max-temp-list-item">
            <p class="text-temp">max</p>
            <p class="value-temp">${item.max}</p>
        </li>
      </ul>
      <button type="button" class="more-info-btn">more info</button>
    </div>`
    )
    .join("");

  refs.swiperWrapperEl?.insertAdjacentHTML("beforeend", markup);

  // const swiper = new Swiper(".mySwiper", {
  //   modules: [Navigation],
  //   slidesPerView: 3,
  //   spaceBetween: 30,
  //   cssMode: true,
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   mousewheel: true,
  //   keyboard: true,
  // });
}
