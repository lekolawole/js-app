// Creating the IIFE

let pokemonRepository = (function () {
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let pokemonList = [];

    // adds pokemon to list
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    // Creating addListItem function & buttons
    function addListItem(list) {

        let listElement = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = list.name;

        button.classList.add('pokemon-button');
        listItem.append(button);
        listElement.append(listItem);

        button.addEventListener('click', () => {
            showDetails(list);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Creating Event Listeners
    function showDetails(item) {
        loadDetails(item).then(function () {
            console.log(item);
        });
    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };

})();

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

// Adding more Pokemon

pokemonRepository.add({name: 'Blastoise', height: 1.2, type:['monster', 'water']});
console.log(pokemonRepository.getAll());


// (getAll) and (add) functions

let bigPokemon = '- Wow, that\'s a big Pokemon!';

pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon)
});
















/*let pokemonRepository = (function(list) {
    let pokemonList = [
        {name: 'Charmander', height: 0.6, type:['monster', 'dragon']},

        {name: 'Geodude', height: 0.4, type:['mineral']},
    
        { name: 'Grotle', height: 1.1, type:['monster', 'grass']},
   
        {name: 'Unfezant', height: 1.2, type:['flying']},
    
        {name: 'Zoroark', height: 1.6, type:['field']},
    
        {name: 'Pikachu', height: 0.4, type:['field', 'fairy']},
    
        {name: 'Wartortle', height: 1, type:['monster', 'water']},
    ];

    // adds pokemon to list
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    // Creating Event Listeners
    function showDetails(list) {
        console.log(list);
    }

    // Creating addListItem function & buttons
    function addListItem(list) {

        let listElement = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button'); 
        button.innerText = list.name;
    
        button.classList.add('pokemon-button');
        listItem.append(button);
        listElement.append(listItem);

        button.addEventListener('click', () => {
            showDetails(list);
        });
    }
    


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };

})();*/