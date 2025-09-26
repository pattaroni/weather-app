interface apiTypes {
  API_KEY: string;
  BASE_URL: string;
  ENDPOINTS: {
    fiveDays: (city: string, key: string) => string;
  };
}
export const api: apiTypes = {
  API_KEY: import.meta.env.VITE_WEATHER_API,
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  ENDPOINTS: {
    fiveDays: (city, key) =>
      `forecast?q=${city}&appid=${key}&units=metric&lang=ua`,
  },
};
