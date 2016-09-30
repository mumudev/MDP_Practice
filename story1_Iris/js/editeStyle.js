function changeBackgroudColor() {
    var childs = getSelectedChilds();
    var color = getRandomColor();

    for(var i = childs.length - 1; i >= 0;  -- i) {
        childs[i].style.backgroundColor=color;
    }
};

function changeFontColor() {
    var childs = getSelectedChilds();
    var color = getRandomColor();
        
    for(var i = childs.length - 1; i >= 0;  -- i) {
        childs[i].style.color=color;
    }
};

function changeFontSize(action) {
    var childs = getSelectedChilds();
    for(var i = childs.length - 1; i >= 0;  -- i) {
        if(childs[i].style.fontSize === "") {
            childs[i].style.fontSize = '15px';
        }
        var currentSize = parseInt(childs[i].style.fontSize);
        if(action ==="up"){
            childs[i].style.fontSize = (currentSize + 2) + "px";
        } else {
            childs[i].style.fontSize = (currentSize - 2) + "px";
        }
    }
};