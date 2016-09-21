$(document).ready(function() {
    // function initializeNode(eletype) {
    //     var newNode = null;
    //     if (eletype) {
    //         if (eletype == "inputtext") {
    //             newNode = document.createElement("input");
    //             $(newNode).addClass(eletype + "s");
    //             newNode.type = "text";
    //             $(newNode).addClass("form-control");
    //             newNode.style.width = "150px";
    //             newNode.style.height = "40px";
    //             //$(newNode).addClass("");
    //         } else if (eletype == "image") {
    //             newNode = document.createElement("img");
    //             $(newNode).addClass(eletype + "s");
    //             $(newNode).addClass("img-rounded");
    //         } else if (eletype == "button") {
    //             newNode = document.createElement("button");
    //             $(newNode).addClass(eletype + "s");
    //             $(newNode).addClass("btn");
    //             //$(newNode).addClass("btn-default");
    //             newNode.style.cursor = "pointer";
    //             newNode.style.width = "150px";
    //             newNode.style.height = "50px";
    //         } else if (eletype == "table") {
    //             newNode = document.createElement(eletype);
    //             $(newNode).addClass(eletype + "s");
    //             $(newNode).addClass("table");
    //             $(newNode).addClass("table-striped");
    //             // newNode.style.width = "130px";
    //             // newNode.style.height = "130px";
    //         } else {
    //             newNode = document.createElement(eletype);
    //             $(newNode).addClass(eletype + "s");
    //             $(newNode).addClass("text-info");
    //             newNode.style.width = "130px";
    //             newNode.style.height = "130px";
    //         }
    //         /*bind event to the created elements */

    //         //TODO ··············································································
    //         bindEventOnCtdEle(newNode);
    //         //TODO··············································································
    //         newNode.style.float = "left";
    //         newNode.style.border = "1px solid black";
    //         newNode.style.fontSize = "15px";
    //         newNode = addNodeExampleContent(newNode);
    //     }
    //     return newNode;
    // }

    // function bindEventOnCtdEle(newNode) {
    //     $(newNode).bind("click", function operate() {
    //         //cancelMenu();
    //         selElement = this;
    //         //cancel choosing other Elements in contents except selElement
    //         unchooseOther(selElement);
    //         var EVT = window.event ? window.event : e;
    //         var x = EVT.clientX;
    //         var y = EVT.clientY;
    //         var eletype = this.tagName.toLowerCase();
    //         var menu = $("");
    //         if (eletype == "button") {
    //             menu = $(".menu_button_x");
    //         } else if (eletype == "img") {
    //             menu = $(".menu_image");
    //         } else if (eletype == "div") {
    //             menu = $(".menu_div");
    //         } else if (eletype == "table") {
    //             menu = $(".menu_table");
    //         } else {
    //             menu = $(".menu_text");
    //         }
    //         if (this.style.border == "2px solid blue") {
    //             this.style.border = "1px solid black";
    //             cancelMenu();
    //         } else {
    //             this.style.border = "2px solid blue";
    //             menu.css("left", x + "px");
    //             menu.css("top", y + "px");
    //             menu.css("display", "block");
    //         }
    //     });
    // }

    // function addNodeExampleContent(newNode) {
    //     var eletype = newNode.tagName.toLowerCase();
    //     newNode = $(newNode);
    //     if (eletype == "table") {
    //         //define a variable to loop through(traverse) the CellData Array
    //         var cells_index = 0;
    //         for (var i = 0; i < tableData.data.rows; i++) {
    //             if (i === 0) {
    //                 newNode.append("<thead></thead>");
    //                 newNode.children("thead").append("<tr></tr>");
    //             } else if (i === 1) {
    //                 newNode.append("<tbody></tbody>").append("<tr></tr>");
    //             } else {
    //                 newNode.children("tbody").append("<tr></tr>");
    //             }
    //             for (var j = 0; j < tableData.data.cols; j++) {
    //                 newNode.find("tr:eq(" + i + ")").append("<td></td>");
    //                 //currentCell in returned CellData Array 
    //                 var curCell = tableData.data.cells[cells_index];
    //                 //if currentCell's row amd col will be show in the current item of Table 
    //                 if (curCell.row == i && curCell.col == j) {
    //                     //set the currentCell's data into the current item 
    //                     newNode.find("tr:eq(" + i + ")").children("td:eq(" + j + ")").text(curCell.data);
    //                     //jump into the next one in the returned CellData Array
    //                     cells_index++;
    //                 }
    //             }
    //         }
    //     } else if (eletype == "input") {
    //         newNode.val(textData.data.text);
    //     } else if (eletype == "div") {
    //         newNode.html(divData.data.text);
    //     } else if (eletype == "button") {
    //         newNode.html(buttonData.data.text);
    //         newNode.css("cursor", "pointer");
    //         newNode.attr("title", buttonData.data.title);
    //     } else {
    //         newNode.attr("src", imageData.data.image);
    //         newNode.attr("title", imageData.data.title);
    //     }
    //     return newNode[0];
    // }

    // $.ajax({
    //     type: "get",
    //     url: "http://admadevwb8001:8001/api/html/elements/button/data",
    //     success: function(data) {
    //         //alert(data);
    //         buttonData = data;
    //     }
    // });

    // $.ajax({
    //     type: "get",
    //     url: "http://admadevwb8001:8001/api/html/elements/inputText/data",
    //     success: function(data) {
    //         //alert(data);
    //         textData = data;
    //     }
    // });

    // $.ajax({
    //     type: "get",
    //     url: "http://admadevwb8001:8001/api/html/elements/table/data",
    //     success: function(data) {
    //         //alert(data);
    //         tableData = data;
    //     }
    // });

    // $.ajax({
    //     type: "get",
    //     url: "http://admadevwb8001:8001/api/html/elements/div/data",
    //     success: function(data) {
    //         //alert(data);
    //         divData = data;
    //     }
    // });

    // $.ajax({
    //     type: "get",
    //     url: "http://admadevwb8001:8001/api/html/elements/image/data",
    //     success: function(data) {
    //         //alert(data);
    //         imageData = data;
    //     }
    // });

    function appendItem(act, eleClass) {
        var actArray = act.data;
        for (var i = 0; i < actArray.length; i++) {
            var newOne = $('<input class="head_button menu_button btn btn-info" type="button" title="' + actArray[i].title + '"value="' + actArray[i].text + '">');
            $("." + eleClass).append(newOne);
        }
    }

    // $.ajax({
    //     type: "get",
    //     url: "http://admadevwb8001:8001/api/html/elements/button/actions",
    //     success: function(data) {
    //         buttonAct = data;
    //         appendItem(buttonAct, "menu_button_x");
    //     }
    // });

    // $.ajax({
    //     type: "get",
    //     url: "http://admadevwb8001:8001/api/html/elements/table/actions",
    //     success: function(data) {
    //         tableAct = data;
    //         appendItem(tableAct, "menu_table");
    //     }
    // });
    // $.ajax({
    //     type: "get",
    //     url: "http://admadevwb8001:8001/api/html/elements/div/actions",
    //     success: function(data) {
    //         divAct = data;
    //         appendItem(divAct, "menu_div");
    //     }
    // });
    // $.ajax({
    //     type: "get",
    //     url: "http://admadevwb8001:8001/api/html/elements/image/actions",
    //     success: function(data) {
    //         imageAct = data;
    //         appendItem(imageAct, "menu_image");
    //     }
    // });
    // $.ajax({
    //     type: "get",
    //     url: "http://admadevwb8001:8001/api/html/elements/inputText/actions",
    //     success: function(data) {
    //         textAct = data;
    //         appendItem(textAct, "menu_text");
    //     }
    // });

    /**
        The operation's function
    **/
    // var operateFunction = {
    //     _delete: function() {
    //         selElement.parentNode.removeChild(selElement);
    //         cancel.cancelMenu();
    //     },
    //     backcolor: function() {
    //         selElement.style.backgroundColor = "rgb(" + operateFunction.ramdomMaker() +
    //             "," + operateFunction.ramdomMaker() + "," + operateFunction.ramdomMaker() + ")";
    //         cancel.cancelMenu();
    //     },
    //     fontcolor: function() {
    //         selElement.style.color = "rgb(" + operateFunction.ramdomMaker() +
    //             "," + operateFunction.ramdomMaker() + "," + operateFunction.ramdomMaker() + ")";
    //         cancel.cancelMenu();
    //     },
    //     _fontSize: function() {
    //         var operate = this.value.charAt(this.value.length - 1);
    //         if (operate == "+") {
    //             selElement.style.fontSize = (parseInt(selElement.style.fontSize, 10) + 2) + "px";
    //             cancel.cancelMenu();
    //         } else {
    //             selElement.style.fontSize = (parseInt(selElement.style.fontSize, 10) - 2) + "px";
    //             cancel.cancelMenu();
    //         }
    //     },
    //     ramdomMaker: function() {
    //         return Math.round(Math.random() * 255);
    //     }
    // };


    // function bindEventToOpreItem(eleClass) {
    //     $("." + eleClass).delegate("input:first", "click", operateFunction._delete);
    //     $("." + eleClass).delegate("input:eq(1)", "click", operateFunction.backcolor);
    //     $("." + eleClass).delegate("input:eq(2)", "click", operateFunction.fontcolor);
    //     $("." + eleClass).delegate("input:gt(2)", "click", operateFunction._fontSize);
    // }
    // bindEventToOpreItem("menu_table");
    // bindEventToOpreItem("menu_image");
    // bindEventToOpreItem("menu_div");
    // bindEventToOpreItem("menu_button_x");
    // bindEventToOpreItem("menu_text");

    //------------------------------------------------------------------------------------------------
    // var urldata = new dataUrlModel();
    // var samplemodel = new menuSampleModel(urldata.get("sampleData" + eletype));
    var v1 = new menuTypeView();
    // new elements({ el: $("#contents_p") });
    var v2 = new elements();
});

//--args --disable-web-security --user-data-dir="C:\Users\Public\Documents\chrome"
