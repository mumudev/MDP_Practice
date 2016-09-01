$(document).ready(function() {
    //点击create按钮时弹出的菜单项
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://admadevwb8001:8001/api/html/elements",
        async: true,
        success: function(msg) {
            var str = "";
            var arrData = msg.data;
            if (arrData != null) {
                for (var i = 0; i < arrData.length; i++) {                   
                    str = str + "<div class='menuitems'" + " " + "id='" + arrData[i].id + "'>" + "<a href='#'>" +
                        arrData[i].text + "</a></div>";                   
                }
                $("#menuEle").html(str);
                bindCreateEvent();

            }

        }
    });

    //为create按钮绑定事件
    $("#create").click(function(event) { chooseElements(event); });

    //button元素的popup menu
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://admadevwb8001:8001/api/html/elements/button/actions",
        async: true,
        success: function(msg) {
            var str = "";
            var arrData = msg.data;
            if (arrData != null) {
                for (var i = 0; i < arrData.length; i++) {
                    str = str + "<div class='menuitems'" + " id='" + arrData[i].id + "' title='" + arrData[i].title + "'>" + "<a href='#'>" +
                        arrData[i].text + "</a></div>";                   
                }
                $("#menuButton").html(str);
                for (var i = 0; i < arrData.length; i++) {
                    bindActionEvent("menuButton", arrData[i].id);
                }
            }
        }
    });

    //table元素的popup menu
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://admadevwb8001:8001/api/html/elements/table/actions",
        async: true,
        success: function(msg) {
            var str = "";
            var arrData = msg.data;
            if (arrData != null) {
                for (var i = 0; i < arrData.length; i++) {
                    str = str + "<div class='menuitems'" + " id='" + arrData[i].id + "' title='" + arrData[i].title + "'>" + "<a href='#'>" +
                        arrData[i].text + "</a></div>";
                }
                $("#menuTable").html(str);
                for (var i = 0; i < arrData.length; i++) {
                    bindActionEvent("menuTable", arrData[i].id);
                }
            }
        }
    });

    //div元素的popup menu
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://admadevwb8001:8001/api/html/elements/div/actions",
        async: true,
        success: function(msg) {
            var str = "";
            var arrData = msg.data;
            if (arrData != null) {
                for (var i = 0; i < arrData.length; i++) {
                    str = str + "<div class='menuitems'" + " id='" + arrData[i].id + "' title='" + arrData[i].title + "'>" + "<a href='#'>" +
                        arrData[i].text + "</a></div>";
                }
                $("#menuDiv").html(str);                
                for (var i = 0; i < arrData.length; i++) {
                    bindActionEvent("menuDiv", arrData[i].id);
                }
            }
        }
    });

    //inputbox元素的popup menu
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://admadevwb8001:8001/api/html/elements/inputText/actions",
        async: true,
        success: function(msg) {
            var str = "";
            var arrData = msg.data;
            if (arrData != null) {
                for (var i = 0; i < arrData.length; i++) {
                    str = str + "<div class='menuitems'" + " id='" + arrData[i].id + "' title='" + arrData[i].title + "'>" + "<a href='#'>" +
                        arrData[i].text + "</a></div>";
                }
                $("#menuInputText").html(str);                
                for (var i = 0; i < arrData.length; i++) {
                    bindActionEvent("menuInputText", arrData[i].id);
                }
            }
        }
    });

    //image元素的popup menu
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://admadevwb8001:8001/api/html/elements/image/actions",
        async: true,
        success: function(msg) {
            var str = "";
            var arrData = msg.data;
            if (arrData != null) {
                for (var i = 0; i < arrData.length; i++) {
                    str = str + "<div class='menuitems'" + " id='" + arrData[i].id + "' title='" + arrData[i].title + "'>" + "<a href='#'>" +
                        arrData[i].text + "</a></div>";
                }
                $("#menuImage").html(str);               
                for (var i = 0; i < arrData.length; i++) {
                    bindActionEvent("menuImage", arrData[i].id);
                }
            }
        }
    });
    /////////////////////////
});



function bindCreateEvent() {    
    $("#menuEle #table").click(function() { createTable(); });    
    $("#menuEle #button").click(function() { createButton(); });   
    $("#menuEle #inputText").click(function() { createInputText(); });    
    $("#menuEle #div").click(function() { createDiv(); });   
    $("#menuEle #image").click(function() { createImage(); });
}

function bindActionEvent(menuId, arrId) {
    var selector = "#" + menuId + " " + "#" + arrId;
    if (arrId == "delete")
        $(selector).click(function() { deleteElements(menuId); });
    if (arrId == "backgroundColor")
        $(selector).click(function() { setBgroundColor(menuId); });
    if (arrId == "fontColor")
        $(selector).click(function() { setFontColor(menuId); });
    if (arrId == "increaseFontSize")
        $(selector).click(function() { incFontSize(menuId); });
    if (arrId == "decreaseFontSize")
        $(selector).click(function() { decFontSize(menuId); });

}



//点击create按钮时的事件
function chooseElements(evt) {
    var evt = window.event || arguments.callee.caller.arguments[0];
    evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
    showMenu("menuEle");
}

function createImage() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://admadevwb8001:8001/api/html/elements/image/data",
        async: true,
        success: function(msg) {
            var msgData = msg.data;
            if (msgData != null) {                
                var str = $("<img class='DynamicImage'/>");
                               $("#contents").append(str);
                $(".DynamicImage").attr({ src: msgData.image, title: msgData.title, alt: "morningstar logo" });
                $(".DynamicImage").css("background-color", "red");
                $(".DynamicImage").click(function(event) { leftClick(event, this, 'menuImage'); });
            }
        }
    });
    hideMenu('menuEle');
}

function createTable() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://admadevwb8001:8001/api/html/elements/table/data",
        async: true,
        success: function(msg) {
            var msgData = msg.data;
            if (msgData != null) {
                var rows = msgData.rows;
                var cols = msgData.cols;
                var txt = $("<table class='DynamicTable'></table>");
                $("#contents").append(txt);
                var str = "";
                for (var j = 0; j < rows; j++) {
                    str = str + '<tr>';
                    for (var i = 0; i < cols; i++) {
                        var find = false;
                        for (var k = 0; k < msgData.cells.length; k++) {
                            if (j == msgData.cells[k].row && i == msgData.cells[k].col) {
                                str = str + '<td>' + msgData.cells[k].data + '</td>';
                                find = true;
                                break;
                            }
                        }
                        if (find == false) {
                            str = str + '<td>' + '</td>';
                        }
                    }
                    str = str + '</tr>';
                }
                $(".DynamicTable").html(str);                
                $(".DynamicTable").click(function(event) { leftClick(event, this, 'menuTable'); });
            }
        }
    });

    /*
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
    */
    hideMenu('menuEle');

}

function createButton() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://admadevwb8001:8001/api/html/elements/button/data",
        async: true,
        success: function(msg) {
            var msgData = msg.data;
            if (msgData != null) {                
                var str = $("<input class='DynamicButton'></input>");              
                $("#contents").append(str);
                $(".DynamicButton").attr({ type: "button", value: msgData.text, title: msgData.title });
                $(".DynamicButton").click(function(event) { leftClick(event, this, 'menuButton'); });
            }
        }
    });   
    hideMenu('menuEle');
}

function createInputText() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://admadevwb8001:8001/api/html/elements/inputText/data",
        async: true,
        success: function(msg) {
            var msgData = msg.data;
            if (msgData != null) {               
                var str = $("<input class='DynamicText'></input>");               
                $("#contents").append(str);
                $(".DynamicText").attr({ type: "text", value: msgData.text });
                $(".DynamicText").css("border-color","grey");
                $(".DynamicText").click(function(event) { leftClick(event, this, 'menuInputText'); });
            }
        }
    });  
    hideMenu('menuEle');
}

function createDiv() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://admadevwb8001:8001/api/html/elements/div/data",
        async: true,
        success: function(msg) {
            var msgData = msg.data;
            if (msgData != null) {
                //<input type="button" value=""
                var str = $("<div class='DynamicDiv'></div>");

                //<input></input>
                $("#contents").append(str);
                $(".DynamicDiv").html(msgData.text);
                $(".DynamicDiv").click(function(event) { leftClick(event, this, 'menuDiv'); });
            }

        }
    });

    /*
    var mydiv = document.getElementById("contents");
    var obj_div = document.createElement("div");
    obj_div.setAttribute("class", "DynamicDiv");
    var div_text = document.createTextNode("这是一个动态产生的div标签。");
    obj_div.appendChild(div_text);
    mydiv.appendChild(obj_div);
    obj_div.addEventListener("click", function(event) { leftClick(event, this); }, false);
     */
    hideMenu('menuEle');

}
var CheckedElement;

//Click created element, show a border for it, the border is blue with 2 pixels width.
function leftClick(evt, ele, menu) {
    CheckedElement = ele;
    evt = window.event || arguments.callee.caller.arguments[0];
    evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
    ele.style.borderStyle = "solid";
    ele.style.borderWidth = "2px";
    arrMenu = ["menuTable", "menuButton", "menuInputText", "menuDiv", "menuImage"];
    //显示相应元素的菜单，隐藏其他的菜单
    for (var i = 0; i < arrMenu.length; i++) {
        if (menu == arrMenu[i]) {
            showMenu(arrMenu[i]);
        } else {
            hideMenu(arrMenu[i]);
        }
    }

}

function deleteElements(menu) {
    CheckedElement.parentNode.removeChild(CheckedElement);
    hideMenu(menu);
}

function setBgroundColor(menu) {
    CheckedElement.style.background = "red";
    hideMenu(menu);
}

function setFontColor(menu) {
    CheckedElement.style.color = "blue";
    hideMenu(menu);
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

function incFontSize(menu) {
    changeFontSize(CheckedElement, '+');
    hideMenu(menu);
}

function decFontSize(menu) {
    changeFontSize(CheckedElement, '-');
    hideMenu(menu);
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
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    /*如果从鼠标位置到容器右边的空间小于菜单的宽度，就定位菜单的左坐标（Left）为当前鼠标位置向左一个菜单宽度*/
    if (rightedge < menu.offsetWidth)
        menu.style.left = scrollLeft + evt.clientX - menu.offsetWidth + "px";
    else
    /*否则，就定位菜单的左坐标为当前鼠标位置*/
        menu.style.left = scrollLeft + evt.clientX + "px";
    /*如果从鼠标位置到容器下边的空间小于菜单的高度，就定位菜单的上坐标（Top）为当前鼠标位置向上一个菜单高度*/
    if (bottomedge < menu.offsetHeight)
        menu.style.top = scrollTop + evt.clientY - menu.offsetHeight + "px";
    else
    /*否则，就定位菜单的上坐标为当前鼠标位置*/
        menu.style.top = scrollTop + evt.clientY + "px";
    /*设置菜单可见*/
    menu.style.visibility = "visible";
}
/*隐藏菜单*/
function hideMenu(eleId) {
    var menu = document.getElementById(eleId);
    menu.style.visibility = 'hidden';
}

document.onclick = function() {
   //点击其他空白处时隐藏菜单
    hideMenu('menuEle');
    hideMenu('menuTable');
    hideMenu('menuButton');
    hideMenu('menuDiv');
    hideMenu('menuImage');
    hideMenu('menuInputText');
}
