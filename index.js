let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let minutes = now.getMinutes();
let hours = now.getHours();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let year = now.getFullYear();
let localTime = document.querySelector(".text-center");
localTime.innerHTML = `${day}-----${hours}:${minutes}-----${month}-${year}`;

// feature 2
function displayCityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".serchcity");
  let search = document.querySelector("h1");
  search.innerHTML = `${searchInput.value}`;
}
let city = document.querySelector(".city-form");
city.addEventListener("submit", displayCityName);

function showTemp(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector(".temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchTemp(event) {
  event.preventDefault();
  let city = document.querySelector(".serchcity").value;
  let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let celsiusTemperature = null;
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  //celsiusLink.classList.remove("active");
  //fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  //celsiusLink.classList.add("active");
  //fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let searchForm = document.querySelector(".city-form");
searchForm.addEventListener("submit", searchTemp);