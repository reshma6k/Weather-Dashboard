const apiKey = 'befd984de4d3c050671d4eb935e6c660'

async function getWeather() {
    const city = document.getElementById('city').value
    const weatherInfo = document.getElementById('weather-info')
    const errorMessage = document.getElementById('error-message')
    const spinner = document.getElementById('spinner')

    weatherInfo.style.display = 'none'
    errorMessage.style.display = 'none'
    spinner.style.display = 'block'

    if (!city) {
        errorMessage.style.display = 'block'
        errorMessage.textContent = 'Please enter a city name.'
        spinner.style.display = 'none'
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data')
        }

        const data = await response.json()

        if (data.cod !== 200) {
            throw new Error('City not found or invalid API response')
        }

        const temperature = data.main.temp
        const description = data.weather[0].description
        const humidity = data.main.humidity
        const windSpeed = data.wind.speed
        const iconCode = data.weather[0].icon
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`

        console.log(`Temperature: ${temperature}, Description: ${description}, Humidity: ${humidity}, Wind Speed: ${windSpeed}`)

        document.getElementById('city-name').textContent = `Weather in ${data.name}, ${data.sys.country}`
        document.getElementById('temperature').textContent = `Temperature: ${temperature} °C`
        document.getElementById('weather').textContent = `Weather: ${description}`
        document.getElementById('humidity').textContent = `Humidity: ${humidity}%`
        document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} m/s`
        document.getElementById('weather-icon').innerHTML = `<img src="${iconUrl}" alt="Weather Icon" />`

        changeWeatherInfoBackgroundColor(temperature)

        spinner.style.display = 'none'
        weatherInfo.style.display = 'grid'

    } catch (error) {
        console.error(error)
        spinner.style.display = 'none'
        errorMessage.style.display = 'block'
        errorMessage.textContent = `Error: ${error.message}`
    }
}

function changeWeatherInfoBackgroundColor(temperature) {
    const weatherIcon = document.getElementById('weather-icon')

    if (temperature < 0) {
        weatherIcon.style.backgroundColor = 'rgb(0, 95, 255)'
        weatherIcon.style.color = 'white'
    } else if (temperature >= 0 && temperature <= 20) {
        weatherIcon.style.backgroundColor = 'rgb(255, 245, 138)'
        weatherIcon.style.color = 'black'
    } else if (temperature > 20 && temperature <= 30) {
        weatherIcon.style.backgroundColor = 'rgb(255, 165, 0)' 
        weatherIcon.style.color = 'white'
        weatherIcon.style.backgroundColor = 'rgb(255, 0, 0)'
        weatherIcon.style.color = 'white'
    }
}
