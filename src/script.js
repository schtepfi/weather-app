// Date //

let currentDate = document.querySelector("#currentDate");

let now = new Date();

let days = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT"
];
let day = days[now.getDay()];
let date = now.getDate();
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
let year = now.getFullYear();  
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDate.innerHTML = `${day} ${date}.${month}.${year}, ${hours}:${minutes}`;


// City Input //
function search(city) {
  var apiKey = "c0a2579dbc68074c7c325b759cdecd5c";
  var unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  document.querySelector("#currentLocation").innerHTML = searchInput.value;
  
  search(city);
}

// Temperature & Wind + Precipiatation & Description//

function showTemperature(response) {
  document.querySelector("#currentTemperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#precipitation").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

search("Bern");

// Current location //

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
    
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
    
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getCurrentPosition);
