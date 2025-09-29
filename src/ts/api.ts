import axios from "axios";
import { api } from "./constants";
import type { WeatherApiResponse } from "../types/types";
const { BASE_URL, API_KEY, ENDPOINTS } = api;

axios.defaults.baseURL = BASE_URL;
export async function fetchWeather(city: string): Promise<WeatherApiResponse> {
  const { data } = await axios.get(ENDPOINTS.fiveDays(city, API_KEY));
  const importantData: WeatherApiResponse = {
    list: data.list,
    city: data.city,
  };
  return importantData;
}
