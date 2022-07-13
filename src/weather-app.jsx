import React, { useState } from 'react';
import axios from 'axios';

export const WeatherApp = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&lang=sp, es&appid=a14e540b97bb9cbf9f89e86813c992a1`


  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }

  } 

  return (
      <div className="container-fluid">
        <div className="background"></div>
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-center mb-5">
              <input type="text" 
                  className="search text-center mt-4 w-75" 
                  placeholder="Enter location" 
                  value={location}
                  onChange={event => setLocation(event.target.value)}
                  onKeyPress={searchLocation}/>
          </div>

          <div className="col-12 d-flex flex-column align-items-center">
            <span className="location mt-5 text-light">{data.name}</span>
            {data.main ? <h1 className='temperature text-light'>{data.main.temp.toFixed()} °F</h1> : null}
            {data.weather ? <span className='condition text-light'>{data.weather[0].main}</span>  : null}
          </div>
        </div>

        <div className="row extra-information">
              <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                {data.main ? <span className='fw-bold'>{data.main.feels_like.toFixed()} °F</span> : null}
                <span>Feels Like</span>
              </div>

              <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                {data.main ? <span className='fw-bold'>{data.main.humidity.toFixed()} %</span> : null}
                <span>Humidty</span>
              </div>

              <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                {data.wind ? <span className='fw-bold'>{data.wind.speed.toFixed()} Mph</span> : null}
                <span>Wind Speed</span>
              </div>
          </div>
      </div>
  )
}
