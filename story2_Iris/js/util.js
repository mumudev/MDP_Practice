function getSelectedValue() {
    var myselect=document.getElementById("current-element");
    var index=myselect.selectedIndex;
    value=myselect.options[index].value;
    return value;
};

function getRandomColor() {
    var rgb = 'rgb(' + Math.floor(Math.random()*255) + ','
                + Math.floor(Math.random()*255) + ','
                + Math.floor(Math.random()*255) + ')';
    return rgb;
};

function getSelectedElement() {
    var childs=itemDIV.children;
    for(var i=childs.length-1; i>=0; --i) {
        if(childs[i].style.border==="2px solid blue") {
            return childs[i];
        }
    }
    return null;
};