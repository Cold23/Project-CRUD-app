$(document).ready(function () {
    $.post('/getitemsall', function (data) {
        if (data.success) {
            $.each(data.dat, (index, value) => {
                createItems(value);
            })
        }
    })
    $('#sqltable').on('click', '#viewitem', function () {
        var parent = $(this).closest('tr');
        window.location.href = '/viewitem?barcode=' + parent.data('id');
    });
    $('#sqltable').on('click', '#deleteitem', function () {
        if (confirm('Remove item ?')) {
            var parent = $(this).closest('tr');
            $.post('/deleteitem?barcode=' + parent.data('id'), function (data, success) {
                if (data) {
                    parent.remove();
                } else {
                    alert('error');
                }
            });
        }
    });
});

function createItems(data) {
    let markup =
        "<tr id = item-" + data.Barcode + ">\
        <td>" + data.Barcode + "</td>\
        <td>" + data.name + "</td>\
        <td>" + !!+data.signature_item + "</td>\
        <td>" + data.current_price + "$" + "</td>\
        <td class = 'text-center'><button id ='deleteitem', class='btn btn-outline-danger btn-sm'>\
                <i class='fa fa-trash-o'></i>\
			</button>\
			</button><button id ='viewitem', class='ml-2 btn btn-outline-primary btn-sm' title='View Item'>\
            <i class='fa fa-eye' ></i>\
            </button>\
        </td>\
    </tr>";
    $('#itembody').append(markup);
    $('#item-' + data.Barcode).data('id', data.Barcode);
}