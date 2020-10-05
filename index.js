

  function formatDate(timestamp) {
    let now = new Date(timestamp);
    let weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = weekday[now.getDay()];
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
    let month = months[now.getMonth()];
    let date = now.getDate();
    let year = now.getFullYear();
    return `${day}, ${month} ${date}, ${year}`
  }

let now = new Date();
let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }  
  let meridiem = "AM";
  if (hour >= 12) {
    hour = hour - 12;
    meridiem = "PM";
  }
  if (hour === 0) {
    hour = 12
  }

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minute} ${meridiem}`;


function formatHours(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  
  return `${hour}:${minute}`
}



function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 5; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
            <div class="col">
              <h5>${formatHours(forecast.dt * 1000)}</h5>
              <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
              <p><b>${Math.round(forecast.main.temp_max)}º</b> ${Math.round(forecast.main.temp_min)}º</p>
            </div>`;
  }
}

function searchCity(city) {
  let apiKey = "3291fd98f9e2ab9b353e8258b9d85af7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather).catch(errorFunction);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function errorFunction(error) {
  alert ("Please enter a valid city. 🌎")
}

function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

function currentLocation(position) {
  //console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "766c14bb86493bee61d8edc39d383fca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

navigator.geolocation.getCurrentPosition(currentLocation);

function displayWeather(response) {
  document.querySelector("h1").innerHTML = `${response.data.name}`;
  document.querySelector("#current-temp").innerHTML = `${Math.round(response.data.main.temp)}º`;
  document.querySelector("#humidity").innerHTML = `Humidty: ${response.data.main.humidity}%`;
  document.querySelector("#condition").innerHTML = `${response.data.weather[0].description}`;
  document.querySelector("#windspeed").innerHTML = `Wind Speed: ${response.data.wind.speed} m/s`;
  document.querySelector("#current-date").innerHTML = formatDate(response.data.dt *1000);
  
  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let pinpointButton = document.querySelector("#pinpoint");
pinpointButton.addEventListener("onclick", currentLocation);

let searchButton = document.querySelector("#search-engine");
searchButton.addEventListener("submit", submitSearch);


function displayCelsiusTemp(response) {
  celsiusTemperature.classList.add("active");
  fahrenheitTemperature.classList.remove("active");
  document.querySelector("#current-temp").innerHTML = `${Math.round(response.data.main.temp)}º`;
  document.querySelector("#humidity").innerHTML = `Humidty: ${response.data.main.humidity}%`;
  document.querySelector("#windspeed").innerHTML = `Wind Speed: ${response.data.wind.speed} m/s`;

}

function displayFahrenheitTemp(response) {
  celsiusTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
  document.querySelector("#current-temp").innerHTML = `${Math.round(response.data.main.temp)}º`;
  document.querySelector("#humidity").innerHTML = `Humidty: ${response.data.main.humidity}%`;
  document.querySelector("#windspeed").innerHTML = `Wind Speed: ${response.data.wind.speed} m/h`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let city = h1.innerHTML
  let apiKey = "3291fd98f9e2ab9b353e8258b9d85af7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCelsiusTemp);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let city = h1.innerHTML
  let apiKey = "3291fd98f9e2ab9b353e8258b9d85af7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayFahrenheitTemp);
}


let celsiusTemperature = document.querySelector("#celsius");
celsiusTemperature.addEventListener("click", convertToCelsius);

let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", convertToFahrenheit);


searchCity("Los Angeles");