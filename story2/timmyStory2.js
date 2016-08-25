
function createCombo(){
	var comboList=document.getElementById('combolist');
    var newEle;
	switch(comboList.value){
		case "button":newEle=createButton();break;
		case "table":newEle=createTable();break;
		case "div":newEle=createDiv();break;
		case "input":newEle=createInputText();break;
		default: break;

	}
	var comboValue=document.getElementById('combo');
	comboValue.appendChild(newEle);
    newEle.onclick=function(){
        changeStyleBorder(this);
        displayMenu();
    };
    document.getElementById("popUpMenu").onclick=function(){
       closeMenu();
    };       
}
function deleteCombo(){
         if (selectCreatedElement()) {
            selectCreatedElement().parentNode.removeChild(selectCreatedElement());
        }
}
function setBackgroundColor(){
	if (selectCreatedElement()) {
            selectCreatedElement().style.backgroundColor=getRandomColor();
        }
}
function setFontSize(type){
	
        if (selectCreatedElement()) {
        	if(type=='+'){
           selectCreatedElement().style.fontSize=(parseInt(selectCreatedElement().style.fontSize) + 2) + "px";
          }
          else {selectCreatedElement().style.fontSize=(parseInt(selectCreatedElement().style.fontSize) - 2) + "px";
          }
        }
}
function setFontColor(){
        if (selectCreatedElement()) {
           selectCreatedElement().style.color=getRandomColor();
        }
}
function createButton()
{

            var e = document.createElement("input");
            e.type = "button";
            e.value = "button";
            e.className="createdElements";
             e.style.fontSize="20px";
      		return e;
}
function createInputText()
{
            var e = document.createElement("input");
            e.type = "text";
            e.placeholder = "input text";
            e.className="createdElements";
            e.size=5;
            e.style.fontSize="20px";
            return e;
}
function createDiv(){
    var e = document.createElement('div');
    e.innerHTML = 'this is div';
    e.className="createdElements";
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
table.className="createdElements" ;
table.style.fontSize="20px";
return table;    
}
function getRandomColor(){
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}
function displayMenu(){
     document.getElementById("popUpMenu").style.display="block";
}
function closeMenu(){
    document.getElementById("popUpMenu").style.display="none";
}
function changeStyleBorder(element){
    element.style.border="2px solid blue";
  var elements=document.getElementsByClassName("createdElements");
  for(var i=0;i<elements.length;i++)
  {
     if (elements[i]!=element) {elements[i].style.border="none";}
  }
    
}
function selectCreatedElement(){
  var elements=document.getElementsByClassName("createdElements");
  for(var i=0;i<elements.length;i++)
  {
     if (elements[i].style.border=="2px solid blue") {
        return elements[i];
    }
  }
    return  null;
}

