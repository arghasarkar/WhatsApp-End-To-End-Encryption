$('#my-login-form').submit(function(event){
    alert('submitted');
    event.preventDefault();
});

function loginChecker() {
    var url = root_url + 'get_id';

    var params = {
        email: document.getElementById("inputEmail").value,
        password: document.getElementById("inputPassword").value
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
        var logged = json.get_user_id;
        if (logged == null) {
            alert("Wrong email or password");
            return false;
        }
        setCookie("email", document.getElementById("inputEmail").value, 365);
        setCookie("password", document.getElementById("inputPassword").value, 365);
        setCookie("id", logged, 365);
        window.location.href = 'userpage.html';
        return true;
    });
}