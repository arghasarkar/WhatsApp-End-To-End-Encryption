const PASSPHRASE = "mlhphrime2017@teamalpha";

// Adding event listeners to listen to key presses on gen new key and fetch key
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("genNewKey").addEventListener('click', generateNewKey);
    document.getElementById("fetchKey").addEventListener('click', fetchKey);
});

let key = {
    id: -1,
    name: "",
    private_key: "",
    public_key: ""
};

let user = {
    id: -1,
    full_name: "",
    email: "",
    phone_number: "",
    keys: []
};

/**
 * Stores the user details to localstorage
 */
function updateCurrentUser() {
    "use strict";

}

function generateNewKey() {
    "use strict";
    console.log("Gen new key");

    let options = {
        userIds: [{ name:'Jon Smith', email:'jon@example.com' }], // multiple user IDs
        numBits: 2048,                                            // RSA key size
        passphrase: PASSPHRASE       // protects the private key
    };

     return openpgp.generateKey(options).then(function(key) {

        let generatedKey = [];
        generatedKey.private_key = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
        generatedKey.public_key = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '

        return generatedKey;
    });
}

function fetchKey() {
    "use strict";
    console.log("Fetch an existing key");
    alert("Fetch Key");
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