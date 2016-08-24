var i = 1;
var element;
function show() {
    var el = document.getElementById("create");
    var ele = document.getElementById("menus");
    ele.style.display = "block";
    ele.style.left = el.clientWidth + "px";
    ele.style.top = el.clientY + "px";
}

function _delete() {
    document.getElementById('div1').removeChild(element);
    document.getElementById('menu1').style.display = 'none';

}
function addTable() {

    var put = document.createElement('table');
    put.innerHTML = '<tr><th>Name</th><th>City</th></tr>' + '<tr><td>Fiona</td><td>Shenzhen</td></tr>' + '<tr><td>**</td><td>***</td></tr>';
    put.id = 'table' + i;
    put.className = "Table";
    put.name = "test";
    put.style.fontSize = "18px";
    document.getElementById('div1').appendChild(put);
    i++;
    document.getElementById("menus").style.display = "none";
    put.onclick = function() {
        changeBorder(this);
        showMenu(this);
    };
}
function addText() {
    var div = document.createElement('input');
    div.type = "text";
    div.value = "Please input a text";
    div.name = "test";
    div.className = "Input Text";
    div.style.fontSize = "20px";
    div.id = 'text' + i;
    document.getElementById('div1').appendChild(div);
    i++;
    document.getElementById("menus").style.display = "none";
    div.onclick = function() {
        changeBorder(this);
        showMenu(this);
    };

}
function addButton() {
    var div = document.createElement('input');
    div.type = "button";
    div.value = "Button";
    div.className = "Button";
    div.name = "test";
    div.style.fontSize = "12px";
    div.id = 'button' + i;

    document.getElementById('div1').appendChild(div);
    i++;
    document.getElementById("menus").style.display = "none";
    div.onclick = function() {
        changeBorder(this);
        showMenu(this);
    };
}
function addDiv() {
    var div = document.createElement('div');

    div.innerHTML = "Div";
    div.name = "test";
    div.className = "Div";
    div.id = 'Div' + i;
    div.style.fontSize = "12px";
    document.getElementById('div1').appendChild(div);
    i++;
    document.getElementById("menus").style.display = "none";
    div.onclick = function() {
        changeBorder(this);
        showMenu(this);
    };
}
/*function highlight() {
    alert('ok');
}
function dark() {
     alert('fine');

}*/
function showMenu(self) {

    var ele = document.getElementById("menu1");
    ele.style.display = "block";
    ele.style.top = screen.clientY + "px";
    var left = self.clientWidth + self.offsetLeft - 5;
    ele.style.left = left + "px";
    element = self;

}
function change_bgcolor() {
    var rand = Math.round(Math.random() * 1000000);
    element.style.backgroundColor = "#" + rand;

    document.getElementById("menu1").style.display = "none";
}

function change_ftcolor() {
    var rand = Math.round(Math.random() * 1000000);
    element.style.color = "#" + rand;

    document.getElementById("menu1").style.display = "none";
}

function fontBigger() {
    var num = parseInt(element.style.fontSize) + 1;
    element.style.fontSize = num + "px";
    document.getElementById("menu1").style.display = "none";
}

function fontSmaller() {

    var num = parseInt(element.style.fontSize) - 1;
    element.style.fontSize = num + "px";
    document.getElementById("menu1").style.display = "none";

}
function changeBorder(self) {
    self.style.border = "2px solid black";
}
function highlight(self) {
    self.style.backgroundColor = 'pink';
}
function dark(self) {
    self.style.backgroundColor = '#ffffff';
}