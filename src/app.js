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
weatherDescription = response.data.weather[0].main
temperatureInFahrenheit = response.data.main.temp;
temperatureFeelsFahrenheit = response.data.main.feels_like;
temperatureMaxFahrenheit = response.data.main.temp_max;
temperatureMinFahrenheit = response.data.main.temp_min;



function changeBackgroundImage() {
    if (weatherDescription === "Clear") {
      document.querySelector("#weatherApp").style.backgroundImage = `url("https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618__480.jpg")`;
    } else if (weatherDescription === "Clouds") {
      document.querySelector("#weatherApp").style.backgroundImage = `url("https://img.freepik.com/premium-photo/vivid-blue-sky-with-white-scattered-clouds_76000-7220.jpg?w=2000")`;
    } else if (weatherDescription === "Rain") {
      document.querySelector("#weatherApp").style.backgroundImage = `url("https://us.123rf.com/450wm/lonely11/lonely111207/lonely11120700003/14296128-background-with-rain-and-waves-on-the-drops.jpg?ver=6")`;
    } else if (weatherDescription === "Thunderstorm") {
      document.querySelector("#weatherApp").style.backgroundImage = `url("https://1471793142.rsc.cdn77.org/data/images/full/61209/thunderstorm.jpg")`;
    } else if (weatherDescription === "Snow") {
      document.querySelector("#weatherApp").style.backgroundImage = `url("https://cdn.wallpapersafari.com/23/47/Tp9dWj.jpg")`;
    } else if (weatherDescription === "Mist" || "Smoke" || "Haze" || "Dust" || "Fog" || "Sand" || "Ash" || "Tornado" || "Squall") {
      document.querySelector("#weatherApp").style.backgroundImage = `url("https://media.istockphoto.com/photos/foggy-rural-asphalt-highway-perspective-with-white-line-misty-road-picture-id1055906130?b=1&k=20&m=1055906130&s=170667a&w=0&h=vipk_c3obeBTG0bBLXtz-wJIJHc_e9JHlnRwYsbvOmc=")`;
    } else if (weatherDescription === "Dizzle") {
      document.querySelector("#weatherApp").style.backgroundImage = `url("https://png.pngtree.com/thumb_back/fh260/background/20210903/pngtree-rainy-weather-image_795021.jpg")`;
    } else {
      document.querySelector("#weatherApp").style.backgroundImage = `url("https://t4.ftcdn.net/jpg/03/11/38/67/360_F_311386731_Zl4dMbUUlQwRI91V8WlXNSKn2mzuY8yx.jpg")`}
}
changeBackgroundImage();


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


