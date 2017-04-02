var root_url = 'https://mlhprime2017.herokuapp.com/api/keys/';

function composeBody(parameters) {
    var formBody = [];
    for (var property in parameters) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(parameters[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}

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
        console.log(json);
    });
}


//
// var request = $.ajax(
//     {
//         type: 'GET',
//         contentType: "application/json; charset=utf-8",
//         url: 'https://mlhprime2017.herokuapp.com/api/keys/get_id',
//         data: {
//             email: $('#inputEmail').value,
//             password: $('#inputPassword').value
//         },
//         datatype: 'json',
//         // error: alert("Wrong email or password"),
//         success: function () { alert("Success"); }
//     });
//
//

/**
 * Check if request not null => login/password was correct
 * then move to index.html, else show alert
 */
// $(document).ready(function () {
    $('#server-call').on('click', function() {

        // $.post('../../backend/server/routes/keys.js', {
        //     'email': $('#inputEmail').val(),
        //     'password': $('#inputPassword').val()
        // }, function (data) {
        //
            if (request == null) {
                alert("Error: wrong email or password");
            } else {
                //Go to Page C if Page B was successful
                window.location.href = "index.html";
            }
        // });
        return false;
    // })
});


