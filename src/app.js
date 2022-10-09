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

  function showForecast() {
    let forecastHTML = `<div class="row">`;
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    days.forEach(function (day) {
    forecastHTML = forecastHTML + `
                        <div class="col-2">
                            <div class="forecast-day">
                                ${day}
                            </div>
                            <img src="src/cloudy.jpg" width="30" />
                            <div class="forecast-temperature">
                                <span class="temperature-max">
                                    89
                                </span>
                                <span class="temperature-min">
                                    80
                                </span>
                            </div>
                        </div>
                    `;
    })
    forecastHTML = forecastHTML  + `</div>`

document.querySelector("#forecast").innerHTML = forecastHTML;

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
    document.querySelector("#fahrenheit").classList.add("active")
    document.querySelector("#celsius").classList.remove("active")

  }


  search("Miami")


  document.querySelector("#search-form").addEventListener("submit", searchCity)

  document.querySelector("#celsius").addEventListener("click", temperatureCelsius)
  document.querySelector("#fahrenheit").addEventListener("click", temperatureFahrenheit)


  showForecast();
