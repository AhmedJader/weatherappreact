import React, { useState } from 'react';
import './Weatherapp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const Weatherapp = () => {
  const [wicon, setWicon] = useState(cloud_icon);

  const searchInput = async () => {
    const city = document.getElementsByClassName('cityInput');
    if (city[0].value === '') {
      return 0;
    }

    let api_key = '9651564f07e9b71cc12a542e0c072506';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city[0].value}&units=metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      const humidity = document.getElementsByClassName('humidity-percent');
      const wind = document.getElementsByClassName('wind-rate');
      const temperature = document.getElementsByClassName('weather-temp');
      const location = document.getElementsByClassName('weather-location');

      humidity[0].innerHTML = `${data.main.humidity} %`;
      wind[0].innerHTML = `${Math.floor(data.wind.speed)} km/h`;
      temperature[0].innerHTML = `${Math.floor(data.main.temp)}°C`;
      location[0].innerHTML = data.name;

      switch (data.weather[0].icon) {
        case '01d':
        case '01n':
          setWicon(clear_icon);
          break;
        case '02d':
        case '02n':
          setWicon(cloud_icon);
          break;
        case '03d':
        case '03n':
          setWicon(drizzle_icon);
          break;
        case '04d':
        case '04n':
          setWicon(drizzle_icon);
          break;
        case '09d':
        case '09n':
          setWicon(rain_icon);
          break;
        case '10d':
        case '10':
          setWicon(rain_icon);
          break;
        case '13d':
        case '13n':
          setWicon(snow_icon);
          break;
        default:
          setWicon(clear_icon);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Search'></input>
        <div className='search-icon' onClick={() => searchInput()}>
          <img src={search_icon} alt='search' />
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon} alt='clouds woooo' />
      </div>
      <div className='weather-temp'>-- °C</div>
      <div className='weather-location'>Enter City</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt='humidity' className='icon' />
          <div className='data'>
            <div className='humidity-percent'>-- %</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} alt='windwooo' className='icon' />
          <div className='data'>
            <div className='wind-rate'>-- km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weatherapp;
