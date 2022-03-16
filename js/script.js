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

    let message = document.querySelector('.message');

    function loadDetails(item) {
        message.classList.add("show");

        
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            message.classList.remove("show");
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

    // UI Tasks - Real Time Validation Forms

    function validateEmail() {
        let value = emailInput.value;
        let hasAtSign = value.indexOf('@') > -1;
        let hasDot = value.indexOf('.') > -1;
        return value && hasAtSign && hasDot;
    }

    function validatePassword() {
        let value = passwordInput.value;
        return value && value.length >= 8;
    }

    function showErrorMessage(input, message) {
        let container = input.parentElement;
        let error = container.querySelector('.error-message');
        if (error) {
            container.removeChild(error);
        }
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

// (getAll) and (add) functions

pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon)
});
