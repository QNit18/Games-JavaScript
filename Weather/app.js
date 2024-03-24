const API_KEY = "511acf48846980420ad68ac0b694e6bd";
const DEFAULT_VALUE = '--';

const searchInput = document.querySelector("#search-input");
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');

const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');

searchInput.addEventListener("change", (e) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&APPID=${API_KEY}&units=metric&lang=vi`
    ).then(async (res) => {
        const data = await res.json();
        console.log("ResData", data);
        cityName.innerHTML = data.name || DEFAULT_VALUE;

        const description = data.weather[0].description; // Viết hoa chữ đầu
        weatherState.innerHTML = (description.charAt(0).toUpperCase() + description.slice(1)) || DEFAULT_VALUE;

        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` || DEFAULT_VALUE;
        temperature.innerHTML = Math.floor(data.main.temp) || DEFAULT_VALUE;

        sunrise.innerHTML = convertTimestampToTime(data.sys.sunrise) || DEFAULT_VALUE;
        sunset.innerHTML = convertTimestampToTime(data.sys.sunset) || DEFAULT_VALUE;

        humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
        windSpeed.innerHTML = data.wind.speed || DEFAULT_VALUE;
    }); 
});


function convertTimestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
}