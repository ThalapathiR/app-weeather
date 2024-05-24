import { useEffect, useState } from 'react'
import './App.css'
import propTypes from "prop-types";
import weatheri from "./assets/weatheri.png";
import searchicon from "./assets/searchicon.png";
import humidity from "./assets/humidity.png";
import wind from "./assets/wind.png";
const WeatherDetails=({icon ,temp,location,country,lat,long,humi,winds})=>
{
  return(
    <>
    <div className="image"><img  src={icon} alt="Image" /></div>
       <div className="temp">{temp}C</div>
        <div className="location">{location}</div>
             <div className="country">{country}</div>
            <div className="cord">
             <div>
             <span className='latitude'>latitude</span>
               <span>{lat}</span>
             </div>
             <div>
               <span className='longitude'>longitude</span>
               <span>{long}</span>
             </div>
            </div>
            <div className="data">
              <div className="humi">
                <img src={humidity} alt="" />
                <span>{humi}%</span>
                <p>Humidity</p>
              </div>
              <div className="wind">
                <img src={wind} alt="" />
                <span>{winds} Km/h</span>
                <p>Wind speed</p>
              </div>
            </div>
     </>
  )

  WeatherDetails.propTypes={
    icon:propTypes.string.isRequired,
    temp:propTypes.number.isRequired,
    location:propTypes.string.isRequired,
    country:propTypes.string.isRequired,
    humi:propTypes.number.isRequired,
    wind:propTypes.number.isRequired,
    lat:propTypes.number.isRequired,
    long:propTypes.number.isRequired,
    
  };

}

function App() {
  const[icon,setIcon]=useState(weatheri);
  const[temp,setTemp]=useState(0);
  const[location,SetLocation]=useState("London");
  const[country,setCountry]=useState("GB");
  const[lat,setLat]=useState(0);
  const[long,setLong]=useState(0);
  const[humi,setHumi]=useState(85);
  const[winds,setWinds]=useState(5);
  const[text,setText]=useState("London")
  const[cityNotFound,setCityNotFound]=useState(false);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);

  // const weatherIconMap={
  //   "01d":weatheri,
  //   "02d":weatheri,
  //   "02n":cloudIcon,
  //   "03d":drizzleIcon,
  //   "03n":drizzleIcon,
  //   "04d":drizzleIcon,
  //   "04n":drizzleIcon,
  //   "09n":rainIcon,
  //   "09d":rainIcon,
  //   "010n":rainIcon,
  //   "010d":rainIcon,
  //   "013d":snowIcon,
  //   "013n":snowIcon,
  // };

  const search=async()=>
  {
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=3ee29d6567250d4d7ba2bfe6db0d035c&units=Metric`
try{

  let res=await fetch(url);
  let data=await res.json();
  if(data.cod==="404"){
    setCityNotFound(true);
    console.log("city not found")
    setLoading(false)
    return;
  }

  setHumi(data.main.humidity);
  setWinds(data.wind.speed);
  setTemp(Math.floor(data.main.temp));
  setCountry(data.sys.country);
  setLat(data.coord.lat);
  setLong(data.coord.lon);
  SetLocation(data.name);
  const weatherIconCode=data.weather[0].icon;
  setIcon(weatherIconMap[weatherIconCode] || clearIcon);
  setCityNotFound(false)
}
catch(error)
{
  console.error("an error ocuurred:",error.message);
  
}
finally{
  setLoading(false);
}
};

const handleClick=(e)=>
{
setText(e.target.value)
}
const handlekeyhdown=(e)=>
{
  if(e.key==="Enter")
  {
    search()
  }
};
useEffect(function()
{
  search();
},[]);
  return (
    <>
      <div className="Container">
        <div className='input-containe'>
          <div className='search-bar'>
          <input type="text"  placeholder='search City'onChange={handleClick} value={text} onKeyDown={handlekeyhdown} />
          <img className='searchicon' src={searchicon} alt="" onClick={()=>search()}  />
          </div>
          
          {loading && <div className="loading-messgae">Loading..</div>}
         {error &&  <div className="error-message">{error}</div>}
        {cityNotFound && <div className="citynotfound">CityNotFound</div>}
         
         {!loading && !cityNotFound &&  <WeatherDetails icon={icon}  temp={temp} location={location}  country={country} lat={lat} long={long} humi={humi} winds={winds}/>}
          
          <p className='lemi'>Designed by <span>Lemi</span> </p>

        </div>
        
      </div>
    
    </>
  )
}

export default App
