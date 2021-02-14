const poke_container =  document.getElementById('poke-container')

// const pokemon_count = 898
const pokemon_count = 151
const colors = {
    normal: '#aa9',
    fire: '#f42',
    water: '#39f',
    electric: '#fc3',
    grass: '#7c5',
    ice: '#6cf',
    fighting: '#b54',
    poison: '#a59',
    ground: '#db5',
    flying: '#89f',
    psychic: '#f59',
    bug: '#ab2',
    rock: '#ba6',
    ghost: '#66b',
    dragon: '#76e',
    dark: '#111',
    steel: '#aab',
    fairy: '#e9e'
}

const main_types = Object.keys(colors)

const fetchPokemon = async () => {
    for(let i = 1; i<= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

    const id = pokemon.id.toString().padStart(3, '0')

    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const color = colors[type]

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHtml = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `

    pokemonEl.innerHTML = pokemonInnerHtml

    poke_container.appendChild(pokemonEl)
}

fetchPokemon()