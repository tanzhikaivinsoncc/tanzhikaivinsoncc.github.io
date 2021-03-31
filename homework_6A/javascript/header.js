if (localStorage.getItem("cinnamonRollList") != null) {
	
	cinnamon_roll_list = JSON.parse(localStorage.getItem("cinnamonRollList"));

	var total_cost = 0.00

	for (let i = 0; i < cinnamon_roll_list.length; i++) {
		var cost = cinnamon_roll_list[i].cost
		total_cost += parseFloat(cost)
	}
		
	// final cost
	total_cost = parseFloat(total_cost).toFixed(2);

	// Change the total cost and quantity in the header
	$('.quantity_in_cart').text(cinnamon_roll_list.length);
	$('.cost_in_cart').text("Total Cost: $" + total_cost);
}