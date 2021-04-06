function searchCity(event) {
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



function showCurrentNumbers(response) {
  let nameCity = document.querySelector(".currCity");
  let temperature = document.querySelector("#currTemp");
  let wind = document.querySelector(".wind");
  let pressure = document.querySelector(".pressure");
  let humidity = document.querySelector(".humidity");
  let sight = document.querySelector(".sight");
  let icon = document.querySelector("#icon");
  celTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = Math.round(response.data.main.temp);
  nameCity.innerHTML = response.data.name;
  wind.innerHTML = response.data.wind.speed + " km/h";
  humidity.innerHTML = response.data.main.humidity;
  sight.innerHTML = response.data.weather[0].main;
  icon.setAttribute("src", "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png")
}

function showCelsius(event) {
  event.preventDefault();
  celsiusSign.classList.add("on");
  fahrenheitSign.classList.remove("on");
  let temperature = document.querySelector("#currTemp");
  temperature.innerHTML = Math.round(celTemp);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusSign.classList.remove("on");
  fahrenheitSign.classList.add("on");
  let temperature = document.querySelector("#currTemp");
  let fahrenheitTemp = (celTemp * 9) / 5 + 32;
  console.log(fahrenheitTemp);
  temperature.innerHTML = Math.round(fahrenheitTemp);

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

let celTemp = null;

let dayDisplay = document.querySelector(".weekDay");
dayDisplay.innerHTML = day;

let monthDisplay = document.querySelector(".date");
monthDisplay.innerHTML = month + " " + date;

let timeDisplay = document.querySelector(".time");
timeDisplay.innerHTML = hours + ":" + minutes;

let currentEngine = document.querySelector("button");
currentEngine.addEventListener("click", geoApi);

let searchEngine = document.querySelector("form");
searchEngine.addEventListener("submit", searchCity);

let celsiusSign = document.querySelector("#celsiusSign");
let fahrenheitSign = document.querySelector("#fahrenheitSign");

celsiusSign.addEventListener("click", showCelsius);
fahrenheitSign.addEventListener("click", showFahrenheit);

let temperature = document.querySelector("#currTemp")
console.log(temperature)