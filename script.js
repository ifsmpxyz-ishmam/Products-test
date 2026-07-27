async function fetchpokemonFromAPI(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    console.log(data);
    return data;
}
const pokemonInfo = document.getElementById('pokemon-info');
const createPokemonCard = (pokemon) => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    card.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
<p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
<p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
`;
pokemonInfo.appendChild(card);


return card;    
};
fetchpokemonFromAPI('pikachu').then(pokemon => {
    if (!pokemon) {
        console.error('Failed to fetch Pokémon data.');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to fetch Pokémon data.';
        pokemonInfo.appendChild(errorMessage);
        return;
    }
    createPokemonCard(pokemon);
});
fetchpokemonFromAPI('bulbasaur').then(pokemon => {
    if (!pokemon) {
        console.error('Failed to fetch Pokémon data.');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to fetch Pokémon data.';
        pokemonInfo.appendChild(errorMessage);
        return;
    }
    createPokemonCard(pokemon);
});
fetchpokemonFromAPI('charmander').then(pokemon => {
    if (!pokemon) {
        console.error('Failed to fetch Pokémon data.');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to fetch Pokémon data.';
        pokemonInfo.appendChild(errorMessage);
        return;
    }
    createPokemonCard(pokemon);
});

