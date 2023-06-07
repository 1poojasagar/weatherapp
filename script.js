const apiKey = "4a29a0775a368ac4bd04e1d32c70f1c8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const card = document.querySelector(".card");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();
  console.log(data);

  if (data.cod === "404" || data.cod === "400") {
    // Display predefined message with white background
    
    document.querySelector(".city").innerHTML = "City not found";
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".humidity").innerHTML = "";
    document.querySelector(".wind").innerHTML = "";
    document.querySelector(".weather-icon").style.display = "none";
    document.querySelector(".details").style.display = "none";
  } else {
     // Display weather information
  document.querySelector(".humidity").style.display = ""; // Reset display property
  document.querySelector(".wind").style.display = ""; // Reset display property
  document.querySelector(".card").style.backgroundColor = "";
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

  const weatherIcon = document.querySelector(".weather-icon");
  const iconCode = data.weather[0].icon;
  const iconFilename = getIconFilename(iconCode); // Function to get the icon filename based on the icon code
  const iconPath = `./icons/${iconFilename}`; // Replace with the actual path to your icons
  
  weatherIcon.src = iconPath;
  weatherIcon.alt = data.weather[0].description;
  }
  function getIconFilename(iconCode) {
    // Map icon codes to your icon filenames or paths
    switch (iconCode) {
      case "01d":
        return "01d.png";
        case "01n":
          return "01n.png";
      case "02d":
        return "02d.png";
        case "02n":
          return "02n.png";
      case "03d":
        return "03d.png";
        case "03n":
          return "03n.png";
      case "04d":
        return "04d.png";
        case "04n":
          return "04n.png";
      case "09d":
        return "09d.png";
        case "09n":
          return "09n.png";
      case "10d":
        return "10d.png";
        case "010n":
          return "010n.png";
      case "11d":
        return "11d.png";
        case "11n":
          return "11n.png";
      case "13d":
        return "13d.png";
        case "13n":
          return "13n.png";
      case "50d":
        return "50d.png";
        case "50n":
          return "50n.png";
      default:
        return "unknown.png"; // Default icon for unknown weather conditions
    }
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Get user's current location
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude,"    ",longitude)
      const locationApiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      fetch(locationApiUrl)
        .then((response) => response.json())
        .then((data) => {
          const city = data.name;
          checkWeather(city);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

getUserLocation();
