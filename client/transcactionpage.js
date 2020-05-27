$(document).ready(function () {
    $.post('/getalltranscactions', function (data) {
        if (data.success) {
            $.each(data.dat, function (index, value) {
                AddTranscaction(value);
            }, $('.spinner').hide());
        }
    })
    $('#sqltable').on('click', '#viewtranscaction', function (event) {
        event.preventDefault();
        var parent = $(this).closest('tr');
        var id = parent.data('id');
        $.post('/gettranscactionitems?id=' + id, function (data) {
            if (data.success) {

                $('#itembody').empty();
                $.each(data.dat, function (index, value) {
                    createItems(value);
                }, blur())
            } else {
                alert(data.msg)
            }

        })
    })
    $(document).keyup(function (e) {
        if (e.key == "Escape" && $('.popup').hasClass('active')) {
            blur();
        }
    })
    $('.closemodal').click(function (e) {
        e.preventDefault();
        blur();
    })
    $('#filter').click(function (e) {
        e.preventDefault();
        $('.spinner').show();
        let rows = $('#transcactionbody tr');
        var temp = $('#filterform').serializeArray(),
            obj = {};
        console.log(temp);
        $.each(temp, function (index, value) {
            if (value.value !== "") {
                obj[value.name] = value.value

            }
        });
        if (!$.isEmptyObject(obj)) {
            $.post("/filtertranscaction", obj, function (data) {
                if (data.success) {
                    $(rows).hide();
                    filterRows(data.dat);
                } else {
                    $('.spinner').hide();
                    alert("Incorrect Input For field(s)")
                }
            });
        } else {
            rows.show("fast", function () {
                $('.spinner').hide();
            }
            );
        }

    })
});

function blur() {
    $('.background').toggleClass('blurred');
    $('.popup').toggleClass('active');
}

function filterRows(data) {
    $.each(data, function (index, value) {
        $('#transcaction-' + value.id).show("slow");
    }, $('.spinner').hide())
}


function AddTranscaction(data) {
    let markup = '<tr id = transcaction-' + data.id + ' >\
        <td class="id">' + data.id + '</td>\
        <td class="payment_method">' + data.payment_method + '</td>\
        <td class="card_id">' + data.card_id + '</td>\
        <td class="date">' + data.date.replace('T', ' ').replace('Z', '') + '</td>\
        <td class="store_id"> ' + data.store_id + '</td>\
        <td class="total_price">' + data.total_price + '</td>\
        <td class="total_pieces">' + data.total_pieces + '</td>\
        <td><button id ="viewtranscaction", class="btn btn-outline-primary btn-sm">\
            <i class="fa fa-eye"></i>\
            </button>\</td>\
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