const PASSPHRASE = "mlhphrime2017@teamalpha";

// Adding event listeners to listen to key presses on gen new key and fetch key
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("genNewKey").addEventListener('click', generateNewKey);
    document.getElementById("fetchKey").addEventListener('click', fetchKey);
});


function generateNewKey() {
    "use strict";
    console.log("Gen new key");

    var options = {
        userIds: [{ name:'Jon Smith', email:'jon@example.com' }], // multiple user IDs
        numBits: 4096,                                            // RSA key size
        passphrase: PASSPHRASE       // protects the private key
    };

    openpgp.generateKey(options).then(function(key) {
        var privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
        var pubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '

        console.log(privkey);
        console.log(pubkey);
    });
}

function fetchKey() {
    "use strict";
    console.log("Fetch an existing key");
    alert("Fetch Key");
}

let key = {
    name: "",
    key: "",
};

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