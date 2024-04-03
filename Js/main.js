//today data
var todayName = document.getElementById('today-date-day-name');
var todayNumber = document.getElementById('today-date-day-number');
var todayMonth = document.getElementById('today-date-day-month');
var todayLocation = document.getElementById('today-location');
var todayTemp = document.getElementById('today-temp');
var todayConditionImg = document.getElementById('img');
var todayConditionText = document.getElementById('today-condition-text');
var humidity = document.getElementById('humidity');
var wind = document.getElementById('wind');
var windDirection = document.getElementById('wind-direction');
// next data
var nextDay = document.getElementsByClassName('next-day-name');
var nextMaxTemp = document.getElementsByClassName('next-max-temp');
var nextMinTemp = document.getElementsByClassName('next-min-temp');
var nextConditionImg = document.getElementsByClassName('next-condition-img');
var nextConditionText = document.getElementsByClassName('next-condition-text');
//search input
var searchInput = document.getElementById('search');

async function getWeatherData(cityName) {

    var weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c1f64b05505c43b2b74120636230912&q=${cityName}&days=3`);
    var weatherData = await weatherResponse.json();
    return weatherData
}
function displayTodayData(data) {
    var todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString('en-us', { weekday: "long" });
    todayMonth.innerHTML = todayDate.toLocaleDateString('en-us', { month: "long" });
    todayNumber.innerHTML = todayDate.getDate();
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src", data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_kph;
    windDirection.innerHTML = data.current.wind_dir;
}

function displayNextDay(data) {
    var forecastdata = data.forecast.forecastday;
    for (var i = 0; i < 2; i++) {
        var nextDate = new Date(forecastdata[i + 1].date);
        nextDay[i].innerHTML = nextDate.toLocaleDateString('en-us', { weekday: "long" })
        nextMaxTemp[i].innerHTML = forecastdata[i + 1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forecastdata[i + 1].day.mintemp_c;
        nextConditionText[i].innerHTML = forecastdata[i + 1].day.condition.text;
        nextConditionImg[i].setAttribute("src", forecastdata[i + 1].day.condition.icon)
    }
}
async function startApp(city = "london") {
    var weatherData = await getWeatherData(city)
    if (!weatherData.error) {

        displayTodayData(weatherData)
        displayNextDay(weatherData)
    }
}
startApp()
searchInput.addEventListener("input", function () {
    startApp(searchInput.value)
})