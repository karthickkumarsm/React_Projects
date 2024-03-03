import React, { useState } from 'react'
import './weatherapp.css';
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weatherapp = () => {

  let api_key="f32027afd09e7258ddbe79ebd6d2b171";
  const[wicon,setWicon]=useState(cloud_icon);

  const search= async ()=>{
    const element=document.getElementsByClassName("cityInput");
    if(element[0].value===""){
      return 0;
    }
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let response=await fetch(url);

    if (!response.ok) {
      // Handle the case where the response is not OK (e.g., invalid city)
      console.error("Error fetching weather data:", response.statusText);
      return;
    }
  
    try {
      let data = await response.json();
  
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
  
      humidity[0].innerHTML = Math.round(data.main.humidity)+" %";
      wind[0].innerHTML = Math.round(data.wind.speed)+" Kmph";
      temperature[0].innerHTML = Math.round(data.main.temp)+"°C";
      location[0].innerHTML = data.name;
      if(data.weather[0].icon=="01d"||data.weather[0].icon=="01n"){
        setWicon(clear_icon);
      }
      else if(data.weather[0].icon=="02d"||data.weather[0].icon=="02n"){
        setWicon(cloud_icon);
      }
      else if(data.weather[0].icon=="03d"||data.weather[0].icon=="03n"){
        setWicon(drizzle_icon);
      }
      else if(data.weather[0].icon=="04d"||data.weather[0].icon=="04n"){
        setWicon(drizzle_icon);
      }
      else if(data.weather[0].icon=="09d"||data.weather[0].icon=="09n"){
        setWicon(rain_icon);
      }
      else if(data.weather[0].icon=="10d"||data.weather[0].icon=="10n"){
        setWicon(rain_icon);
      }
      else if(data.weather[0].icon=="13d"||data.weather[0].icon=="13n"){
        setWicon(snow_icon);
      }
      else{
        setWicon(clear_icon);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };
  

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='search'/>
        <div className="search-icon" onClick={()=>{search()}}>
          <img src={search_icon} alt="search icon" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">
        24°C
      </div>
      <div className="weather-location">
        London
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="Humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">
              64%
            </div>
            <div className="text">
              Humidity
            </div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="Wind" className="icon" />
          <div className="data">
            <div className="wind-rate">
              15 kmph
            </div>
            <div className="text">
              Wind Speed
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weatherapp
