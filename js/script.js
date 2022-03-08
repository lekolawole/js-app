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

let pokemonList2 = [
    {
        name: 'Blastoise', 
        height: 1.6, 
        type:['monster', 'water']
    },
    {
        name: 'Spearow', 
        height: 0.3, 
        type:['flying']
    },
    {
        name: 'Sandslash', 
        height: 1.1, 
        type:['field']
    },
    {
        name: 'Grimer', 
        height: 0.9, 
        type:['amorphous']
    },
    {
        name: 'Staryu', 
        height: 0.8, 
        type:['water']
    },
    {
        name: 'Quilava', 
        height: 0.9, 
        type:['field']
    },
    {
        name: 'Umbreon', 
        height: 1, 
        type:['field']
    },
];

let bigPokemon = '- Wow, that\'s a big Pokemon!';

/* ///////////for-loop task 

function printPokemonListDetails(list) {
    for (let i = 0; i < list.length; i++) { //identifies Pokemon height 
        if (list[i].height > 1.2) { //prints a message for biggest Pokemon
            document.write(`${list[i].name} (height: ${list[i].height}) ${bigPokemon}<br>`)
        } else {
            document.write(`${list[i].name} (height: ${list[i].height})<br>`)
        }
    }
}

printPokemonListDetails(pokemonList);
printPokemonListDetails(pokemonList2);
*/


// forEach task 

pokemonList.forEach(function(list){
            document.write(`${list.name} (height: ${list.height})<br>`);
});

pokemonList2.forEach(function(list){
    document.write(`${list.name} (height: ${list.height})<br>`);
});