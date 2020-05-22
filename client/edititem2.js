$(document).ready(function () {
    let barcode = new URLSearchParams(window.location.search).get('barcode');
    $.get('/getitem2?barcode=' + barcode, function (data) {
        if (data) {
            $.each(data, function (index, value) {
                createItems(value);
            });
        }
    })
    $.get('/getcategories', function (data, success) {
        if (success) {
            $.each(data, (index, value) => {
                AddCategoryOption(value);
            });
        }
    });
    $('.sumbit').click(function (event) {
        event.preventDefault();
        var obj = {};
        var butid = $(this).attr('id');
        $.each($(this).parents('form:first').serializeArray(), function (index, value) {
            if (value.value !== '') obj[value.name] = value.value;
        });
        if (!$.isEmptyObject(obj)) {
            $.post('/updateitem?barcode=' + barcode, obj, function (data) {
                if (data) {
                    if (obj['barcode'] !== undefined) {
                        window.location.href = '/edititem2?barcode=' + obj['barcode'];
                    } else if (obj['category_id'] !== null) {
                        window.location.reload();
                    }
                } else {
                    alert("Duplicate Barcode")
                }
            });
        }

    })
});

function AddValue(obj, name, value) {
    if (value !== '') obj[name] = value;
}

function createItems(data) {
    let markup =
        '<tr id = item-' + data.Barcode + '>\
        <td>' + data.name + '</td>\
        <td>' + data.Barcode + '</td>\
        <td>' + data.catname + '</td>\
        <td>' + !!+data.signature_item + '</td>\
        <td>' + data.current_price + '$' + "</td>\
    </tr>";
    $('#itembody').append(markup);
    $('#item-' + data.Barcode).data('id', data.Barcode);
}

function AddCategoryOption(value) {
    let markup = "<option value=" + value.category_id + ">" + value.name + "</option>"
    $('#forcategories').append(markup);
}
