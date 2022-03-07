let pokemonList = [
    {
        name: 'Charmander', 
        height: 0.6, 
        type:['monster', 'dragon']
    },
    {
        name: 'Geodude', 
        height: 0.4, 
        type:['mineral']
    },
    {
        name: 'Grotle', 
        height: 1.1, 
        type:['monster', 'grass']
    },
    {
        name: 'Unfezant', 
        height: 1.2, 
        type:['flying']
    },
    {
        name: 'Zoroark', 
        height: 1.6, 
        type:['field']
    },
    {
        name: 'Pikachu', 
        height: 0.4, 
        type:['field', 'fairy']
    },
    {
        name: 'Wartortle', 
        height: 1, 
        type:['monster', 'water']
    },
];

/*
let i = 0;
let pokemonMessageHeight = ' (height: ' + pokemonList[i].height + ')';
let bigPokemon = '- Wow, that\'s a big Pokemon!';


for (let i = 1; i < pokemonList.length; i++) {
    // this will print the array to the console //
    console.log(pokemonList[i]);

    // this handles the height conditions //
    if (pokemonList[i].height > 1.2) {
        document.write(`${pokemonList[i].name} ${pokemonMessageHeight} ${bigPokemon}`);
    } else {
        document.write(`${pokemonList[i].name} ${pokemonMessageHeight}`);
    }
}
*/

let bigPokemon = '- Wow, that\'s a big Pokemon!';

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.2) {
        document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) ${bigPokemon}<br>`)
    } else {
        document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})<br>`)
    }
}

