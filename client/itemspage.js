$(document).ready(function () {
    var barcode;
    $(`.spinner`).hide();
    $(`.checkmark`).hide();
    barcode = new URLSearchParams(window.location.search).get('barcode');
    if (barcode !== null) {
        alert("viweing item")
    }

    $.get('/getcategories', function (data, success) {
        if (success) {
            $.each(data, (index, value) => {
                AddCategoryOption(value);
            });
        }
    });

    $.post('/getitemsall', function (data) {
        if (data.success) {
            $.each(data.dat, (index, value) => {
                createItems(value);
            })
        }
    })
    $('.sqltable').on('click', '.viewitem', function () {
        var parent = $(this).closest('tr');
        barcode = parent.data('id');
        window.history.pushState(null, null, `?barcode=${barcode}`)
        loadViewModal(barcode);
    });
    $('.sqltable').on('click', '.deleteitem', function () {
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
    $('#create').click(function (e) {
        e.preventDefault()
        var obj = {};
        $.each($('#addform').serializeArray(), function (index, value) {
            if (value.value !== '') obj[value.name] = value.value;
        });
        if (obj['Barcode'] == undefined) {
            alert("Pleace Specify Barcode");
        } else {
            $.post('/additem', obj, function (data) {
                if (data.success) {
                    $.each(data.dat, function (index, value) {
                        createItems(value);
                        $('body, html').animate({ scrollTop: $("#item-" + value.Barcode).offset().top }, "slow");
                    })
                } else {
                    alert(data.msg)
                }
            })
        }
    })
    $('#addnew').click(function (e) {
        e.preventDefault();
        blur('#addmodal');
    })

    $('.sidenav a').click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass('active')) {
            $('.sidenav a').removeClass(`active`);
            $(this).addClass('active')
            var show = $(this).attr('aria-controls');
            ChangeActivePage(`#${show}`);
        }
    })
    $('.closemodal').click(function (e) {
        e.preventDefault();
        window.history.replaceState(null, null, "?");
        var parent = $(this).closest('.popup');
        blur(parent);
    })

    $('.sumbit').click(function (event) {
        event.preventDefault();
        var obj = {};
        $.each($(this).parents('form:first').serializeArray(), function (index, value) {
            if (value.value !== '') obj[value.name] = value.value;
        });
        (!$.isEmptyObject(obj))
        $.post('/updateitem?barcode=' + barcode, obj, function (data) {
            if (data) {
                obj[`catname`] = $('#editcat option:selected').text();
                $.post('/getitemhistory?barcode=' + barcode, function (data, success) {
                    if (data) {
                        CreateHistory(data);
                    }
                })
                showCheckmark();
                UpdateRowItem(obj, barcode);
            } else {
                alert("Duplicate Barcode")
            }
        });
    })

});

function loadViewModal(barcode) {
    $('#sidenav-selected').html(`Item ${barcode}`)

    $.post('/getitemhistory?barcode=' + barcode, function (data, success) {
        if (data) {
            CreateHistory(data);
        }
    })

    $.get('/getitem2?barcode=' + barcode, function (data) {
        if (data) {
            $.each(data, function (index, value) {
                SetUpEditForm(value);
            })

        }
    });

    blur('#view-modal');

}

function SetUpEditForm(values) {
    $.each(values, function (index, data) {
        $(`#editform-2 [name = ${index.toLowerCase()}]`).val(data);
    })
}

function blur(name) {
    $('.background').toggleClass('blurred');
    $(name).toggleClass('active');
}

function ChangeActivePage(show) {
    $(`.modal-body.active`).toggleClass('active');
    $(show).toggleClass(`active`);
}

function createItems(data) {
    let markup =
        "<tr id = item-" + data.Barcode + ">\
        <td>" + data.name + "</td>\
        <td>" + data.Barcode + "</td>\
        <td>" + data.catname + "</td>\
        <td>" + !!+data.signature_item + "</td>\
        <td>" + data.current_price + "$" + "</td>\
        <td class = 'text-center'><button class='deleteitem btn btn-outline-danger btn-sm'>\
                <i class='fa fa-trash-o'></i>\
			</button>\
			</button><button  class='viewitem ml-2 btn btn-outline-primary btn-sm' title='View Item'>\
            <i class='fa fa-eye' ></i>\
            </button>\
        </td>\
    </tr>";
    $('#itembody').append(markup);
    $('#item-' + data.Barcode).data('id', data.Barcode);
}

function AddCategoryOption(value) {
    let markup = "<option value=" + value.category_id + ">" + value.name + "</option>"
    $('.forcategories').append(markup);
}

function CreateHistory(data) {
    $('#historybody').empty();
    $.each(data, function (index, value) {
        let markup =
            '<tr>\
            <td>'+ value.date.replace('T', ' ').replace('Z', '') + '</td>\
            <td>' + value.old_price + '</td>\
            <td>' + value.new_price + '</td>\
        </tr>'

        $('#historybody').append(markup);
    })

}

function UpdateRowItem(data, barc) {
    var rows = $(`#item-${barc} td`);
    $(`#item-${barc}`).data('id', data.barcode)
    $(`#item-${barc}`).id = `#item-${data.barcode}`
    $('#sidenav-selected').html(`Item ${data.barcode}`)
    rows.eq(0).html(data.name);
    rows.eq(1).html(data.barcode);
    rows.eq(2).html(data.catname);
    rows.eq(3).html(!!+data.signature_item ? "true" : `false`);
    rows.eq(4).html(`${data.current_price}$`);
}


function showCheckmark() {
    if ($(`.checkmark`).is(':hidden')) {
        $(`.checkmark`).show();
        window.setTimeout(function () {
            $(`.checkmark`).fadeOut("fast");
        }, 1500)
    }
}