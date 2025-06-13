const apiKey = 'e53c27687c7d4ce7b4c42406251306';
const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherDataDiv = document.getElementById('weather-data');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error(error);
        alert('Failed to fetch weather data');
    }
}

function displayWeatherData(data) {
    const weatherHtml = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Feels like: ${data.current.feelslike_c}°C</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Weather: ${data.current.condition.text}</p>
        <p>Air Quality Index: ${data.current.air_quality['us-epa-index']}</p>
    `;
    weatherDataDiv.innerHTML = weatherHtml;
}