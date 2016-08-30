var createList;

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

function loading() {
    alert("loading");
    var arr = document.getElementsByClassName("button");
    for (var i = 0; i < arr.length; i++) {
        arr[i].onmouseover = function() {
            mouseOver(this);
        };
        arr[i].onmouseout = function() {
            mouseOut(this);
        };
    }
}

function cancel() {
    cancelMenu_type();
    cancelMenu();
}

function test() {
    alert("test");
}

function mouseOver(ele) {
    ele.style.backgroundColor = "#3572b0";
}

function mouseOut(ele) {
    ele.style.backgroundColor = "#dedede";
}

function getCurrentStyle(node) {
    var style = null;
    if (window.getComputedStyle) {
        style = window.getComputedStyle(node, null);
        //chrome、 firefox、 ie9
        console.log('globalEventContext');
    } else {
        style = node.currentStyle;
        //ie7、ie8
        console.log('currentStyel');
    }
    return style;
}


/**
    global variable selected Element in contents
*/
var selElement;

/*
    show operation menu
*/
function operate(ele, e) {
    cancelMenu_type();
    selElement = ele;
    //cancel choosing other Elements in contents except selElement
    unchooseOther(selElement);
    var EVT = window.event ? window.event : e;
    var menu = document.getElementsByClassName("menu")[0];
    var x = EVT.clientX;
    var y = EVT.clientY;
    if (ele.style.border == "2px solid blue") {
        cancelMenu();
    } else {
        ele.style.border = "2px solid blue";
        menu.style.left = x + "px";
        menu.style.top = y + "px";
        menu.style.display = "block";
    }
}

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
/**
    cancel choosing other Elements in contents except selElement
*/
function unchooseOther(ele) {
    var childs = ele.parentNode.childNodes;
    for (i = 0; i < childs.length; i++) {
        if (childs[i] !== selElement) {
            childs[i].style.border = "1px solid black";
        }
    }
}

function cancelMenu() {
    var menu = document.getElementsByClassName("menu")[0];
    menu.style.display = "none";
    if (selElement) {
        if (selElement.style.border) {
            selElement.style.border = "1px solid black";
        }
    }
}

function cancelMenu_type() {
    var menuType = document.getElementsByClassName("menu_type")[0];
    menuType.style.display = "none";
}


/**
    The operation's function
**/

function _delete() {
    selElement.parentNode.removeChild(selElement);
    cancelMenu();
}

function backcolor() {
    selElement.style.backgroundColor = "rgb(" + ramdomMaker() +
        "," + ramdomMaker() + "," + ramdomMaker() + ")";
    cancelMenu();
}

function fontcolor() {
    selElement.style.color = "rgb(" + ramdomMaker() +
        "," + ramdomMaker() + "," + ramdomMaker() + ")";
    cancelMenu();
}

function ramdomMaker() {
    return Math.round(Math.random() * 255);
}

function fontSize(ele) {
    var operate = ele.value;
    if (operate == "+") {
        selElement.style.fontSize = (parseInt(selElement.style.fontSize, 10) + 5) + "px";
        cancelMenu();
    } else {
        selElement.style.fontSize = (parseInt(selElement.style.fontSize, 10) - 5) + "px";
        cancelMenu();
    }
}

/*document.onclick = function() { cancel(); };*/
