$(document).ready(function(){
	var tableData = null;
	var buttonData = null;
	var inputTextData = null;
	var divData = null;
	var ImageData = null;

	loading();

	$.ajax({
		url: "http://admadevwb8001:8001/api/html/elements",
		type: "get",
		success: function(data) {
			for (var i = 0; i < data.data.length; i++) {
				$("#create-list").append('<li><a herf="#">' + data.data[i].text + '</a></li>');
			}
		}
	});

	$.ajax({
		url: "http://admadevwb8001:8001/api/html/elements/table/data",
		type: "get",
		success: function(data) {
			tableData = data;
		}
	});

	$.ajax({
		url: "http://admadevwb8001:8001/api/html/elements/button/data",
		type: "get",
		success: function(data) {
			buttonData = data;
		}
	});

	$.ajax({
		url: "http://admadevwb8001:8001/api/html/elements/inputText/data",
		type: "get",
		success: function(data) {
			inputTextData = data;
		}
	});

	$.ajax({
		url: "http://admadevwb8001:8001/api/html/elements/div/data",
		type: "get",
		success: function(data) {
			divData = data;
		}
	});

	$.ajax({
		url: "http://admadevwb8001:8001/api/html/elements/image/data",
		type: "get",
		success: function(data) {
			imageData = data;
		}
	});

	$("#create-list").delegate("a", "click", function() {
		var element = $(this).text();
		if(element==="Input Text") {
			element="Input";
		}
		if(element==="Image") {
			element="img";
		}
		if(element==="Div") {
			element="div";
		}
		var newElement = document.createElement(element);
		if(element === "Table") {
			newElement = createTable(newElement);
		} else if(element === "Button"){
			newElement = createButton(newElement);
		} else if(element==="Input"){
			newElement = createInputText(newElement);
		} else if(element === "div") {
			newElement = createDiv(newElement);
		} else if(element === "img") {
			newElement = createImage(newElement);
		}

		var itemDiv = document.getElementById("new-item");
		bindElementOperateMenu(newElement);
		if (this.style.border == "2px solid blue") {
			this.style.border = "";
		}
		itemDiv.appendChild(newElement);
		
	});

	function bindElementOperateMenu(element) {
		var type = element.tagName.toLowerCase();
		var menu = null;
		$(document).click(function(e) {
			noSelected();
			HideAllMenu();
		});

		$(element).bind("click", function(e) {
			noSelected();
			HideAllMenu();
			if(type == "table") {
				menu = document.getElementById("table-menu");
			} else if(type == "button"){
				menu = document.getElementById("button-menu");
			} else if(type=="input"){
				menu = document.getElementById("input-text-menu");
			} else if(type == "div") {
				menu = document.getElementById("div-menu");
			} else if(type == "img") {
				menu = document.getElementById("image-menu");
			}

			$("#create-list").css("display", "");

			menu.style.display = "block";
			menu.style.left = e.clientX - 40 + "px";
    		menu.style.top = e.clientY - 200 + "px";
			element.style.border = "2px solid blue";
			element.class = "selected";
			e=e||event;
			stopFunc(e);
		});
	};

	function createTable(element) {
		element.border = "2px";
		var dataCount = 0;
		for(var i = 0; i < tableData.data.rows; ++ i) {
			var row = element.insertRow();
			for(var j = 0; j < tableData.data.cols; ++ j) {
				var cell = row.insertCell();
            	cell.width = "100";
				var insertCell = tableData.data.cells[dataCount];
				if(insertCell.row==i && insertCell.col==j) {
					cell.innerHTML = insertCell.data;
					dataCount ++;
				}
			}
		}
		return element;
	};

	function createButton(element) {
		element.title = buttonData.data.title;
		element.textContent = buttonData.data.text;
		return element;
	};

	function createInputText(element) {
		element.value = inputTextData.data.text;
		return element;
	};

	function createDiv(element) {
		element.innerHTML = divData.data.text;
		return element;
	};

	function createImage(element) {
		element.src = imageData.data.image;
		element.title = imageData.data.title;
		return element;
	};

	$.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/button/actions",
        success: function(data) {
            var buttonAction = data;
            appendMenu(buttonAction, "button-menu");
			bindEventToOpreItem("button-menu");
        }
    });

    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/table/actions",
        success: function(data) {
            var tableAction = data;
            appendMenu(tableAction, "table-menu");
			bindEventToOpreItem("table-menu");
        }
    });

    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/div/actions",
        success: function(data) {
            var divActtion = data;
            appendMenu(divActtion, "div-menu");
			bindEventToOpreItem("div-menu");
        }
    });

    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/image/actions",
        success: function(data) {
            var imageAction = data;
            appendMenu(imageAction, "image-menu");
			bindEventToOpreItem("image-menu");
        }
    });

    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/inputText/actions",
        success: function(data) {
        	var inputTextAction = data;
            appendMenu(inputTextAction, "input-text-menu");
			bindEventToOpreItem("input-text-menu");
        }
    });

	function loading() {
		$(document).click(function(e) {
			$("#create-list").css("display", "");
			noSelected();
		});
		$("#create-new-button").click(function(e) {
			noSelected();
			HideAllMenu();
			$("#create-list").css("display", "block");
			e=e||event;
			stopFunc(e);
		});
	};

	function stopFunc(e) {
    	e.stopPropagation?e.stopPropagation():e.cancelBubble = true;
	};

	function appendMenu(action, idName) {
		$("#new-item").append('<ul id = ' + idName + '></ul>');
		for(var i = 0; i < action.data.length; ++ i) {
			$("#" + idName).append('<li class="operateMenu"><a herf="#" name="' + action.data[i].id + '" title="'
									+ action.data[i].title + '">' + action.data[i].text + '</li></a>');
		}
	};

	function bindEventToOpreItem(elementId) {
    	$("#" + elementId + "> li:nth-child(1) > a").click(function(e) {
			deleteElement();
			$("#" + elementId).css("display", "");
			e=e||event;
			stopFunc(e);
		});
		$("#" + elementId + "> li:nth-child(2) > a").click(function(e) {
			changeBackgroudColor();
			$("#" + elementId).css("display", "");
			e=e||event;
			stopFunc(e);
		});
		$("#" + elementId + "> li:nth-child(3) > a").click(function(e) {
			changeFontColor();
			$("#" + elementId).css("display", "");
			e=e||event;
			stopFunc(e);
		});
        $("#" + elementId + "> li:nth-child(4) > a").click(function(e) {
			changeFontSize("up");
			$("#" + elementId).css("display", "");
			e=e||event;
			stopFunc(e);
		});
		$("#" + elementId + "> li:nth-child(5) > a").click(function(e) {
			changeFontSize("down");
			$("#" + elementId).css("display", "");
			e=e||event;
			stopFunc(e);
		});
    };

	function HideAllMenu() {
		$("#table-menu").css("display", "");
		$("#button-menu").css("display", "");
		$("#image-menu").css("display", "");
		$("#input-text-menu").css("display", "");
		$("#div-menu").css("display", "");
	}
});
