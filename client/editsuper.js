$(document).ready(function () {
	let id = new URLSearchParams(window.location.search).get('id');
	$.post('/getsupersingle?id=' + id, function (data, success) {
		if (success) {
			$.each(data, function (index, value) {
				NewShopRowFromGet(value);
			});
		}
	});

	$('#back').click(function (event) {
		event.preventDefault();
		window.location = '/supermarkets?';
	});

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
			'<tr id = super-' + newrow.id + '>\
				<td>' + newrow.id + '</td>\
				<td>' + newrow.square + '</td>\
				<td>' + newrow.open_on + '</td>\
				<td>' + newrow.hours + '</td>\
				<td>' + newrow.adrress + '</td>\
				<td>' + newrow.phone + '</td>\
        	</tr>';
		$('#storebody').append(markup);
		$('#super-' + newrow.id).data('id', newrow.id);
	}
});
