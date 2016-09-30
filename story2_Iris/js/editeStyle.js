function changeBackgroudColor() {
    var selectedElement = getSelectedElement();
    selectedElement.style.backgroundColor=getRandomColor();
};

function changeFontColor() {
    var selectedElement = getSelectedElement();
    selectedElement.style.color=getRandomColor();
};

function changeFontSize(action) {
    var selectedElement = getSelectedElement();
    if(selectedElement.style.fontSize === "") {
        selectedElement.style.fontSize = '15px';
    }
    var currentSize = parseInt(selectedElement.style.fontSize);
    if(action ==="up"){
        selectedElement.style.fontSize = (currentSize + 2) + "px";
    } else {
        selectedElement.style.fontSize = (currentSize - 2) + "px";
    }
};