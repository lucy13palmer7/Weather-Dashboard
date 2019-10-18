// my API key
var APIKey = "33eab3412b3922958fbac6ddd2432638";
let units = "imperial";
let searchMethod;
// search q or zip
function getSearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  )
    searchMethod = "zip";
  else searchMethod = "q";
}
function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${APIKey}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(result => {
      init(result);
    });
}

function init(resultFromServer) {
  //   console.log(resultFromServer);
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = 'url("clear.jpg")';
      break;
    case "Clouds":
      document.body.style.backgroundImage = 'url("cloudy.jpg")';
      break;
    case "Rain":
    case "Drizzle":
    case "Mist":
      document.body.style.backgroundImage = 'url("rain.jpg")';
      break;
    case "Thunderstorm":
      document.body.style.backgroundImage = 'url("storm.jpg")';
      break;
    case "Snow":
      document.body.style.backgroundImage = 'url("snow.jpg")';
      break;

    default:
      break;
  }
  let weatherDescriptionHeader = document.getElementById(
    "weatherDescriptionHeader"
  );
  let temperatureElement = document.getElementById("temperature");
  let humidityElement = document.getElementById("humidity");
  let windSpeedElement = document.getElementById("windSpeed");
  let uvIndexElement = document.getElementById("uvIndex");
  let cityHeader = document.getElementById("cityHeader");
  let weatherIcon = document.getElementById("documentIconImg");

  weatherIcon.src =
    "http://openweathermap.org/img/wn/" +
    resultFromServer.weather[0].icon +
    ".png";
  //
  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText =
    "Current Conditions: " +
    resultDescription.charAt(0).toUpperCase() +
    resultDescription.slice(1);
  //
  temperatureElement.innerHTML =
    "Temperature: " + Math.floor(resultFromServer.main.temp) + "&#176";
  //
  windSpeedElement.innerHTML =
    "Wind Speeds: " + Math.floor(resultFromServer.wind.speed) + " m/s";
  //
  cityHeader.innerHTML = "City: " + resultFromServer.name;
  //
  humidityElement.innerHTML =
    "Humidity Levels: " + resultFromServer.main.humidity + "%";
}

document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) searchWeather(searchTerm);
});

// UV Index
// function searchWeather(searchTerm) {
//     getSearchMethod(searchTerm);
//     fetch(
//         `http://api.openweathermap.org/data/2.5/uvi?appid={APIKey}&lat={searchMethod}&lon={SearchMethod}`
