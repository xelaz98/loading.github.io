document.addEventListener("DOMContentLoaded", function () {
    // Simulate loading delay
    setTimeout(function () {
        document.querySelector(".loader").classList.add("hidden");
        document.getElementById("content").classList.remove("hidden");
    }, 3000); // Adjust the timeout as needed
});

// NASA API
const count = 5;
const apiKey = "DEMO_KEY"; // Replace with your actual NASA API key
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

// Sample functions (update with your actual logic)
function updateDOM(section) {
    console.log(`Updating DOM for ${section}`);
}

async function getNasaPictures() {
    console.log("Fetching NASA pictures...");
    // Show Loader
    document.querySelector(".loader").classList.remove("hidden");
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        resultsArray = await response.json();
        updateDOM("results");
        document.querySelector(".loader").classList.add("hidden");
    } catch (error) {
        console.error("Error fetching NASA pictures:", error);
        // Optionally handle errors or display a message to the user
        document.querySelector(".loader").classList.add("hidden");
    }
}

function saveFavorite(itemUrl) {
    // Loop through Results Array to select favorite
    resultsArray.forEach((item) => {
        if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
            favorites[itemUrl] = item;
            // Show Save Confirmation for 2 Seconds
            document.querySelector(".save-confirmed").classList.add("show");
            setTimeout(() => {
                document.querySelector(".save-confirmed").classList.remove("show");
            }, 2000);
            // Set Favorites in localStorage
            localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
        }
    });
}

function removeFavorite(itemUrl) {
    if (favorites[itemUrl]) {
        delete favorites[itemUrl];
        // Set Favorites in localStorage
        localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
    updateDOM("favorites");
}
