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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function forecastDisplay(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay,index) {
    if (index < 6) {
    forecastHTML += `
    <div class="col-xl-2">
        <div class="card small">
           <div class="card-body">
                <ul class="preview">
                  <li class="day">
                    <strong>${formatDay(forecastDay.dt)}</strong>
                  </li>
                  <li >
                    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
           alt="Clear"
           id="icon-small"
           width="80">
                  </li>
                  <li class="temp">
                    <span class="weather-max"><strong>${Math.round(
                      forecastDay.temp.max
                    )}°C</strong></span>
                    <span class="weather-min"><strong>${Math.round(
                      forecastDay.temp.min
                    )}°C</strong></span>
                  </li>
                </ul>
            </div>
        </div>
    </div>`;
    forecastElement.innerHTML = forecastHTML + `</div>`;
  };
  })
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f935225af798852bda9bde94b0b68954";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl)
  axios.get(apiUrl).then(forecastDisplay);

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
  temperature.innerHTML = Math.round(response.data.main.temp) + "°C";
  nameCity.innerHTML = response.data.name;
  pressure.innerHTML = response.data.main.pressure + " hPa";
  wind.innerHTML = response.data.wind.speed + " km/h";
  humidity.innerHTML = response.data.main.humidity +" %";
  sight.innerHTML = response.data.weather[0].main;
  icon.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" +
      response.data.weather[0].icon +
      "@2x.png"
  );
  getForecast(response.data.coord);
  celsiusSign.classList.add("on");
  fahrenheitSign.classList.remove("on");
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
  temperature.innerHTML = Math.round(fahrenheitTemp) + "°F";
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

let temperature = document.querySelector("#currTemp");
console.log(temperature);
