//点击create按钮时的事件
function chooseElements(evt) {
    var evt = window.event || arguments.callee.caller.arguments[0];
    evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
    showMenu("menuEle");
}


function createTable() {
    var mydiv = document.getElementById("contents");
    var mytable = document.createElement("table");
    var mytablebody = document.createElement("tbody");
    var rows = 3,
        cols = 3;
    for (var j = 0; j < rows; j++) {
        var mycurrent_row = document.createElement("tr");
        for (var i = 0; i < cols; i++) {
            var mycurrent_cell = document.createElement("td");
            var currenttext = document.createTextNode("第" + j + "行，第" + i + "列");
            mycurrent_cell.appendChild(currenttext);
            mycurrent_row.appendChild(mycurrent_cell);
        }
        mytablebody.appendChild(mycurrent_row);
    }
    mytable.appendChild(mytablebody);
    mydiv.appendChild(mytable);
    mytable.setAttribute("border", "2");
    mytable.setAttribute("class", "DynamicTable");
    mytable.addEventListener("click", function(event) { leftClick(event, this); }, false);
    hideMenu('menuEle');

}

function createButton() {
    var mydiv = document.getElementById("contents");
    var obj_btn = document.createElement("input");
    obj_btn.type = "button";
    obj_btn.setAttribute("class", "DynamicButton");
    obj_btn.value = "Button";
    mydiv.appendChild(obj_btn);
    obj_btn.addEventListener("click", function(event) { leftClick(event, this); }, false);
    hideMenu('menuEle');
}

function createInputText() {
    var mydiv = document.getElementById("contents");
    var obj_text = document.createElement("input");
    obj_text.type = "text";
    obj_text.setAttribute("class", "DynamicText");
    obj_text.value = "Grace Liu";
    mydiv.appendChild(obj_text);
    obj_text.addEventListener("click", function(event) { leftClick(event, this); }, false);
    hideMenu('menuEle');
}

function createDiv() {
    var mydiv = document.getElementById("contents");
    var obj_div = document.createElement("div");
    obj_div.setAttribute("class", "DynamicDiv");
    var div_text = document.createTextNode("这是一个动态产生的div标签。");
    obj_div.appendChild(div_text);
    mydiv.appendChild(obj_div);
    obj_div.addEventListener("click", function(event) { leftClick(event, this); }, false);
    hideMenu('menuEle');
}
var CheckedElement;

function leftClick(evt, ele) {
    CheckedElement = ele;
    evt = window.event || arguments.callee.caller.arguments[0];
    evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
    showMenu('menu');

}

function deleteElements() {
    CheckedElement.parentNode.removeChild(CheckedElement);
    hideMenu('menu');
}

function setBgroundColor() {
    CheckedElement.style.background = "red";
    hideMenu('menu');
}

function setFontColor() {
    CheckedElement.style.color = "blue";
    hideMenu('menu');
}

function changeFontSize(ele, operator) {
    var current_fontSize = getCurrentFontSize(ele);
    if (operator == '+') {
        var font_Size = subNo(current_fontSize) + 1;
    } else if (operator == '-') {
        var font_Size = subNo(current_fontSize) - 1;
    }
    current_fontSize = font_Size + "px";
    ele.style.fontSize = current_fontSize;
}

function incFontSize() {
    changeFontSize(CheckedElement, '+');
    hideMenu('menu');
}

function decFontSize() {
    changeFontSize(CheckedElement, '-');
    hideMenu('menu');
}

var defaultSize = "15px"; //默认字体大小

function getCurrentFontSize(element) {
    if (element.currentStyle) { //IE        
        return element.currentStyle.fontSize;
    } else if (document.defaultView) { //非IE   
        return document.defaultView.getComputedStyle(element, null).getPropertyValue('font-Size');
    }
    return defaultSize;
}

//截掉'px', 以便于计算 
function subNo(font_Size) {
    var size = parseInt(font_Size.substring(0, font_Size.length - 2));
    //alert(size);
    return size;
}

/*显示菜单*/
function showMenu(eleId) {

    var menu = document.getElementById(eleId);
    var evt = window.event || arguments.callee.caller.arguments[0];
    /*获取当前鼠标右键按下后的位置，据此定义菜单显示的位置*/
    var rightedge = window.screen.availWidth - evt.clientX;
    var bottomedge = window.screen.availHeight - evt.clientY;
    /*如果从鼠标位置到容器右边的空间小于菜单的宽度，就定位菜单的左坐标（Left）为当前鼠标位置向左一个菜单宽度*/
    if (rightedge < menu.offsetWidth)
        menu.style.left = document.body.scrollLeft + evt.clientX - menu.offsetWidth + "px";
    else
    /*否则，就定位菜单的左坐标为当前鼠标位置*/
        menu.style.left = document.body.scrollLeft + evt.clientX + "px";
    /*如果从鼠标位置到容器下边的空间小于菜单的高度，就定位菜单的上坐标（Top）为当前鼠标位置向上一个菜单高度*/
    if (bottomedge < menu.offsetHeight)
        menu.style.top = document.body.scrollTop + evt.clientY - menu.offsetHeight + "px";
    else
    /*否则，就定位菜单的上坐标为当前鼠标位置*/
        menu.style.top = document.body.scrollTop + evt.clientY + "px";
    /*设置菜单可见*/
    menu.style.visibility = "visible";
}
/*隐藏菜单*/
function hideMenu(eleId) {
    var menu = document.getElementById(eleId);
    menu.style.visibility = 'hidden';
}
function bind(){
    
}
window.onload = function() {
   var el = document.getElementById("create");
    if (el.addEventListener) {
        el.addEventListener("click", function(event) { chooseElements(event); }, false);
    } else if (el.attachEvent) {
        el.attachEvent("onclick", function(event) { chooseElements(event); });
    }
}
document.onclick = function() { hideMenu('menu');
    hideMenu('menuEle'); }
