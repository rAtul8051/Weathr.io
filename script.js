// Correctly selecting elements from the HTML
const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed'); // Fixed selection

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

// Async function to fetch weather data
async function checkWeather(city) {
    const api_key = "cf55a751a40fde91ca701294f4b52b7d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`; // Corrected URL and units

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        // Check if city is not found
        if (weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.error("Location not found");
            return;
        }

        // If location found, display weather data
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        // Display temperature and description
        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`; // Converted to Celsius
        description.innerHTML = `${weather_data.weather[0].description}`;

        // Display humidity and wind speed
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${Math.round(weather_data.wind.speed)} Km/H`;

        // Display appropriate weather image based on the weather condition
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "/assets/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "/assets/clear.png";
                break;
            case 'Rain':
                weather_img.src = "/assets/rain.png";
                break;
            case 'Mist':
                weather_img.src = "/assets/mist.png";
                break;
            case 'Snow':
                weather_img.src = "/assets/snow.png";
                break;
            default:
                weather_img.src = "/assets/default.png"; // Set a default image if none match
                break;
        }

        console.log(weather_data); // Log weather data to console
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Add click event to the search button
searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim(); // Trim any extra spaces
    if (city !== "") {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});
