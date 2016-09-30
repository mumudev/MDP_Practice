function initTable(table) {
    table.border = "2px";
    for(var i = 0; i <= 4; ++ i) {
        var row = table.insertRow();
        for(var j = 0; j <= 3; ++ j) {
            var cell = row.insertCell();
            cell.width = "150"; 
            cell.innerHTML="Morningstar"; 
        }
    }
};

function initButton(button) {
    button.text="button";
    button.style.width="100px";
    button.style.height="30px";
    button.textContent ="ClickMe";
};

function initInput(input) {
    input.style.width="100px";
    input.style.height="30px";
    input.value ="InitValue";
};

function initDIV(div) {
    div.textContent="Hello";
};
