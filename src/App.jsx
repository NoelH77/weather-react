import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Weather from "./components/Weather";
import Loader from "./components/Loader";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()


  const success = (pos) => {
    const currentCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    };
    setCoords(currentCoords);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=1500899f8b15e27e30294a5c1cfee6df`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data)
            const celsius = (res.data.main.temp - 273.15).toFixed(1)
            const fahrenheit = (celsius * (9/5) + 32).toFixed(1)
            const newTemp = {
              celsius,
              fahrenheit
            }
            setTemp(newTemp)
          } 
        )
        .catch((err) => err);
    }
  }, [coords]);



  return (
    <div className="App grid place-content-center min-h-screen bg-[url('/images/fondo.jpg')] bg-cover px-2">
      {
        weather ? (
          <Weather weather={weather} temp={temp} />
        ) : (
          <Loader />
        )
      } 
      
    </div>
  );
}

export default App;
