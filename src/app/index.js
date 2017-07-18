import $ from 'jquery';

$(function () {
	$('#get-request').on('click', function(){
		$.ajax({
			method: 'GET',
			url: '/products',
			contentType: 'application/json',
			success: function (res) {
				let tbodyElement = $('tbody');
				
				tbodyElement.html('');
				
				res.products.forEach(function(product){
					console.log(product);
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

$('#create-form').on('submit', function() {
	event.preventDefault();

	let createInput = $('#create-input');

	$.ajax({
		url:'/products',
		method: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({
			name: createInput.val()
		}),
		success: function(res) {
			console.log(res);
			createInput.val('');
			$('#get-request').click();
		}
	});

});
