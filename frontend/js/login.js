$(function() {
    $('form').submit(function() {

        $.post('PageB.php', {
            'email': $('#inputEmail').val(),
            'password': $('#inputPassword').val()
        }, function (data) {

            if (data == null) {
                alert("Error: wrong email or password");
            } else {
                //Go to Page C if Page B was successful
                window.location.href = "index.html";
            }
        });
        return false;
    })
});


// var data = null;
// $('form').submit(function () {
//     data = $(this).serializeArray();
//     // console.log(data);
//     // console.log($(this).serializeArray());
//
// });
//
// $('.test').on('click', function () {
//     console.log(data);
// });




