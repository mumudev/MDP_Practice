var menu = document.getElementById("menu-block");
var itemDIV = document.getElementById("new-item");

window.onload = function() {
    document.onclick = function(e) {
        menu.style.display="";
        setNoSelectedElements();
    }
    itemDIV.children.onclick = function(e) {
        menu.style.display="block";
    }
};

function setMenuExits(e) {
    menu.style.display="block";
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
    }
};

function setSelectedElement(setElement) {
    setNoSelectedElements();
    setElement.style.border="2px solid blue";
};