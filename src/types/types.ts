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
    icon: string;
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
  icon: string;
  dayName: string;
  formattedDate: string;
}

export interface WeatherApiResponse {
  list: WeatherType[];
  city: {
    name: string;
    country: string;
  };
}

interface todayWeatherIcon {
  description: string;
  icon: string;
  main: string;
}

export interface WeatherTodayApiResponse {
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  weather: todayWeatherIcon[];
}
