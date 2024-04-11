document.addEventListener("DOMContentLoaded", function () {
  // Check if Geolocation is supported
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Fetch weather data using the user's current location
        fetch(
          `/.netlify/functions/fetch-weather?lat=${lat}&lon=${lon}&mode=weather`
        )
          .then((response) => response.json())
          .then((data) => {
            var iconcode = data.weather[0].icon;
            var iconurl =
              "https://openweathermap.org/img/wn/" + iconcode + "@2x.png";

            // Current Temperature
            var curTemp = document.getElementById("temp");
            var curTemperature = data.main.temp;
            var roundedTemperature = Math.ceil(curTemperature);
            curTemp.innerHTML = `${roundedTemperature}°C`;

            const curTemp_feel = document.getElementById("temp_feel");
            const curCondition = document.getElementById("condition");
            const curHumidity = document.getElementById("humidity");
            const curWind = document.getElementById("wind");
            const maxTemp = document.getElementById("max-temp");
            const minTemp = document.getElementById("min-temp");
            // Display location and temperature (customize as needed)

            curTemp_feel.innerHTML = `${data.main.feels_like}°C`;
            curCondition.innerHTML = data.weather[0].main;
            document.getElementById("icon").innerHTML =
              "<img src='" + iconurl + "'>";
            curHumidity.innerHTML = `${data.main.humidity}%`;
            curWind.innerHTML = `${data.wind.speed} km/h`;
            maxTemp.innerHTML = `${data.main.temp_max}°C`;
            minTemp.innerHTML = `${data.main.temp_min}°C`;
          })
          .catch((error) => console.error("Error:", error));
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        document.getElementById("weatherInfo_2").textContent =
          "Unable to access your location.";
      }
    );
  } else {
    // Geolocation is not supported by this browser
    document.getElementById("weatherInfo_2").textContent =
      "Geolocation is not supported by your browser.";
  }
});

//UI for date

const today = new Date();

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "Jan",
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
  "Dec",
];
const year = today.getFullYear();

// getMonth returns month from 0 (January) to 11 (December), so add 1 to get the correct month
const month = months[today.getMonth()];

// getDate returns the day of the month
const date = today.getDate();

const dayName = days[today.getDay()];

// Pad the month and date with a leading zero if they are less than 10
// const formattedMonth = month < 10 ? "0" + month : month;
const formattedDate = date < 10 ? "0" + date : date;

// Combine the year, month, and date with hyphens
const formattedToday = `${formattedDate} ${month} ${year}`;

document.getElementById("today-date").innerHTML = formattedToday;
document.getElementById("day-name").innerHTML = dayName;
