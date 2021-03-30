// Date & Time //
function formatDate(timestamp) {

  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];
  let month = months[now.getMonth()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  currentDay.innerHTML = `${day}`;

  return `${date}.${month}.${year}, ${hours}:${minutes}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

// Forecast //
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <strong>
        ${formatHours(forecast.dt * 1000)}
      </strong>
      <img
        src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong> /
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

// City Input //
function search(searchInput) {
  var apiKey = "c0a2579dbc68074c7c325b759cdecd5c";
  var unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showForecast);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  search(searchInput.value);
  easterHunt()
}

function easterHunt() {
  let searchInput = document.querySelector("#search-text-input");

  if (searchInput.value === "Philadelphia") {
    alert("Well done one more riddle to crack:\r\n \r\n · · · · -     - - - - - ");
    alert("once you figure out the code go to: https://sites.google.com/view/easterhunt-travelblog")
  }
}

// Temperature & Wind + Humidity & Description //
function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#currentTemperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#currentLocation").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#currentDate").innerHTML = formatDate(response.data.dt * 1000);

  changeComment(response.data.weather[0].main);
}

// Unit conversion //
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

// Current location //
function showPosition(position) {
  let apiKey = "c0a2579dbc68074c7c325b759cdecd5c";
  let unit = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(showTemperature);

  apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(showForecast);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

// Comments //
function changeComment(weather) {
  let commentElement = document.querySelector("#comment");
  if (weather === "Clear") {
    commentElement.innerHTML = "The hottest day of the week is Sun-day";
  } else if (weather === "Clouds") {
    commentElement.innerHTML =
      "What did one raindrop say to the other? Two's company, three's a cloud.";
  } else if (weather === "Thunderstorm") {
    commentElement.innerHTML =
      "What kind of shorts do clouds wear? Thunderwear!";
  } else if (weather === "Drizzle") {
    commentElement.innerHTML =
      "What do you call a bear caught out in the rain? A drizzily bear.";
  } else if (weather === "Rain") {
    commentElement.innerHTML =
      "Anyone who says sunshine brings happiness has never danced in the rain.";
  } else if (weather === "Snow") {
    commentElement.innerHTML =
      "Cold winter weather is snow laughing matter!";
  } else {
    commentElement.innerHTML = "Wish you a beautiful day!";
  }
}

let celsiusTemperature = null;

let searchIcon = document.querySelector(".fa-search");
searchIcon.addEventListener("click", searchCity);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let celsiusLink = document.querySelector("#currentCelsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#currentFahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getCurrentPosition);

search("Bern");
