//点击create按钮时的事件
function CreateElements() {

    var sel = document.getElementById("option");
    var index = sel.selectedIndex;
    var sel_text = sel.options[index].text;
    //获取div标签 
    var mydiv = document.getElementById("contents");
    if (sel_text == "table") {
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

    } else if (sel_text == "button") {
        var obj_btn = document.createElement("input");
        obj_btn.type = "button";
        // obj_btn.class = "DynamicButton";
        obj_btn.setAttribute("class", "DynamicButton");
        obj_btn.value = "popup box";
        if (obj_btn.attachEvent) {
            obj_btn.addEventListener("onclick", CreateAlertbox);
        } else {
            obj_btn.addEventListener("click", CreateAlertbox);
        }
        mydiv.appendChild(obj_btn);

    } else if (sel_text == "text") {
        var obj_text = document.createElement("input");
        obj_text.type = "text";
        // obj_text.class = "DynamicText";
        obj_text.setAttribute("class", "DynamicText");
        obj_text.name = "Enlish name";
        obj_text.value = "Grace Liu";
        mydiv.appendChild(obj_text);

    } else if (sel_text == "div") {
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
//点击delete按钮时
function DeleteElements() {
    //获取下拉列表选中的文本内容
    var sel = document.getElementById("option");
    var index = sel.selectedIndex;
    var sel_text = sel.options[index].text;
    //获取div标签 
    var mydiv = document.getElementById("contents");
    if (sel_text == "table") {
        var table_ele = getByClass(mydiv, "DynamicTable");
        if (table_ele.length > 0) {

            for (var i = 0; i < table_ele.length; i++) {
                table_ele[i].parentNode.removeChild(table_ele[i]);
            }


        }

    } else if (sel_text == "button") {
        var btn_ele = getByClass(mydiv, "DynamicButton");
        if (btn_ele.length > 0) {
            for (var i = 0; i < btn_ele.length; i++) {
                btn_ele[i].parentNode.removeChild(btn_ele[i]);
            }

        }

    } else if (sel_text == "text") {
        var text_ele = getByClass(mydiv, "DynamicText");
        if (text_ele.length > 0) {
            for (var i = 0; i < text_ele.length; i++) {
                text_ele[i].parentNode.removeChild(text_ele[i]);
            }
        }

    } else if (sel_text == "div") {
        var div_ele = getByClass(mydiv, "DynamicDiv");
        if (div_ele.length > 0) {
            for (var i = 0; i < div_ele.length; i++) {
                div_ele[i].parentNode.removeChild(div_ele[i]);
            }
        }

    } else {
        document.getElementById("contents").innerHTML = "Delete!!";
    }

}
//点击background color按钮时
function SetBackgroundColor() {

    //获取下拉列表选中的文本内容
    var sel = document.getElementById("option");
    var index = sel.selectedIndex;
    var sel_text = sel.options[index].text;
    //获取div标签 
    var mydiv = document.getElementById("contents");
    if (sel_text == "table") {
        var table_ele = getByClass(mydiv, "DynamicTable");

        if (table_ele.length > 0) {
            //table_ele.setAttribute("bgcolor", "red");
            for (var i = 0; i < table_ele.length; i++) {
                table_ele[i].style.background = "red";
            }

        }
    } else if (sel_text == "button") {
        var btn_ele = getByClass(mydiv, "DynamicButton");
        if (btn_ele.length > 0) {
            for (var i = 0; i < btn_ele.length; i++) {
                btn_ele[i].style.background = "red";
            }

        }
    } else if (sel_text == "text") {
        var text_ele = getByClass(mydiv, "DynamicText");
        if (text_ele.length > 0) {
            for (var i = 0; i < text_ele.length; i++) {
                text_ele[i].style.background = "red";
            }

        }

    } else if (sel_text == "div") {
        var div_ele = getByClass(mydiv, "DynamicDiv");
        if (div_ele.length > 0) {
            for (var i = 0; i < div_ele.length; i++) {
                div_ele[i].style.background = "red";
            }

        }
    } else {
        document.getElementById("contents").innerHTML = "bgcolor!!";
    }
}
//点击font color按钮时
function SetFont_Color() {
    //获取下拉列表选中的文本内容
    var sel = document.getElementById("option");
    var index = sel.selectedIndex;
    var sel_text = sel.options[index].text;
    //获取div标签 
    var mydiv = document.getElementById("contents");
    if (sel_text == "table") {
        var table_ele = getByClass(mydiv, "DynamicTable");

        if (table_ele.length > 0) {
            //table_ele.setAttribute("bgcolor", "red");
            for (var i = 0; i < table_ele.length; i++) {
                table_ele[i].style.color = "red";
            }

        }
    } else if (sel_text == "button") {
        var btn_ele = getByClass(mydiv, "DynamicButton");
        if (btn_ele.length > 0) {
            for (var i = 0; i < btn_ele.length; i++) {
                btn_ele[i].style.color = "red";
            }

        }
    } else if (sel_text == "text") {
        var text_ele = getByClass(mydiv, "DynamicText");
        if (text_ele.length > 0) {
            for (var i = 0; i < text_ele.length; i++) {
                text_ele[i].style.color = "red";
            }

        }

    } else if (sel_text == "div") {
        var div_ele = getByClass(mydiv, "DynamicDiv");
        if (div_ele.length > 0) {
            for (var i = 0; i < div_ele.length; i++) {
                div_ele[i].style.color = "red";
            }

        }
    } else {
        document.getElementById("contents").innerHTML = "font color!!";
    }
}

var defaultSize = "12px"; //默认字体大小
//获取元素当前字体大小
var current_fontSize = 0,
    flag = "true",
    first = "true";

function getCurrentFontSize(element) {
    //获取div标签 
    var mydiv = document.getElementById("contents");
    if (element.currentStyle) {//IE
        flag = "false";
        return element.currentStyle.fontSize;
    } else if (document.defaultView) {//非IE
        flag = "false";
        return document.defaultView.getComputedStyle(mydiv, null).getPropertyValue('font-Size');
    }

    return defaultSize;
}



// 递增字体大小 
function increaseSize(element) {
    if (flag == "true") {
        current_fontSize = getCurrentFontSize(element);
    }
   
    if (first == "true") {
        var font_Size = subNo(current_fontSize) + 1;
    } else {
        var font_Size = subNo(current_fontSize);
    }

    current_fontSize = font_Size + "px";
    //alert(fontSize);//px
    
    element.style.fontSize = current_fontSize;
}

//截掉'px', 以便于计算 
function subNo(font_Size) {
    var size = parseInt(font_Size.substring(0, font_Size.length - 2));
    //alert(size);
    return size;
}
// 递减字体大小 
function decreaseSize(element) {
    if (flag == "true") {
        current_fontSize = getCurrentFontSize(element);
    }
   
    if (first == "true" && subNo(current_fontSize)>1) {
        var font_Size = subNo(current_fontSize) -1;
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

function IncFontSize() {
    //获取下拉列表选中的文本内容
    var sel = document.getElementById("option");
    var index = sel.selectedIndex;
    var sel_text = sel.options[index].text;
    //获取div标签 
    var mydiv = document.getElementById("contents");
    if (sel_text == "table") {
        var table_ele = getByClass(mydiv, "DynamicTable");

        if (table_ele.length > 0) {
            for (var i = 0; i < table_ele.length; i++) {
                JudgeFirstTime(i);
                increaseSize(table_ele[i]);
            }

        }
    } else if (sel_text == "button") {
        var btn_ele = getByClass(mydiv, "DynamicButton");
        if (btn_ele.length > 0) {
            for (var i = 0; i < btn_ele.length; i++) {
                JudgeFirstTime(i);
                increaseSize(btn_ele[i]);
            }

        }
    } else if (sel_text == "text") {
        var text_ele = getByClass(mydiv, "DynamicText");
        if (text_ele.length > 0) {
            for (var i = 0; i < text_ele.length; i++) {
                JudgeFirstTime(i);
                increaseSize(text_ele[i]);
            }

        }

    } else if (sel_text == "div") {
        var div_ele = getByClass(mydiv, "DynamicDiv");
        if (div_ele.length > 0) {
            for (var i = 0; i < div_ele.length; i++) {
                JudgeFirstTime(i);
                increaseSize(div_ele[i]);
            }

        }
    } else {
        document.getElementById("contents").innerHTML = "increase font Size!!";
    }
}

function DecFontSize() {
//获取下拉列表选中的文本内容
    var sel = document.getElementById("option");
    var index = sel.selectedIndex;
    var sel_text = sel.options[index].text;
    //获取div标签 
    var mydiv = document.getElementById("contents");
    if (sel_text == "table") {
        var table_ele = getByClass(mydiv, "DynamicTable");

        if (table_ele.length > 0) {
            for (var i = 0; i < table_ele.length; i++) {
                JudgeFirstTime(i);
                decreaseSize(table_ele[i]);
            }

        }
    } else if (sel_text == "button") {
        var btn_ele = getByClass(mydiv, "DynamicButton");
        if (btn_ele.length > 0) {
            for (var i = 0; i < btn_ele.length; i++) {
                JudgeFirstTime(i);
                decreaseSize(btn_ele[i]);
            }

        }
    } else if (sel_text == "text") {
        var text_ele = getByClass(mydiv, "DynamicText");
        if (text_ele.length > 0) {
            for (var i = 0; i < text_ele.length; i++) {
                JudgeFirstTime(i);
                decreaseSize(text_ele[i]);
            }

        }

    } else if (sel_text == "div") {
        var div_ele = getByClass(mydiv, "DynamicDiv");
        if (div_ele.length > 0) {
            for (var i = 0; i < div_ele.length; i++) {
                JudgeFirstTime(i);
                decreaseSize(div_ele[i]);
            }

        }
    } else {
        document.getElementById("contents").innerHTML = "decrease font Size!!";
    }
}
