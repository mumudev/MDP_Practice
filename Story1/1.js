function initialize() {
	var inits = document.getElementsByClassName("buttons");
	for (var i=0; i<inits.length-1; i++) {
		mouseOver(inits[i]);
	}
}

//mouse over event
function mouseOver(e) {
	e.style.backgoundColor = "#def220";
	e.style.fontsize = "6px";
}

//mouse out event
function mouseOut(e) {
	e.style.backgoundColor = "#fff";

}

//
function create() {
	var content = document.getElementById("contentsadded");
	// var newClassName = document.getElementsByClassName("contents").value + "New";
	var contentAdded = document.getElementById("combolist").value.toLowerCase();
	var newNode = null;
	if (contentAdded) {
		if (contentAdded == "button" || contentsadded == "inputText") {
			newNode = document.createElement("input");
			newNode.type = contentAdded;
			newNode.height = "60px";
		}
		else {
			newNode = document.createElement(contentAdded);
			newNode.style.height = "100px";
		}
		newNode.className = contentAdded + "New";
		newNode.style.width = "200px"
		newNode.style.border = "1px solid black";
		newNode.style.float = "left";
		newNode.style.fontSize = "18px";
		//add newNode
		var eletype = newNode.tagName.toLowerCase();
		if (eletype == "table") {
			//...
			var dataOfTable = "<tr>" + 
						"		<th>frond</th>" +
						"		<th>end</th>" +
						"		<th>story1</th>" +
						"		<th>elements</th>"+
						"	</tr>" +
						 "<tr>" + 
						"		<th>frond</th>" +
						"		<th>end</th>" +
						"		<th>story1</th>" +
						"		<th>elements</th>"+
						"	</tr>" +
						 "<tr>" + 
						"		<th>frond</th>" +
						"		<th>end</th>" +
						"		<th>story1</th>" +
						"		<th>elements</th>"+
						"	</tr>" +
						 "<tr>" + 
		
						"		<th>frond</th>" +
						"		<th>end</th>" +
						"		<th>story1</th>" +
						"		<th>elements</th>"+
						"	</tr>";
			newNode.innerHTML = dataOfTable;
		}
		else if (eletype == "div") {
			//...
			newNode.innerHTML = "a new Div";
		}
		else {
			//...
			newNode.value = newNode.type;
			newNode.innerHTML = "Hello World!";
		}
	content.appendChild(newNode);
	}
}

function _delete() {
	var eletype = document.getElementById("combolist").value.toLowerCase();
	// var newClassName = document.getElementsByClassName("contents").value + "New";
	var removeEle = document.getElementsByClassName(eletype + "New");
	//remove a element
	for (var i = removeEle.length-1; i>=0; i--) {
		if (removeEle[i].className) {
			removeEle[i].parentNode.removeChild(removeEle[i]);
		}
	}
}

function changeBgColor() {
	var eletype = document.getElementById("combolist").value.toLowerCase();
	var selectedNodes = document.getElementsByClassName(eletype+"New");
	//change the background-color randomly
	for (var i = 0; i<selectedNodes.length; i++) {
		if (selectedNodes[i].className) {
			selectedNodes[i].style.backgroundColor = "rgb(" + randomColor() + "," + randomColor() + "," + randomColor() + ")";
		}
	}
}

function randomColor() {
	return Math.round(Math.random() * 255);
}

function changeFontColor() {
	var eletype = document.getElementById("combolist").value.toLowerCase();
	var selectedNodes = document.getElementsByClassName(eletype+"New");
	//change the font-color randomly
	for (var i = 0; i<selectedNodes.length; i++) {
		if (selectedNodes[i].className) {
			selectedNodes[i].style.color = "rgb(" + randomColor() + "," + randomColor() + "," + randomColor() + ")";
		}
	}
}
function increaseFontSize() {
	var eletype = document.getElementById("combolist").value.toLowerCase();
	var selectedNodes = document.getElementsByClassName(eletype+"New");
	for (var i=0; i<selectedNodes.length; i++) {
		if (selectedNodes[i].className) {
			selectedNodes[i].style.fontSize = (parseInt(selectedNodes[i].style.fontSize, 10) + 1) + "px";
		}
	}
}

function decreaseFontSize() {
	var eletype = document.getElementById("combolist").value.toLowerCase();
	var selectedNodes = document.getElementsByClassName(eletype+"New");
	for (var i=0; i<selectedNodes.length; i++) {
		if (selectedNodes[i].className) {
			selectedNodes[i].style.fontSize = (parseInt(selectedNodes[i].style.fontSize, 10) - 1) + "px";
		}
	}	
}
