var i = 1;
var element;
function create() {
    var obj = document.getElementById("demo");
    var op = obj.value;
    switch (op) {
    case "Table":
        addTable();
        break;
    case "Button":
        addButton();
        break;
    case "Input Text":
        addText();
        break;
    case "Div":
        addDiv();
        break;
    default:
        alert("Please select!");

    }
}

function _delete() {
    document.getElementById('div1').removeChild(element);
    document.getElementById('menus').style.display = 'none';

}

function addTable() {

    var put = document.createElement('table');
    put.innerHTML = '<tr><th>Name</th><th>City</th></tr>' + '<tr><td>Fiona</td><td>Shenzhen</td></tr>' + '<tr><td>**</td><td>***</td></tr>';
    put.id = 'table' + i;
    put.className = "Table";
    put.name = "test";
    put.style.fontSize = "18px";
    put.onclick = function() {
        changeBorder(this);
        showMenu(this);
    };
    document.getElementById('div1').appendChild(put);
    i++;

}
function addText() {
    var div = document.createElement('input');
    div.type = "text";
    div.value = "Please input a text";
    div.name = "test";
    div.className = "Input Text";
    div.style.fontSize = "20px";
    div.id = 'text' + i;
    div.onclick = function() {
        changeBorder(this);
        showMenu(this);
    };
    document.getElementById('div1').appendChild(div);
    k++;

}
function addButton() {
    var div = document.createElement('input');
    div.type = "button";
    div.value = "Button";
    div.className = "Button";
    div.name = "test";
    div.style.fontSize = "12px";
    div.id = 'button' + i;
    div.onclick = function() {
        changeBorder(this);
        showMenu(this);
    };
    document.getElementById('div1').appendChild(div);
    j++;

}
function addDiv() {
    var div = document.createElement('div');

    div.innerHTML = "Div";
    div.name = "test";
    div.className = "Div";
    div.id = 'Div' + i;
    div.style.fontSize = "12px";
    div.onclick = function() {
        changeBorder(this);
        showMenu(this);
    };
    document.getElementById('div1').appendChild(div);
    l++;
}

function change_bgcolor() {
    var rand = Math.round(Math.random() * 1000000);
    element.style.backgroundColor = "#" + rand;

    document.getElementById("menus").style.display = "none";
}

function change_ftcolor() {
    var rand = Math.round(Math.random() * 1000000);
    element.style.color = "#" + rand;

    document.getElementById("menus").style.display = "none";
}

function fontBigger() {
    var num = parseInt(element.style.fontSize) + 1;
    element.style.fontSize = num + "px";
    document.getElementById("menus").style.display = "none";
}

function fontSmaller() {

    var num = parseInt(element.style.fontSize) - 1;
    element.style.fontSize = num + "px";
    document.getElementById("menus").style.display = "none";

}

function showMenu(self) {

    var ele = document.getElementById("menus");
    ele.style.display = "block";
    ele.style.top = screen.clientY + "px";
    var left = self.clientWidth + self.offsetLeft - 5;
    ele.style.left = left + "px";
    element = self;

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