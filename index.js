// ===== File: index.js =====
// Movie Site frontend script
// What this file does:
// - Calls The Movie Database (TMDB) API to fetch movie data
// - Builds simple movie cards and inserts them into the page
// - Handles the search form to request matching movies

// ===== API Configuration =====
// Base URL for fetching popular movies from The Movie Database (TMDB)
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=dfa08391ba2ce1a4358d6ff2d8358cb9';

// Image URL path for movie poster images (resolution: 1280px width)
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

// Base URL for searching movies on TMDB (search query will be appended to this)
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=dfa08391ba2ce1a4358d6ff2d8358cb9&query=';

// ===== DOM Elements =====
// Cache references to DOM elements so we can update the page programmatically
// Main content area where movie rows/cards will be appended
const main = document.getElementById('section');

// Reference to the search form element for handling search submissions
const form = document.getElementById('form');

// Reference to the search input field where users type movie names
const search = document.getElementById('query');

// Fetch and display popular movies right after the script loads
// (This populates the page with default/popular movies.)
returnMovies(APILINK);

// ===== Functions =====
// Fetches movie data from the provided API URL and displays the results.
// url: string - the full API endpoint to request (search or discover endpoints)
function returnMovies(url) {
    // Send the HTTP request. `fetch` returns a Promise that resolves to a Response.
    fetch(url).then(res => res.json())
    .then(function(data) {
        // `data` is the parsed JSON object from the API.
        // The movies array is at `data.results`.
        console.log(data.results); // Useful while developing to inspect responses

        // Create a small DOM card for each movie returned by the API
        data.results.forEach(element => {
            // Create element containers used by the site's CSS layout
            const div_card = document.createElement('div'); 
            div_card.setAttribute('class', 'card');

            const div_column = document.createElement('div'); 
            div_column.setAttribute('class', 'column');

            const div_row = document.createElement('div'); 
            div_row.setAttribute('class', 'row');

            // Image and title elements for the movie
            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');

            const title = document.createElement('h3');
            title.setAttribute('id', 'title');
            
            const center = document.createElement('center');

            // Populate the elements with data from the API
            title.innerHTML = element.title; // movie title
            // poster_path is a partial path; combine with IMG_PATH to form the full URL
            image.src = IMG_PATH + element.poster_path;

            // Assemble the structure in the expected order
            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);

            // Insert the row into the main section so it becomes visible in the page
            main.appendChild(div_row);

        });
    });
}

// When the search form is submitted, prevent the browser from reloading the page
// and request search results from the API.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Remove any previously displayed results
    main.innerHTML = '';
    const searchTerm = search.value;
    if(searchTerm) {
        // Build the search request by appending the user's query to SEARCHAPI
        returnMovies(SEARCHAPI + searchTerm);
        // Clear the input after initiating the search
        search.value = '';
    }

    // Note: consider adding validation, trimming, and showing a "no results"
    // message in the UI for better user experience.
});