$(document).ready(function () {
    let id = new URLSearchParams(window.location.search).get('id');
    $.post('/getcustomersingle?id=' + id, function (data) {
        $.each(data, (index, value) => {
            CreateCustomer(value);
        })
    })
    $.post('/getcustomertranscactions?id=' + id, function (data) {
        if (data.success) {
            $.each(data.dat, function (index, value) {
                AddTranscaction(value);
            })
        } else {
            alert(data.msg);
        }
    })
    $('.show').click(function () {
        $(this).children('i').toggleClass('fa-eye fa-eye-slash')
    })
    $.post('/customersupermarkets?id=' + id, function (data) {
        if (data.success) {
            $.each(data.data, function (index, value) {
                AddStore(value);
            })
        } else {
            alert(data.msg);
        }
    })
    $.post('/customerfavourite?id=' + id, function (data) {
        if (data.success) {
            $.each(data.dat, function (index, value) {
                AddTopItem(value);
            })
        } else {
            alert(data.msg)
        }
    })
    $('.sqltable').on('click', '#viewtranscaction', function (event) {
        event.preventDefault();
        var parent = $(this).closest('tr');
        window.open('/transcaction?id=' + parent.data('id'));
    })
    $('.sqltable').on('click', '#viewshop', function (event) {
        event.preventDefault();
        var parent = $(this).closest('tr');
        window.open('/viewsuper2?id=' + parent.data('id'));
    })
    $('#submitedit').click(function (event) {
        event.preventDefault();
        var obj = {};
        $.each($('#editform').serializeArray(), function (index, value) {
            if (value.value !== '') obj[value.name] = value.value;
        });
        console.log(obj);
        if (!$.isEmptyObject(obj)) {
            $.post('/editcustomer?id=' + id, obj, function (data) {
                if (data.success) {
                    if (obj['card_id']) {
                        window.location.href = window.location.href.replace(/[\?#].*|$/, '?id=' + obj['card_id']);
                    } else {
                        window.location.reload();
                    }
                } else {
                    alert(data.msg);
                }
            });
        }
    });
});

function CreateCustomer(data) {
    let markup =
        '<tr>\
        <td>' + data.card_id + '</td>\
        <td>' + data.points + '</td>\
        <td>' + data.name + '</td>\
        <td>' + data.adrress + '</td>\
        <td>' + data.birth_date.substr(0, data.birth_date.indexOf('T')) + '</td>\
        <td>' + !!+data.married + '</td>\
        <td>' + data.children + '</td>\
        <td>' + !!+data.pets + "</td>\
    </tr > ";
    $('#customerbody').append(markup);

}

function AddStore(data) {
    let markup =
        " <tr id=store-" + data.id + ">\
            <td>"+ data.id + "</td>\
            <td>" + data.square_meters + "</td>\
            <td>" + data.days_open + "</td>\
            <td>" + data.times + "</td>\
            <td>" + data.adrress + "</td>\
            <td>" + data.phone_number + "</td>\
            <td><button id='viewshop' , class='btn btn-outline-primary btn-sm'><i class='fa fa-eye'></i></button></td>\
        </tr>"
    $('#storesbody').append(markup);
    $('#store-' + data.id).data('id', data.id);
}

function AddTranscaction(data) {
    let markup = '<tr id = transcaction-' + data.id + ' >\
        <td class="id">' + data.id + '</td>\
        <td class="payment_method">' + data.payment_method + '</td>\
        <td class="card_id">' + data.card_id + '</td>\
        <td class="date">' + data.date.replace('T', ' ').replace('Z', '') + '</td>\
        <td class="store_id"> ' + data.store_id + '</td>\
        <td class="store_id"> ' + data.total_pieces + '</td>\
        <td class="total_price">' + data.total_price + " $" + '</td>\
        <td><button id ="viewtranscaction", class="btn btn-outline-primary btn-sm">\
            <i class="fa fa-eye"></i>\
            </button>\</td>\
    </tr>'
    $('#transcactionbody').append(markup);
    $('#transcaction-' + data.id).data('id', data.id)
}

function AddTopItem(data) {
    let markup =
        "<tr id = item-" + data.Barcode + ">\
        <td>" + data.name + "</td>\
        <td>" + data.Barcode + "</td>\
        <td>" + data.catname + "</td>\
        <td>" + !!+data.signature_item + "</td>\
        <td>" + data.current_price + "$" + "</td>\
        <td class = 'text-center'>\
            <button id ='viewitem', class='btn btn-outline-primary btn-sm' title='View Item'>\
            <i class='fa fa-eye' ></i>\
            </button>\
        </td>\
    </tr>";
    $('#topitembody').append(markup);
    $('#item-' + data.Barcode).data('id', data.Barcode);
}