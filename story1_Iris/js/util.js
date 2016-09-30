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

function getSelectedChilds() {
    var value=getSelectedValue();
    var parentElement = document.getElementById("new-item");
    var childs = parentElement.getElementsByTagName(value);
    if(childs.length===0) {
        alert("Please choose already created elements.")
    }
    return childs;
};