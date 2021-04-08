cinnamon_roll_list = []

var cost = "0.0";
var qty = 0;
var glazing = null;

$('#qty_radio_form input').on('change', function() {
   qty = $('input[name="qty"]:checked').val();

   cost = (parseFloat(qty) * 2.00).toFixed(2) ;

   $( "#total_cost_in_box" ).text("($" + cost + ")");
});

$('#glazing_radio_form input').on('change', function() {
   glazing = $('input[name="glazing"]:checked').val();

   $( "#total_cost_in_box" ).text("($" + cost + ", "  + glazing + " glazing)");
});

// Get the button, and when the user clicks on it, execute myFunction
document.getElementById("add_to_cart_button").onclick = function() {addToCart()};

/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function addToCart() {

	// check if glazing and qty changed - output error messages if necessary
	if (qty == 0 && glazing == null) {
		if ($("#qty_error_message").length == 0) {
			$('<span id="qty_error_message" style="color:red">Quantity not selected! Please select quantity.</span>').appendTo('#qty_error_message_area');
		}

		if ($("#glazing_error_message").length == 0) {
			$('<span id="glazing_error_message" style="color:red">Glazing not selected! Please select glazing.</span>').appendTo('#glazing_error_message_area');

		}

		return;
	}

	if (qty == 0) {

		if ($("#qty_error_message").length == 0) {
			$('<span id="qty_error_message" style="color:red">Quantity not selected! Please select quantity.</span>').appendTo('#qty_error_message_area');
		}
		return;
	} else if ($("#qty_error_message").length != 0) {
		$("#qty_error_message").remove();
	}

	if (glazing == null) {


		if ($("#glazing_error_message").length == 0) {
			$('<span id="glazing_error_message" style="color:red">Glazing not selected! Please select glazing.</span>').appendTo('#glazing_error_message_area');

		}
		
		return;
	} else if ($("#glazing_error_message").length != 0) {
		$("#glazing_error_message").remove();
	}

	cinnamon_roll_list = [];

	if (localStorage.getItem("cinnamonRollList") != null) {
		cinnamon_roll_list = JSON.parse(localStorage.getItem("cinnamonRollList"));
	}
	
	flavor = localStorage.getItem("flavor");

	console.log("addingflavor " + flavor);

 	cinnamon_roll_list.push({"unit_flavor": flavor, "quantity" : qty, "glazing" : glazing, "cost" : cost});

	 if (typeof(Storage) !== "undefined") {
	  // Store
	  localStorage.setItem("cinnamonRollList", JSON.stringify(cinnamon_roll_list));
	  // // Retrieve
	  // document.getElementById("result").innerHTML = localStorage.getItem("lastname"); //https://www.w3schools.com/html/html5_webstorage.asp
	} else {
	  document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}

	// uncheck radio buttons
	$('input[name="qty"]:checked').attr('checked',false);
	$('input[name="glazing"]:checked').attr('checked',false);

	var popup = document.getElementById("myPopup");
  	popup.classList.toggle("show");

	var cinnamon_roll_list_display = JSON.parse(localStorage.getItem("cinnamonRollList"));

	var total_cost = 0.00

	for (let i = 0; i < cinnamon_roll_list_display.length; i++) {
		var cost_display = cinnamon_roll_list_display[i].cost
		total_cost += parseFloat(cost_display)
	}
		
	// final cost
	total_cost = parseFloat(total_cost).toFixed(2);

	// Change the total cost and quantity in the header
	$('.quantity_in_cart').text(cinnamon_roll_list.length);
	$('.cost_in_cart').text("Total Cost: $" + total_cost);
}

