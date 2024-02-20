// Global Variable
const pokemonTypeContainer = document.querySelector('.pokemon-type-container');
let idNow;

// Klik Search
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', async () => {
	const searchInput = document.getElementById('searchInput');

	// GetData
	const pokemonData = await getPokemonData(searchInput.value.toLowerCase());

	// Update UI
	const pokemonCard = document.querySelector('.pokemon-card');
	const prevNextContainer = document.getElementById('prevNextContainer');

	pokemonCard.classList.remove('hidden');
	prevNextContainer.classList.remove('hidden');
	pokemonTypeContainer.innerHTML = '';

	updateUI(pokemonData);
})

// Random Pokemon
const randomButton = document.querySelector('.random-button');

randomButton.addEventListener('click', async () => {
	// Random Pokemon
	const randomPokemon = Math.floor(Math.random() * 1025);

	// GetData
	const pokemonData = await getPokemonData(randomPokemon);

	// Update UI
	const pokemonCard = document.querySelector('.pokemon-card');
	const prevNextContainer = document.getElementById('prevNextContainer');

	pokemonCard.classList.remove('hidden');
	prevNextContainer.classList.remove('hidden');
	pokemonTypeContainer.innerHTML = '';

	updateUI(pokemonData);
})

// Previous-Next Pokemon
document.addEventListener('click', async (e) => {
	if (e.target.id === 'pokemonPrevious') {
		const pokemonDataPrevious = await getPokemonData(idNow - 1);

		pokemonTypeContainer.innerHTML = '';
		updateUI(pokemonDataPrevious);
	} else if (e.target.id === 'pokemonNext') {
		const pokemonDataNext = await getPokemonData(idNow + 1);

		pokemonTypeContainer.innerHTML = '';
		updateUI(pokemonDataNext);
	}
})


// Functions
function getPokemonData(searchInput) {
	return fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
		.then(response => response.json())
		.then(data => data)
}

function updateUI(pokemonData) {
	const pokemonID = document.getElementById('pokemonID');
	const pokemonName = document.getElementById('pokemonName');
	const pokemonImage = document.getElementById('pokemonImage');
	const pokemonAttack = document.getElementById('pokemonAttack');
	const pokemonDefense = document.getElementById('pokemonDefense');
	const pokemonSpattack = document.getElementById('pokemonSpattack');
	const pokemonSpdefense = document.getElementById('pokemonSpdefense');
	const pokemonSpeed = document.getElementById('pokemonSpeed');

	pokemonID.innerText = pokemonData.id;
	pokemonName.innerText = pokemonData.name;
	pokemonImage.setAttribute('src', `${pokemonData.sprites.front_default}`);
	pokemonAttack.innerText = pokemonData.stats[1].base_stat;
	pokemonDefense.innerText = pokemonData.stats[2].base_stat;
	pokemonSpattack.innerText = pokemonData.stats[3].base_stat;
	pokemonSpdefense.innerText = pokemonData.stats[4].base_stat;
	pokemonSpeed.innerText = pokemonData.stats[5].base_stat;

	// Type
	const pokemonTypes = pokemonData.types;

	const pokemonType = pokemonTypes.map(a => {
		return `<div class="pokemon-type">${a.type.name}</div>`
	});
	
	for (i = 0; i < pokemonType.length; i++) {
		const type = pokemonType[i];
		pokemonTypeContainer.innerHTML += type;
	}

	// Data id for prev-next feature
	idNow = pokemonData.id;
}