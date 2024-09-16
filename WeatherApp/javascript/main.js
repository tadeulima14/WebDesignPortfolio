const apiKey = '628334ae830de6763bbdd646a69b7964';
let cityName = 'chicago';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
const searchBtn = document.querySelector('.searchbar button');
const initialDefaultImagePath = 'images/default.png';
document.querySelector('.weather-icon').setAttribute('src', initialDefaultImagePath);

async function fetchWeatherData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    cityTime = data.dt; 
    updateWeatherData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
window.addEventListener('load', fetchWeatherData);


// Event listener for the search button
if (searchBtn) {
  searchBtn.addEventListener('click', function () {
    searchCity();
  });
}

// Function to search for a city
function searchCity() {
  const userInput = document.getElementById('cityInput').value;
  if (userInput.trim() !== '') {
    cityName = userInput;
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetchWeatherData();
  }
}

function formatTime(timestamp, timezoneOffset) {
    const localTimestamp = timestamp + timezoneOffset;
    const localDate = new Date(localTimestamp * 1000);
    const isoTimeString = localDate.toISOString();
  
    // Extract the time part from the ISO string 
    const isoTime = isoTimeString.slice(11, 16);
  
    return isoTime;
  }


// Function to update weather data on the page. locates html classes, links to JSON
function updateWeatherData(data) {
  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°F';
  document.querySelector('.humidity').innerHTML = data.main.humidity + ' %';
  document.querySelector('.wind').innerHTML = data.wind.speed + ' Kts/hr';
  let timezoneOffset = data.timezone;
  document.querySelector('.time').innerHTML = formatTime(data.dt, timezoneOffset);
  document.querySelector('.weather-icon').innerHTML = data.weather.main;

  const weatherMain = data.weather[0].main;
  updateImage(weatherMain);

}

async function fetchWeatherData() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      cityTime = data.dt; 
      updateWeatherData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

function updateImage(weatherMain) {
    const formattedWeatherMain = weatherMain.toLowerCase().replace(/\s/g, '-');
    let imagePath;

    if (weatherMain === 'Rain') {
      imagePath = 'images/rain.png';
    } else if (weatherMain === 'Clear') {
      imagePath = 'images/clear.png';
    } else if (weatherMain === 'Clouds') {
      imagePath = 'images/clouds.png';
    } else if (weatherMain =='Snow') {
        imagePath = 'images/snow.png';
    } else if (weatherMain =='Mist') {
        imagePath = 'images/mist.png';
    } else if (weatherMain =='Fog') {
        imagePath = 'images/fog.png';
    } else if (weatherMain =='Haze') {
        imagePath = 'images/haze.png';
    }

    else {
      // Default image if no matching weather statement  
      imagePath = 'images/placeholder.png';
    }
  
    document.querySelector('.weather-icon').setAttribute('src', imagePath);
}


