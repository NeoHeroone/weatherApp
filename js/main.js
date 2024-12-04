document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const lightDarkButton = document.querySelector(".light-Dark");
  const lightModeIcon = document.querySelector(".dark-Light");
  const lightDarkName = document.querySelector(".dark_light");

  const locationButton = document.querySelector("button");
  const cityNameElement = document.querySelector(".countryName");
  const temperatureElement = document.querySelector(".temp");
  const feelsLikeElement = document.querySelector(".feelsLike");
  const weatherAboutElement = document.querySelector(".weather-about");
  const forecastElement = document.querySelector(".forecast");

  const apiKey = "eb421d2b8ca24b9f8e160551240212";

  const searchButton = document.querySelector("#searchButton");
  const cityInput = document.querySelector("#cityInput");

  searchButton.addEventListener("click", () => {
    const cityName = cityInput.value.trim();

    if (cityName) {
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=6&aqi=no`)
        .then(response => response.json())
        .then(data => {
          const current = data.current;
          const forecast = data.forecast.forecastday;

          cityNameElement.textContent = data.location.name;
          temperatureElement.textContent = `${current.temp_c}°C`;
          feelsLikeElement.innerHTML = `Feels like: <span>${current.feelslike_c}°C</span>`;
          weatherAboutElement.textContent = current.condition.text;

          let forecastHTML = "";
          forecast.forEach(day => {
            forecastHTML += `
              <div>
                <strong>${day.date}</strong><br>
                Temp: ${day.day.avgtemp_c}°C | 
                Havo namligi: ${day.day.avghumidity}% | 
                Tezlik: ${day.day.maxwind_kph} km/h
              </div><br>
            `;
          });
          forecastElement.innerHTML = forecastHTML;
        })
        .catch(error => {
          console.error("Ob-havo ma'lumotlari olishda xato:", error);
          alert("Ob-havo ma'lumotlarini olishda xato!");
        });
    } else {
      alert("Iltimos, shahar nomini kiriting!");
    }
  });

  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`
        )
          .then((response) => response.json())
          .then((data) => {
            const cityName = data.location.name;
            const temp = data.current.temp_c;
            const feelsLike = data.current.feelslike_c;
            const weatherDescription = data.current.condition.text;

            cityNameElement.textContent = cityName;
            temperatureElement.textContent = `${temp}°C`;
            feelsLikeElement.innerHTML = `Feels like: <span>${feelsLike}°C</span>`;
            weatherAboutElement.textContent = weatherDescription;
          })
          .catch((error) => {
            console.error("Ob-havo ma'lumotlari olishda xato:", error);
          });
      });
    } else {
      alert("Geolocation API brauzeringizda mavjud emas.");
    }
  });

  const displayN = document.querySelectorAll(".displayN");
  const displayB = document.querySelectorAll(".displayB");

  const currentMode = localStorage.getItem("themeMode") || "light";

  const updateDisplay = (displayElements, displayStyle) => {
    displayElements.forEach((element) => {
      element.style.display = displayStyle;
    });
  };

  if (currentMode === "dark") {
    body.classList.add("light-mode");
    lightModeIcon.classList.add("dark");
    lightDarkName.textContent = "Light Mode";

    updateDisplay(displayB, "block");
    updateDisplay(displayN, "none");
  } else {
    body.classList.remove("light-mode");
    lightModeIcon.classList.remove("dark");
    lightDarkName.textContent = "Dark Mode";

    updateDisplay(displayN, "block");
    updateDisplay(displayB, "none");
  }

  lightDarkButton.addEventListener("click", () => {
    const isLight = body.classList.toggle("light-mode");
    if (isLight) {
      lightModeIcon.classList.add("dark");
      lightDarkName.textContent = "Light Mode";
      lightDarkName.style.color = "black";
      localStorage.setItem("themeMode", "light");
      lightDarkButton.style.border = "1px solid black";

      updateDisplay(displayB, "block");
      updateDisplay(displayN, "none");
    } else {
      lightModeIcon.classList.remove("dark");
      lightDarkName.textContent = "Dark Mode";
      localStorage.setItem("themeMode", "dark");
      lightDarkName.style.color = "white";
      lightDarkButton.style.border = "1px solid transparent";

      updateDisplay(displayN, "block");
      updateDisplay(displayB, "none");
    }
  });
});