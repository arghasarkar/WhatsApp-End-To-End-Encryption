console.log("Printing for popup");

if (typeof(Storage) !== "undefined") {

    const FIELD_PRIVATE_KEY = "privateKey";

    localStorage.setItem(FIELD_PRIVATE_KEY, "SOME KEY");

    // Retrieve
    if (localStorage.getItem(FIELD_PRIVATE_KEY) === null) {
        console.log("No private key");
    } else {
        console.log("Private key found");
        console.log(localStorage.getItem(FIELD_PRIVATE_KEY));
    }
}