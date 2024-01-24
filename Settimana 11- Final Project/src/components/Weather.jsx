import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import WeeklyForecast from '../components/WeeklyForecast';
import MapCard from '../components/MapCard'; 
import CapitalCard from '../components/CapitalCard'; 
import Navbar from '../components/Navbar';  
import Footer from '../components/Footer';  

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const { city } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!city) {
          setWeatherData(null);
          setWeeklyForecast(null);
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=034098922d7a5c9dd10bf1e73fbdd05d`
        );

        if (!response.ok) {
          throw new Error('Errore nel recupero dei dati meteorologici');
        }

        const data = await response.json();
        console.log('Dati meteorologici recuperati:', data);
        setWeatherData(data);

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=034098922d7a5c9dd10bf1e73fbdd05d`
        );

        if (forecastResponse.ok) {
          const forecastData = await forecastResponse.json();
          console.log('Previsioni settimanali recuperate:', forecastData);
          setWeeklyForecast(forecastData);
        }
      } catch (error) {
        console.error('Errore nel recupero dei dati meteorologici:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  console.log('Stato dei dati meteorologici:', weatherData);
  console.log('Stato delle previsioni settimanali:', weeklyForecast);

  return (
    <div className='weather-bg'>
      <Navbar />  

      <div className="container my-4 ">
        <div className="row">
          <div className="col-md-12 col-lg-4">
            {loading && <p>Caricamento...</p>}
            {!loading && weatherData && (
              <div className="">
                <WeatherCard data={weatherData} />
              </div>
            )}
          </div>

          <div className="col-md-12 col-lg-8">
            <div className="row">
              <div className="col-md-12 col-lg-8 mt-2 gap-4 d-flex ">
                <SearchBar />
                <Link to="/" className="btn btn-secondary ">
              Torna alla Home
            </Link> 
              </div>
            
           
         
              <div className="col-md-12 col-lg-12">
                {weeklyForecast && <WeeklyForecast data={weeklyForecast} />}
              </div>
            </div>

            <div className='row mt-4'>
              <div className="col-md-12 col-lg-6">
                {weatherData && (
                  <div className="map-container">
                    <MapCard data={weatherData} />
                  </div>
                )}
              </div>

              <div className="col-md-12 col-lg-6">
                {weatherData && (
                  <div className="capital-card">
                    <CapitalCard data={weatherData} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row ">
        
        </div>
      </div>
      <Footer/> 
    </div>
  );
};

export default Weather;
