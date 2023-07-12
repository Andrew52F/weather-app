/* eslint-disable import/prefer-default-export */
import { GeoLocation } from '@store/weatherSlice';
import axios, { AxiosResponse } from 'axios';

type FetchWeatherForecast = (location: GeoLocation, lang: string) => Promise<AxiosResponse<any>>;
export const fetchWeatherForecast: FetchWeatherForecast = async (location, lang) => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {
      q: `${location.lat},${location.lon}`,
      days: '3',
      lang,
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_WEATHER_API_KEY,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };
  const response = await axios.request(options);
  return response;
};
