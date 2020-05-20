$(document).ready(function () {
    $.post('/getalltranscactions', function (data) {
        if (data.success) {
            $.each(data.dat, function (index, value) {
                AddTranscaction(value);
            })
        }
    })
    $("#filter").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#sqltable > tbody > tr ").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $('#sqltable').on('click', '#viewtranscaction', function (event) {
        event.preventDefault();
        var parent = $(this).closest('tr');
        window.location.href = '/transcaction?id=' + parent.data('id');
    })

    var $filters = $('#filter_table input');

    $filters.on("keyup", function () {
        var $rows = $('tbody > tr');

        var $i = $filters.filter(function () {
            return $.trim(this.value).length > 0;
        }),
            len = $i.length; //get inputs that are not empty;

        if (len === 0) return $rows.show(); // if length == 0 show all rows because inputs are all empty no filtering needed

        var cls = '.' + $i.map(function () {
            return this.className
        }).get().join(',.'); // get input calss and make it .CLASSNAME

        $rows.hide().filter(function () {
            return $('td', this).filter(cls).filter(function () { // filter tds with above .CLASSNAME
                var content = this.textContent, // foreach td get the text value 
                    inputVal = $i.filter('.' + this.className).val(); // filter non-empty inputs foreach collumn
                return content.indexOf(inputVal) > -1; //finds matching letters at index (starts from 0)

            }).length === len;
        }).show();
    });
});


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