import { useEffect, useState } from 'react'
import './App.css';
import PropTypes from "prop-types";

import rainIcon from "./images/rain.png";
import snowIcon from "./images/snow.jpg";
import windIcon from "./images/wind.jpg";
import imageIcon from "./images/image.png";
import searchIcon from "./images/search.jpg";
import humidityIcon from "./images/humidity.png";
import dizzleIcon from "./images/dizzle.jpg";
import cloudIcon from "./images/cloud.png";

const WeatherDetails =({icon,temp,city,
  Country,lat,log,humidity,wind})=>{
  return(<>
  <div className='image'>
    <img src={icon} alt="Image" />
  </div>
  <div className="temp">{temp}°C</div>
  <div className='city'>{city}</div>
  <div className='country'>{Country}</div>
  <div className="cord">
  <div>
      <span className='lat'>latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidityIcon} alt="humidity" className='icon'/>
      <div className="hum-percent">{humidity}%</div>
      <div className="text">Humidity</div>
    </div>
    <div className="element">
      <img src={windIcon} alt="wind" className='icon'/>
      <div className="wind-percent">{wind} km/h</div>
      <div className="text">Wind Speed</div>
    </div>
  </div>
  </>)
};
WeatherDetails.propTypes={
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  humidity:PropTypes.number.isRequired,
  wind:PropTypes.number.isRequired,
  lat:PropTypes.number.isRequired,
  log:PropTypes.number.isRequired,
};


function App() {
  const [icon,setIcon]=useState(imageIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("Chennai");
  const [country,setCountry]=useState("IN");
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);
  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound]=useState(false);
  const [text,setText]=useState("Chennai");
  const [error,setError]=useState(null);

  const weatherIconMap={
    "01n":imageIcon,
    "01d":imageIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":dizzleIcon,
    "03n":dizzleIcon,
    "04d":dizzleIcon,
    "04n":snowIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon,
  };



  const search=async()=>{
    setLoading(true);
    let api_key="38b3498c9ff919859eebaefcbd827dd1";
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try{
      let res = await fetch(url);
      let data = await res.json();
      if(data.cod==="404"){
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || imageIcon );
      setCityNotFound(false);
 
    }
    catch(error){
      console.error("An error occurred:", error.message);
      setError("An error occurred while fetching weather data.");
    }
    finally{
      setLoading(false);
    }
  };
  const handleCity=(e)=>{
    setText(e.target.value);
  }
  const handleKeyDown=(e)=>{
    if(e.key=="Enter"){
      search();
    }

  };
  useEffect(function(){
    search();
  },[]);
  return (
    <>
      <div className='container'>
         <div className='input-cointainer'>
           <input type="text" className='cityInput' placeholder='Searchcity' onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
           <div className='search-icon' onClick={()=>search()} >
            <img src={searchIcon} alt="search"/>
           </div>
         </div>
         {!loading&& !cityNotFound&&<WeatherDetails icon={icon} temp={temp} city={city} Country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}
         {loading&&<div className="loading">Loading...</div>}
         {error&&<div className="errormsg">{error}</div>}
      {cityNotFound&&<div className="citynotfound">City Not Found</div>}
      </div>
      
    </>
  )
}

export default App
