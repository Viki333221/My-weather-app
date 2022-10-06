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

  }
  currentCity = "Miami"
  let apiKey = "930a3a9d32117e6afd045c48755b3db9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentWeather);
