import { weatherHandleSearch } from "./ts/handlers";

weatherHandleSearch();

// const list = document.querySelector(
//   ".searched-places-list"
// ) as HTMLUListElement;
// const btn = document.querySelector(".next-place-btn") as HTMLButtonElement;

// // дублюємо елементи для безкінечної прокрутки
// list.innerHTML += list.innerHTML;

// const items = document.querySelectorAll(".places-item");
// const itemWidth = items[0].offsetWidth + 10; // 10px = gap
// const halfLength = items.length / 2;

// let currentIndex = 0;
// let isTransitioning = false;

// btn.addEventListener("click", () => {
//   if (isTransitioning) return;

//   isTransitioning = true;
//   currentIndex++;

//   list.style.transition = "transform 0.4s ease";
//   list.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
// });

// list.addEventListener("transitionend", () => {
//   isTransitioning = false;

//   if (currentIndex >= halfLength) {
//     list.style.transition = "none";
//     currentIndex = 0;
//     list.style.transform = "translateX(0)";

//     requestAnimationFrame(() => {
//       list.offsetHeight; // форсуємо перерендер
//       list.style.transition = "transform 0.4s ease";
//     });
//   }
// });
