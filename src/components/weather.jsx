import React from "react";
import { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "d536805fcc5146c48c542650250609";

  const getWeather = async () => {
    if (city == "") {
      alert("To get weather information pls enter city name first👇");
      return;
    }
    if (!/^[a-zA-Z\s]*$/.test(city)) {
      alert("To get weather information pls enter valid city name first👇");
      return;
    }
    // if(/^[a-zA-Z\s]*$/.test(city)){
    try {
      setError("");
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
      );
      // if (!response.ok) {
      //   throw new Error("city not found");
      // }
      const data = await response.json();
      if (data.error) {
        setError("city not found");
        setWeather(null);
        return;
      }
        if (data.location && data.location.country !== "India") {
      setError("Only Indian cities are allowed 🌏");
      setWeather(null);
      return;
    }
        setWeather(data);
        console.log(data);
      
    } catch (err) {
     alert("erroe occured!")
      setWeather(null);
    }
    setCity("");
  };
  const getAQIStatus = (index) => {
    switch (index) {
      case 1:
        return { text: "Good", color: "text-green-600" };
      case 2:
        return { text: "Moderate", color: "text-yellow-600" };
      case 3:
        return {
          text: "Unhealthy (Sensitive Groups)",
          color: "text-orange-600",
        };
      case 4:
        return { text: "Unhealthy", color: "text-red-600" };
      case 5:
        return { text: "Very Unhealthy", color: "text-purple-700" };
      case 6:
        return {
          text: "Hazardous",
          color: "text-gray-900 bg-red-300 p-1 rounded",
        };
      default:
        return { text: "Unknown", color: "text-gray-600" };
    }
  };

  return (
    <div className="shadow-amber-200  shadow-lg p-5 flex justify-content-center items-center flex-col gap-3 rounded-lg border-3 border-amber-200 ">
      {/* <div className="flex justify-content-center flex-col"> */}
      <h1 className="font-bold text-center capitalize text-3xl">Weather App</h1>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7VOEhVA4LmtfxUhrZdQV5Lk2mWtN8tlPRqQ&s"
        alt="image "
        className="w-1/3"
      />
      <h2 className="text-center text-2xl capitalize">search weather here</h2>
      <div className="flex justify-content-center items-center gap-4">
        <input
          type="text"
          placeholder="Enter your city..."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          className="border-amber-600 border-1 p-2 rounded-lg outline-0"
        />
        <button
          onClick={getWeather}
          className="bg-amber-600 p-2 text-white rounded-lg  cursor-pointer"
        >
          Search
        </button>
      </div>
      {error && <div>{error}</div>}
      {weather && (
        <div className="capitalize">
          <span className="mx-2">{weather.location.name}</span>
          <span>{weather.location.country}</span>
          <p className="mx-2 text-2xl inline-block">
            {weather.current.temp_c}°C
          </p>
          <div>
            <div className="flex justify-content-center items-center gap-4 bg-amber-50 p-2 rounded-lg">
              <p className=""> {weather.current.condition.text}</p>
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
              />
            </div>
            {(() => {
              const aqi = getAQIStatus(
                weather.current.air_quality["us-epa-index"]
              );
              return <p className={aqi.color}>Air Quality:{aqi.text}</p>;
            })()}

            <div className="flex justify-content-center gap-4">
              <p>🥏Humidity:{weather.current.humidity}%</p>
              <p>
                🍃Wind:{weather.current.wind_kph} km/h
                {weather.current.wind_dir}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
