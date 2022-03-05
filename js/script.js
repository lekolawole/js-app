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

 
let pokemonInfo = ' (height: \n';
for (let i = 1; i < pokemonList.length; i++) {

    if (pokemonList[i].height > 1) {
        document.write(pokemonList[i].name + `${pokemonInfo} ${pokemonList[i].height}` + ') ' + '- Wow, that\'s a big Pokemon!')
    } else {
        document.write(pokemonList[i].name + `${pokemonInfo} ${pokemonList[i].height}` + ') ')
    }
}

