

const APIkey = "e3c1aaa8";
const searchQuery = "Avengers";
const postersContainer = document.getElementById('posters');

fetch(`http://www.omdbapi.com/?apikey=${APIkey}&s=${searchQuery}&type=movie`)
    .then(response => response.json())
    .then(data => {
        if (data.Search) {
            const films = data.Search.slice(0, 5);
            films.forEach(movie => {
                const link = document.createElement('a');
                link.href = `movies.html?id=${movie.imdbID}`;
                link.target = "_blank";

                const img = document.createElement('img');
                img.alt = movie.Title;
                img.style.width = '180px';
                img.style.height = 'auto';
                img.style.borderRadius = '8px';
                img.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';

                const title = document.createElement('div');
                title.textContent = movie.Title;
                title.style.textAlign = 'center';
                title.style.marginTop = '5px';

                link.appendChild(img);
                link.appendChild(title);
                postersContainer.appendChild(link);
            });
        } else {
            postersContainer.innerHTML = 'Aucun film trouvé.';
        }
    })
    .catch(error => console.log('Erreur :', error));