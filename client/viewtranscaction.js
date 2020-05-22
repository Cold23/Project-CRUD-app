$(document).ready(function () {
    let id = new URLSearchParams(window.location.search).get('id');
    $.post('/gettranscaction1?id=' + id, function (data) {
        $.each(data.dat, function (index, value) {
            AddTranscaction(value);
        })
    })
    $.post('/gettranscactionitems?id=' + id, function (data) {
        if (data.success) {
            $.each(data.dat, function (index, value) {
                createItems(value);
            })
        } else {
            alert(data.msg)
        }

    })
});

function AddTranscaction(data) {
    let markup = '<tr id = transcaction-' + data.id + ' >\
        <td>' + data.id + '</td>\
        <td>' + data.payment_method + '</td>\
        <td>' + data.card_id + '</td>\
        <td>' + data.date.replace('T', ' ').replace('Z', '') + '</td>\
        <td>' + data.store_id + '</td>\
        <td>' + data.total_pieces + '</td>\
        <td>' + data.total_price + '</td>\
    </tr>'
    $('#transcactionbody').append(markup);
    $('#transcaction-' + data.id).data('id', data.id)
}

function createItems(data) {
    let markup =
        '<tr id = item-' + data.Barcode + '>\
        <td>' + data.name + '</td>\
        <td>' + data.Barcode + '</td>\
        <td>' + data.catname + '</td>\
        <td>' + !!+data.signature_item + '</td>\
        <td>' + data.current_price + '$' + '</td>\
        <td>' + data.amount + '</td>\
    </tr>';
    $('#itembody').append(markup);
    $('#item-' + data.Barcode).data('id', data.Barcode);
}