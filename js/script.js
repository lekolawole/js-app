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

// Adding more Pokemon

pokemonRepository.add({name: 'Blastoise', height: 1.2, type:['monster', 'water']});
console.log(pokemonRepository.getAll());


// (getAll) and (add) functions

let bigPokemon = '- Wow, that\'s a big Pokemon!';

pokemonRepository.getAll().forEach(function(list){
    if (list.height > 1.2) { //prints a message for biggest Pokemon
        document.write(`${list.name} (height: ${list.height}) ${bigPokemon}<br>`)
    } else {
        document.write(`${list.name} (height: ${list.height})<br>`)
    }
});


