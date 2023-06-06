const apiKey= "4a29a0775a368ac4bd04e1d32c70f1c8";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const card = document.querySelector(".card");

async function checkWeather(city){
  const response = await fetch (apiUrl + city +`&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);
  
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
  
 // Set background image based on time of day
 const currentTime = new Date().getHours();
 console.log(currentTime);
 if (currentTime >= 6 && currentTime < 18) {
   card.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/c/c5/Seven_Sisters_daytime.jpg")';

  } 
 else if (currentTime >= 18 || currentTime < 6) {
   card.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg")';
 } else {
   card.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/c/c5/Seven_Sisters_daytime.jpg")';
   
 }
 card.style.backgroundRepeat = "no-repeat"; // Set background image to not repeat
 card.style.backgroundSize = "cover"; // Scale the background image to cover the entire card
 card.style.backgroundPosition = "center"; // Position the background image in the center

}
searchBtn.addEventListener("click", ()=>{
  checkWeather(searchBox.value);
})
