let now = new Date();
let months = ["Jan",
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
  "Dec"];
  let month = months[now.getMonth()];
  let dateToday = now.getDate();
  document.querySelector("#date").innerHTML = `${month} ${dateToday}`
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
  document.querySelector("#day").innerHTML = `${day}`;
  let hours = now.getHours();
  if (hours < 10) {
  hours = `0${hours}`
  };
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  };
  let time = `${hours}:${minutes}`
  document.querySelector("#time").innerHTML = `${time}`

  function formatDay (timestamp) {
    let date = new Date(timestamp * 1000)
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return days[day]

  }

  function showForecast(response) {
    let forecastData = response.data.daily
    let forecast = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecastData.forEach(function (forecastDay, index) {
        if (index < 6) {
    forecastHTML = forecastHTML + `
                        <div class="col-2">
                            <div class="forecast-day">
                                ${formatDay(forecastDay.dt)}
                            </div>
                            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="30" />
                            <div class="forecast-temperature">
                                <span class="temperature-max" id="forecastTempMax">
                                    ${Math.round(forecastDay.temp.max)}°
                                </span>
                                <span class="temperature-min" id="forecastTempMin">
                                    ${Math.round(forecastDay.temp.min)}°
                                </span>
                            </div>
                        </div>
                    `;
    
    forecastTempMin = forecastDay.temp.min
    forecastTempMax = forecastDay.temp.max
        }
    })
    forecastHTML = forecastHTML  + `</div>`;

forecast.innerHTML = forecastHTML;
  }

  function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(showForecast)
  }

  function currentWeather(response){
document.querySelector("h1").innerHTML = response.data.name;
document.querySelector("#weatherCondition").innerHTML = response.data.weather[0].main;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#temperatureFeels").innerHTML = Math.round(response.data.main.feels_like);
document.querySelector("#temperatureMin").innerHTML = Math.round(response.data.main.temp_min);
document.querySelector("#temperatureMax").innerHTML = Math.round(response.data.main.temp_max);
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
temperatureInFahrenheit = response.data.main.temp;
temperatureFeelsFahrenheit = response.data.main.feels_like;
temperatureMaxFahrenheit = response.data.main.temp_max;
temperatureMinFahrenheit = response.data.main.temp_min;

getForecast(response.data.coord)
  }
function search(city){
    let apiKey = "930a3a9d32117e6afd045c48755b3db9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(currentWeather);

}

  function searchCity(event) {
event.preventDefault();
search(document.querySelector("#city-input").value)
  }

  function temperatureCelsius(event) {
    event.preventDefault();
    document.querySelector("#temperature").innerHTML = Math.round((temperatureInFahrenheit - 32) * 5 / 9) 
    document.querySelector("#temperatureFeels").innerHTML = Math.round((temperatureFeelsFahrenheit - 32) * 5 / 9) 
    document.querySelector("#temperatureMax").innerHTML = Math.round((temperatureMaxFahrenheit - 32) * 5 / 9) 
    document.querySelector("#temperatureMin").innerHTML = Math.round((temperatureMinFahrenheit - 32) * 5 / 9) 
    document.querySelector("#forecastTempMin").innerHTML = Math.round((forecastTempMin - 32) * 5 / 9) 
    document.querySelector("#forecastTempMax").innerHTML = Math.round((forecastTempMax - 32) * 5 / 9) 
 
    document.querySelector("#fahrenheit").classList.remove("active")
    document.querySelector("#celsius").classList.add("active")
  }
let temperatureInFahrenheit = null

  function temperatureFahrenheit(event) {
    event.preventDefault();
    document.querySelector("#temperature").innerHTML = Math.round(temperatureInFahrenheit);
    document.querySelector("#temperatureFeels").innerHTML = Math.round(temperatureFeelsFahrenheit);
    document.querySelector("#temperatureMax").innerHTML = Math.round(temperatureMaxFahrenheit);
    document.querySelector("#temperatureMin").innerHTML = Math.round(temperatureMinFahrenheit);
    document.querySelector("#forecastTempMin").innerHTML = Math.round(forecastTempMin);
    document.querySelector("#forecastTempMax").innerHTML = Math.round(forecastTempMax);
    document.querySelector("#fahrenheit").classList.add("active")
    document.querySelector("#celsius").classList.remove("active")

  }


  search("Miami")


  document.querySelector("#search-form").addEventListener("submit", searchCity)

  document.querySelector("#celsius").addEventListener("click", temperatureCelsius)
  document.querySelector("#fahrenheit").addEventListener("click", temperatureFahrenheit)


