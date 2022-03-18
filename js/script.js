// Creating the IIFE

let pokemonRepository = (function () {
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');
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
        let pokemonButton = document.createElement('button');
        pokemonButton.innerText = list.name;

        pokemonButton.classList.add('pokemon-button');
        listItem.append(pokemonButton);
        listElement.append(listItem);

        pokemonButton.addEventListener('click', () => {
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
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    
    let loadingMessage = document.querySelector('.message');

    // toggles loading messages with class-lists
    function toggleLoadingMessage(item) {
        loadingMessage.classList.add('show')
    }

    function toggleLoadingMessageOff(item) {
        setTimeout(function () {
            loadingMessage.classList.remove('show');
        }, 500);
    }

    // loads details of Pokemon when clicked
    function loadDetails(item) {
        toggleLoadingMessage(item);


        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = `Height: ${details.height}`;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Creating Event Listeners on pokemon info divs
    function showDetails(item) {
        loadDetails(item).then(function () {
            // add in code for modal 
            findImageUrl(item); //calls function to hold url for modal later
        });
    }
    // Creates new URL for pokemon image based on clicked Pokemon
    function findImageUrl(item) {
        let newImageUrl = item.imageUrl;
        console.log(newImageUrl);
        showModal(item.name, newImageUrl, item.height);
    }
    
    // Functions for hiding/showing modal containing Pokemon details 
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    function showModal(title, newImageUrl, text) {
        //displays the modal after .5s for a consistent UI experience
        setTimeout(function () {
            modalContainer.classList.add('is-visible');
        }, 500);

        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';

                // Creating modal elemens in HTML
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let pokemonTitleElement = document.createElement('h1');
        pokemonTitleElement.innerText = title;

        let pokemonImg = document.createElement('img');
        pokemonImg.src = `${newImageUrl}`; //included backtik(`)- make url in src
        pokemonImg.classList.add('pokemon-modal-img');// don't need to include '.'

        let contentElement = document.createElement('p');
        contentElement.innerText = text;
        
        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonTitleElement);
        modal.appendChild(pokemonImg);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.addEventListener('click', hideModal);

        toggleLoadingMessageOff()// removes loading message after API is loaded
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
// END OF pokemonRepository ------------------------------------------// 