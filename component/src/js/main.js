require("bootstrap");
require("../css/index.css");
dom = {
    createMenu: $("#createMenu"),
    createBtn: $("#createBtn"),
    dropMenu: $("#menu"),
    content: $("#content")
};
url = {
    base: "http://admadevwb8001:8001/api/html/elements",
    table: {
        data: "http://admadevwb8001:8001/api/html/elements/table/data",
        action: " http://admadevwb8001:8001/api/html/elements/table/actions"
    },
    button: {
        data: "http://admadevwb8001:8001/api/html/elements/button/data",
        action: " http://admadevwb8001:8001/api/html/elements/button/actions"
    },
    inputText: {
        data: "http://admadevwb8001:8001/api/html/elements/inputText/data",
        action: " http://admadevwb8001:8001/api/html/elements/inputText/actions"
    },
    div: {
        data: "http://admadevwb8001:8001/api/html/elements/div/data",
        action: " http://admadevwb8001:8001/api/html/elements/div/actions"
    },
    image: {
        data: "http://admadevwb8001:8001/api/html/elements/image/data",
        action: " http://admadevwb8001:8001/api/html/elements/image/actions"
    }
};
var itemId = 0;

var method = {
    showCreateBtn: function(e) {
        dom.createMenu.toggle();
    },
    create: function(e) {
        createBind[this.id].call();
    }
};

//mousedown
var itemAction = function(e) {
    if (e.which == 1) {
        dom.createMenu.hide();
        dom.dropMenu.hide();
    } else if (e.which == 3) {
        $.ajax({
            url: url[this.getAttribute("name")].action,
            type: "get",
            success: function(json) {
                if (json.data) {
                    dom.dropMenu.html("");
                    $.each(json.data, function(i, item) {
                        var newBtn = $('<button class="btn"></button>')
                            .append(item.text).attr("id", item.id);
                        dom.dropMenu.append(newBtn);
                        newBtn.bind("click", actionList[item.id]);
                    });
                } else {
                    alert("Error!");
                }
            },
            error: function() {
                console.log("error!");
            }
        });

        dom.createMenu.hide();
        var newX, newY;
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
            newX = e.clientX + document.body.scrollLeft;
            newY = e.clientY + document.body.scrollTop;
        } else {
            newX = window.event.x + document.body.scrollLeft;
            newY = window.event.y + document.body.scrollTop;
        }

        dom.dropMenu.css("left", newX);
        dom.dropMenu.css("top", newY);
        dom.dropMenu.show();
        if ($(".selected").length) {
            $(".selected").eq(0).removeClass("selected");
        }
        $(e.target).closest(".item").addClass("selected");
        return false;
    }
};

var getRandomColor = function() {
    // body...
    return "rgb(" + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + ")";
};
var actionList = {
    delete: function(e) {
        $(".selected").remove();
        menu.style.display = "none";
    },

    backgroundColor: function(e) {
        $(".selected").css("background-color", getRandomColor());
    },

    fontColor: function(e) {

        $(".selected").css("color", getRandomColor());
    },

    increaseFontSize: function(e) {
        var fontSize = $(".selected").css("font-size") === "" ?
            17 : parseInt($(".selected").css("font-size").replace(/[^0-9]/ig, "")) + 1;
        $(".selected").css("font-size", fontSize + "px");
    },

    decreaseFontSize: function(e) {
        var fontSize = $(".selected").css("font-size") === "" ?
            15 : parseInt($(".selected").css("font-size").replace(/[^0-9]/ig, "")) - 1;
        $(".selected").css("font-size", fontSize + "px");
    }
};
var createBind = {
    table: function() {
        $.ajax({
            url: url.table.data,
            type: "get",
            success: function(json) {
                if (json.data) {
                    var newTable = $("<table></table>");
                    newTable.addClass("item");
                    newTable.addClass("table");
                    newTable.addClass("table-bordered");
                    newTable.attr("name", "table");
                    var rows = json.data.rows;
                    var cols = json.data.cols;
                    var content = "";
                    for (var i = 0; i < rows; i++) {
                        content += "<tr>";
                        for (var j = 0; j < cols; j++) {
                            content += "<td></td>";
                        }
                        content += "</tr>";
                    }
                    newTable.append(content);
                    $.each(json.data.cells, function(i, item) {
                        newTable.find("tr").eq(item.row).find("td").eq(item.col).text(item.data);
                    });
                    newTable.bind("mousedown", itemAction);
                    dom.content.append(newTable);
                } else {
                    alert("Error!");
                }
            },
            error: function() {
                console.log("table create error!");
            }
        });
    },
    button: function() {
        $.ajax({
            url: url.button.data,
            type: "get",
            success: function(json) {
                if (json.data) {
                    var newBtn = $("<button></button>");
                    newBtn.addClass("item");
                    newBtn.addClass("btn");
                    newBtn.attr("name", "button");
                    newBtn.attr("title", json.data.title);
                    newBtn.text(json.data.text);
                    dom.content.append(newBtn);
                    newBtn.bind("mousedown", itemAction);
                } else {
                    alert("Error!");
                }
            },
            error: function() {
                console.log("button create error!");
            }
        });
    },
    inputText: function() {
        $.ajax({
            url: url.inputText.data,
            type: "get",
            success: function(json) {
                if (json.data) {
                    var newInputText = $("<input></input>");
                    newInputText.addClass("item");
                    newInputText.addClass("form-control");
                    newInputText.attr("name", "inputText");
                    newInputText.attr("placeholder", json.data.text);
                    dom.content.append(newInputText);
                    newInputText.bind("mousedown", itemAction);
                } else {
                    alert("Error!");
                }
            },
            error: function() {
                console.log("button create error!");
            }
        });

    },
    div: function() {
        $.ajax({
            url: url.div.data,
            type: "get",
            success: function(json) {
                if (json.data) {
                    var newDiv = $("<div></div>");
                    newDiv.addClass("item");
                    newDiv.addClass("btn");
                    newDiv.attr("name", "button");
                    newDiv.attr("title", json.data.title);
                    newDiv.append($(json.data.text));
                    dom.content.append(newDiv);
                    newDiv.bind("mousedown", itemAction);
                } else {
                    alert("Error!");
                }
            },
            error: function() {
                console.log("button create error!");
            }
        });
    },
    image: function() {
        $.ajax({
            url: url.image.data,
            type: "get",
            success: function(json) {
                if (json.data) {
                    var newImg = $("<img></img>");
                    newImg.addClass("item");
                    newImg.addClass("img");
                    newImg.attr("name", "image");
                    newImg.attr("src", json.data.image);
                    newImg.attr("title", json.data.title);
                    dom.content.append(newImg);
                    newImg.bind("mousedown", itemAction);
                } else {
                    alert("Error!");
                }
            },
            error: function() {
                console.log("button create error!");
            }
        });
    }
};

$(document).ready(function() {
    // body...
    $.ajax(url.base).done(
        function(json) {
            if (json.data) {
                $.each(json.data, function(i, item) {
                    var newBtn = $('<button class="btn"></button>')
                        .append(item.text).attr("id", item.id);
                    dom.createMenu.append(newBtn);
                    newBtn.bind("click", method.create);
                });
                dom.createBtn.bind("click", method.showCreateBtn);
            } else {
                alert("Error!");
            }
        }).fail(
        function() {
            console.log("error!");
        });
    $(document).bind("contextmenu", function(e) {
        return false;
    });
    $(document).bind("click", clearBinding);

    function AdaptHeight() {
        height = $(window).height() - 44;
        $('.container').css('height', height);
    }
    window.onresize = AdaptHeight();
});




var clearBinding = function(e) {
    if (navigator.userAgent.indexOf('Mozilla') >= 0 && e.target.localName.match("body")) {
        dom.dropMenu.hide();
        dom.createMenu.hide();
        if ($(".selected").length) {
            $(".selected").eq(0).removeClass("selected");
        }
    } else if (e.target.closest && !e.target.closest("[id^='item'],[id='menu']")) {
        dom.dropMenu.hide();
        if ($(".selected").length) {
            $(".selected").eq(0).removeClass("selected");
        }
    }
    if (e.target.closest && !e.target.closest("[id='createBtn'],[id='createMenu']")) {
        dom.createMenu.hide();
    }

};
