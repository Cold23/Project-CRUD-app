$(document).ready(function () {
    $.post('/getsalesview', function (data) {
        $.each(data, function (index, value) {
            AddSales(value);
        })
    })
});

function AddSales(data) {
    let markup = "<tr>\
        <td>"+ data.id + "</td>\
        <td>"+ data.name + "</td>\
        <td>"+ data.sales + "</td>\
    </tr>"
    $('#storebody').append(markup);

}