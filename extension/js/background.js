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

            console.log(user);

            let url = "https://mlhprime2017.herokuapp.com/api/keys/create_user";

            fetch(url, {
                    method: 'post',
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    body: "full_name=" + user.full_name + "&email=" + user.email + "&password=mlhprime2017&mobile_phone=" + user.mobile_phone
                })
                .then(function (resp) {
                    return resp.json();
                }
                .then(function (data) {
                    console.log('Request succeeded with JSON response', data);
                })
                .catch(function (error) {
                    console.log('Request failed', error);
                })
            );

        }

        if (request.fetchUser) {
            console.log(request);
            let user = localStorage.getItem(request.full_name);


            if (user === null) {
                // Fetch from the API
                fetch("https://mlhprime2017.herokuapp.com/api/keys/get_key_by_name?full_name=" + request.full_name).then(function (response) {
                    return response.json();

                }).then(function (resp) {
                    "use strict";

                    user = {};
                    user.keys = [];
                    user.keys = resp;
                    user.full_name = request.full_name;
                    user.email = request.email;

                    return user;
                }).then(function(user) {
                    "use strict";
                    console.log("User: ", user);
                    localStorage.setItem(user.full_name, JSON.stringify(user));

                    sendResponse({user: user});
                    return true;
                });
                return true;
            } else {
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
