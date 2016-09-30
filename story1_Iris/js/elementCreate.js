function createNewElement() {
    var value=getSelectedValue();
    if(value==="table") {
        createNewTable();
    } else if(value==="button"){
        createButton();
    } else if(value==="input"){
        createInputText();
    } else if(value==="div") {
        createDIV();
    }
};

function createNewTable() {  
    var table=document.createElement("table"); 
    initTable(table);
    document.getElementById("new-item").appendChild(table);         
};

function createButton() {
    var button=document.createElement("button");
    initButton(button);
    document.getElementById("new-item").appendChild(button);
};

function createInputText() {
    var input=document.createElement("input");
    initInput(input);
    document.getElementById("new-item").appendChild(input);
};

function createDIV() {
    var div=document.createElement("div");
    initDIV(div);
    document.getElementById("new-item").appendChild(div);
};
