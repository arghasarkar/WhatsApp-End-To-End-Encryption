var table = $('#table').bootstrapTable({
    onLoadSucces: fillTable()
});

$(document).ready(function () {
    $("#insert").click(function(){
        $('#myInsertModal').modal('show');
    });
    $("#remove").click(function(){
        $('#myRemoveModal').modal('show');
        $('#key_name_remove').attr('enabled', 'true');
        $.each(key_list, function() {
            $('#key_name_remove').append(
                $("<option></option>").text(this.key_name).val(this.id)
            );
        });
    });
});

var key_list;

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
        for(var i = 0; i < json.keys.length; i++) {
            json.keys[i].id = i;
        }

        key_list = json.keys;

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