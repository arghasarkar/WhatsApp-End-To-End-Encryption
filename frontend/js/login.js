
// function getValue() {
//     // $(document).ready(function () {
//         $(".button").on('click', function () {
//             $.ajax({
//                 type: "POST",
//                 url: "https://mlhprime2017.herokuapp.com/api/keys/get_id",
//                 data: {
//                     email: $('#inputEmail').value,
//                     password: $('#inputPassword').value
//                 },
//                 dataType: "json",
//                 //error: alert("Error: wrong email or password"),
//                 success:
//                     function (data) {
//
//                     console.log(data);
//                     // var success = data['success'];
//                     if (data == null) {
//                         // var error = data['message'];
//                         alert(error); // just in case somebody to click on share witout writing anything :
//
//                     }else{
//                         window.location.href = "index.html";
//                     }
//                 }
//
//                 // }
//                 // }
//
//
//             });//end ajax
//             // return false;
//         });//end click function
//     // })
// };//end ready function


// var request;
function getValue() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    console.log("Email: "+email+" --- password: "+password);

    var xhttp = new XMLHttpRequest();
    var msg='https://mlhprime2017.herokuapp.com/api/keys/get_id?email=' + email + '&password=' + password;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // request = JSON.parse(this.responseText).get_user_id;
            if (JSON.parse(this.responseText).get_user_id != null) {
                window.location.href = "index.html";
            }else {
                alert("Error: wrong email or password");
            }
        }
    };
    xhttp.open("POST", msg, true);
    // xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send();
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


