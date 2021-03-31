function searchCityCelsius(event) {
  event.preventDefault();
  let nameCity = document.querySelector(".currCity");
  let city = document.querySelector(".form-control");
  console.log(city.value);
  nameCity.innerHTML = city.value;
  let apiKey = "f935225af798852bda9bde94b0b68954";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let url = apiUrl + "&q=" + city.value + "&appid=" + apiKey + "&units=metric";
  axios.get(url).then(showCurrentNumbers);
}
function searchCityFahrenheit(event) {
  event.preventDefault();
  let nameCity = document.querySelector(".currCity");
  let city = document.querySelector(".form-control");
  console.log(city.value);
  nameCity.innerHTML = city.value;
  let apiKey = "f935225af798852bda9bde94b0b68954";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let url =
    apiUrl + "&q=" + city.value + "&appid=" + apiKey + "&units=imperial";
  axios.get(url).then(showCurrentNumbersFahrenheit);
  console.log(url);
}

function showCurrentNumbersFahrenheit(response) {
  let nameCity = document.querySelector(".currCity");
  let temperature = document.querySelector(".currTemp");
  let wind = document.querySelector(".wind");
  let pressure = document.querySelector(".pressure");
  let humidity = document.querySelector(".humidity");
  let sight = document.querySelector(".sight");
  temperature.innerHTML = Math.round(response.data.main.temp) + "°F";
  nameCity.innerHTML = response.data.name;
  wind.innerHTML = response.data.wind.speed + " mph";
  sight.innerHTML = response.data.weather[0].main;
}

function showCurrentNumbers(response) {
  let nameCity = document.querySelector(".currCity");
  let temperature = document.querySelector(".currTemp");
  let wind = document.querySelector(".wind");
  let pressure = document.querySelector(".pressure");
  let humidity = document.querySelector(".humidity");
  let sight = document.querySelector(".sight");
  temperature.innerHTML = Math.round(response.data.main.temp) + "°C";
  nameCity.innerHTML = response.data.name;
  wind.innerHTML = response.data.wind.speed + " km/h";
  humidity.innerHTML = response.data.main.humidity;
  sight.innerHTML = response.data.weather[0].main;
}

function geoApi() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f935225af798852bda9bde94b0b68954";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let url =
    apiUrl +
    "&lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(url).then(showCurrentNumbers);
}

let number = 19;
let now = new Date();

days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
day = now.getDay();
day = days[day];
month = now.getMonth();
month = months[month];
date = now.getDate();
hours = now.getHours();
minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayDisplay = document.querySelector(".weekDay");
dayDisplay.innerHTML = day;

let monthDisplay = document.querySelector(".date");
monthDisplay.innerHTML = month + " " + date;

let timeDisplay = document.querySelector(".time");
timeDisplay.innerHTML = hours + ":" + minutes;

let currentEngine = document.querySelector("button");
currentEngine.addEventListener("click", geoApi);

let searchEngine = document.querySelector("form");
searchEngine.addEventListener("submit", searchCityCelsius);

let celsiusTemp = document.querySelector(".celsius");
let fahrenheitTemp = document.querySelector(".fahrenheit");

celsiusTemp.addEventListener("click", searchCityCelsius);
fahrenheitTemp.addEventListener("click", searchCityFahrenheit);
