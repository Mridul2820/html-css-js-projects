const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7571c76917940ad43e88437d162f8431';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=7571c76917940ad43e88437d162f8431&query="';
const GERNE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=7571c76917940ad43e88437d162f8431&language=en-US'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Get initial Movies
getMovie(API_URL);

async function getMovie(url) {
    const res = await fetch(url)
    const data = await res.json();

    console.log(data.results)

    showMovies(data.results);
}

async function getGerne(url) {
    const res = await fetch(url)
    const data = await res.json();

    console.log(data)
}
getGerne(GERNE_URL);

function showMovies(movies){
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, release_date, overview, genre_ids } = movie;

        const movieEL = document.createElement('div');
        movieEL.classList.add('movie');

        movieEL.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="release_date">
                Release Date :<span>${release_date}</span>
            </div>
            <div class="genre">
                <h4>Genre : </h4>
                <ul>
                    ${genre_ids.map(gid => `<li>${gid}</li>`).join('')}
                </ul>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEL);
    })
}



function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green';
    }

    else if(vote >= 5) {
        return 'orange';
    }

    else {
        return 'red';
    }
}

// Search movie
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm && searchTerm !== '') {
        getMovie(SEARCH_URL + searchTerm)

        search.value = '';
    }
    else {
        window.location.reload();
    }
})

