var initial = {

	init: function() {
		//call the main function
		initial._bind();
	},
	_bind: function() {
		//bind the onclick event
		for (var i = 0; i < document.getElementsByName("button").length; i++) {
			document.getElementsByName("button")[i].onclick = binds();
		}
	}
};

var binds = function(e) {
	var func = null;
	switch(this.id) {
		case "createButton":
			func = basicFunc.create();
			break;
		case "deleteButton":
			func = basicFunc.delete();
			break;
		case "changeBgColor":
			func = basicFunc.changeBgColor();
			break;
		case "changeFontColor":
			func = basicFunc.changeFontColor();
			break;
		case "increaseFonstSize":
			func = basicFunc.increaseFonstSize();
			break;
		case "decreaseFontSize":
			func = basicFunc.decreaseFontSize();
			break;
	}
	//func();
};

var basicFunc = {
	create: function() {
		//...
		switch(basicMethod.getCombolistName()) {
			case "table":
				basicMethod.getContents().appendChild(data.table());
				break;
			case "button":
				basicMethod.getContents().appendChild(data.button());
				break;
			case "inputText":
				basicMethod.getContents().appendChild(data.inputText());
				break;
			case "div":
				basicMethod.getContents().appendChild(data.div());
		}
	},
	delete: function() {
		//...
		var comboName = basicMethod.getCombolistName().toUpperCase();
		var contentList = basicMethod.getContentList();
		for (var i=contentList.length()-1; i>=0; i--) {
			if(comboName.indexof(contentList[i].nodeName) != -1) {
				basicMethod.removeElement(contentList[i]);
			}
		}
	},
	changeBgColor: function() {
		//...
		var comboName = basicMethod.getCombolistName().toUpperCase();
		var contentList = basicMethod.getContentList();
		for (var i=0; i<contentList; i++) {
			if (comboName.indexof(contentList[i].nodeName) != -1) {
				// basicMethod.removeElement(contentList[-1]);
				contentList[i].style("background-color") = "rgb(" + basicMethod.randomColor() + "," +basicMethod.randomColor()
				+ "," +basicMethod.randomColor()+ "," +basicMethod.randomColor() + ")";
			}
		}
	},
	changeFontColor: function() {
		//...
		var comboName = basicMethod.getCombolistName().toUpperCase();
		var contentList = basicMethod.getContentList();
		for (var i=0; i<contentList; i++) {
			if (comboName.indexof(contentList[i].nodeName) != -1) {
				// basicMethod.removeElement(contentList[-1]);
				contentList[i].style("color") = "rgb(" + basicMethod.randomColor() + "," +basicMethod.randomColor()
				+ "," +basicMethod.randomColor()+ "," +basicMethod.randomColor() + ")";
			}
		}
	},
	increaseFonstSize: function() {
		//...
		var comboName = basicMethod.getCombolistName().toUpperCase();
		var contentList = basicMethod.getContentList();
		for (var i=0; i<contentList.length; i++) {
			if (comboName.indexof(contentList[i].nodeName) != -1) {
				contentList[i].style("fontsize") = (parseInt(contentList[i].style("fontsize"), 10) +2) + "px";
			}
		}
	},
	decreaseFontSize: function() {
		//...
		var comboName = basicMethod.getCombolistName().toUpperCase();
		var contentList = basicMethod.getContentList();
		for (var i=0; i<contentList.length; i++) {
			if (comboName.indexof(contentList[i].nodeName) != -1) {
				contentList[i].style("fontsize") = (parseInt(contentList[i].style("fontsize"), 10) -2) + "px";
			}
		}
	}
};

var basicMethod = {
	getCombolistName: function() {
		//...
		document.getElementById("combolist").value;
	},
	getContents: function() {
		//...
		document.getElementById("contentsadded");
	},
	getContetList:function() {
		document.getElementById("contentsadded").childNodes;
	},
	removeElement: function(ele) {
		var parentEle = ele.parentNode;
		if (parentEle) {
			parentEle.removeChild(ele);
		}
	},
	randomColor: function() {
		return Math.round(Math.random() * 255);
	},
	// randomFontColor: function() {
	// 	return Math.round(Math.random() * 255);
	// }
	getElementById: function(value) {
		return document.getElementById(value);
	}

};

var data = {
	table: function() {
		var eventChange = document.createElement("table");
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
	
	eventChange.innerHTML = dataOfTable;
	eventChange.class = "table";
	eventChange.setAttribute("cellpadding", "2px");
	return eventChange;
	},
	button: function() {
		//...
		var eventChange = document.createElement("button");
		var dataOfButton = "Button added";
		eventChange.innerHTML = dataOfButton;
		eventChange.className = "buttonAdded";
		return eventChange;
	},
	inputText: function() {
		//...
		var eventChange = document.createElement("input");
		var dataOfInput = "this line is added by onclick event";
		eventChange.type = "text";
		eventChange.value = dataOfInput;
		eventChange.className = "inputText";
		return eventChange;
	},
	div: function() {
		//...
		var eventChange = document.createElement("div");
		var dataOfDiv = "this is a div added by onclick event";
		eventChange.innerHTML = dataOfDiv;
		eventChange.className = "divAdded";
		return eventChange;
	}
};

function fun1(){
	//var a=document.getElementById("createButton");
	initial.init();
}