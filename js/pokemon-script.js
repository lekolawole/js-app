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

        let listElement = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        listItem.classList.add('.list-group-item');

        let pokemonButton = document.createElement('button');
        pokemonButton.innerText = list.name;

        //data-toggle="modal" data-target="#Pokemon" - this piece of code triggers the modal
        pokemonButton.setAttribute('data-toggle', 'modal');
        pokemonButton.setAttribute('data-target', '#Pokemon');
        pokemonButton.classList.add('pokemon-button', 'btn');
        listItem.append(pokemonButton);
        listElement.append(listItem);

        pokemonButton.addEventListener('click', function() {
            showDetails(list);
        });
    }

    // loads list of pokemon in browser
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name.toUpperCase(),
                    detailsUrl: item.url
                };
                add(pokemon);
                //console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // loads details of Pokemon when clicked
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = `Height: ${details.height}`;
            item.types = []; 
            for (let i = 0; i< details.types.length; i++) {
                item.types.push(details.types[i].type.name);
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Creating Event Listeners on pokemon info divs
    function showDetails(item) {
        loadDetails(item).then(function () {
            // add in code to show modal 
            
            console.log(item);
            showModal(item);
        });
    }

    function showModal(item) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('modalHeader');

        modalBody.empty();
        modalTitle.empty();

        //filling Modal with pokemon info

        let pokemonName = $("<h1>" + item.name + "</h1>");
        let pokemonImg = $('<img class=\'pokemon-image\'>');//Creates img element
        pokemonImg.attr("src", item.imageUrl);//Updates image source 
        pokemonImg.addClass('rounded-circle border border-dark');
        // pokemonImg.addClass('border');
        // pokemonImg.addClass('border-primary');
        let pokemonHeight = $("<p>" + item.height + "</p>");
        let pokemonTypes = $("<p>" + item.types + "</p>");

        //Append variables
        modalTitle.append(pokemonName);
        modalBody.append(pokemonImg);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonTypes);
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

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
});
// END OF pokemonRepository ------------------------------------------// 