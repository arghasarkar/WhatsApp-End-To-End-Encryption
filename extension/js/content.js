const PGP_MESSAGE_START = "-----BEGIN PGP MESSAGE-----";
const ENCRYPT_TRIGGER_KEY_CODE = 17;

let x = 0;

document.addEventListener("click", function(){

    // Listener for sending messages
    document.getElementsByClassName("input")[1].addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        if (event.keyCode === ENCRYPT_TRIGGER_KEY_CODE) {
            console.log("encrypt trigger pressed.");
            var message = document.getElementsByClassName("input")[1].innerText;

            // Get the recipient of the message.
            let recipient = document.getElementsByClassName("active")[0].children[1].children[0].children[0].children[0].innerText;

            fetchUserByName(recipient).then(function (user) {

                // Gets the user and returns the public key
                return user.keys.public_key;

            }).then(function (publicKey) {

                console.log("THe public key is: ", publicKey);

                let options = {
                    data: message,                             // input as String (or Uint8Array)
                    publicKeys: openpgp.key.readArmored(publicKey).keys,  // for encryption
                };

                // Encrypting the message with the recipient's public key and send it
                openpgp.encrypt(options).then(function(ciphertext) {
                    document.getElementsByClassName("input")[1].innerText = ciphertext.data;
                });

            }).catch(function (err) {

                console.log("Error in fetching the user: ", err);
            });




            /*  if (recipient.includes("Ilias")) {
                  console.log(recipient + " is receiving: " + message);

                  // Use ilias's public key

                  let options = {
                      data: message,                             // input as String (or Uint8Array)
                      publicKeys: openpgp.key.readArmored(IliasPublicKey).keys,  // for encryption
                  };

                  openpgp.encrypt(options).then(function(ciphertext) {
                      let encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
                      document.getElementsByClassName("input")[1].innerText = encrypted;
                  });

              } else if (recipient.includes("Argha")) {
                  console.log(recipient + " is receiving: " + message);

                  // Use Argha's public key
                  console.log(recipient + " is receiving: " + message);

                  // Use ilias's public key

                  let options = {
                      data: message,                             // input as String (or Uint8Array)
                      publicKeys: openpgp.key.readArmored(ArghaPublicKey).keys,  // for encryption
                  };

                  openpgp.encrypt(options).then(function(ciphertext) {
                      let encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
                      document.getElementsByClassName("input")[1].innerText = encrypted;
                  });

              } else if (recipient.includes("Jamie Webb")) {

                  // Use natalya's keys
                  console.log(recipient + " is receiving: " + message);

                  // Use ilias's public key

                  let options = {
                      data: message,                             // input as String (or Uint8Array)
                      publicKeys: openpgp.key.readArmored(NatalyaPublicKey).keys,  // for encryption
                  };

                  openpgp.encrypt(options).then(function(ciphertext) {
                      let encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
                      document.getElementsByClassName("input")[1].innerText = encrypted;
                  });
              } else {

              }*/
        }
    });

    // Run rest of the code in here

    var messageHolderElements = document.getElementsByClassName("message-text");
    var messages = [];
    var names = [];

    for (var i = 0; i < messageHolderElements.length; i++) {
        var line = document.getElementsByClassName("message-text")[i].children[0].innerText;
        var name = line.split("]");
        name = name[1];
        console.log(name);
        var res = name.split(":")[0];
        names.push(res);
        messages.push(document.getElementsByClassName("message-text")[i].children[1].innerText);
    }

    /**
     * TODO: Send encrypted messages to background.js to be decryted. Then replace the existing message by the decrypted version.
     * 1) Fetch the user's private key
     */
    // Fetching the user's private key
    let privateKey = fetchLoggedInUser().then(function (user) {
        return user.keys.private_key;
    }).then(function (privateKey) {

        console.log(privateKey);

        for (var k = 0; k < messages.length; k++ ) {
            /*console.log("Sender: ", names[k]);
             */

            // console.log("Message: ", messages[k])

            if (messages[k].includes(PGP_MESSAGE_START)) {
                // Need to decrypt this;
                console.log("Encrypted: ", "(", names[k], ") ", messages[k]);


                /**
                 * TODO
                 * The messages with 'k' index and encrypted. To Decrypt them, use the user's own private key to decrypt
                 * them.
                 * 1) Fetch the user's private key from outside this loop.
                 * 2) If the message is encrypted, attempt to decrypt it.
                 */


                    // Decrypt here
                var privKeyObj = openpgp.key.readArmored(privateKey).keys[0];
                privKeyObj.decrypt("");

                let options = {
                    message: openpgp.message.readArmored(messages[k]),     // parse armored message
                    privateKey: privKeyObj // for decryption
                };

                decryptAndInsertMessageArgha(options, k);



            } else {
                //console.log("Unenc: ", "(", names[k], ") ", messages[k]);
            }


        }

    }).catch(function (err) {
        console.log("Failed to decrypt. Error: ", err);
    });

});

/**
 * Get
 * @param userName
 */
function fetchUserByName(userName) {
    "use strict";

    /**
     * ** DONE ** Replace the block below to check for the user's name in the 'recipient' variable.
     * 1) Check if that name exists in local storage cache. if its exists, use the public key.
     * 2) If it doesn't exist, then fetch from the API.
     * */
    // Need to get the key from the background script.

    return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage(
            {
                fetchUser: true,
                full_name: userName
            },
            function(response) {
                if (response === undefined) {
                    reject("Failed to load the user.");
                } else {
                    resolve(response.user);
                }
            }
        );
    });
}

function decryptAndInsertMessageNatalya(options, valueOfK) {
    "use strict";

}

function decryptAndInsertMessageArgha(options, valueOfK) {
    "use strict";
    openpgp.decrypt(options).then(function(plaintext) {
        document.getElementsByClassName("message-text")[valueOfK].children[1].innerText = plaintext.data;

        return plaintext.data; // 'Hello, World!'
    });
}

/**
 * Gets the current logged in user. Promise resolves to user if the user exists. If no user is logged in, the promise is
 * rejected.
 *
 * @returns {Promise | User}
 */
function fetchLoggedInUser() {
    return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage(
            {
                fetchUser: true,
            },
            function(response) {
                user = response.user;

                console.log(user);

                if (user === undefined) {
                    reject("No logged in user found.");
                } else {
                    resolve(user);
                }
            }
        );
    });
}