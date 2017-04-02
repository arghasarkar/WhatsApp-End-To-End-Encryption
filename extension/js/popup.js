const PASSPHRASE = "mlhphrime2017@teamalpha";

// Adding event listeners to listen to key presses on gen new key and fetch key
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("genNewKey").addEventListener('click', updateCurrentUser);
    document.getElementById("fetchKey").addEventListener('click', fetchKey);
});

let key = {
    id: -1,
    name: "",
    private_key: "",
    public_key: ""
};

let user = {
    id: 1,
    full_name: "Argha",
    email: "argha.sarkar1994@gmail.com",
    phone_number: "+447554164303",
    keys: []
};

/**
 * Stores the user details to localstorage
 */
function updateCurrentUser() {
    "use strict";

    generateNewKey().then((key) => {

        console.log(user);

        user.full_name = document.getElementById("name").value;
        user.email = document.getElementById("email").value;
        user.phone_number = document.getElementById("mobile_number").value;

        console.log(user);

        /**
         * TODO
         * 1) Send user details to background.js
         */
        chrome.runtime.sendMessage(
            {
                updateUser: user,

            },
            function(response){
                // console.log(user.keys[0].private_key);
                // console.log(JSON.stringify(user.keys[0].private_key));
                //

                console.log(response);

        });
    });


    // chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
    //     let str = JSON.stringify(message.data);
    // });
}

function generateNewKey() {
    "use strict";
    console.log("Gen new key");

    let options = {
        userIds: [{ name: user.full_name, email: user.email }], // multiple user IDs
        numBits: 512,                                            // RSA key size
        passphrase: PASSPHRASE       // protects the private key
    };

    return openpgp.generateKey(options).then(function(key) {

        let generatedKey = [];
        generatedKey.private_key = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
        generatedKey.public_key = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '

        user.keys = [];

        user.keys.push(generatedKey);

        return generatedKey;
    });
}

function fetchKey() {
    "use strict";
    console.log("Fetch an existing key");

    chrome.runtime.sendMessage(
        {
            fetchUser: true,
            full_name: "Xavier Perarnau",
            email: "argha.sarkar1994@gmail.com"
        },
        function(response) {
            user = response.user;

            console.log(user);
        }
    );

}



if (typeof(Storage) !== "undefined") {

    const loggedInUser = "loggedInUser";

    localStorage.setItem(loggedInUser, JSON.stringify(user));

    // Retrieve
    if (localStorage.getItem(loggedInUser) === null) {
        console.log("No private key");
    } else {
        console.log("Private key found");
        console.log(localStorage.getItem(loggedInUser));
    }
}
