"strict";

const LINK_IDS = ["dashboard", "about", "projects", "contact"];
const CONTENT_WRAPPER_IDS = ["dashboard", "about", "projects", "contact"];
const CSS_THEME_VARIABLES = {
  "--color-primary": "primary",
  "--color-secondary": "secondary",
  "--color-background": "background",
  "--color-surface": "surface",
  "--color-success": "success",
  "--color-error": "error",
  "--color-on-primary": "colorOnPrimary",
  "--color-on-secondary": "colorOnSecondary",
  "--color-on-background": "colorOnBackground",
  "--color-on-surface": "colorOnSurface",
  "--color-on-error": "colorOnError",
  "--color-border": "border",
};
const THEMES = {
  theme1: {
    primary: "#2a58ad",
    secondary: "#808bbf",
    background: "#fff",
    surface: "#e9efff",
    success: "#008a63",
    error: "#a62e46",
    colorOnPrimary: "#e9efff",
    colorOnSecondary: "#e9efff",
    colorOnBackground: "#000",
    colorOnSurface: "#000",
    colorOnError: "#e9efff",
    border: "#cccccc",
  },
  theme4: {
    primary: "#2A2A2A",
    secondary: "#575757",
    background: "#F2ECFF",
    surface: "#F2ECFF",
    success: "#00C896",
    error: "#DB8472",
    colorOnPrimary: "#F2ECFF",
    colorOnSecondary: "#F2ECFF",
    colorOnBackground: "#2A2A2A",
    colorOnSurface: "#2A2A2A",
    colorOnError: "#F2ECFF",
    border: "#cccccc",
  },
};

let interval;
const onSideNavbarLinkClick = function (event, selectedLinkId) {
  // get prev active element
  const prevActiveLink = document.querySelector(".side-navbar-link__active");
  const prevActiveLinkId = prevActiveLink.dataset.id;
  if (prevActiveLinkId === selectedLinkId) return;

  // Remove active class from prev element
  prevActiveLink.classList.remove("side-navbar-link__active");
  // Add active class to new element
  event.currentTarget.classList.add("side-navbar-link__active");

  const prevActiveContentWrapper = document.getElementById(prevActiveLinkId);
  const newActiveContentWrapper = document.getElementById(selectedLinkId);

  prevActiveContentWrapper.classList.add("display-none");
  newActiveContentWrapper.classList.remove("display-none");
};

const themePalleteClickHandler = function (event, selectedPalleteKey) {
  const selectedPallete = event.currentTarget;
  const prevActivePallete = document.querySelector(".theme-pallete__active");

  prevActivePallete.classList.remove("theme-pallete__active");
  selectedPallete.classList.add("theme-pallete__active");
  changeTheme(selectedPalleteKey);
};

const changeTheme = function (themeKey) {
  const root = document.documentElement;
  Object.keys(CSS_THEME_VARIABLES).forEach(function (css_variable) {
    root.style.setProperty(
      css_variable,
      THEMES[themeKey][CSS_THEME_VARIABLES[css_variable]]
    );
  });
};

const initApp = function () {
  const date = new Date();
  const links = document.querySelectorAll(".side-navbar-link");
  const themePalleteContainer = document.querySelector(
    ".theme-pallete-container"
  );
  const timeContainer = document.querySelector(".time");

  links.forEach(function (link, index) {
    //   add id to each link
    const linkId = LINK_IDS[index];
    link.dataset.id = linkId;
    link.addEventListener("click", (e) => onSideNavbarLinkClick(e, linkId));
  });

  Object.keys(THEMES).forEach(function (key, index) {
    const child = document.createElement("div");
    child.style["background-color"] = THEMES[key].primary;
    child.classList.add("theme-pallete");
    if (index === 0) child.classList.add("theme-pallete__active");
    child.setAttribute("id", key);
    child.addEventListener("click", (event) =>
      themePalleteClickHandler(event, key)
    );
    themePalleteContainer.appendChild(child);
  });

  timeContainer.innerHTML = date.toLocaleTimeString();
  interval = setInterval(() => {
    timeContainer.innerHTML = new Date().toLocaleTimeString();
  }, 1000);
};

const onWindowLoad = function () {
  const loader = document.querySelector(".loader-container");
  const appContainer = document.querySelector(".app-container");

  setTimeout(() => {
    loader.classList.add("display-none");
    appContainer.classList.remove("display-none");
    initApp();
  }, 1300);
};

const onWindowUnload = function () {
  clearInterval(interval);
};

window.addEventListener("load", onWindowLoad);
window.addEventListener("beforeunload", onWindowUnload);
