/* eslint-disable no-continue */
import React, {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import getLocation from '@utils/getUserLocation';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { getFullWeather } from '@store/weatherSlice';
import Location from '@layouts/Location/Location';
import ListCard from '@layouts/ListCard/ListCard';

import HourForecastItem from '@layouts/HourForecastItem/HourForecastItem';
import {
  convert12hrsTo24hrs, getDayOfWeek, getTime12hrs, getTime24hrs,
} from '@utils/formatdate';
import DayForecastItem from '@layouts/DayForecastItem/DayForecastItem';
import { ReactComponent as TempIcon } from '@assets/temp-icon.svg';
import { ReactComponent as WindIcon } from '@assets/wind-icon.svg';
import { ReactComponent as RainIcon } from '@assets/rain-icon.svg';
import { ReactComponent as SunIcon } from '@assets/sun-icon.svg';
import { ReactComponent as HumidityIcon } from '@assets/humidity-icon.svg';
import { ReactComponent as EyeIcon } from '@assets/eye-icon.svg';
import { ReactComponent as PressureIcon } from '@assets/pressure-icon.svg';
import { ReactComponent as SunriseIcon } from '@assets/sunrise-icon.svg';
import ConditionCard from '@layouts/ConditionCard/ConditionCard';
import Card from '@layouts/Card/Card';
import Button from '@ui/Button/Button';
import SkeletonHoursForecastItem from '@layouts/SkeletonHoursForecastItem/SkeletonHoursForecastItem';
import SkeletonDayForecastItem from '@layouts/SkeletonDayForecastItem/SkeletonDayForecastItem';
import SkeletonConditionCard from '@layouts/SkeletonConditionCard/SkeletonConditionCard';
import styles from './Weather.module.scss';

const Weather: FC = () => {
  const { t, i18n } = useTranslation();
  const [isConditionsSmall, setConditions] = useState<boolean>(true);
  const { location, loadingState } = useAppSelector((state) => state.weather);
  const {
    current: currentForecast,
    hours,
    days,
  } = useAppSelector((state) => state.weather.forecast);
  const {
    temperatureUnit, windUnit, pressureUnit, distanceUnit, isTimeFormat12hrs,
  } = useAppSelector((state) => state.settings);
  const currentForecastData = useMemo(() => currentForecast && ([
    { Icon: TempIcon, value: `${currentForecast?.temp[temperatureUnit]}${t(`units.${temperatureUnit}-symbol`)}`, text: t('condition.real-temp') },
    { Icon: WindIcon, value: `${currentForecast?.wind[windUnit]}${t(`units.${windUnit}-symbol`)}`, text: t('condition.wind') },
    { Icon: PressureIcon, value: `${currentForecast.pressure[pressureUnit]}${t(`units.${pressureUnit}-symbol`)}`, text: t('condition.pressure') },
    { Icon: SunIcon, value: currentForecast?.uv, text: t('condition.uv') },
    { Icon: HumidityIcon, value: `${currentForecast?.humidity}%`, text: t('condition.humidity') },
    { Icon: EyeIcon, value: `${currentForecast.vis[distanceUnit]}${t(`units.${distanceUnit}-symbol`)}`, text: t('condition.visibility') },
    { Icon: RainIcon, value: `${currentForecast?.chance_of_rain}%`, text: t('condition.chance-of-rain') },
    { Icon: SunriseIcon, value: [isTimeFormat12hrs ? currentForecast.sunrise : convert12hrsTo24hrs(currentForecast.sunrise), isTimeFormat12hrs ? currentForecast.sunset : convert12hrsTo24hrs(currentForecast.sunset)], text: t('condition.daylight') },
  ]), [
    currentForecast?.temp, currentForecast?.wind,
    currentForecast?.chance_of_rain, currentForecast?.uv,
  ]);
  const currentForecastDataSmall = useMemo(() => currentForecastData && currentForecastData.filter(({ text }) => [t('condition.real-temp'), t('condition.wind'), t('condition.chance-of-rain'), t('condition.uv')].includes(text)), [currentForecastData]);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const isLocationSet = (searchParams.has('lat') && searchParams.has('lon'));
  const handleLocationParameters = async (): Promise<void> => {
    if (!isLocationSet) {
      const newLocation = {
        lat: '',
        lon: '',
      };
      try {
        if (location?.geo?.lat && location?.geo?.lon) {
          newLocation.lat = location?.geo?.lat.toString();
          newLocation.lon = location?.geo?.lon.toString();
        } else {
          const geo = await getLocation();
          newLocation.lat = geo?.latitude.toString() || '';
          newLocation.lon = geo?.longitude.toString() || '';
        }
      } catch (e) {
        newLocation.lat = '55.755702';
        newLocation.lon = '37.617531';
      }
      setSearchParams((prevParams) => {
        prevParams.set('lat', newLocation.lat);
        prevParams.set('lon', newLocation.lon);
        return prevParams;
      });
    }
  };

  const handleFetchForecast = async () => {
    if (isLocationSet) {
      const newLocation = {
        lat: Number(searchParams.get('lat')),
        lon: Number(searchParams.get('lon')),
      };
      dispatch(getFullWeather({ location: newLocation, lang: i18n.resolvedLanguage || '' }));
    }
  };

  useEffect(() => {
    handleLocationParameters();
  }, []);
  useEffect(() => {
    if (
      location?.geo.lat.toString() !== searchParams.get('lat')
      || location?.geo.lon.toString() !== searchParams.get('lon')
    ) {
      handleFetchForecast();
    }
  }, [searchParams.toString()]);

  const ListCardConfigured = useCallback(() => (
    <ListCard
      header={t('headers.tdf')}
      isBackgroundCard
      isDraggable
    >
      {(loadingState === 'fulfilled') ? hours?.map(({ time, temp, condition }) => (
        <HourForecastItem
          key={time}
          time={isTimeFormat12hrs ? getTime12hrs(time) : getTime24hrs(time)}
          temperature={
                temp && `${temp[temperatureUnit]}${t(`units.${temperatureUnit}-symbol`)}`
              }
          condition={condition}
        />
      )) : (
        <SkeletonHoursForecastItem count={4} />
      )}
    </ListCard>
  ), [hours, loadingState, temperatureUnit, isTimeFormat12hrs]);

  return (
    <div className={styles.Weather} data-testid='Weather'>
      <div className={styles.main}>
        <div className={styles.padding_x}>
          <Location
            name={location?.name}
            country={location?.country}
            condition={currentForecast?.condition}
            temperature={currentForecast?.temp && `${currentForecast?.temp[temperatureUnit]}${t(`units.${temperatureUnit}-symbol`)}`}
          />
        </div>

        {isConditionsSmall ? (
          <>
            <ListCardConfigured />
            <ListCard
              header={t('headers.air')}
              isBackgroundCard
              buttonText={t('see-more')}
              onButtonClick={() => {
                setConditions(!isConditionsSmall);
              }}
            >
              <div className={styles.small_conditions}>
                {loadingState === 'fulfilled' ? (currentForecastDataSmall && currentForecastDataSmall
                  .map(({ Icon, text, value }) => (
                    <ConditionCard
                      key={text}
                      text={text}
                      value={value}
                      Icon={Icon}
                    />
                  ))) : (
                    <SkeletonConditionCard count={4} />
                )}
              </div>
            </ListCard>
          </>
        ) : (
          <>
            <div className={styles.full_conditions}>
              {loadingState === 'fulfilled' ? (currentForecastData && currentForecastData.map(({ Icon, text, value }) => (
                <Card
                  key={text}
                  isBackgroundCard
                >
                  <ConditionCard
                    text={text}
                    value={value}
                    Icon={Icon}
                  />
                </Card>
              ))) : (
                <>
                  {Array(8).fill(0).map((_, index) => (
                    <Card
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      isBackgroundCard
                    >
                      <SkeletonConditionCard />
                    </Card>
                  ))}
                </>
              )}
            </div>
            <Button
              onClick={() => {
                setConditions(!isConditionsSmall);
              }}
            >
              {t('hide')}
            </Button>
          </>
        )}
      </div>
      <div className={styles.aside}>
        {!isConditionsSmall && (
          <ListCardConfigured />
        )}
        <ListCard
          header={t('headers.3df')}
          isBackgroundCard
          isDirectionColumn
        >
          {loadingState === 'fulfilled' ? days?.map(({
            condition, maxtemp, mintemp, date,
          }) => (
            <DayForecastItem
              key={date}
              tempMax={maxtemp[temperatureUnit]}
              tempMin={mintemp[temperatureUnit]}
              tempSymbol={t(`units.${temperatureUnit}-symbol`)}
              condition={condition}
              weekDay={(new Date().getDate() === new Date(date).getDate()) ? t('today') : t(`week-day.${getDayOfWeek(date)}`)}
            />
          )) : (
            <SkeletonDayForecastItem count={3} />
          )}
        </ListCard>
      </div>
    </div>
  );
};

export default Weather;
