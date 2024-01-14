document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');

    searchBtn.addEventListener('click', () => {
        const cityName = cityInput.value;
        if (cityName) {
            getWeather(cityName);
        }
    });

    async function getWeather(city) {
        const apiKey = 'd282571144d2894bf69e4bdf638c0cfc';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                displayWeather(data);
            } else {
                showError(data.message);
            }
        } catch (error) {
            showError('An error occurred while fetching data.');
        }
    }

    function displayWeather(data) {
        const { name, main, weather } = data;

        const weatherHtml = `
            <p>City: ${name}</p>
            <p>Temperature: ${main.temp} °C</p>
            <p>Weather: ${weather[0].description}</p>
            <img src="http://openweathermap.org/img/w/${weather[0].icon}.png" alt="Weather Icon">
        `;

        weatherInfo.innerHTML = weatherHtml;
    }

    function showError(message) {
        weatherInfo.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
    }
});
