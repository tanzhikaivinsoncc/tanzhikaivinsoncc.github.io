renderCartList();
function renderCartList() {
	if (localStorage.getItem("cinnamonRollList") != null) {

		console.log("Whut 1 " + localStorage.getItem("cinnamonRollList").length);

		cinnamon_roll_list = JSON.parse(localStorage.getItem("cinnamonRollList"));

		$('.empty_cart_area').remove();


		var cart_list_height = cinnamon_roll_list.length * 175 + 300;

		// change height of cart_list_area accordingly
		// document.getElementById("cart_list_area").style.height = cart_list_height + "px";

		$('.cart_list_area').css("height",cart_list_height + "px");

		var total_cost = 0.00

		for (let i = 0; i < cinnamon_roll_list.length; i++) {

			var unit_flavor = cinnamon_roll_list[i].unit_flavor
			var quantity = cinnamon_roll_list[i].quantity
			var glazing = cinnamon_roll_list[i].glazing
			var cost = cinnamon_roll_list[i].cost

			var item_alt_text = "Original Cinnamon Roll"
			var item_image_area = '<div class="cart_img_div"><img src="../images/cinnamonrolloutline.png" class="cart_img" alt="' + item_alt_text + '" width="50%" height="120px"></div>'

			// create a meta_info_table
			var flavor_row = '<tr><td>' + 'Flavor:' + '</td><td><div class="meta_data_white_area">' + unit_flavor + '</div></td></tr>'
			var quantity_row = '<tr><td>' + 'Quantity:' + '</td><td><div class="meta_data_white_area">' + quantity + '</div></td></tr>'
			var glazing_row = '<tr><td>' + 'Glazing:' + '</td><td><div class="meta_data_white_area">' + glazing + '</div></td></tr>'
			var meta_info_table = '<table style="width:50%">' + flavor_row + quantity_row + glazing_row + '</table>';

			var row_1 = '<tr><td style="width:30%">' + item_image_area + '</td><td style="width:70%">' + meta_info_table + '</td></tr>';

			var edit_remove_div = '<div><input type="button" value="Edit" class="cart_detail_button"/> | <input type="button" onClick="removeFromCart(' + i + ')" value="Remove" class="cart_detail_button"/></div>'

			var row_2 = '<tr><td style="width:30%">' + edit_remove_div + '</td><td><div class="cart_per_order_price_area"><div class="item_cost_white_area"> Unit Cost: $' + cost + '</div></div></td></tr>';

			var table = '<table style="width:100%"><tr><td>' + row_1 + row_2 + '</table>';

			var item_area = "";

			if (i == 0) {
				item_area = '<div class="cart_item_area_first">' + table + '</div>'
			} else {
				item_area = '<div class="cart_item_area_others">' + table + '</div>'
			}

			$("#cart_list").append('<li>' + item_area + '</li>');
		
			total_cost += parseFloat(cost)
		}
			
		// final cost
		total_cost = parseFloat(total_cost).toFixed(2);

		// add go back and checkout add checkout button
		var add_more_button = '<button onclick="location.href=\'browsing.html\'" type="button" class="add_more_button">Add More</button>';
		var checkout_button = '<button onclick="#" type="button" class="proceed_to_checkout_button">Checkout</button>';
		var proceed_to_checkout_area = '<div class="proceed_to_checkout_area">' + add_more_button + checkout_button + '</div>';

		var final_cost_area = '<div class="cart_final_area"><div class="cart_cost_area"><div class="cart_final_cost">Total Cost:\t\t $' + total_cost + '</div></div>' + proceed_to_checkout_area + '</div>'
		$("#cart_list").append('<li>' + final_cost_area + '</li>');
	}
}

function removeFromCart(index) {

	cinnamon_roll_list = JSON.parse(localStorage.getItem("cinnamonRollList"));
	cinnamon_roll_list.splice(index, 1);

	localStorage.setItem("cinnamonRollList", JSON.stringify(cinnamon_roll_list));

	if (cinnamon_roll_list.length == 0) {
		localStorage.removeItem("cinnamonRollList");
	}

	location.reload();

}