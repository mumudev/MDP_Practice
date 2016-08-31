$(document).ready(function() {
    loading();
    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements",
        success: function(data) {
            for (var i = 0; i < data.data.length; i++) {
                $(".menu_type").append('<input class="head_button menu_button button menu_type_button" type="button" value="' + data.data[i].text + '" >');
            }
        }
    });

    $(".menu_type").delegate(".menu_type_button", "click", function create() {
        var content = document.getElementById("contents_p");
        var eletype = this.value.toLowerCase().replace(" ", "");
        var newNode = initializeNode(eletype);
        if (newNode) {
            content.appendChild(newNode);
        }
        cancelMenu_type();
    });
    //$.poxy();


    function initializeNode(eletype) {
        var newNode = null;
        if (eletype) {
            if (eletype == "inputtext") {
                newNode = document.createElement("input");
                newNode.type = "text";
                newNode.style.width = "110px";
                newNode.style.height = "40px";
            } else if (eletype == "image") {
                newNode = document.createElement("img");
            } else if (eletype == "button") {
                newNode = document.createElement("button");
                newNode.style.cursor = "pointer";
                newNode.style.width = "110px";
                newNode.style.height = "50px";
            } else {
                newNode = document.createElement(eletype);
                newNode.style.width = "130px";
                newNode.style.height = "130px";
            }
            newNode.className = eletype + "s";
            /*bind event to the created elements */

            //TODO ··············································································
            bindEventOnCtdEle(newNode);
            //TODO··············································································
            newNode.style.float = "left";
            newNode.style.border = "1px solid black";
            newNode.style.fontSize = "15px";
            newNode = addNodeExampleContent(newNode);
        }
        return newNode;
    }

    function bindEventOnCtdEle(newNode) {
        $(newNode).bind("click", function operate() {
            cancelMenu();
            selElement = this;
            //cancel choosing other Elements in contents except selElement
            unchooseOther(selElement);
            var EVT = window.event ? window.event : e;
            var x = EVT.clientX;
            var y = EVT.clientY;
            var eletype = this.tagName.toLowerCase();
            var menu = $("");
            if (eletype == "button") {
                menu = $(".menu_button_x");
            } else if (eletype == "img") {
                menu = $(".menu_image");
            } else if (eletype == "div") {
                menu = $(".menu_div");
            } else if (eletype == "table") {
                menu = $(".menu_table");
            } else {
                menu = $(".menu_text");
            }
            var border = this.style.border;
            if (this.style.border == "2px solid blue") {
                cancelMenu();
            } else {
                this.style.border = "2px solid blue";
                menu.css("left", x + "px");
                menu.css("top", y + "px");
                menu.css("display", "block");
            }
        });
    }

    function addNodeExampleContent(newNode) {
        var eletype = newNode.tagName.toLowerCase();
        newNode = $(newNode);
        if (eletype == "table") {
            //define a variable to loop through(traverse) the CellData Array
            var cells_index = 0;
            for (var i = 0; i < tableData.data.rows; i++) {
                newNode.append("<tr></tr>");
                for (var j = 0; j < tableData.data.cols; j++) {
                    newNode.children("tr:eq(" + i + ")").append("<td></td>");
                    //currentCell in returned CellData Array 
                    var curCell = tableData.data.cells[cells_index];
                    //if currentCell's row amd col will be show in the current item of Table 
                    if (curCell.row == i && curCell.col == j) {
                        //set the currentCell's data into the current item 
                        newNode.children("tr:eq(" + i + ")").children("td:eq(" + j + ")").text(curCell.data);
                        //jump into the next one in the returned CellData Array
                        cells_index++;
                    }
                }
            }
        } else if (eletype == "input") {
            newNode.val(textData.data.text);
        } else if (eletype == "div") {
            newNode.html(divData.data.text);
        } else if (eletype == "button") {
            newNode.html(buttonData.data.text);
            newNode.css("cursor", "pointer");
            newNode.attr("alt", buttonData.data.title);
        } else {
            newNode.attr("src", imageData.data.image);
            newNode.attr("alt", imageData.data.title);
        }
        return newNode[0];
    }

    // $.get("http://admadevwb8001:8001/api/html/elements", function(data) {
    //     alert(data);
    // });
    // var str = '{"name":"chasen","sex":"male"}';
    // var obj = JSON.parse(str);
    // alert(obj.sex);
    // str=JSON.stringify(obj);
    // alert(str);
    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/button/data",
        success: function(data) {
            //alert(data);
            buttonData = data;
        }
    });

    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/inputText/data",
        success: function(data) {
            //alert(data);
            textData = data;
        }
    });

    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/table/data",
        success: function(data) {
            //alert(data);
            tableData = data;
        }
    });

    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/div/data",
        success: function(data) {
            //alert(data);
            divData = data;
        }
    });

    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/image/data",
        success: function(data) {
            //alert(data);
            imageData = data;
        }
    });

    function appendItem(act, eleClass) {
        var actArray = act.data;
        for (var i = 0; i < actArray.length; i++) {
            var newOne = $('<input class="head_button menu_button button" type="button" alt="' + actArray[i].title + '"value="' + actArray[i].text + '">');
            $("." + eleClass).append(newOne);
        }
        if (actArray.length > 0) {
            $("." + eleClass).css("height", "" + (5 + actArray.length * 55) + "px");
        }
    }

    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/button/actions",
        success: function(data) {
            buttonAct = data;
            appendItem(buttonAct, "menu_button_x");
        }
    });

    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/table/actions",
        success: function(data) {
            tableAct = data;
            appendItem(tableAct, "menu_table");
        }
    });
    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/div/actions",
        success: function(data) {
            divAct = data;
            appendItem(divAct, "menu_div");
        }
    });
    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/image/actions",
        success: function(data) {
            imageAct = data;
            appendItem(imageAct, "menu_image");
        }
    });
    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/inputText/actions",
        success: function(data) {
            textAct = data;
            appendItem(textAct, "menu_text");
        }
    });

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
        cancel choosing other Elements in contents except selElement
    */
    function unchooseOther(ele) {
        cancelMenu();
        var childs = $(ele).parent().children();
        for (i = 0; i < childs.length; i++) {
            if (childs[i] !== selElement) {
                childs[i].style.border = "1px solid black";
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
    var operateFunction = {
        _delete: function() {
            selElement.parentNode.removeChild(selElement);
            cancelMenu();
        },
        backcolor: function() {
            selElement.style.backgroundColor = "rgb(" + ramdomMaker() +
                "," + ramdomMaker() + "," + ramdomMaker() + ")";
            cancelMenu();
        },
        fontcolor: function() {
            selElement.style.color = "rgb(" + ramdomMaker() +
                "," + ramdomMaker() + "," + ramdomMaker() + ")";
            cancelMenu();
        },
        _fontSize: function() {
            var operate = this.value.charAt(this.value.length - 1);
            if (operate == "+") {
                selElement.style.fontSize = (parseInt(selElement.style.fontSize, 10) + 2) + "px";
                cancelMenu();
            } else {
                selElement.style.fontSize = (parseInt(selElement.style.fontSize, 10) - 2) + "px";
                cancelMenu();
            }
        }
    };

    function ramdomMaker() {
        return Math.round(Math.random() * 255);
    }

    function bindEventToOpreItem(eleClass) {
        $("." + eleClass).delegate("input:first", "click", operateFunction._delete);
        $("." + eleClass).delegate("input:eq(1)", "click", operateFunction.backcolor);
        $("." + eleClass).delegate("input:eq(2)", "click", operateFunction.fontcolor);
        $("." + eleClass).delegate("input:gt(2)", "click", operateFunction._fontSize);
    }
    bindEventToOpreItem("menu_table");
    bindEventToOpreItem("menu_image");
    bindEventToOpreItem("menu_div");
    bindEventToOpreItem("menu_button_x");
    bindEventToOpreItem("menu_text");


});


//--args --disable-web-security --user-data-dir="C:\Users\Public\Documents\chrome"
