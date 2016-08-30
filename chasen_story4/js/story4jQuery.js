$(document).ready(function() {
    loading();
    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements",
        success: function(data) {
            //alert(data);
            createList = data;
            for (var i = 0; i < data.data.length; i++) {
                $(".menu_type").append('<input class="head_button menu_button button menu_type_button" type="button" value="' + data.data[i].text + '" >');
            }
        }
    });

    $(".menu_type").delegate(".menu_type_button","click", function create() {
        var content = document.getElementById("contents_p");
        var eletype = this.value.toLowerCase();
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
            if (eletype == "button" || eletype == "text") {
                newNode = document.createElement("input");
                newNode.type = eletype;
                newNode.style.height = "50px";
            } else {
                newNode = document.createElement(eletype);
                newNode.style.height = "100px";
            }
            newNode.className = eletype + "s";
            newNode.onclick = function(e) {
                operate(this, e);
            };
            newNode.style.float = "left";
            newNode.style.width = "100px";
            newNode.style.border = "1px solid black";
            newNode.style.fontSize = "15px";
            newNode = addNodeExampleContent(newNode);
        }
        return newNode;
    }

    function addNodeExampleContent(newNode) {
        var eletype = newNode.tagName.toLowerCase();
        if (eletype == "table") {
            var tr1 = document.createElement("tr");
            var tr2 = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerHTML = "A";
            var td2 = document.createElement("td");
            td2.innerHTML = "B";
            var td3 = document.createElement("td");
            td3.innerHTML = "C";
            var td4 = document.createElement("td");
            td4.innerHTML = "D";
            tr1.appendChild(td1);
            tr1.appendChild(td2);
            tr2.appendChild(td3);
            tr2.appendChild(td4);
            newNode.appendChild(tr1);
            newNode.appendChild(tr2);
        } else if (eletype == "div") {
            newNode.innerHTML = eletype;
        } else {
            newNode.value = newNode.type;
        }
        return newNode;
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

    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/button/actions",
        success: function(data) {
            //alert(data);
            imageData = data;
        }
    });
    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/table/actions",
        success: function(data) {
            //alert(data);
            imageData = data;
        }
    });
    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/div/actions",
        success: function(data) {
            //alert(data);
            imageData = data;
        }
    });
    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/image/actions",
        success: function(data) {
            //alert(data);
            imageData = data;
        }
    });
    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements/inputText/actions",
        success: function(data) {
            //alert(data);
            imageData = data;
        }
    });
    $("head_button menu_button button")
});


//--args --disable-web-security --user-data-dir="C:\Users\Public\Documents\chrome"
