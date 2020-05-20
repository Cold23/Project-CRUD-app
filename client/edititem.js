$(document).ready(function () {
    let params = new URLSearchParams(window.location.search)
    let barcode = params.get('barcode');
    let id = params.get('id');
    $.get('/getitem1?barcode=' + barcode + "&&id=" + id, function (data) {
        if (data) {
            $.each(data, function (index, value) {
                createItems(value);
            });
        }
    })
    $.post('/getitemhistory?barcode=' + barcode, function (data, success) {
        if (data) {
            $.each(data, function (index, value) {
                CreateHistory(value);
            });
        }
    })
    $('#back').click(function (event) {
        event.preventDefault();
        window.location.href = '/viewsuper2?id=' + id;
    });

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
        if (!!!+butid && !$.isEmptyObject(obj)) {
            $.post('/updateshopitem?id=' + id + '&barcode=' + barcode, obj, function (data, success) {
                window.location.reload();
            })
        } else if (!$.isEmptyObject(obj)) {
            $.post('/updateitem?barcode=' + barcode, obj, function (data) {
                if (data) {
                    if (obj['barcode'] !== undefined) {
                        window.location.href = '/edititem?barcode=' + obj['barcode'] + '&id=' + id;
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
        <td>' + data.Barcode + '</td>\
        <td>' + data.name + '</td>\
        <td>' + !!+data.signature_item + '</td>\
        <td>' + data.current_price + '$' + '</td>\
        <td>' + data.self + '</td>\
        <td>' + data.aisle + "</td>\
    </tr>";
    $('#itembody').append(markup);
    $('#item-' + data.Barcode).data('id', data.Barcode);
}

function AddCategoryOption(value) {
    let markup = "<option value=" + value.category_id + ">" + value.name + "</option>"
    $('#forcategories').append(markup);
}
function CreateHistory(value) {
    let markup =
        '<tr>\
            <td>'+ value.date.replace('T', ' ').replace('Z', '') + '</td>\
            <td>' + value.old_price + '</td>\
            <td>' + value.new_price + '</td>\
        </tr>'

    $('#historybody').append(markup);
}
