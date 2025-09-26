export interface WeatherType {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
  dt_txt: string;
}

export interface DayWeather {
  date: string;
  min: number;
  max: number;
  id: number;
  description: string;
  main: string;
  dayName: string;
  formattedDate: string;
}
