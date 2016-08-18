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
        mytable.setAttribute("class", "DynamicTable");

    } else if (getOption() == "button") {
        var obj_btn = document.createElement("input");
        obj_btn.type = "button";
        // obj_btn.class = "DynamicButton";
        obj_btn.setAttribute("class", "DynamicButton");
        obj_btn.value = "alert box";
        if (obj_btn.attachEvent) {
            obj_btn.addEventListener("onclick", CreateAlertbox);
        } else {
            obj_btn.addEventListener("click", CreateAlertbox);
        }
        mydiv.appendChild(obj_btn);

    } else if (getOption() == "text") {
        var obj_text = document.createElement("input");
        obj_text.type = "text";
        // obj_text.class = "DynamicText";
        obj_text.setAttribute("class", "DynamicText");
        obj_text.name = "Enlish name";
        obj_text.value = "Grace Liu";
        mydiv.appendChild(obj_text);

    } else if (getOption() == "div") {
        var obj_div = document.createElement("div");
        //obj_div.class = "DynamicDiv";
        obj_div.setAttribute("class", "DynamicDiv");
        var div_text = document.createTextNode("这是一个动态产生的div标签。");
        obj_div.appendChild(div_text);
        mydiv.appendChild(obj_div);

    } else {
        document.getElementById("contents").innerHTML = "Create!!";
    }

}
//弹出一个警告框
function CreateAlertbox() {
    alert("I am an alert box!!");
}
//通过classname获取元素
function getByClass(oParent, sClass) {
    var aResult = [];
    var aEle = oParent.getElementsByTagName('*');
    for (var i = 0; i < aEle.length; i++) {
        /*当className相等时添加到数组中*/
        if (aEle[i].className == sClass) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}

function AllDelete(aElement) {
    if (aElement.length > 0) {
        for (var i = 0; i < aElement.length; i++) {
            aElement[i].parentNode.removeChild(aElement[i]);
        }

    }

}
//点击delete按钮时
function DeleteElements() {

    //获取div标签 
    var mydiv = document.getElementById("contents");
    if (getOption() == "table") {
        var table_ele = getByClass(mydiv, "DynamicTable");
        AllDelete(table_ele);

    } else if (getOption() == "button") {
        var btn_ele = getByClass(mydiv, "DynamicButton");
        AllDelete(btn_ele);

    } else if (getOption() == "text") {
        var text_ele = getByClass(mydiv, "DynamicText");
        AllDelete(text_ele);

    } else if (getOption() == "div") {
        var div_ele = getByClass(mydiv, "DynamicDiv");
        AllDelete(div_ele);

    } else {
        document.getElementById("contents").innerHTML = "Delete!!";
    }

}

function AllSetBgColor(aElement) {
    if (aElement.length > 0) {
        for (var i = 0; i < aElement.length; i++) {
            aElement[i].style.background = randomColor();
        }

    }

}
//点击background color按钮时
function SetBackgroundColor() {


    //获取div标签 
    var mydiv = document.getElementById("contents");
    if (getOption() == "table") {
        var table_ele = getByClass(mydiv, "DynamicTable");
        AllSetBgColor(table_ele);
    } else if (getOption() == "button") {
        var btn_ele = getByClass(mydiv, "DynamicButton");
        AllSetBgColor(btn_ele);
    } else if (getOption() == "text") {
        var text_ele = getByClass(mydiv, "DynamicText");
        AllSetBgColor(text_ele);

    } else if (getOption() == "div") {
        var div_ele = getByClass(mydiv, "DynamicDiv");
        AllSetBgColor(div_ele);
    } else {
        document.getElementById("contents").innerHTML = "bgcolor!!";
    }
}

function AllSetFontColor(aElement) {
    if (aElement.length > 0) {
        for (var i = 0; i < aElement.length; i++) {
            aElement[i].style.color = randomColor();
        }

    }

}
//点击font color按钮时
function SetFont_Color() {

    //获取div标签 
    var mydiv = document.getElementById("contents");
    if (getOption() == "table") {
        var table_ele = getByClass(mydiv, "DynamicTable");
        AllSetFontColor(table_ele);

    } else if (getOption() == "button") {
        var btn_ele = getByClass(mydiv, "DynamicButton");
        AllSetFontColor(btn_ele);
    } else if (getOption() == "text") {
        var text_ele = getByClass(mydiv, "DynamicText");
        AllSetFontColor(text_ele);

    } else if (getOption() == "div") {
        var div_ele = getByClass(mydiv, "DynamicDiv");
        AllSetFontColor(div_ele);
    } else {
        document.getElementById("contents").innerHTML = "font color!!";
    }
}

var defaultSize = "15px"; //默认字体大小
//获取元素当前字体大小
var current_fontSize = 0,
    flag = "true",
    first = "true";

function getCurrentFontSize(element) {
    //获取div标签 
    var mydiv = document.getElementById("contents");
    if (element.currentStyle) { //IE
        flag = "false";
        return element.currentStyle.fontSize;
    } else if (document.defaultView) { //非IE
        flag = "false";
        return document.defaultView.getComputedStyle(mydiv, null).getPropertyValue('font-Size');
    }

    return defaultSize;
}

//截掉'px', 以便于计算 
function subNo(font_Size) {
    var size = parseInt(font_Size.substring(0, font_Size.length - 2));
    //alert(size);
    return size;
}

// 改变字体大小 
function changeSize(element, operator) {
    if (flag == "true") {
        current_fontSize = getCurrentFontSize(element);
    }

    if (first == "true") {
            if (operator == '+') {
                var font_Size = subNo(current_fontSize) + 1;
            } else if (operator == '-') {
                var font_Size = subNo(current_fontSize) - 1;
            }
        } else {
            var font_Size = subNo(current_fontSize);
        }

        current_fontSize = font_Size + "px";
        //alert(fontSize);//px

        element.style.fontSize = current_fontSize;
    }

    function JudgeFirstTime(i) {
        if (i == 0) {
            first = "true";
        } else {
            first = "false";
        }
    }

    function AllIncFontSize(aElement) {
        if (aElement.length > 0) {
            for (var i = 0; i < aElement.length; i++) {
                JudgeFirstTime(i);
                changeSize(aElement[i], '+');
            }

        }

    }

    function IncFontSize() {

        //获取div标签 
        var mydiv = document.getElementById("contents");
        if (getOption() == "table") {
            var table_ele = getByClass(mydiv, "DynamicTable");
            AllIncFontSize(table_ele);


        } else if (getOption() == "button") {
            var btn_ele = getByClass(mydiv, "DynamicButton");
            AllIncFontSize(btn_ele);
        } else if (getOption() == "text") {
            var text_ele = getByClass(mydiv, "DynamicText");
            AllIncFontSize(text_ele);

        } else if (getOption() == "div") {
            var div_ele = getByClass(mydiv, "DynamicDiv");
            AllIncFontSize(div_ele);
        } else {
            document.getElementById("contents").innerHTML = "increase font Size!!";
        }
    }

    function AllDecFontSize(aElement) {
        if (aElement.length > 0) {
            for (var i = 0; i < aElement.length; i++) {
                JudgeFirstTime(i);
                changeSize(aElement[i], '-');
            }

        }

    }

    function DecFontSize() {

        //获取div标签 
        var mydiv = document.getElementById("contents");
        if (getOption() == "table") {
            var table_ele = getByClass(mydiv, "DynamicTable");
            AllDecFontSize(table_ele);
        } else if (getOption() == "button") {
            var btn_ele = getByClass(mydiv, "DynamicButton");
            AllDecFontSize(btn_ele);
        } else if (getOption() == "text") {
            var text_ele = getByClass(mydiv, "DynamicText");
            AllDecFontSize(text_ele);

        } else if (getOption() == "div") {
            var div_ele = getByClass(mydiv, "DynamicDiv");
            AllDecFontSize(div_ele);
        } else {
            document.getElementById("contents").innerHTML = "decrease font Size!!";
        }
    }
