import { getMovieByTitle, searchMovies } from '../ombd.js';

const postersContainer = document.getElementById('posters');
const loadMoreBtn = document.getElementById('load-more');

const TRENDING_TITLES = [
    'Guardians of the Galaxy',
    'Guardians of the Galaxy Vol. 2',
    'Guardians of the Galaxy Vol. 3',
    'Avengers: Endgame',
    'Inception',
    'The Matrix',
    'Transformers',
    'Spider-Man: No Way Home'
];

let initialLoaded = false;

async function displayMovieCard(movie) {
    const link = document.createElement('a');
    link.href = `movie.html?id=${movie.imdbID}`;

    const img = document.createElement('img');
    img.src = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '';
    img.alt = movie.Title;
    img.className = 'movie-poster';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'movie-title';
    titleDiv.textContent = `${movie.Title} (${movie.Year})`;

    link.appendChild(img);
    link.appendChild(titleDiv);
    postersContainer.appendChild(link);
}
async function loadInitialTrending() {
    for (const title of TRENDING_TITLES) {
        try {
            const movie = await getMovieByTitle(title);
            await displayMovieCard(movie);
        } catch (e) {
            console.error('Erreur film tendance :', title, e);
        }
    }
    initialLoaded = true;
}

function randomSearchQuery() {
    const queries = [
        'space',
        'star',
        'war',
        'love',
        'night',
        'future',
        'world',
        'hero',
        'dragon',
        'city'
    ];
    const index = Math.floor(Math.random() * queries.length);
    return queries[index];
}


async function loadRandomMovies() {
    if (!initialLoaded) {
        await loadInitialTrending();
    }

    let attempts = 0;
    let movies = [];
    let error = null;

    while (attempts < 5 && movies.length === 0) {
        const query = randomSearchQuery();
        const randomPage = Math.floor(Math.random() * 5) + 1;

        const result = await searchMovies(query, randomPage);
        movies = result.movies;
        error = result.error;
        attempts++;

        if (error && error.includes('Too many results')) {
            movies = [];
            continue;
        }
    }

    if (movies.length === 0) {
        console.warn('erreur random', error);
        return;
    }

    const shuffled = movies.sort(() => Math.random() - 0.5);
    const toShow = shuffled.slice(0, 3);

    for (const movie of toShow) {
        await displayMovieCard(movie);
    }
}


loadMoreBtn.addEventListener('click', () => {
    loadRandomMovies();
});

loadInitialTrending();

