/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchWeatherForecast } from '@utils/fetchWeatherData';

export type Condition = {
  code: number,
  icon: string,
  text: string,
};

export type ForecastCurrent = {
  chance_of_rain: number, // take from day.day
  sunrise: string, // take from day.astro
  sunset: string, // take from day.astro
  cloud: number, //
  condition: Condition, //
  feelslike: {
    c: number,
    f: number,
  }
  humidity: number, //
  pressure: {
    psi: number,
    mb: number,
  }
  temp: {
    c: number,
    f: number,
  }
  uv: number, //
  vis: {
    km: number,
    miles: number,
  }
  wind_dir: string, //
  wind: {
    kph: number,
    mph: number,
  }
};

export type GeoLocation = {
  lat: number,
  lon: number,
};

type Location = {
  name: string,
  country: string,
  localtime: string,
  geo: GeoLocation,
};

type ForecastHour = {
  condition: Condition, //
  temp: {
    c: number, //
    f: number, //
  }
  time: string, //
};

type ForecastDay = {
  date: string, //
  condition: Condition, //
  maxtemp: {
    c: number, //
    f: number, //
  },
  mintemp: {
    c: number,
    f: number,
  }
};

export interface WeatherState {
  loadingState: 'fulfilled' | 'pending' | 'rejected',
  location?: Location,
  forecast: {
    current?: ForecastCurrent,
    hours?: ForecastHour[],
    days?: ForecastDay[],
  }
}
interface GetFullWeather {
  location: GeoLocation,
  lang: string,
}

// this function is used to show skeleton loader components
// eslint-disable-next-line no-promise-executor-return
const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const getFullWeather = createAsyncThunk('weather/getFullWeather', async ({ location, lang }: GetFullWeather, thunkApi) => {
  await delay(500);
  try {
    const response = await fetchWeatherForecast(location, lang);
    response.data.location.lat = location.lat;
    response.data.location.lon = location.lon;
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ text: 'Full Weather Data error', error });
  }
});

const initialState: WeatherState = {
  loadingState: 'pending',
  location: undefined,
  forecast: {
    current: undefined,
    hours: undefined,
    days: undefined,
  },
};

export const counterSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getFullWeather.fulfilled, (state, { payload } : PayloadAction<any>) => {
        const newLocation = payload.location;
        const newCurrentForecast = payload.current;
        const newDays = payload.forecast.forecastday;
        const newFirstDay = newDays[0];
        const newHours = newFirstDay.hour;

        state.loadingState = 'fulfilled';

        if (newLocation) {
          state.location = {
            name: newLocation.name,
            country: newLocation.country,
            localtime: newLocation.localtime,
            geo: {
              lat: newLocation.lat,
              lon: newLocation.lon,
            },
          };
        }
        if (newCurrentForecast && newFirstDay) {
          state.forecast.current = {
            cloud: newCurrentForecast.cloud,
            condition: newCurrentForecast.condition,
            feelslike: {
              c: newCurrentForecast.feelslike_c,
              f: newCurrentForecast.feelslike_f,
            },
            humidity: newCurrentForecast.humidity,
            pressure: {
              psi: newCurrentForecast.pressure_in * 0.036127,
              mb: newCurrentForecast.pressure_mb,
            },
            temp: {
              c: newCurrentForecast.temp_c,
              f: newCurrentForecast.temp_f,
            },
            uv: newCurrentForecast.uv,
            vis: {
              km: newCurrentForecast.vis_km,
              miles: newCurrentForecast.vis_miles,
            },
            wind_dir: newCurrentForecast.wind_dir,
            wind: {
              kph: newCurrentForecast.wind_kph,
              mph: newCurrentForecast.wind_mph,
            },
            chance_of_rain: newFirstDay.day.daily_chance_of_rain,
            sunrise: newFirstDay.astro.sunrise,
            sunset: newFirstDay.astro.sunset,
          };
        }
        if (newDays) {
          state.forecast.days = newDays.map((day: any) => ({
            date: day.date,
            condition: day.day.condition,
            maxtemp: {
              c: day.day.maxtemp_c,
              f: day.day.maxtemp_f,
            },
            mintemp: {
              c: day.day.mintemp_c,
              f: day.day.mintemp_f,
            },
          }));
        }
        if (newHours) {
          state.forecast.hours = newHours.map((hour: any) => ({
            time: hour.time,
            condition: hour.condition,
            temp: {
              c: hour.temp_c,
              f: hour.temp_f,
            },
          }));
        }
      })
      .addCase(getFullWeather.pending, (state) => {
        state.loadingState = 'pending';
      })
      .addCase(getFullWeather.rejected, (state) => {
        state.loadingState = 'rejected';
      });
  },
});

export const { actions } = counterSlice;

export default counterSlice.reducer;
