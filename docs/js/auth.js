function credentialsChecker() {
    var cookie = getCookie("id");

    if(cookie == "") {
        window.location.href = 'index.html';
    }
}