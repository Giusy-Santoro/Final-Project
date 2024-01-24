import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faTint, faWind, faEye, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const getCurrentTime = () => {
  const now = new Date();
  const options = { hour: 'numeric', minute: 'numeric', hour12: false };
  return new Intl.DateTimeFormat('it-IT', options).format(now);
};

const WeatherCard = ({ data }) => {
  if (!data) {
    return null;
  }

  const {
    name,
    weather,
    main,
    wind,
    visibility,
    sys: { country, sunrise },
  } = data;

  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

  const weatherConditions = {
    'Clear': 'Sereno',
    'Clouds': 'Nuvoloso',
    'Rain': 'Pioggia',
    'Drizzle': 'Pioggerella',
    'Thunderstorm': 'Temporale',
    'Snow': 'Neve',
    'Mist': 'Nebbia',
  };

  const conditionInItalian = weatherConditions[weather[0].main] || weather[0].description;

  const weatherIcon = weather[0].icon
    ? `http://openweathermap.org/img/wn/${weather[0].icon}.png`
    : null;

  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('it-IT', options).format(date);
  };

   return (
    <div className="weather-card container mt-1">
      <div className="row">

        <div className="d-flex justify-content-center align-item-center">

          <h5 className="mb-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {`${name}, ${country}`}
          </h5>

          <p className="card-text mb-2">
            <strong>{getFormattedDate(sunrise)}</strong>
          </p>
          
        </div>
        </div>

        <div className="row">
        <div className="col-md-12">
        <p className="card-text">
            <strong>{getCurrentTime()}</strong>
          </p>
          <div className="d-flex flex-column align-items-center">
            {weatherIcon && <img src={weatherIcon} alt="Weather Icon" className="img-fluid" />}
            <div className="d-flex justify-content-between gap-5 mt-5 weather-icons">
              <p className="text-center">
                <FontAwesomeIcon icon={faWind} size="lg" />
                <br />
                {` ${wind.speed} m/s`}
              </p>
              <p className="text-center">
                <FontAwesomeIcon icon={faTint} size="lg" />
                <br />
                {` ${main.humidity}%`}
              </p>
              <p className="text-center">
                <FontAwesomeIcon icon={faEye} size="lg" />
                <br />
                {` ${visibility} metri`}
              </p>
            </div>
          </div>
        </div>
        </div>
      
      <img src="https://i.pinimg.com/originals/01/87/93/018793bb6fd3e5ac98f630a559adb464.gif" alt="Gif" className='weather-gif img-fluid' />
    </div>
  );
};



export default WeatherCard;
