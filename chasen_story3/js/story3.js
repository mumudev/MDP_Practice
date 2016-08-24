function loading() {
    var arr = document.getElementsByClassName("button");
    for (var i = 0; i < arr.length; i++) {
        arr[i].onmouseover = function() { mouseOver(this); };
        arr[i].onmouseout = function() { mouseOut(this); };
    }
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

function showTypeMenu(event) {
    cancelMenu();
    var menuType = document.getElementsByClassName("menu_type")[0];
    var x = event.clientX;
    var y = event.clientY;
    menuType.style.left = x + "px";
    menuType.style.top = y + "px";
    menuType.style.display = "block";
}

function create(ele) {
    var content = document.getElementById("contents_p");
    var eletype = ele.value.toLowerCase();
    var newNode = initializeNode(eletype);
    if (newNode) {
        content.appendChild(newNode);
    }
    cancelMenu_type();
}

function cancelMenu_type() {
    var menuType = document.getElementsByClassName("menu_type")[0];
    menuType.style.display = "none";
}

function initializeNode(eletype) {
    var newNode = null;
    if (eletype) {
        if (eletype == "button" || eletype == "text") {
            newNode = document.createElement("input");
            newNode.type = eletype;
            newNode.style.height = "50px";
        } else {
            newNode = document.createElement(eletype);
            newNode.style.height = "100px";
        }
        newNode.className = eletype + "s";
        newNode.onclick = function() { operate(this, "event"); };
        newNode.style.float = "left";
        newNode.style.width = "100px";
        newNode.style.border = "1px solid black";
        newNode.style.fontSize = "15px";
        newNode = addNodeExampleContent(newNode);
    }
    return newNode;
}

function addNodeExampleContent(newNode) {
    var eletype = newNode.tagName.toLowerCase();
    if (eletype == "table") {
        var tr1 = document.createElement("tr");
        var tr2 = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = "A";
        var td2 = document.createElement("td");
        td2.innerHTML = "B";
        var td3 = document.createElement("td");
        td3.innerHTML = "C";
        var td4 = document.createElement("td");
        td4.innerHTML = "D";
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr2.appendChild(td3);
        tr2.appendChild(td4);
        newNode.appendChild(tr1);
        newNode.appendChild(tr2);
    } else if (eletype == "div") {
        newNode.innerHTML = eletype;
    } else {
        newNode.value = newNode.type;
    }
    return newNode;
}

var selElement;

function operate(ele, e) {
    selElement = ele;
    if (ele.style.border != "2px solid blue") {
        ele.style.border = "2px solid blue";
        unchooseOther();
    } else {
        var EVT = window.event ? window.event : e;
        var menu = document.getElementsByClassName("menu")[0];
        var x = EVT.clientX;
        var y = EVT.clientY;
        menu.style.left = x + "px";
        menu.style.top = y + "px";
        menu.style.display = "block";
    }
}

function unchooseOther() {
    var childs = selElement.parentNode.childNodes;
    for (i = 0; i < childs.length; i++) {
        if (!(childs[i] === selElement)) {
            childs[i].style.border = "1px solid black";
        }
    }
}

function cancelMenu() {
    var menu = document.getElementsByClassName("menu")[0];
    menu.style.display = "none";
}

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
