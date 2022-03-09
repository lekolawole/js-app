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

// Creating the IIFE

let pokemonRepository = (function(list) {
    let pokemonList = [
        {name: 'Charmander', height: 0.6, type:['monster', 'dragon']},

        {name: 'Geodude', height: 0.4, type:['mineral']},
    
        { name: 'Grotle', height: 1.1, type:['monster', 'grass']},
   
        {name: 'Unfezant', height: 1.2, type:['flying']},
    
        {name: 'Zoroark', height: 1.6, type:['field']},
    
        {name: 'Pikachu', height: 0.4, type:['field', 'fairy']},
    
        {name: 'Wartortle', height: 1, type:['monster', 'water']},
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };

})();

// (getAll) and (add) functions

pokemonRepository.getAll().forEach(function(list){
    if (list.height > 1.2) { //prints a message for biggest Pokemon
        document.write(`${list.name} (height: ${list.height}) ${bigPokemon}<br>`)
    } else {
        document.write(`${list.name} (height: ${list.height})<br>`)
    }
});

pokemonRepository.add({name: 'Blastoise'});

// forEach task 

/*pokemonList.forEach(function(list){
            document.write(`${list.name} (height: ${list.height})<br>`);
});

pokemonList2.forEach(function(list){
    document.write(`${list.name} (height: ${list.height})<br>`);
});
*/


