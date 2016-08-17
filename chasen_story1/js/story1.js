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
    var doc = document;
    var content = doc.getElementById("contents_p");
    var type = doc.getElementById("list_button").value.toLowerCase();
    var newNode = null;
    if (type == "table") {
        newNode = doc.createElement(type);
        newNode.style.height = "100px";
        var tr1 = doc.createElement("tr");
        var tr2 = doc.createElement("tr");
        var td1 = doc.createElement("td");
        td1.innerHTML = "A";
        var td2 = doc.createElement("td");
        td2.innerHTML = "B";
        var td3 = doc.createElement("td");
        td3.innerHTML = "C";
        var td4 = doc.createElement("td");
        td4.innerHTML = "D";
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr2.appendChild(td3);
        tr2.appendChild(td4);
        newNode.appendChild(tr1);
        newNode.appendChild(tr2);
    } else if (type == "div") {
        newNode = doc.createElement(type);
        newNode.innerHTML = type;
        newNode.style.height = "100px";
    } else {
        newNode = doc.createElement("input");
        newNode.type = type;
        newNode.value = type;
        newNode.style.height = "50px";
    }
    newNode.name = type + "s";
    newNode.style.float = "left";
    newNode.style.width = "100px";
    newNode.style.border = "1px solid black";
    newNode.style.fontSize = "15px";
    content.appendChild(newNode);
}

function delete1() {
    var doc = document;
    var parentNode = doc.getElementById("contents_p");
    var type = doc.getElementById("list_button").value.toLowerCase();
    var delNode = null;
    if (type == "table") {
        delNode = doc.getElementsByTagName("table");
        console.log(delNode);
        for (i = delNode.length - 1; i >= 0; i--) {
            if (!(delNode[i].id || delNode[i].className)) {
                delNode[i].parentNode.removeChild(delNode[i]);
            }
        }
    } else if (type == "div") {
        delNode = doc.getElementsByTagName("div");
        console.log(delNode);
        for (i = delNode.length - 1; i >= 0; i--) {
            if (delNode[i].id || delNode[i].className) {} else {
                delNode[i].parentNode.removeChild(delNode[i]);
            }
        }
    } else if (type == "button") {
        delNode = doc.getElementsByTagName("input");
        console.log(delNode);
        for (i = delNode.length - 1; i >= 0; i--) {
            console.log("class:" + typeof(delNode[i].class));
            console.log("id:" + delNode[i].id);
            if (delNode[i].id || delNode[i].className) {} else {
                if (delNode[i].type == "button") {
                    delNode[i].parentNode.removeChild(delNode[i]);
                }
            }
        }
    } else {
        delNode = doc.getElementsByTagName("input");
        for (i = delNode.length - 1; i >= 0; i--) {
            if (delNode[i].id || delNode[i].className) {} else {
                if (delNode[i].type == "text") {
                    delNode[i].parentNode.removeChild(delNode[i]);
                }
            }
        }
    }
}

function backcolor() {
    var doc = document;
    var parentNode = doc.getElementById("contents_p");
    var type = doc.getElementById("list_button").value.toLowerCase();
    var delNode = null;
    if (type == "table") {
        delNode = doc.getElementsByTagName("table");
        console.log(delNode);
        for (i = 0; i < delNode.length; i++) {
            if (delNode[i].id || delNode[i].className) {} else {
                delNode[i].style.backgroundColor = "rgb(" + ramdomMaker() + "," + ramdomMaker() + "," + ramdomMaker() + ")";
            }
        }
    } else if (type == "div") {
        delNode = doc.getElementsByTagName("div");
        console.log(delNode);
        for (i = 0; i < delNode.length; i++) {
            if (delNode[i].id || delNode[i].className) {} else {
                delNode[i].style.backgroundColor = "rgb(" + ramdomMaker() + "," + ramdomMaker() + "," + ramdomMaker() + ")";
            }
        }
    } else if (type == "button") {
        delNode = doc.getElementsByTagName("input");
        console.log(delNode);
        for (i = 0; i < delNode.length; i++) {
            console.log("class:" + typeof(delNode[i].class));
            console.log("id:" + delNode[i].id);
            if (delNode[i].id || delNode[i].className) {} else {
                if (delNode[i].type == "button") {
                    delNode[i].style.backgroundColor = "rgb(" + ramdomMaker() + "," + ramdomMaker() + "," + ramdomMaker() + ")";
                }
            }
        }
    } else {
        delNode = doc.getElementsByTagName("input");
        for (i = 0; i < delNode.length; i++) {
            if (delNode[i].id || delNode[i].className) {} else {
                if (delNode[i].type == "text") {
                    delNode[i].style.backgroundColor = "rgb(" + ramdomMaker() + "," + ramdomMaker() + "," + ramdomMaker() + ")";
                }
            }
        }
    }
}

function fontcolor() {
    var doc = document;
    var parentNode = doc.getElementById("contents_p");
    var type = doc.getElementById("list_button").value.toLowerCase();
    var delNode = null;
    if (type == "table") {
        delNode = doc.getElementsByTagName("table");
        console.log(delNode);
        for (i = 0; i < delNode.length; i++) {
            if (delNode[i].id || delNode[i].className) {} else {
                delNode[i].style.color = "rgb(" + ramdomMaker() + "," + ramdomMaker() + "," + ramdomMaker() + ")";
            }
        }
    } else if (type == "div") {
        delNode = doc.getElementsByTagName("div");
        console.log(delNode);
        for (i = 0; i < delNode.length; i++) {
            if (delNode[i].id || delNode[i].className) {} else {
                delNode[i].style.color = "rgb(" + ramdomMaker() + "," + ramdomMaker() + "," + ramdomMaker() + ")";
            }
        }
    } else if (type == "button") {
        delNode = doc.getElementsByTagName("input");
        console.log(delNode);
        for (i = 0; i < delNode.length; i++) {
            console.log("class:" + typeof(delNode[i].class));
            console.log("id:" + delNode[i].id);
            if (delNode[i].id || delNode[i].className) {} else {
                if (delNode[i].type == "button") {
                    delNode[i].style.color = "rgb(" + ramdomMaker() + "," + ramdomMaker() + "," + ramdomMaker() + ")";
                }
            }
        }
    } else {
        delNode = doc.getElementsByTagName("input");
        for (i = 0; i < delNode.length; i++) {
            if (delNode[i].id || delNode[i].className) {} else {
                if (delNode[i].type == "text") {
                    delNode[i].style.color = "rgb(" + ramdomMaker() + "," + ramdomMaker() + "," + ramdomMaker() + ")";
                }
            }
        }
    }
}

function ramdomMaker() {
    return Math.round(Math.random() * 255);
}

function plus() {
    var doc = document;
    var parentNode = doc.getElementById("contents_p");
    var type = doc.getElementById("list_button").value.toLowerCase();
    var delNode = null;
    if (type == "table") {
        delNode = doc.getElementsByTagName("table");
        console.log(delNode);
        for (i = 0; i < delNode.length; i++) {
            if (delNode[i].id || delNode[i].className) {} else {
                delNode[i].style.fontSize = (parseInt(delNode[i].style.fontSize) + 2) + "px";
            }
        }
    } else if (type == "div") {
        delNode = doc.getElementsByTagName("div");
        console.log(delNode);
        for (i = 0; i < delNode.length; i++) {
            if (delNode[i].id || delNode[i].className) {} else {
                delNode[i].style.fontSize = (parseInt(delNode[i].style.fontSize) + 2) + "px";
            }
        }
    } else if (type == "button") {
        delNode = doc.getElementsByTagName("input");
        console.log(delNode);
        for (i = 0; i < delNode.length; i++) {
            console.log("class:" + typeof(delNode[i].class));
            console.log("id:" + delNode[i].id);
            if (delNode[i].id || delNode[i].className) {} else {
                if (delNode[i].type == "button") {
                    delNode[i].style.fontSize = (parseInt(delNode[i].style.fontSize) + 2) + "px";
                }
            }
        }
    } else {
        delNode = doc.getElementsByTagName("input");
        for (i = 0; i < delNode.length; i++) {
            if (delNode[i].id || delNode[i].className) {} else {
                if (delNode[i].type == "text") {
                    delNode[i].style.fontSize = (parseInt(delNode[i].style.fontSize) + 2) + "px";
                }
            }
        }
    }
}

function decrease() {
    var doc = document;
    var parentNode = doc.getElementById("contents_p");
    var type = doc.getElementById("list_button").value.toLowerCase();
    var delNode = null;
    console.log("comein");
    if (type == "table") {
        delNode = doc.getElementsByTagName("table");
        console.log(delNode);
        for (i = 0; i < delNode.length; i++) {
            console.log(delNode[i].style.fontSize);
            if (delNode[i].id || delNode[i].className) {} else {
                delNode[i].style.fontSize = (parseInt(delNode[i].style.fontSize) - 2) + "px";
            }
        }
    } else if (type == "div") {
        delNode = doc.getElementsByTagName("div");
        console.log(delNode);
        for (i = 0; i < delNode.length; i++) {
            if (delNode[i].id || delNode[i].className) {} else {
                delNode[i].style.fontSize = (parseInt(delNode[i].style.fontSize) - 2) + "px";
            }
        }
    } else if (type == "button") {
        delNode = doc.getElementsByTagName("input");
        console.log(delNode);
        for (i = 0; i < delNode.length; i++) {
            console.log("class:" + typeof(delNode[i].class));
            console.log("id:" + delNode[i].id);
            if (delNode[i].id || delNode[i].className) {} else {
                if (delNode[i].type == "button") {
                    delNode[i].style.fontSize = (parseInt(delNode[i].style.fontSize) - 2) + "px";
                }
            }
        }
    } else {
        delNode = doc.getElementsByTagName("input");
        for (i = 0; i < delNode.length; i++) {
            if (delNode[i].id || delNode[i].className) {} else {
                if (delNode[i].type == "text") {
                    delNode[i].style.fontSize = (parseInt(delNode[i].style.fontSize) - 2) + "px";
                }
            }
        }
    }
}
