$('#add-key-form').submit(function(event){
    alert('submitted');
    event.preventDefault();
});

$('#remove-key-form').submit(function(event){
    alert('submitted');
    event.preventDefault();
});

function addKeys() {
    var url = root_url + 'create_key';

    var params = {
        user_id: getCookie("id"),
        key_name: document.getElementById("key_name").value,
        key: document.getElementById("key").value
    };

    var formBody = composeBody(params);

    var request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: formBody
    };

    fetch(url, request).then(function (res) {
        return res.json();
    }).then(function (json) {
        var logged = json.new_key;
        if (logged == null) {
            alert("Network Error");
            return false;
        }
        window.location.href = 'userpage.html';
        return true;
    });
}

function removeKeys() {
    var e = document.getElementById("key_name_remove");
    var string = e.options[e.selectedIndex].text;

    var url = root_url + 'remove_key?user_id=' + getCookie("id") + '&key_name=' + string;

    var request = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    fetch(url, request).then(function (res) {
        return res.json();
    }).then(function (json) {
        var removed = parseInt(json.remove_key);
        if (removed == -1) {
            alert("Can't remove");
            return false;
        }
        window.location.href = 'userpage.html';
    });
}