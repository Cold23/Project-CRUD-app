$(document).ready(function () {
	var barcode, sid;
	$(`.spinner`).hide();
	$(`.checkmark`).hide();
	sid = new URLSearchParams(window.location.search).get('id');
	if (sid !== null) {
		loadViewModal(sid);
	}
	$('#create').click(function (event) {
		event.preventDefault();
		var obj1 = {};
		$.each($('#createform').serializeArray(), function (index, value) {
			if (value.value !== '') obj1[value.name] = value.value;
		});
		delete obj1['opentime'];
		delete obj1['closetime'];
		if ($('#time12').val() !== '' && $('#time22').val() !== '') {
			obj1['times'] = $('#time12').val() + '-' + $('#time22').val();
		}
		if (!$.isEmptyObject(obj1)) {
			$.post('/insert', obj1, function (data, success) {
				if (data) {
					NewShopRowFromForm(obj1);
					blur('#addmodal')
					$('body, html').animate({ scrollTop: $("#super-" + obj1.id).offset().top }, "slow");
					$('#createform').trigger("reset");
				} else {
					alert('wrong/duplicate entry');
				}
			});
		} else {
			alert("Empty Values?")
		}

	});

	$('#addnew').click(function (e) {
		e.preventDefault();
		blur('#addmodal');
	})
	$.get('/getsuper', function (data, success) {
		$.each(data, function (index, value) {
			NewShopRowFromGet(value);
		});
	}).fail(function () { });
	$('.sqltable').on('click', '.deleteshop', function () {
		if (confirm('Delete this shop')) {
			var parent = $(this).closest('tr');
			$.post('/deletesuper', { id: parent.data('id') }, function (success) {
				parent.remove();
			});
		}
	});
	$('.sqltable').on('click', '.viewshop', function () {
		var parent = $(this).closest('tr');
		sid = $(parent).data('id');
		window.history.replaceState(null, null, `?id=${sid}`);
		loadViewModal(sid);
	});

	$('.sqltable').on('click', '.viewitem', function () {
		$('.viewitem i').removeClass(`fa-eye-slash`);
		$('.viewitem i').addClass(`fa-eye`);
		if ($(this).hasClass(`active`)) {
			$('#item-view').fadeOut();
			$(this).removeClass('active')
			return;
		}

		$(`.viewitem`).removeClass('active');
		$(this).children('i').toggleClass('fa-eye fa-eye-slash')
		$(this).addClass('active')
		var parent = $(this).closest('tr');
		barcode = parent.data('id')
		window.history.replaceState(null, null, `?id=${sid}&barcode=${barcode}`);
		$.get(`/getitem1?barcode=${barcode}&id=${sid}`, function (data) {
			if (data) {
				$.each(data, function (index, value) {
					SetUpItemForm(value);
				});
			}
		});
		$.post('/getitemhistory?barcode=' + barcode, function (data, success) {
			if (data) {
				CreateHistory(data);
			}
		})
		$('.modal-body').animate({ scrollTop: 0 }, "slow");
		$('#item-view').fadeIn();

	});

	$('.sumbit').click(function (event) {
		event.preventDefault();
		var obj = {};
		var butid = $(this).attr('id');
		$.each($(this).parents('form:first').serializeArray(), function (index, value) {
			if (value.value !== '') obj[value.name] = value.value;
		});
		if (!!!+butid && !$.isEmptyObject(obj)) {
			$.post('/updateshopitem?id=' + sid + '&barcode=' + barcode, obj, function (data, success) {
				showCheckmark();
				UpdateRowItem(obj, barcode, false);
			})
		} else if (!$.isEmptyObject(obj)) {
			$.post('/updateitem?barcode=' + barcode, obj, function (data) {
				if (data) {
					obj[`catname`] = $('#forcategories option:selected').text();
					$.post('/getitemhistory?barcode=' + barcode, function (data, success) {
						if (data) {
							CreateHistory(data);
						}
					})
					showCheckmark();
					UpdateRowItem(obj, barcode, true);
				} else {
					alert("Duplicate Barcode")
				}
			});
		}

	})

	$.get('/getcategories', function (data, success) {
		if (success) {
			$.each(data, (index, value) => {
				AddCategoryOption(value);
			});
		}
	});
	$('.sqltable').on('click', '.viewtranscaction', function () {
		$('.viewtranscaction i').removeClass(`fa-eye-slash`);
		$('.viewtranscaction i').addClass(`fa-eye`);
		if ($(this).hasClass(`active`)) {
			$('#tr-items').fadeOut();
			$(this).removeClass('active')
			return;
		}
		$(`.viewtranscaction`).removeClass('active');
		$(this).children('i').toggleClass('fa-eye fa-eye-slash')
		$(this).addClass('active')
		var parent = $(this).closest('tr');
		var trid = parent.data('id')
		$('#trid').html(trid)
		$.post('/gettranscactionitems?id=' + trid, function (data) {
			if (data.success) {
				createItemstr(data.dat);
				$('#tr-items').fadeIn();
				$('.modal-body, html').animate({ scrollTop: 0 }, "slow");
			} else {
				alert(data.msg)
			}

		})
	});
	$('.closemodal').click(function (e) {
		e.preventDefault();
		window.history.replaceState(null, null, "?");
		var parent = $(this).closest('.popup');
		blur(parent);
		$(`#item-view`).fadeOut();
		$(`#tr-items`).fadeOut();
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
	$('.sqltable').on('click', '.deleteitem', function () {
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
	$('#submitedit').click(function (event) {
		event.preventDefault();
		let sid = new URLSearchParams(window.location.search).get('id');
		var obj = {};
		$.each($('#editform').serializeArray(), function (index, value) {
			if (value.value !== '') obj[value.name] = value.value;
		});
		delete obj['opentime'];
		delete obj['closetime'];
		if ($('#time1').val() !== '' && $('#time2').val() !== '') {
			obj['times'] = $('#time1').val() + '-' + $('#time2').val();
		}
		if (!$.isEmptyObject(obj)) {
			$.post(`/updateshop?id=${sid}`, obj, function (data) {
				if (data.success) {
					showCheckmark();
					SetUpEditForm(obj);
					UpdateRowShop(obj, sid);
				} else {
					alert(data.msg);
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

function createItemstr(value) {
	$('#tritembody').children('tr:not(:first)').remove();
	$.each(value, function (index, data) {
		let markup =
			'<tr id = item-' + data.Barcode + '>\
        <td>' + data.name + '</td>\
        <td>' + data.Barcode + '</td>\
        <td>' + data.catname + '</td>\
        <td>' + !!+data.signature_item + '</td>\
        <td>' + data.current_price + '$' + '</td>\
        <td>' + data.amount + '</td>\
    </tr>';
		$('#tritembody').append(markup);
		$('#item-' + data.Barcode).data('id', data.Barcode);
	})

}

function UpdateRowShop(data, tsid) {
	var rows = $(`#super-${tsid} td`)
	$(`#super-${tsid}`).data('id', data.id)
	$(`#super-${tsid}`).id = `#super-${data.id}`
	rows.eq(0).html(data.id);
	rows.eq(1).html(data.square_meters);
	rows.eq(2).html(data.days_open);
	rows.eq(3).html(data.times);
	rows.eq(4).html(data.street_name + ' ' + data.street_number + ' ' + data.city + ' ' + data.state + ' ' + data.zipcode);
	rows.eq(5).html(data.phone_number);
}

function UpdateRowItem(data, barc, bool) {
	var rows = $(`#item-${barc} td`);
	if (bool) {
		$(`#item-${barc}`).data('id', data.barc)
		$(`#item-${barc}`).id = `#item-${data.barcode}`
		rows.eq(0).html(data.name);
		rows.eq(1).html(data.Barcode);
		rows.eq(2).html(data.catname);
		rows.eq(3).html(!!+data.signature_item ? "true" : `false`);
		rows.eq(4).html(data.current_price);
	} else {
		rows.eq(5).html(data.self);
		rows.eq(6).html(data.aisle);
	}
}

function loadViewModal(id) {
	$(`.spinner`).show();
	$('#sidenav-selected').html(`Store ${id}`)
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
	$.post('/popularpairs?id=' + id, function (data) {
		if (data.success) {
			AddTopPair(data.dat);
		}
	})
	$.post('/gettranscaction?id=' + id, function (data, success) {
		if (success) {
			if (!$.isEmptyObject(data)) {
				createTranscaction(data);
			}

		}
	});
}

function SetUpEditForm(data) {
	var time1 = data.times.split('-')[0];
	if (time1.length <= 4) {
		time1 = `0${time1}`
	}
	$('#editform [name = id]').val(data.id);
	$('#editform [name = square_meters]').val(data.square_meters);
	$('#editform [name = days_open]').val(data.days_open);
	$('#editform [name = opentime]').val(time1);
	$('#editform [name = closetime]').val(data.times.split('-')[1]);
	$('#editform [name = street_name]').val(data.street_name);
	$('#editform [name = street_number]').val(data.street_number);
	$('#editform [name = city]').val(data.city);
	$('#editform [name = state]').val(data.state);
	$('#editform [name = zipcode]').val(data.zipcode);
	$('#editform [name = phone_number]').val(data.phone_number);
}

function SetUpItemForm(data) {
	$(`#editform-2 [name = name]`).val(data.name);
	$(`#editform-2 [name = barcode]`).val(data.Barcode);
	$(`#editform-2 [name = category_id]`).val(data.category_id);
	$(`#editform-2 [name = signature_item]`).val(data.signature_item);
	$(`#editform-2 [name = current_price]`).val(data.current_price);
	$(`#editform-1 [name = self]`).val(data.self);
	$(`#editform-1 [name = aisle]`).val(data.aisle);
}

function ChangeActivePage(show) {
	$(`.modal-body.active`).toggleClass('active');
	$(show).toggleClass(`active`);
}

function NewShopRowFromForm(newrow) {
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
        <td class = 'text-center'><button class='mr-2 btn btn-outline-danger btn-sm deleteshop'>\
            <i class='fa fa-trash-o'></i>\
            </button><button class='mr-2 btn btn-outline-primary btn-sm viewshop'>\
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
        <td class = 'text-center'><button class='mr-2 btn btn-outline-danger btn-sm deleteshop'>\
            <i class='fa fa-trash-o'></i>\
            </button><button class='mr-2 btn btn-outline-primary btn-sm viewshop'>\
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
		<td class = 'text-center'><button  class='btn btn-outline-danger btn-sm deleteitem'>\
                <i class='fa fa-trash-o'></i>\
			</button>\
            <button  class='ml-2 btn btn-outline-primary btn-sm viewitem'>\
            <i class='fa fa-eye'></i>\
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

function createTranscaction(data) {
	$('#transcactionbody').empty();
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
            <td class = 'text-center'><button  class='btn btn-outline-primary btn-sm viewtranscaction'>\
                    <i class='fa fa-eye'></i>\
                </button>\
            </td>\
        </tr>";
		$('#transcactionbody').append(markup);
		$('#transcaction-' + value.id).data('id', value.id);
	});
	window.setTimeout(function () {
		$(`.spinner`).hide();
		blur("#viewmodal");
	}, 1000)

}

function AddTopPair(values) {
	$('#pairbody').empty();
	$.each(values, function (index, data) {

		let markup = "<tr>\
		<td>"+ data.name1 + "</td>\
		<td>"+ data.name2 + "</td>\
		<td>"+ data.weight + "</td>\
	</tr>"
		$('#pairbody').append(markup);

	})
}


function AddCategoryOption(value) {
	let markup = `<option value='${value.category_id}'>${value.name}</option>`
	$('#forcategories').append(markup);
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

function showCheckmark() {
	if ($(`.checkmark`).is(':hidden')) {
		$(`.checkmark`).show();
		window.setTimeout(function () {
			$(`.checkmark`).fadeOut("fast");
		}, 2000)
	}
}
