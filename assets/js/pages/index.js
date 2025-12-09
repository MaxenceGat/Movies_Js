const APIkey = "e3c1aaa8"
const searchQuery = "avengers"

async function displayTrendingMovies() {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${APIkey}&s=${searchQuery}&type=movie`)
    const data = await response.json()
    const postersContainer = document.getElementById('posters');
    if (data.Search) {
        data.Search.forEach(movie => {
            if (movie.Poster && movie.Poster !== 'N/A') {
                const img = document.createElement('img');
                img.src = movie.Poster;
                img.alt = movie.Title;
                img.style.width = '200px';
                img.style.margin = '10px';
                postersContainer.appendChild(img);
            }
}