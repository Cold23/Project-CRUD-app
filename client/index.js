$(document).ready(function () {
	$('#create').click(function (event) {
		event.preventDefault();
		var obj = $('#createform').serialize();
		$.post('/insert', obj, function (data, success) {
			if (data) {
				var dat = $('#createform').serializeObject()
				NewShopRowFromForm(dat);
				blur('#addmodal')
				$('body, html').animate({ scrollTop: $("#super-" + dat.id).offset().top }, "slow");
				$('#createform').trigger("reset");
			} else {
				alert('wrong/duplicate entry');
			}
		});
	});

	$('#addnew').click(function (e) {
		e.preventDefault();
		blur('#addmodal');
	})
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
		let id = $(parent).data('id');
		window.history.replaceState(null, null, `?id=${id}`);
		$.post(`/getsupersingle?id=${id}`, function (data, success) {
			if (success) {
				$.each(data, function (index, value) {
					SetUpEditForm(value);
				});
			}
		})
		$.post('/getsuperitemsall', function (data, success) {
			if (success) {
				$.each(data, (index, value) => {
					AddItemOption(value);
				});
			}
		});
		$.post('/getsuperitems?id=' + id, function (data, success) {
			if (success) {
				createItems(data);
			}
		});
		$.post('/getcategory?id=' + id, function (data, success) {
			if (success) {
				createCategory(data);
			}
		});
		blur("#viewmodal");
	});
	$('.closemodal').click(function (e) {
		e.preventDefault();
		var parent = $(this).closest('.popup');
		blur(parent);
	})
	$('#additem').click(function (event) {
		event.preventDefault();
		let sid = new URLSearchParams(window.location.search).get('id');
		var obj = $('#itemform').serialize();
		$.post(`/addsuperitem?id=${sid}`, obj, function (data, success) {
			if (data.success) {
				createItems(data.values[0]);
				$.post('/getcategory?id=' + sid, function (data, success) {
					if (success) {
						createCategory(data);
					}
				});
			} else {
				alert(data.code);
			}
		});
	});
	$('.sqltable').on('click', '#deleteitem', function () {
		if (confirm('Remove item from store')) {
			var parent = $(this).closest('tr');
			let sid = new URLSearchParams(window.location.search).get('id');
			$.post('/deletesuperitem?id=' + sid + '&barcode=' + parent.data('id'), function (data, success) {
				if (data) {
					parent.hide("slow", () => {
						$(this).remove();
					})
					$.post('/getcategory?id=' + sid, function (data, success) {
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
	$('.sidenav a').click(function (e) {
		e.preventDefault();
		if (!$(this).hasClass('active')) {
			$('.sidenav a').removeClass(`active`);
			$(this).addClass('active')
			var show = $(this).attr('aria-controls');
			ChangeActivePage(`#${show}`);
		}
	})
});

function SetUpEditForm(data) {
	$('#editform [name = id]').val(data.id);
	$('#editform [name = square_meters]').val(data.square_meters);
	$('#editform [name = open]').val(data.days_open);
	$('#editform [name = opentime]').val(`0${data.times.split('-')[0]}`);
	$('#editform [name = closetime]').val(data.times.split('-')[1]);
	$('#editform [name = streetname]').val(data.street_name);
	$('#editform [name = streetno]').val(data.street_number);
	$('#editform [name = city]').val(data.city);
	$('#editform [name = state]').val(data.state);
	$('#editform [name = zip]').val(data.zipcode);
	$('#editform [name = phone]').val(data.phone_number);
}

function ChangeActivePage(show) {
	$(`.modal-body.active`).toggleClass('active');
	$(show).toggleClass(`active`);
}

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

function blur(name) {
	$('.background').toggleClass('blurred');
	$(name).toggleClass('active');
}

function AddItemOption(item) {
	let post = `<option value = ${item.Barcode} > ${item.name} - ${item.Barcode} </option>`;
	$('#foritems').append(post);
}

function createItems(value) {
	$('#itembody').empty();
	$.each(value, function (index, data) {
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
	})


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
