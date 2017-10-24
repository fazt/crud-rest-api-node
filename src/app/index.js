import $ from 'jquery';

$(function () {
	$('#get-request').on('click', function(){
		$.ajax({
			method: 'GET',
			url: '/products',
			dataType: 'json',
			success: function (res) {
				let tbodyElement = $('tbody');
				tbodyElement.html('');

				res.products.forEach(function(product){
					tbodyElement.append(`
						<tr>
							<td class="id">
								${product.id}
							</td>
							<td>
								<input
									type="text"
									class="name"
									value="${product.name}"
									/>
							</td>
							<td>
								<button class="update-button">
									UPDATE/PUT
								</button>
								<button class="delete-button">
									DELETE
								</button>
							</td>
						</tr>
					`);
				});
			}
		});
	});
});

$('#create-form').on('submit', function(e) {
	e.preventDefault();
	let createInput = $('#create-input');
	$.ajax({
		url:'/products',
		method: 'POST',
		dataType: 'json',
		data: {
			name: createInput.val()
		},
		success: function(res) {
			createInput.val('');
			$('#get-request').click();
		}
	});
});


$('table').on('click', '.update-button', function() {
	var rowElement = $(this).closest('tr');
	var id = rowElement.find('.id').text();
	var newName = rowElement.find('.name').val();

	$.ajax({
		url: '/products/' + id,
		method: 'PUT',
		contenType: 'application/json',
		data: {newName: newName},
		success: function(response) {
			$('#get-request').click();
		}
	});

});

// DELETE BUTTON
$('table').on('click', '.delete-button', function() {
	var rowElement = $(this).closest('tr');
	var id = rowElement.find('.id').text();

	$.ajax({
		url: '/products/' + id,
		method: 'DELETE',
		contentType: 'application/json',
		success: function(response) {
			$('#get-request').click();
		}
	});
});
