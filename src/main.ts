import "./css/style.css";
import "modern-normalize";
import { fetchWeather } from "./ts/api";
import { groupByDay } from "./ts/helpers";
import { renderWeatherSlider } from "./ts/render-functions";
import { handleSearch } from "./ts/handlers";

const list = await fetchWeather("Kyiv");
const groupList = groupByDay(list);
console.log(groupList);
renderWeatherSlider(groupList);

handleSearch();
