$(document).ready(function () {
    $.post('/getcustomersview', function (data) {
        $.each(data, function (index, value) {
            AddCustomer(value);
        })
    })
});

function AddCustomer(data) {
    let markup = "<tr>\
        <td>"+ data.name + "</td>\
        <td>"+ data.adrress + "</td>\
        <td>"+ data.birth_date.substr(0, 10) + "</td>\
        <td>"+ !!+data.married + "</td>\
        <td>"+ data.children + "</td>\
        <td>"+ data.pets + "</td>\
    </tr>"
    $('#customerbody').append(markup);

}