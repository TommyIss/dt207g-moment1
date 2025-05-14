"use strict";

// Variablar
let openBtnEl = document.getElementById("open-menu");
let closeBtnEl = document.getElementById("close-menu");
let navEl = document.getElementById("nav-menu");

// Eventlyssnare
openBtnEl.addEventListener("click", toggleMenu);
closeBtnEl.addEventListener("click", toggleMenu);

// Funktion för att öppna och stänga meny i mindre skärm
function toggleMenu() {
    let style = getComputedStyle(navEl);

    if(style.display === "none") {
        navEl.style.display = "block";
    } else {
        navEl.style.display = "none";
    }
}