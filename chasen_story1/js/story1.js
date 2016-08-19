function loading() {
    var arr = document.getElementsByClassName("button");
    for (var i = 0; i < arr.length; i++) {
        arr[i].onmouseover = function() {
            mouseOver(arr[i])
        };
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

function create() {
    var content = document.getElementById("contents_p");
    var eletype = document.getElementById("list_button").value.toLowerCase();
    var newNode = initializeNode(eletype);
    if (newNode) {
        content.appendChild(newNode);
    }
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

function _delete() {
    var eletype = document.getElementById("list_button").value.toLowerCase();
    var selNodes = document.getElementsByClassName(eletype + "s");
    removeAll(selNodes);
}

function removeAll(selNodes) {
    for (i = selNodes.length - 1; i >= 0; i--) {
        if (selNodes[i].className) {
            selNodes[i].parentNode.removeChild(selNodes[i]);
        }
    }
}

function backcolor() {
    var eletype = document.getElementById("list_button").value.toLowerCase();
    var selNodess = document.getElementsByClassName(eletype + "s");
    changeBackColor(selNodess);
}

function changeBackColor(selNodess) {
    for (i = 0; i < selNodess.length; i++) {
        if (selNodess[i].className) {
            selNodess[i].style.backgroundColor = "rgb(" + ramdomMaker() +
                "," + ramdomMaker() + "," + ramdomMaker() + ")";
        }
    }
}

function fontcolor() {
    var eletype = document.getElementById("list_button").value.toLowerCase();
    var selNodes = document.getElementsByClassName(eletype + "s");
    changeFontColor(selNodes);
}

function changeFontColor(selNodes) {
    for (i = 0; i < selNodes.length; i++) {
        if (selNodes[i].className) {
            selNodes[i].style.color = "rgb(" + ramdomMaker() +
                "," + ramdomMaker() + "," + ramdomMaker() + ")";
        }
    }
}

function ramdomMaker() {
    return Math.round(Math.random() * 255);
}

function fontSize(ele) {
    var eletype = document.getElementById("list_button").value.toLowerCase();
    var operate = ele.value;
    var selNodes = document.getElementsByClassName(eletype + "s");
    changeFontSize(selNodes, operate);
}

function changeFontSize(selNodes, operate) {
    for (i = 0; i < selNodes.length; i++) {
        if (selNodes[i].className) {
            if (operate == "+") {
                selNodes[i].style.fontSize = (parseInt(selNodes[i].style.fontSize, 10) + 2) + "px";
            } else {
                selNodes[i].style.fontSize = (parseInt(selNodes[i].style.fontSize, 10) - 2) + "px";
            }
        }
    }
}
