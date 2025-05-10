// OpenWeather API key
const apiKey = "4e65f611db578fa6c309da89c6981f0a"; // Get an API key from https://openweathermap.org/api

const searchButton = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const errorMessage = document.getElementById("error-message");

searchButton.addEventListener("click", () => {
    const cityName = cityInput.value.trim();
    if (cityName !== "") {
        fetchWeather(cityName);
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            displayError("City not found. Please try again.");
        } else {
            displayWeather(data);
        }
    } catch (error) {
        displayError("Failed to fetch weather data. Please try again later.");
    }
}

function displayWeather(data) {
    const { name, sys, weather, main, wind } = data;

    weatherInfo.innerHTML = `
        <div class="location">${name}, ${sys.country}</div>
        <div class="temperature">${main.temp}°C</div>
        <div class="description">${weather[0].description}</div>
        <div class="humidity">Humidity: ${main.humidity}%</div>
        <div class="wind">Wind Speed: ${wind.speed} m/s</div>
    `;

    errorMessage.innerHTML = "";
}

function displayError(message) {
    weatherInfo.innerHTML = "";
    errorMessage.innerHTML = message;
}
