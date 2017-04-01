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
chrome.runtime.onMessage.addListener( function(user, sender, sendResponse) {
    localStorage.setItem(JSON.parse(user));
});
/**
 * TODO:: 2) Implement message passing interface to receive message and sender's name from content.js
 *           Then decrypt it with the appropriate keys and send the message back to content.js.
 *
 */
chrome.runtime.onMessage.addListener( function(encrypted, sender, sendResponse){
  var privKeyObj = key.private_key;
  var options = {
    message: encrypted;
    privateKey: privKeyObj;
  }
  openpgp.decrypt(options).then(function(plaintext) {
    return plaintext.data; 
  });
  var result = privKeyObj.decrypt(encrypted);
  chrome.runtime.sendMessage(result);
});
