function createCombo(){
	var comboList=document.getElementById('combolist');
	switch(comboList.value){
		case "button":newEle=createButton();break;
		case "table":newEle=createTable();break;
		case "div":newEle=createDiv();break;
		case "input":newEle=createInputText();break;
		default: break;

	}
	var comboValue=document.getElementById('combo');
	comboValue.appendChild(newEle);
}
function deleteCombo(){
	var comboList=document.getElementById('combolist');
	var combo=document.getElementsByClassName(comboList.value);
    for (i = combo.length - 1; i >= 0; i--) {
        if (combo[i].className) {
            combo[i].parentNode.removeChild(combo[i]);
        }
    }
}
function setBackgroundColor(){
	var comboList=document.getElementById('combolist');
	var combo=document.getElementsByClassName(comboList.value);
	 for (i = combo.length - 1; i >= 0; i--) {
        if (combo[i].className) {
            combo[i].style.backgroundColor=getRandomColor();
        }
    }
}
function setFontSize(type){
		var comboList=document.getElementById('combolist');
	var combo=document.getElementsByClassName(comboList.value);
	 for (i = combo.length - 1; i >= 0; i--) {
        if (combo[i].className) {
        	if(type=='+'){
            combo[i].style.fontSize=(parseInt(combo[i].style.fontSize) + 2) + "px";
          }
          else {combo[i].style.fontSize=(parseInt(combo[i].style.fontSize) - 2) + "px";
          }
        }
    }
}
function setFontColor(){
	var comboList=document.getElementById('combolist');
	var combo=document.getElementsByClassName(comboList.value);
	 for (i = combo.length - 1; i >= 0; i--) {
        if (combo[i].className) {
            combo[i].style.color=getRandomColor();
        }
    }
}
function createButton()
{

            var e = document.createElement("input");
            e.type = "button";
            e.value = "new button";
            e.className="button";
             e.style.fontSize="20px";
      		return e;

}
function createInputText()
{

            var e = document.createElement("input");
            e.type = "text";
            e.placeholder = "input text";
            e.className="input";
            e.size=5;
            e.style.fontSize="20px";
            return e;

}
function createDiv(){
var e = document.createElement('div');
    e.innerHTML = 'this is div';
    e.className="div";
     e.style.fontSize="20px";
    return e;
}
function createTable(){
var table = document.createElement("table"); 
var tbody = document.createElement("tbody"); 
table.border = 1;    
for(var i=1;i<=3;i++) 
{ 
var tr = document.createElement("tr"); 
for(var j=1;j<=3;j++) 
{ 
var td = document.createElement("td"); 
td.innerHTML = i + "" + j; 
tr.appendChild(td); 
} 
tbody.appendChild(tr);    
} 
table.appendChild(tbody);
table.className="table" ;
table.style.fontSize="20px";
return table;    
}
function getRandomColor(){
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}