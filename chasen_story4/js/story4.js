
var buttonData;
var textData;
var tableData;
var divData;
var imageData;

var buttonAct;
var tableAct;
var divAct;
var imageAct;
var textAct;

/**
    global variable selected Element in contents
*/
var selElement;

function showTypeMenu(event) {
    cancelMenu();
    var menuType = document.getElementsByClassName("menu_type")[0];
    var x = event.clientX;
    var y = event.clientY;
    if (menuType.style.display == "block") {
        menuType.style.display = "none";
    } else {
        menuType.style.left = x + "px";
        menuType.style.top = y + "px";
        menuType.style.display = "block";
    }
}

function cancelMenu() {
    var menu = document.getElementsByClassName("menu");
    for (var i = 0; i < menu.length; i++) {
        menu[i].style.display = "none";
    }
    if (selElement) {
        if (selElement.style.border) {
            selElement.style.border = "1px solid black";
        }
    }
}


/*document.onclick = function() { cancel(); };*/
