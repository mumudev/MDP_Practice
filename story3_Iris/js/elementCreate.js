function createNewElement(element) {
    list.style.display="";
    var newElement = null;
    if(element==="table") {
        newElement = createNewTable();
    } else if(element==="button"){
        newElement = createButton();
    } else if(element==="input"){
        newElement = createInputText();
    } else if(element==="DIV") {
        newElement = createDIV();
    }

    newElement.addEventListener('click', function(e){
        setSelectedElement(this);
        setMenuExits(e);
    }, false); 
};

function createNewTable() {  
    var table=document.createElement("table");
    initTable(table);
    itemDIV.appendChild(table);
    return table;         
};

function createButton() {
    var button=document.createElement("button");
    initButton(button);
    itemDIV.appendChild(button);
    return button;
};

function createInputText() {
    var input=document.createElement("input");
    initInput(input);
    itemDIV.appendChild(input);
    return input;
};

function createDIV() {
    var div=document.createElement("div");
    initDIV(div);
    itemDIV.appendChild(div);
    return div;
};
