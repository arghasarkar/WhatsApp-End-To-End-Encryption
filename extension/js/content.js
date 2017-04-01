var messageHolderElements = document.getElementsByClassName("message-text");
var messages = [];
var names = [];
for (i = 0; i < messageHolderElements.length; i++) {
  var line = document.getElementsByClassName("message-text")[i].children[0].innerText;
  var name = line.split("] ");
  var res = name[i].split(": ")[0];
  console.log(res);
  names.push(res);
  messages.push(document.getElementsByClassName("message-text")[i].children[1].innerText);
}

for (var i = 0; i < messages.length; i++) {
  console.log(names[i] + " " + messages[i]);
}
//document.getElementsByClassName("message-text")[i].children[0].innerText
