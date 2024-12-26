// Today VAriables
let todayName = document.querySelector('.today-date-day-name');
let todayNumber = document.querySelector('.today-date-day-number');
let todayMonth = document.querySelector('.today-date-day-month');
let todayLocation = document.querySelector('.today-location');
let todayTemp = document.querySelector('.today-temp');
let todayImg = document.querySelector('.today-img');
let todayConditionText = document.getElementById('today-condition-text');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let windDirection = document.querySelector('.wind-direction');
// Next Day
let nextDayName = document.getElementsByClassName('next-day-name');
let nextDayImg = document.getElementsByClassName('next-condition-img');
let nextDayMaxTemp = document.getElementsByClassName('next-max-temp');
let nextDayMinTemp = document.getElementsByClassName('next-min-temp');
let nextDayCondText = document.getElementsByClassName('next-condition-text');
// Search Input
let searchInput = document.getElementById('searchInput');
// Fetch Api Data
async function getWeatherData(cityName) {
    let weatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2ab7dd30b3dc4ffda7a132110242311&q=${cityName}&days=3`);
    let weatherResponse = await weatherData.json();
    return weatherResponse;
}
// Display Today's Data
function displayTodayWeather(data) {
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString('en-us', { weekday: "long" })
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString('en-us', { month: "long" })
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c + "<sup>O</sup>" + "C";
    todayImg.setAttribute('src', data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_kph + "Km/h";
    windDirection.innerHTML = data.current.wind_dir;
}
// display Next Days Data
function displayNextDaysData(data) {
    let forecastData = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastData[i + 1].date)
        nextDayName[i].innerHTML = nextDate.toLocaleDateString('en-us', { weekday: "long" })
        nextDayImg[i].setAttribute('src', forecastData[i + 1].day.condition.icon);
        nextDayMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c + "<sup>O</sup>" + "C";
        nextDayMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c + "<sup>O</sup>";
        nextDayCondText[i].innerHTML = forecastData[i + 1].day.condition.text;
    }
}
// Start App
async function startApp(city = 'cairo') {
    let weatherData = await getWeatherData(city);
    if (!weatherData.error) {
        displayTodayWeather(weatherData);
        displayNextDaysData(weatherData);
    }
};
startApp()
searchInput.addEventListener('input', function () {
    startApp(searchInput.value)
});