import axios from "axios";
import { api } from "./constants";
import type { WeatherType } from "../types/types";
const { BASE_URL, API_KEY, ENDPOINTS } = api;

axios.defaults.baseURL = BASE_URL;
export async function fetchWeather(city: string): Promise<WeatherType[]> {
  const { data } = await axios.get(ENDPOINTS.fiveDays(city, API_KEY));
  return data.list;
}
