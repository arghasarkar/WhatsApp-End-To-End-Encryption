const URL_NEW_USER = "https://whatsapp-end-to-end-encryption.herokuapp.com/api/new_user";
const URL_GET_USER_BY_ID = "https://whatsapp-end-to-end-encryption.herokuapp.com/api/user_id/";
const URL_GET_USER_BY_NAME = "https://whatsapp-end-to-end-encryption.herokuapp.com/api/name/";
const URL_GET_USER_BY_PHONE_NUMBER = "https://whatsapp-end-to-end-encryption.herokuapp.com/api/phone_number/";

/**
 * Store's the logged in user's data in local storage. The user parameter is passed in as a javascript object
 *
 * @param user
 */
function setLoggedInUser(user) {
    "use strict";
    localStorage.setItem("me", JSON.stringify(user));
}

/**
 * Get's an user from the local storage if the user has been saved.
 *
 * @returns JSON Object representing an user.
 */
function getLoggedInUser(userName) {
    "use strict";

    if (userName !== undefined) {
        return JSON.parse(localStorage.getItem(userName));
    }
    return JSON.parse(localStorage.getItem("me"));
}

chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        if (request.user === "loggedInUser") {
            sendResponse(user);
        }
    }
);

/**
 * TODO:: 1) Implement message passing interface to receive user details(var user) from popup.js.
 *        Popup.js will send string version of user. Convert it to JSON and store it in Local storage(Chrome LocalStorage).
 */

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        //console.log(request);

        if (request.updateUser) {
            let user = request.updateUser;

            console.log(user);

            let postBody = {
                name: user.full_name,
                email: user.email,
                phone_number: user.phone_number,
                public_key: user.keys.public_key
            };

            //console.log(postBody);

            fetch(URL_NEW_USER, {
                    method: 'post',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(postBody)
                })
                .then(function (resp) {
                    let respJson = resp.json();
                    //console.log(respJson);

                    return respJson;
                }).then(data => {
                    console.log(data);
                    setLoggedInUser(user);
                })
                .catch(function (error) {
                    console.log('Request failed', error);
                })
        }

        if (request.fetchUser) {

            let user = getLoggedInUser(request.full_name);

            console.log(user);

            if (user === null) {
                // Fetch from the API
                fetch(URL_GET_USER_BY_NAME + request.full_name).then(function (response) {

                    return response.json();

                }).then(function (resp) {
                    "use strict";

                    let i = 0;
                    user = {};

                    for (i = 0; i < resp.length; i++) {
                        if (request.email === resp[i].email) {
                            user.keys = {};
                            user.keys.public_key = resp[i].public_key;

                            user.name = resp[i].name;
                            user.email = resp[i].email;
                        }
                    }

                    return user;

                }).then(function(user) {
                    "use strict";
                    console.log("User: ", user);
                    // Saves the user to the local storage
                    localStorage.setItem(user.name, JSON.stringify(user));

                    sendResponse({user: user});
                    return true;
                });
                return true;
            } else {
                // TODO: GET THE USER FROM THE LOCAL STORAGE

                sendResponse({user: user});
            }


        }

    }
);


/**
 * TODO:: 2) Implement message passing interface to receive message and sender's name from content.js
 *           Then decrypt it with the appropriate keys and send the message back to content.js.
 *
 */
/*
chrome.runtime.onMessage.addListener( function(encrypted, sender, sendResponse){
  var privKeyObj = key.private_key;

  var options = {
    message: encrypted,
    privateKey: privKeyObj
  };

  openpgp.decrypt(options).then(function(plaintext) {
    return plaintext.data; 
  });

  var result = privKeyObj.decrypt(encrypted);
  chrome.runtime.sendMessage(result);
});
*/


