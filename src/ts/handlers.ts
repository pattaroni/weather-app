import { fetchWeather } from "./api";
import { groupByDay } from "./helpers";
import { refs } from "./refs";
import { renderWeatherSlider } from "./render-functions";

export function handleSearch() {
  const form = refs.formEl;
  if (!form) return;
  refs.formEl?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const inputValue = (formData.get("searchInput") ?? "").toString();
    if (inputValue.trim() === "") return;
    try {
      const list = await fetchWeather(inputValue);
      const groupList = groupByDay(list);
      renderWeatherSlider(groupList);
    } catch (error) {
      console.error(error);
    }
  });
}
