var menu = document.getElementById("menu-block");
var itemDIV = document.getElementById("new-item");
var list = document.getElementById("create-list");
var create = document.getElementById("create-new-button");

window.onload = function() {
    document.onclick = function(e) {
        menu.style.display="";
        list.style.display="";
        setNoSelectedElements();
    }
    itemDIV.children.onclick = function(e) {
        menu.style.display="block";
        list.style.display="";
    }
    create.onclick = function(e) {
        list.style.display="block";
        menu.style.display="";
        setNoSelectedElements();
        e=e||event;
        stopFunc(e);
    }
};

function setMenuExits(e) {
    menu.style.display="block";
    list.style.display="";
    menu.style.left = e.clientX - 40 + "px";
    menu.style.top=e.clientY-200+"px";
    e=e||event;
    stopFunc(e);
};

function stopFunc(e) {
    e.stopPropagation?e.stopPropagation():e.cancelBubble = true;
};

function setNoSelectedElements() {
    var childs=itemDIV.children;
    for(var i=childs.length-1; i>=0; --i) {
        childs[i].style.border="";
        childs[i].class="";
    }
};

function setSelectedElement(setElement) {
    setNoSelectedElements();
    setElement.style.border="2px solid blue";
    setElement.class="selected";
};