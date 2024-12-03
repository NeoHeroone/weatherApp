document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const lightDarkBox = document.querySelector(".lightDark-box");
  const lightDarkButton = document.querySelector(".light-Dark");
  const lightModeIcon = document.querySelector(".dark-Light");
  const lightDarkName = document.querySelector(".dark_light");

  console.log(window.localStorage.getItem("themeMode"));

  if (!lightDarkButton) {
    console.error("lightDarkButton topilmadi!");
  }

  const currentMode = window.localStorage.getItem("themeMode") || "light";
  if (currentMode === "dark") {
    body.classList.add("light-mode");
    lightModeIcon.classList.add("dark");
    lightModeIcon.classList.remove("dark-light");
    lightDarkName.textContent = "Light Mode";
  } else {
    body.classList.remove("light-mode");
    lightModeIcon.classList.remove("dark");
    lightModeIcon.classList.add("dark-light");
    lightDarkName.textContent = "Dark Mode";
  }

  lightDarkButton.addEventListener("click", () => {
    const currentMode = window.localStorage.getItem("themeMode");
    if (currentMode === "light") {
      body.classList.add("light-mode");
      lightModeIcon.classList.add("dark");
      lightModeIcon.classList.remove("dark-light");
      lightDarkName.textContent = "Light Mode";
      window.localStorage.setItem("themeMode", "dark");
    } else {
      body.classList.remove("light-mode");
      lightModeIcon.classList.remove("dark");
      lightModeIcon.classList.add("dark-light");
      lightDarkName.textContent = "Dark Mode";
      window.localStorage.setItem("themeMode", "light");
    }
  });
});
