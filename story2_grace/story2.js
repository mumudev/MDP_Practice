//获取下拉列表选项
function getOption() {
    var sel = document.getElementById("option");
    var index = sel.selectedIndex;
    return sel.options[index].text;
}
//生成随机的颜色
function randomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}
//点击create按钮时的事件
function CreateElements() {


    //获取div标签 
    var mydiv = document.getElementById("contents");
    if (getOption() == "table") {
        // 创建一个<table>元素和一个<tbody>元素 
        var mytable = document.createElement("table");
        var mytablebody = document.createElement("tbody");
        var rows = 3,
            cols = 3;

        //创建所有的单元格 
        for (var j = 0; j < rows; j++) {
            // 创建一个<tr>元素 
            var mycurrent_row = document.createElement("tr");
            for (var i = 0; i < cols; i++) {
                // 创建一个<td>元素 
                var mycurrent_cell = document.createElement("td");
                //创建一个文本节点 
                var currenttext = document.createTextNode("第" + j + "行，第" + i + "列");
                // 将创建的文本节点添加到<td>里 
                mycurrent_cell.appendChild(currenttext);
                // 将列<td>添加到行<tr> 
                mycurrent_row.appendChild(mycurrent_cell);
            }
            // 将行<tr>添加到<tbody> 
            mytablebody.appendChild(mycurrent_row);
        }
        // 将<tbody>添加到<table> 
        mytable.appendChild(mytablebody);
        //将<table>添加到<div> 
        mydiv.appendChild(mytable);
        // 将表格mytable的border属性设置为2 
        //mytable.style.border="2px";
        mytable.setAttribute("border", "2");
        /*
         var existTable=getByClass(mydiv,"DynamicTable");
         var len=existTable.length;
        if(len==0){           
            mytable.setAttribute("id", "container"+0);
        }else{
            mytable.setAttribute("id", "container"+len);
        }
        */
        //mytable.setAttribute("id", "container");
        mytable.setAttribute("class", "DynamicTable");
        mytable.addEventListener("click", function(event) { leftClick(event,this); }, false);


    } else if (getOption() == "button") {
        var obj_btn = document.createElement("input");
        obj_btn.type = "button";
        // obj_btn.class = "DynamicButton";
        obj_btn.setAttribute("class", "DynamicButton");
        obj_btn.value = "Button";
        mydiv.appendChild(obj_btn);
        obj_btn.addEventListener("click", function(event) { leftClick(event,this); }, false);

    } else if (getOption() == "text") {
        var obj_text = document.createElement("input");
        obj_text.type = "text";
        // obj_text.class = "DynamicText";
        obj_text.setAttribute("class", "DynamicText");
        obj_text.name = "Enlish name";
        obj_text.value = "Grace Liu";
        mydiv.appendChild(obj_text);
        obj_text.addEventListener("click", function(event) { leftClick(event,this); }, false);

    } else if (getOption() == "div") {
        var obj_div = document.createElement("div");
        //obj_div.class = "DynamicDiv";
        obj_div.setAttribute("class", "DynamicDiv");
        var div_text = document.createTextNode("这是一个动态产生的div标签。");
        obj_div.appendChild(div_text);
        mydiv.appendChild(obj_div);
        obj_div.addEventListener("click", function(event) { leftClick(event,this); }, false);

    } else {
        document.getElementById("contents").innerHTML = "Create!!";
    }

}
var CheckedElement;

function leftClick(evt,ele) {
    CheckedElement = ele;
    evt = window.event || arguments.callee.caller.arguments[0];
    evt.stopPropagation?evt.stopPropagation():evt.cancelBubble=true;
    showMenu();

}

function deleteElements() {
    CheckedElement.parentNode.removeChild(CheckedElement);
    hideMenu();
}

function setBgroundColor() {
    CheckedElement.style.background = "red";
    hideMenu();
}

function setFontColor() {
    CheckedElement.style.color = "blue";
    hideMenu();
}

function changeFontSize(ele, operator) {
    //if (flag == "true") {
        var current_fontSize = getCurrentFontSize(ele);
    //}
    //var current_fontSize=ele.currentStyle.fontSize;

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
    hideMenu();
}

function decFontSize() {
    changeFontSize(CheckedElement, '-');
    hideMenu();
}




var defaultSize = "15px"; //默认字体大小
//获取元素当前字体大小
//var current_fontSize = 0;
    var flag = "true",
    first = "true";

function getCurrentFontSize(element) {
    //获取div标签 
    var mydiv = document.getElementById("contents");
    if (element.currentStyle) { //IE
        flag = "false";
        return element.currentStyle.fontSize;
    } else if (document.defaultView) { //非IE
        flag = "false";

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
function showMenu() {
    //var container = document.getElementById('container'); 
    // var container = event.srcElement;
    //containerID=event.srcElement.id;
    var menu = document.getElementById('menu');
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
    //LTEvent.addListener(menu,"contextmenu",LTEvent.cancelBubble);
    //document.addEventListener("click", function(event) {notDisplayMenu(); }, false);
}
/*隐藏菜单*/
function hideMenu() {
    var menu = document.getElementById('menu');
    menu.style.visibility = 'hidden';
}


document.onclick=function(){hideMenu();}