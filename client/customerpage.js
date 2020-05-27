$(document).ready(function () {
    $.post('/getallcustomers', function (data) {
        $.each(data, function (index, value) {
            AddCustomer(value);
        })
    })
    $('#create').click(function (event) {
        event.preventDefault();
        var dat = $('#form').serializeObject();
        if (dat.card_id == "") {
            alert("Please Specify Card ID")
        } else {
            $.post('/addcustomer', $('#form').serialize(), function (data) {
                if (data.success) {
                    AddCustomer2(dat);
                } else {
                    alert(data.msg);
                }
            })
        }
    })
    $('#sqltable').on('click', '#deletecustomer', function (e) {
        if (confirm("Remove Customer")) {
            e.preventDefault();
            var parent = $(this).closest('tr');
            $.post('/deletecustomer?id=' + parent.data('id'), function (data) {
                if (data.success) {
                    parent.remove();
                }
            })
        }

    })
    $('#sqltable').on('click', '#viewcustomer', function (e) {
        e.preventDefault();
        var parent = $(this).closest('tr');
        window.location.href = '/viewcustomer?id=' + parent.data('id');
    })
    $('#addnew').click(function (e) {
        e.preventDefault();
        blur('#addmodal');
    })
    $('.closemodal').click(function (e) {
        e.preventDefault();
        blur('#addmodal');
    })
});

function blur(name) {
    $('.background').toggleClass('blurred');
    $(name).toggleClass('active');
}

function AddCustomer(data) {
    let markup =
        '<tr id =id-' + data.card_id + '>\
        <td>' + data.card_id + '</td>\
        <td>' + data.points + '</td>\
        <td>' + data.name + '</td>\
        <td>' + data.adrress + '</td>\
        <td>' + data.birth_date.substr(0, data.birth_date.indexOf('T')) + '</td>\
        <td>' + !!+data.married + '</td>\
        <td>' + data.children + '</td>\
        <td>' + !!+data.pets + "</td>\
        <td class = 'text-center'><button id ='deletecustomer', class='btn btn-outline-danger btn-sm'>\
                <i class='fa fa-trash-o'></i>\
			</button>\
			</button><button id ='viewcustomer', class='ml-2 btn btn-outline-primary btn-sm' title='View Customer'>\
            <i class='fa fa-eye' ></i>\
            </button>\
    </tr>";
    $('#customerbody').append(markup);
    $('#id-' + data.card_id).data('id', data.card_id);
}

function AddCustomer2(obj) {
    var data = {}
    data.card_id = obj.card_id;
    data.points = obj.points ? obj.points : 0;
    data.name = obj.first_name + '' + obj.last_name;
    data.adrress = obj.street_name + '' + obj.street_number + '' + obj.city + '' + obj.state + '' + obj.zipcode;
    if (obj.birth_date == '') {
        data.birth_date = '';
    } else {
        data.birth_date = obj.birth_date.substr(0, obj.birth_date.indexOf('T'));
    }
    data.married = !!+ obj.married;
    data.children = obj.children;
    data.pets = !!+obj.pets;
    let markup =
        '<tr id =id-' + data.card_id + '>\
        <td>' + data.card_id + '</td>\
        <td>' + data.points + '</td>\
        <td>' + data.name + '</td>\
        <td>' + data.adrress + '</td>\
        <td>' + data.birth_date.substr(0, data.birth_date.indexOf('T')) + '</td>\
        <td>' + data.married + '</td>\
        <td>' + data.children + '</td>\
        <td>' + data.pets + "</td>\
        <td class = 'text-center'><button id ='deletecustomer', class='btn btn-outline-danger btn-sm'>\
                <i class='fa fa-trash-o'></i>\
			</button>\
			</button><button id ='viewicustomer', class='ml-2 btn btn-outline-primary btn-sm' title='View Customer'>\
            <i class='fa fa-eye' ></i>\
            </button>\
    </tr>";
    $('#customerbody').append(markup);
    $('#id-' + data.card_id).data('id', data.card_id);
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};