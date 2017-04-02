chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        if (request.user == "loggedInUser") {
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

            localStorage.setItem("loggedInUser", JSON.stringify(user));
            localStorage.setItem(user.full_name, JSON.stringify(user));

            let existingUser = localStorage.getItem("loggedInUser");
            console.log("existing user: ");
            console.log(existingUser);
        }

        if (request.fetchUser) {
            console.log(request);
            let user = localStorage.getItem(request.full_name);

            console.log("User: ", user);

            if (user === null) {
                // Fetch from the API



                fetch("https://mlhprime2017.herokuapp.com/api/keys/get_key_by_name?full_name=" + request.full_name).then((response) => {
                    return response.json();

                }).then((resp) => {
                    "use strict";

                    user = {};
                    user.keys = [];
                    user.keys = resp;
                    console.log("Response: ");
                    console.log(user);
                    sendResponse();
                });

            } else {
                sendResponse(user);
            }



        }

      /*  console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye"});*/
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
