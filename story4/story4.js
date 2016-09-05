var element;

$(document).ready(function() {

    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements",
        success: function(data) {
            // document.getElementsByName("Table")[0].id=data.data[0].id;
            document.getElementsByName("Table")[0].innerHTML = data.data[0].text;
            // document.getElementsByName("Button")[0].id=data.data[1].id;
            document.getElementsByName("Button")[0].innerHTML = data.data[1].text;
            // document.getElementsByName("Input Text")[0].id=data.data[2].id;
            document.getElementsByName("InputText")[0].innerHTML = data.data[2].text;
            // document.getElementsByName("Div")[0].id=data.data[3].id;
            document.getElementsByName("Div")[0].innerHTML = data.data[3].text;
            // document.getElementsByName("Ima")[0].id=data.data[4].id;
            document.getElementsByName("Image")[0].innerHTML = data.data[4].text;

        }
    });

    //show a list for creating elements
    $("#create").on("click", function(e){
    $("#menus").show();
    loading();

    $(document).on("click", function(){
        $("#menus").hide();
    });

    e.stopPropagation();
    });
    $("#menus").on("click", function(e){
    e.stopPropagation();
    });

    //bind event for elements
    var table = document.getElementsByName("Table")[0];
    $(table).click(function() {
        addTable();
    });

    var button = document.getElementsByName("Button")[0];
    $(button).click(function() {
        addButton();
    });

    var Text = document.getElementsByName("InputText")[0];
    $(Text).click(function() {
        addText();
    });

    var Div = document.getElementsByName("Div")[0];
    $(Div).click(function() {
        addDiv();
    });

    var Image = document.getElementsByName("Image")[0];
    $(Image).click(function() {
        addIma();
    });

    var Delete = document.getElementsByName("delete")[0];
    $(Delete).click(function() {
        _delete();
    });

    var backgroundColor = document.getElementsByName("backgroundColor")[0];
    $(backgroundColor).click(function() {
        change_bgcolor();
    });

    var fontColor = document.getElementsByName("fontColor")[0];
    $(fontColor).click(function() {
        change_ftcolor();
    });

    var fontSmaller = document.getElementsByName("fontSmaller")[0];
    $(fontSmaller).click(function() {
        fontSizeDec();
    });

    var fontBigger = document.getElementsByName("fontBigger")[0];
    $(fontBigger).click(function() {
        fontSizeInc();
    });

    function addTable() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                xmlDoc = xmlhttp.responseText;
                var txt = eval("(" + xmlDoc + ")");
                var ele = document.createElement("table");
                ele.style.fontSize = "15px";
                ele.className = "Table";
                var tt = "";
                for (var i = 0; i < txt.data.rows; i++) {
                    for (var j = 0; j < txt.data.cols; j++) {
                        var k = -1;
                        while (++k < txt.data.cells.length) {
                            var flag = "false";
                            if (txt.data.cells[k].row == i && txt.data.cells[k].col == j) {
                                tt = tt + "<td>" + txt.data.cells[k].data + "</td>";
                                flag = "true";
                                break;
                            }
                        }
                        if (flag == "false") {
                            tt = tt + "<td></td>";
                        }

                    }
                    tt = tt + "</tr>";
                }
                ele.innerHTML = tt;
                document.getElementById('div1').appendChild(ele);
                $(ele).click(function() {
                    changeBorder(this);
                    showFunctionalities(this);
                });
            }

        }
        xmlhttp.open("GET", "http://admadevwb8001:8001/api/html/elements/table/data", true);
        xmlhttp.send();
        document.getElementById("menus").style.display = "none";

    }
    function addButton() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                xmlDoc = xmlhttp.responseText;
                var txt = eval("(" + xmlDoc + ")");
                var ele = document.createElement("input");
                ele.type = "button";
                ele.value = txt.data.text;
                ele.title = txt.data.title;
                ele.className = "Button";
                ele.style.fontSize = "18px";
                document.getElementById('div1').appendChild(ele);
                $(ele).click(function() {
                    changeBorder(this);
                    showFunctionalities(this);
                });
            }

        }
        xmlhttp.open("GET", "http://admadevwb8001:8001/api/html/elements/button/data", true);
        xmlhttp.send();
        document.getElementById("menus").style.display = "none";

    }
    function addText() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                xmlDoc = xmlhttp.responseText;
                var txt = eval("(" + xmlDoc + ")");
                var ele = document.createElement("input");
                ele.type = "text";
                ele.value = txt.data.text;
                ele.style.fontSize = "15px";
                document.getElementById('div1').appendChild(ele);
                $(ele).click(function() {
                    changeBorder(this);
                    showFunctionalities(this);
                });
            }

        }
        xmlhttp.open("GET", "http://admadevwb8001:8001/api/html/elements/inputText/data", true);
        xmlhttp.send();

        document.getElementById("menus").style.display = "none";
    }
    function addDiv() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                xmlDoc = xmlhttp.responseText;
                var txt = eval("(" + xmlDoc + ")");
                var ele = document.createElement("div");
                ele.className = "Div";
                ele.innerHTML = txt.data.text;
                ele.style.fontSize = "18px";
                document.getElementById('div1').appendChild(ele);
                $(ele).click(function() {
                    changeBorder(this);
                    showFunctionalities(this);
                });
            }
        }
        xmlhttp.open("GET", "http://admadevwb8001:8001/api/html/elements/div/data", true);
        xmlhttp.send();

        document.getElementById("menus").style.display = "none";

    } 
    function addIma() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                xmlDoc = xmlhttp.responseText;
                var txt = eval("(" + xmlDoc + ")");
                var ele = document.createElement("img");
                ele.src = txt.data.image;
                ele.title = txt.data.title;
                ele.style.border = "1px solid brown";
                document.getElementById('div1').appendChild(ele);
                $(ele).click(function() {
                    changeBorder(this);
                    showFunctionalities1(this);
                });
            }
        }
        xmlhttp.open("GET", "http://admadevwb8001:8001/api/html/elements/image/data", true);
        xmlhttp.send();

        document.getElementById("menus").style.display = "none";

    }

});

function loading() {
    var arr = document.getElementsByClassName("menu");
    for (var i = 0; i < arr.length; i++) {
        arr[i].onmouseover = function() {
            highlight(this);
        }
        arr[i].onmouseout = function() {
            dark(this);
        }
    }
}


function highlight(self) {
    self.style.backgroundColor = 'pink';
}
function dark(self) {
    self.style.backgroundColor = '#ffffff';
}
function showFunctionalities(self) {
    element = self;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            xmlDoc = xmlhttp.responseText;
            var txt = eval("(" + xmlDoc + ")");
            document.getElementsByName("delete")[0].id=txt.data[0].id;
            document.getElementsByName("delete")[0].innerHTML = txt.data[0].text;
            document.getElementsByName("delete")[0].title=txt.data[0].title;
            document.getElementsByName("backgroundColor")[0].id=txt.data[1].id;
            document.getElementsByName("backgroundColor")[0].innerHTML = txt.data[1].text;
            document.getElementsByName("backgroundColor")[0].title=txt.data[1].title;
            document.getElementsByName("fontColor")[0].id=txt.data[2].id;
            document.getElementsByName("fontColor")[0].innerHTML = txt.data[2].text;
            document.getElementsByName("fontColor")[0].title=txt.data[2].title;
            document.getElementsByName("fontBigger")[0].id=txt.data[3].id;
            document.getElementsByName("fontBigger")[0].innerHTML = txt.data[3].text;
            document.getElementsByName("fontBigger")[0].title=txt.data[3].title;
            document.getElementsByName("fontSmaller")[0].id=txt.data[4].id;
            document.getElementsByName("fontSmaller")[0].innerHTML = txt.data[4].text;
            document.getElementsByName("fontSmaller")[0].title=txt.data[4].title;
        }
    }
    xmlhttp.open("GET", "http://admadevwb8001:8001/api/html/elements/button/actions", true);
    xmlhttp.send();
    document.getElementById("menu1").style.display = "block";
    var top = self.offsetTop + self.clientHeight;
    document.getElementById("menu1").style.top = top + "px";
    var left = self.clientWidth + self.offsetLeft;
    document.getElementById("menu1").style.left = left + "px";

}
function showFunctionalities1(self) {
    element = self;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            xmlDoc = xmlhttp.responseText;
            var txt = eval("(" + xmlDoc + ")");
            document.getElementsByName("delete")[0].id=txt.data[0].id;
            document.getElementsByName("delete")[0].innerHTML = txt.data[0].text;
            document.getElementsByName("delete")[0].title=txt.data[0].title;
        }
    }
    xmlhttp.open("GET", "http://admadevwb8001:8001/api/html/elements/image/actions", true);
    xmlhttp.send();
    document.getElementById("menu1").style.display = "block";
    var top = self.offsetTop + self.clientHeight;
    document.getElementById("menu1").style.top = top + "px";
    var left = self.clientWidth + self.offsetLeft;
    document.getElementById("menu1").style.left = left + "px";

}
function changeBorder(self) {
    if (self.style.border == "1px solid brown") self.style.border = "2px solid blue";
    else self.style.border == "1px solid brown";

}

function _delete() {
    document.getElementById('div1').removeChild(element);
    document.getElementById('menu1').style.display = 'none';

}
function change_bgcolor() {
    var rand = Math.round(Math.random() * 1000000);
    element.style.backgroundColor = "#" + rand;

    document.getElementById("menu1").style.display = "none";
    changeBorder(self);
}

function change_ftcolor() {
    var rand = Math.round(Math.random() * 1000000);
    element.style.color = "#" + rand;

    document.getElementById("menu1").style.display = "none";
    changeBorder(self);
}

function fontSizeInc() {
    var num = parseInt(element.style.fontSize) + 1;
    element.style.fontSize = num + "px";
    document.getElementById("menu1").style.display = "none";
    changeBorder(self);
}

function fontSizeDec() {

    var num = parseInt(element.style.fontSize) - 1;
    element.style.fontSize = num + "px";
    document.getElementById("menu1").style.display = "none";
    changeBorder(self);
}
