import {searchMovies} from '../ombd.js';


const input = document.getElementById('search-input');
const resultsDiv = document.getElementById('search-results');
const moreBtn = document.getElementById('search-more');

let currentQuery = '';
let currentPage = 1;
let totalResults = 0;
let isLoading = false;

function clearResults() {
    resultsDiv.innerHTML = '';
    totalResults = 0;
    currentPage = 1;
    moreBtn.style.display = 'none';
}

async function performSearch(reset = false) {
    if (!currentQuery.trim()) {
        clearResults();
        return;
    }

    if (isLoading) return;
    isLoading = true;

    if (reset) {
        clearResults();
    }

    const {movies, totalResults: total, error} = await searchMovies(currentQuery, currentPage);
    if (error) {
        resultsDiv.textContent = error;
        isLoading = false;
        return;
    }

    totalResults = total;

    movies.forEach(movie => {
        const link = document.createElement('a');
        link.href = `movie.html?id=${movie.imdbID}`;

        const img = document.createElement('img');
        img.src = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '';
        img.alt = movie.Title;
        img.className = 'movie-poster';

        const title = document.createElement('div');
        title.className = 'movie-title';
        title.textContent = `${movie.Title} (${movie.Year})`;

        link.appendChild(img);
        link.appendChild(title);
        resultsDiv.appendChild(link);
    });

    currentPage += 1;
    isLoading = false;

    const alreadyLoaded = (currentPage-1)*10;
    moreBtn.style.display = alreadyLoaded < totalResults ? 'inline-block' : 'none';
}

input.addEventListener('input', () => {
    currentQuery = input.value;
    performSearch(true);
});

moreBtn.addEventListener('click', () => {
    performSearch(false);
});
