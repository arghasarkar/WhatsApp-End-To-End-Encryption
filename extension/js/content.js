var messageHolderElements = document.getElementsByClassName("message-text");
var messages = [];
var names = [];

for (var i = 0; i < messageHolderElements.length; i++) {
  var line = document.getElementsByClassName("message-text")[i].children[0].innerText;
  var name = line.split("]")[1];
  var res = name.split(":")[0];
  names.push(res);
  messages.push(document.getElementsByClassName("message-text")[i].children[1].innerText);
}

/**
 * TODO: Send encrypted messages to background.js to be decryted. Then replace the existing message by the decrypted version.
 */
for (var k = 0; k < messages.length; k++ ) {
    chrome.runtime.sendMessage(messages[k]);
    chrome.runtime.onMessage.addListener(function(decrypted, sender, sendResponse){
      messages[k] = decrypted;
    });
}
