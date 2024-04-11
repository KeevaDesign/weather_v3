document.addEventListener("DOMContentLoaded", function () {
  // Check if Geolocation is supported
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Fetch weather data using the user's current location
        fetch(`/.netlify/functions/fetch-weather?lat=${lat}&lon=${lon}`)
          .then((response) => response.json())
          .then((data) => {
            const curCity = document.getElementById("city");
            const curCountry = document.getElementById("countryCode");

            curCity.innerHTML = data[0].name;
            curCountry.innerHTML = data[0].country;
          })
          .catch((error) => console.error("Error:", error));
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        document.getElementById("weatherInfo").textContent =
          "Unable to access your location.";
      }
    );
  } else {
    // Geolocation is not supported by this browser
    document.getElementById("weatherInfo").textContent =
      "Geolocation is not supported by your browser.";
  }
});
