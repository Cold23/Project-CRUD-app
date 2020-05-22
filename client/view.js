$(document).ready(function () {
	let id = new URLSearchParams(window.location.search).get('id');
	$.post('/getsupersingle?id=' + id, function (data, success) {
		if (success) {
			$.each(data, function (index, value) {
				NewShopRowFromGet(value);
			});
		}
	});

	$('.sqltable').on('click', '#deleteitem', function () {
		if (confirm('Remove item from store')) {
			var parent = $(this).closest('tr');
			$.post('/deletesuperitem?id=' + id + '&barcode=' + parent.data('id'), function (data, success) {
				if (data) {
					parent.remove();
					$.post('/getcategory?id=' + id, function (data, success) {
						if (success) {
							createCategory(data);
						}
					});
				} else {
					alert('error');
				}
			});
		}
	});
	$('.sqltable').on('click', '#edititem', function () {
		var parent = $(this).closest('tr');
		window.location.href = '/edititem?barcode=' + parent.data('id') + '&id=' + id;
	});
	$.post('/getsuperitemsall', function (data, success) {
		if (success) {
			$.each(data, (index, value) => {
				AddItemOption(value);
			});
		}
	});
	$('.sqltable').on('click', '#viewtranscaction', function () {
		event.preventDefault();
		var parent = $(this).closest('tr');
		window.location.href = '/transcaction?id=' + parent.data('id');
	});

	$('#additem').click(function (event) {
		event.preventDefault();
		var obj = $('#itemform').serialize();
		$.post('/addsuperitem?id=' + id, obj, function (data, success) {
			if (data.success) {
				createItems(data.values[0]);
				$.post('/getcategory?id=' + id, function (data, success) {
					if (success) {
						createCategory(data);
					}
				});
			} else {
				alert(data.code);
			}
		});
	});
	$.post('/getsuperitems?id=' + id, function (data, success) {
		if (success) {
			$.each(data, (index, value) => {
				createItems(value);
			});
		}
	});
	$.post('/getcategory?id=' + id, function (data, success) {
		if (success) {
			createCategory(data);
		}
	});
	$.post('/gettranscaction?id=' + id, function (data, success) {
		if (success) {
			if (!$.isEmptyObject(data)) {
				createTranscaction(data);
			}

		}
	});
	$.post('/popularpairs?id=' + id, function (data) {
		if (data.success) {
			$.each(data.dat, function (index, value) {
				AddTopPair(value);
			})
		}
	})
	$('#submitedit').click(function (event) {
		event.preventDefault();
		var obj = {};
		$.each($('#editform').serializeArray(), function (index, value) {
			if (value.value !== '') obj[value.name] = value.value;
		});
		delete obj['opentime'];
		delete obj['closetime'];
		if ($('#time1').val() !== '' && $('#time2').val() !== '') {
			obj['times'] = $('#time1').val() + '-' + $('#time2').val();
		}
		console.log(obj);
		if (!$.isEmptyObject(obj)) {
			$.post('/updateshop?id=' + id, obj, function (data) {
				if (data.success) {
					if (obj['id']) {
						window.location.href = window.location.href.replace(/[\?#].*|$/, '?id=' + obj['id']);
					} else {
						window.location.reload();
					}
				} else {
					alert(data.msg);
				}
			});
		}
	});

	$('.show').click(function (event) {
		event.preventDefault();
		$(this).children().toggleClass('fa-eye fa-eye-slash');
	});

});

function AddItemOption(item) {
	let post = '<option value=' + item.Barcode + '>' + item.Barcode + '</option>';
	$('#foritems').append(post);
}

function createItems(data) {
	let markup =
		'<tr id = item-' + data.Barcode + '>\
		<td>' + data.name + '</td>\
		<td>' + data.Barcode + '</td>\
		<td>' + data.catname + '</td>\
		<td>' + !!+data.signature_item + '</td>\
		<td>' + data.current_price + '$' + '</td>\
		<td>' + data.self + '</td>\
		<td>' + data.aisle + "</td>\
		<td class = 'text-center'><button id ='deleteitem', class='btn btn-outline-danger btn-sm'>\
                <i class='fa fa-trash-o'></i>\
			</button>\
            <button id ='edititem', class='ml-2 btn btn-outline-primary btn-sm'>\
            <i class='fa fa-edit'></i>\
			</button>\
        </td>\
    </tr>";
	$('#itembody').append(markup);
	$('#item-' + data.Barcode).data('id', data.Barcode);
}

function createCategory(data) {
	$('#categorybody').empty();
	$.each(data, function (index, value) {
		let markup =
			"<tr id= 'category-' " +
			value.category_id +
			' ><td>' +
			value.category_id +
			'</td><td>' +
			value.name +
			'</td></tr>';
		$('#categorybody').append(markup);
		$('#category-' + value.category_id).data('id', value.category_id);
	});
}

function createTranscaction(data) {
	$.each(data, function (index, value) {
		let markup =
			'<tr id = transcaction-' +
			value.id +
			'><td>' +
			value.id +
			'</td><td>' +
			value.payment_method +
			'</td><td>' +
			value.card_id +
			'</td><td>' +
			value.date.replace('T', ' ').replace('Z', '') +
			'</td>\
			<td>' + value.store_id + '</td>\
			<td>' + value.total_pieces + '</td>\
			<td>' + value.total_price + ' $' + "</td>\
            <td class = 'text-center'><button id ='viewtranscaction', class='btn btn-outline-primary btn-sm'>\
                    <i class='fa fa-eye'></i>\
                </button>\
            </td>\
        </tr>";
		$('#transcactionbody').append(markup);
		$('#transcaction-' + value.id).data('id', value.id);
	});
}

function NewShopRowFromGet(value) {
	var newrow = {};
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
		'><td>' +
		newrow.id +
		'</td><td>' +
		newrow.square +
		'</td><td>' +
		newrow.open_on +
		'</td><td>' +
		newrow.hours +
		'</td><td>' +
		newrow.adrress +
		'</td><td>' +
		newrow.phone +
		'</td></tr>';
	$('#storebody').append(markup);
	$('#super-' + newrow.id).data('id', newrow.id);
}

function AddTopPair(data) {
	let markup = "<tr>\
		<td>"+ data.name1 + "</td>\
		<td>"+ data.name2 + "</td>\
		<td>"+ data.weight + "</td>\
	</tr>"
	$('#pairbody').append(markup);
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
