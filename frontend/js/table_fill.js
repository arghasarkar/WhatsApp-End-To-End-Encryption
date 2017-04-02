  var table = $('#table').bootstrapTable({
     onLoadSucces: fillTable()
 });

function fillTable() {
    var url = root_url + 'get_keys?id=' + getCookie("id");

    var request = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    fetch(url, request).then(function (res) {
        return res.json();
    }).then(function (json) {
        console.log(json.keys);
        for(var i = 0; i < json.keys.length; i++) {
            json.keys[i].id = i;
        }

        $('#table').bootstrapTable({
            columns: [{
                field: 'id',
                title: '#'
            }, {
                field: 'key_name',
                title: 'Key Name'
            }, {
                field: 'key',
                title: 'Key'
            }],
            data: json.keys
        });
    });
}