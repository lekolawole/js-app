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
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    let loadingMessage = document.querySelector('.message');

    // loads details of Pokemon when clicked
    function loadDetails(item) {
        loadingMessage.classList.add("show");


        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            loadingMessage.classList.remove("show");
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Creating Event Listeners on pokemon info divs
    function showDetails(item) {
        loadDetails(item).then(function () {
            // add in code for modal 

            showModal();
        });
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    function showModal(title, text) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let pokemonTitleElement = document.createElement('h1');
        pokemonTitleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonTitleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal(title, 'this is text');
    });

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


// IIFE - Creating Pokemon modal with images and stats -----------------

/*let pokemonModal = (function () {

    function showModal(title, text) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal Title', 'This is the modal content!');
    });

    // Creating dialogs 

    function showDialog(title, text) {
        showModal(title, text);

        let modalContainer = document.querySelector('#modal-container');
        let modal = modalContainer.querySelector('.modal');

        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';

        let cancelButton = document.createElement('button');
        cancelButton.classList.add('.modal-cancel');
        cancelButton.innerText = 'Cancel';
        confirmButton.focus();

        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        // Return the promise that resolves when confirmed, else rejects
        return new Promise((resolve, reject) => {
            cancelButton.addEventListener('click', hideModal);
            confirmButton.addEventListener('click', () => {
                dialogPromiseReject = null;
                hideModal();
                resolve();
            });
            dialogPromiseReject = reject;
        });
    }

    // Closing the modal 

    let dialogPromiseReject;

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    // ESC key

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visble')) {
            hideModal();
        }
    });

    let modalContainer = document.querySelector('#modal-container')
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    document.querySelector('#show-dialog').addEventListener('click', () => {
        showDialog('Confirm action', 'Are you sure you want to do this?').then(function () {
            alert('Confirmed!');
        }, () => {
            alert('Not confirmed!');
        });
    });


});

pokemonModal();*/







// IIFE - UI Tasks - Real Time Validation Forms 

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

// ------------------- end of form validation IIFE --------------------//