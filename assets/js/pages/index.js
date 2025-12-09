const APIkey = "e3c1aaa8"
const searchQuery ="Avengers"


.fetch(`http://www.omdbapi.com/?apikey=${APIkey}&s="Avengers"&type=movie`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error =>console.log(error))

const postersContainer = document.getElementById('posters');

