
import './App.css';
import {useState} from 'react'
import axios  from 'axios';


function App() {
  
  
  const [info,setInfo] = useState(null)
  const [city,setCity] = useState('')
  const [cityName,setCityName] = useState('')
  const [msg,setMsg] = useState('')
  

  const API_KEY = '';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
  const getInfo = (event) => {
    if(event.key === 'Enter') {
      
      axios.get(URL)
      .then((response) => {
        
        setInfo(response.data)
        setCityName(city)
        setCity('')
        setMsg('')
      })
      .catch(err => setMsg('Invalid City Name/Server error')) 
        
      
    }
   }
  return (
    <>
        <div className="header">
            
                <input type="text"
                  placeholder="enter city" 
                  id="city"
                  value={city} 
                  onKeyPress={getInfo}
                  onChange={(e) => setCity(e.target.value)}
                  />

                  <p>{msg}</p>
            
        </div>

       {
        info != null ? (
          
          <div className="main">
            
         
            
          
          <p><span className="city">{cityName}</span>, <span>{info.sys?.country}</span></p>


          <div className="temperature">
            <p><span>Temperature </span><span>{info.main?.temp.toFixed(1)} °C</span></p>
            <p><span>Min </span><span>{info.main?.temp_min.toFixed(1)} °C</span></p>
            <p><span>Max </span><span>{info.main?.temp_max.toFixed(1)} °C</span></p>
          </div>

          <div className="extras">
            <div className="feels-like">
                <p>Feels Like</p>
                <p><span>{info.main?.feels_like.toFixed(1)} °C</span></p>
            </div>
            <div className="humidity">
                <p>Humidity</p>
                <p><span>{info.main?.humidity} %</span></p>
            </div>
            <div className="wind-speed">
                <p>Wind Speed</p>
                <p><span>{info.wind?.speed.toFixed(1)} MPH</span></p>
            </div>
          </div>


          <div className="weather">
              {info !== undefined && <p>{info.weather[0].main}</p>}
        
              <img src={`http://openweathermap.org/img/wn/${info.weather[0].icon}.png`} alt="status_icon" />
          </div>
          
         
          
    </div>
        
      ): <h3 style={{"color":"white"}}>Please enter city to get weather</h3>}
        

      
        
    </>
  );
}

export default App;
