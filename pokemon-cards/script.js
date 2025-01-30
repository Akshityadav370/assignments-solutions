document
  .getElementById('fetchPokemon')
  .addEventListener('click', async function () {
    const numPokemon = document.getElementById('numPokemon').value;
    const category = document.getElementById('category').value;
    const pokemonContainer = document.getElementById('pokemonContainer');

    pokemonContainer.innerHTML = '';

    const typeResponse = await fetch(
      `https://pokeapi.co/api/v2/type/${category}`
    );
    const typeData = await typeResponse.json();

    const pokemons = typeData.pokemon.slice(0, numPokemon);

    for (let poke of pokemons) {
      const url = poke.pokemon.url;
      const response = await fetch(url);
      const data = await response.json();

      const card = document.createElement('div');
      card.classList.add('pokemon-card');
      card.innerHTML = `
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h3>${data.name.toUpperCase()}</h3>
            <p>Type: ${category}</p>
        `;

      pokemonContainer.appendChild(card);
    }
  });
