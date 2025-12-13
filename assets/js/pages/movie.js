import { getMovieById } from '../ombd.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const titleEl = document.getElementById('movie-title');
const posterEl = document.getElementById('movie-poster');
const plotEl = document.getElementById('movie-plot');
const genreEl = document.getElementById('movie-genre');
const actorsEl = document.getElementById('movie-actors');
const ratingsEl = document.getElementById('movie-ratings');
const dvdDateEl = document.getElementById('movie-dvd-date');

if (!id) {
    titleEl.textContent = 'Aucun film sélectionné';
} else {
    loadMovie();
}

async function loadMovie() {
    try {
        const movie = await getMovieById(id);

        titleEl.textContent = movie.Title;

        if (movie.Poster && movie.Poster !== 'N/A') {
            posterEl.src = movie.Poster;
            posterEl.alt = movie.Title;
        } else {
            posterEl.style.display = 'none';
        }

        plotEl.textContent = movie.Plot;

        genreEl.textContent = movie.Genre;
        actorsEl.textContent = movie.Actors;

        if (movie.Ratings && movie.Ratings.length > 0) {
            ratingsEl.textContent =
                'Notes : ' + movie.Ratings.map(r => `${r.Source}: ${r.Value}`).join(' | ');
        }

        if (movie.DVD && movie.DVD !== 'N/A') {
            const date = new Date(movie.DVD);
            const formatted = date.toLocaleDateString('fr-FR'); // jj/mm/aaaa
            dvdDateEl.textContent = `Sortie DVD : ${formatted}`;
        }
    } catch (e) {
        titleEl.textContent = 'Film introuvable';
    }
}
