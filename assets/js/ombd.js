const API_KEY = 'e3c1aaa8';
const BASE_URL = 'https://www.omdbapi.com/';

export async function searchMovies(query, page = 1) {
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === 'False') {
        return { movies: [], totalResults: 0, error: data.Error || 'Erreur de recherche' };
    }
    return { movies: data.Search, totalResults: parseInt(data.totalResults || '0', 10), error: null };
}

export async function getMovieById(id) {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=full`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === 'False') {
        throw new Error(data.Error || 'Film introuvable');
    }
    return data;
}

export async function getMovieByTitle(title) {
    const url = `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === 'False') {
        throw new Error(data.Error || 'Film introuvable');
    }
    return data;
}
