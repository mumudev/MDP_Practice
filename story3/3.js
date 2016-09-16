var selectedElement;

function loadingPage() {
	//
	hiddenBtnList();
	hiddenFunctionsList();
}

function mouseOver(selectedElement) {
	//
	selectedElement.style.fontSize = "30px";
}

function mouseOut(selectedElement) {
	//
	selectedElement.style.fontSize = "20px";
}

function hiddenBtnList() {
	//
	var btnList = document.getElementsByClassName("hiddenBtnList")[0];
	btnList.style.display = "none";
	if (selectedElement) {
		selectedElement.style.border = "1px solid black";
	}
}

function showBtnList() {
	//
	hiddenFunctionsList();
	var btnList = document.getElementsByClassName("hiddenBtnList")[0];
	btnList.style.display = "block";
}

function hiddenFunctionsList() {
	//
	var functionsList = document.getElementsByClassName("hiddenFunctionsList")[0];
	functionsList.style.display = "none";
	if (selectedElement) {
		selectedElement.style.border = "1px solid black";
	}
}

function showFunctionsList() {
	//
	var functionsList = document.getElementsByClassName("hiddenFunctionsList")[0];
	functionsList.style.display = "block";

}

function createTable() {
	//
	hiddenBtnList();
	hiddenFunctionsList();
	var table = document.getElementById("content-added");
	var newTable = null;
	newTable = document.createElement("table");
	newTable.style.height = "100px";
	newTable.style.weight = "200px";
	newTable.className = "NewTable";
	newTable.style.border = "1px solid black";
	newTable.onclick = function() { showFunctionsList(); selectedElement = event.src || event.srcElement;};
	newTable.style.float = "left";
	newTable.style.fontSize = "20px";
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
	newTable.innerHTML = dataOfTable;
	table.appendChild(newTable);
}

function createButton() {
	//
	hiddenBtnList();
	hiddenFunctionsList();
	var button = document.getElementById("content-added");
	var newButton = null;
	newButton = document.createElement("input");
	newButton.type = "button";
	newButton.className = "newButton";
	newButton.style.border = "1px solid black";
	newButton.style.height = "110px";
	newButton.onclick = function(event) { 
		showFunctionsList(); 
		selectedElement = event.src || event.srcElement;
		// alert(selectedElement);
	};
	newButton.style.float = "left";
	newButton.style.fontSize = "20px";
	newButton.value = "button";
	newButton.innerHTML = "hello world";
	button.appendChild(newButton);
}

function createInputText() {
	//
	hiddenBtnList();
	hiddenFunctionsList();
	var inputText = document.getElementById("content-added");
	var newInputText = null;
	newInputText = document.createElement("input");
	newInputText.type = "inputText";
	newInputText.className = "newInputText";
	newInputText.style.cssText = "height: 120px; border: 1px solid black; float:left; fontSize:20px";
	newInputText.onclick = function(event) { showFunctionsList(); selectedElement = event.src || event.srcElement; };
	newInputText.value = "new text";
	newInputText.innerHTML = "hello world";
	inputText.appendChild(newInputText);
}

function createDiv() {
	//
	hiddenBtnList();
	hiddenFunctionsList();
	var div = document.getElementById("content-added");
	var newDiv = null;
	newDiv = document.createElement("div");
	newDiv.className = "newDiv";
	newDiv.style.cssText = "height:120px; width:200px; border: 1px solid black; float:left; fontSize:20px";
	newDiv.onclick = function(event) { showFunctionsList(); selectedElement = event.src || event.srcElement; };
	newDiv.innerHTML = "a new Div";
	div.appendChild(newDiv);
}

function changeBgColor() {
	//

	selectedElement.style.backgroundColor = "rgb(" + randomColor() + "," + randomColor() + "," + randomColor() + ")";
	hiddenBtnList();
	hiddenFunctionsList();
}

function changeFontColor() {
	//
	selectedElement.style.color = "rgb(" + randomColor() + "," + randomColor() + "," + randomColor() + ")";
	hiddenBtnList();
	hiddenFunctionsList();
}

function randomColor() {
	return Math.round(Math.random() * 255);
}

function increaseFontSize() {
	// // alert(selectedElement.style);
	// for(var prop in selectedElement.style) {
	// 	console.log(prop);
	// }
	if(!(selectedElement.style.fontSize)) {
		selectedElement.style.fontSize = "20px";
	}
	selectedElement.style.fontSize = (parseInt(selectedElement.style.fontSize, 10) + 10) + "px";
	
	hiddenBtnList();
	hiddenFunctionsList();
}

function decreaseFontSize() {
	if(!(selectedElement.style.fontSize)) {
		selectedElement.style.fontSize = "20px";
	}
	selectedElement.style.fontSize = (parseInt(selectedElement.style.fontSize, 10) - 10) + "px";
	hiddenBtnList();
	hiddenFunctionsList();
}

function _delete() {
	//
	selectedElement.parentNode.removeChild(selectedElement);
	hiddenBtnList();
	hiddenFunctionsList();
}