$(document).ready(function () {
	$('#create').click(function (event) {
		event.preventDefault();
		var obj = $('#form').serialize();
		$.post('/insert', obj, function (data, success) {
			if (data) {
				var dat = $('#form').serializeObject()
				NewShopRowFromForm(dat);
				$('#collapse').collapse('show');
				$('body, html').animate({ scrollTop: $("#super-" + dat.id).offset().top }, "slow");
			} else {
				alert('wrong/duplicate entry');
			}
		});
	});
	$('.collapsebutton').click(function (event) {
		$(this).children().toggleClass('fa-eye fa-eye-slash');
	});
	$.get('/getsuper', function (data, success) {
		$.each(data, function (index, value) {
			NewShopRowFromGet(value);
		});
	}).fail(function () { });
	$('#sqltable').on('click', '#deleteshop', function () {
		if (confirm('Delete this shop')) {
			var parent = $(this).closest('tr');
			$.post('/deletesuper', { id: parent.data('id') }, function (success) {
				parent.remove();
			});
		}
	});
	$('#sqltable').on('click', '#viewshop', function () {
		var parent = $(this).closest('tr');
		$.post('/viewsuper', function (data, success) {
			if (success) {
				window.location.href = 'viewsuper2?id=' + parent.data('id');
			}
		});
	});
});

function NewShopRowFromForm(value) {
	var newrow = {
		id: '',
		square: '',
		open_on: '',
		hours: '',
		adrress: '',
		phone: ''
	};
	newrow.id = value.id;
	newrow.square = value.square_meters;
	newrow.open_on = value.open;
	newrow.hours = value.opentime + '-' + value.closetime;
	newrow.phone = value.phone;
	newrow.adrress = value.streetname + ' ' + value.streetno + ' ' + value.city + ' ' + value.state + ' ' + value.zip;
	let markup =
		'<tr id = super-' +
		newrow.id +
		'>\
        <td>' +
		newrow.id +
		'</td>\
        <td>' +
		newrow.square +
		'</td>\
        <td>' +
		newrow.open_on +
		'</td>\
        <td>' +
		newrow.hours +
		'</td>\
        <td>' +
		newrow.adrress +
		'</td>\
        <td>' +
		newrow.phone +
		"</td>\
        <td class = 'text-center'><button id ='deleteshop', class='mr-2 btn btn-outline-danger btn-sm'>\
            <i class='fa fa-trash-o'></i>\
            </button><button id ='viewshop', class='mr-2 btn btn-outline-primary btn-sm'>\
            <i class='fa fa-eye'></i>\
            </button>\
            </button><button id ='editshop', class='btn btn-outline-danger btn-sm'>\
            <i class='fa fa-edit'></i>\
            </button>\
        </td>\
    </tr>";
	$('#storebody').append(markup);
	$('#super-' + newrow.id).data('id', newrow.id);
}

function NewShopRowFromGet(value) {
	var newrow = {
		id: '',
		square: '',
		open_on: '',
		hours: '',
		adrress: '',
		phone: ''
	};
	newrow.id = value.id;
	newrow.square = value.square_meters;
	newrow.open_on = value.days_open;
	newrow.hours = value.times;
	newrow.phone = value.phone_number;
	newrow.adrress =
		value.street_name + ' ' + value.street_number + ' ' + value.city + ' ' + value.state + ' ' + value.zipcode;
	let markup =
		'<tr id = super-' +
		newrow.id +
		'>\
        <td>' +
		newrow.id +
		'</td>\
        <td>' +
		newrow.square +
		'</td>\
        <td>' +
		newrow.open_on +
		'</td>\
        <td>' +
		newrow.hours +
		'</td>\
        <td>' +
		newrow.adrress +
		'</td>\
        <td>' +
		newrow.phone +
		"</td>\
        <td class = 'text-center'><button id ='deleteshop', class='mr-2 btn btn-outline-danger btn-sm'>\
            <i class='fa fa-trash-o'></i>\
            </button><button id ='viewshop', class='mr-2 btn btn-outline-primary btn-sm'>\
            <i class='fa fa-eye'></i>\
            </button>\
            </button>\
        </td>\
    </tr>";
	$('#storebody').append(markup);
	$('#super-' + newrow.id).data('id', newrow.id);
}

$.fn.serializeObject = function () {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function () {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
