function handleClick(val){
    // document.getElementById('HiddenInputID').value = val;

    if (typeof(Storage) !== "undefined") {
	  // Store
	  localStorage.setItem("flavor", val);
	} else {
	  document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}

    window.location.href = "../html/detail.html";
    return true;
}