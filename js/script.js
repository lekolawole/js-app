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

    // Creating Event Listeners on pokemon info divs
    function showDetails(item) {
        loadDetails(item).then(function () {
            console.log(item);
        });
    }

    // UI Tasks - Real Time Validation Forms
    (function () {
        let form = document.querySelector('#register-form');
        let emailInput = document.querySelector('#email');
        let passwordInput = document.querySelector('#password');

        function showErrorMessage(input, message) {
            let container = input.parentElement;
            let error = container.querySelector('.error-message');
            if (error) {
                container.removeChild(error);
            }

            if (message) {
                let error = document.createElement('div');
                error.classList.add('error-message');
                error.innerText = message;
                container.appendChild(error);
            }
        }

        function validateEmail() {
            let value = emailInput.value;

            if (!value) {
                showErrorMessage(emailInput, 'E-mail is a required field.');
                return false;
            }
            if (value.indexOf('@') === -1) {
                showErrorMessage(emailInput, 'You must enter a valid email address.');
                return false;
            }

            showErrorMessage(emailInput, null);
            return true;
        }

        function validatePassword() {
            let value = passwordInput.value;

            if (!value) {
                showErrorMessage(passwordInput, 'Password is a required field.');
                return false;
            }
            if (value.length < 8) {
                showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
                return false;
            }

            showErrorMessage(passwordInput, null);
            return true;
        }


        function validateForm() {
            let isValidEmail = validateEmail();
            let isValidPassword = validatePassword();
            return isValidEmail && isValidPassword;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            if (validateForm()) {
                alert('Success!🚀');
            }
        })
        // Adding event listeners to forms within the whole function
        emailInput.addEventListener('input', validateEmail);
        passwordInput.addEventListener('input', validatePassword);
    })();
    

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
