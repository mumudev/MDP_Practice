var listItem=new Array("button","inputText","div","table","image");
var d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,d10;
  $(document).ready(function(){
    $.getJSON("http://admadevwb8001:8001/api/html/elements/",function(json){
    	d10=json;
    	for (var i = 0; i < d10.data.length; i++) {
    		createMenu($(".popUpMenu #selectItem"),d10.data[i].id,d10.data[i].text);
    	}
    });
    for (var i = 0; i < listItem.length; i++) {
    	getData(i,'/data');
    	getData(i,'/actions');
    }
  
   // $(".popUpMenu #selectItem").show();

   $("#create").bind("click",function(){$("#selectOperation").hide();$("#selectItem").show();});
  
   	$("#selectItem").delegate("#button","click",function(){createCombo('button');});
   	$("#selectItem").delegate("#image","click",function(){createCombo('image');});
   	$("#selectItem").delegate("#div","click",function(){createCombo('div');});
   	$("#selectItem").delegate("#inputText","click",function(){createCombo('inputText');});
   	$("#selectItem").delegate("#table","click",function(){createCombo('table');});

   	$("#selectOperation").delegate("#delete","click",function(){
   		deleteCombo();
   		deleteMenu($("#selectOperation li"));
   		$("#selectOperation").hide();
   	});
   	$("#selectOperation").delegate("#backgroundColor","click",function(){setBackgroundColor();});
   	$("#selectOperation").delegate("#fontColor","click",function(){setFontColor();});
   	$("#selectOperation").delegate("#increaseFontSize","click",function(){setFontSize('+');});
   	$("#selectOperation").delegate("#decreaseFontSize","click",function(){setFontSize('-');});
   	$(".creatElements").bind("click",function(){$(".popUpMenu #selectOperation").show();});

});

function getData(i,url){ 
	$.getJSON("http://admadevwb8001:8001/api/html/elements/"+listItem[i]+url,function(json){ 
	    if (url=='/data') {        
		switch(i){
		case 0:d0=json;break;
		case 1:d1=json;break;
		case 2:d2=json;break;
		case 3:d3=json;break;
    	case 4:d4=json;break;
		default: break;}
		}
		else if (url=='/actions') 
			{switch(i){
		case 0:d5=json;break;
		case 1:d6=json;break;
		case 2:d7=json;break;
		case 3:d8=json;break;
    	case 4:d9=json;break;
			}}
    });
}
function createCombo(elementType){
  var newEle;
	switch(elementType){
		case "button":newEle=createButton();break;
		case "table":newEle=createTable();break;
		case "div":newEle=createDiv();break;
		case "inputText":newEle=createInputText();break;
    case "image":newEle=createImage();break;
		default: break;

	}
	var comboValue=document.getElementById('combo');
	comboValue.appendChild(newEle);
	$(newEle).bind("click",function(){
		changeStyleBorder(newEle);
		$("#selectItem").hide();
		deleteMenu($("#selectOperation li"));
		$("#selectOperation").hide();
		switch(selectCreatedElement().name){
		case "button":createMenuForOthers(d5);break;
		case "table":createMenuForOthers(d8);break;
		case "div":createMenuForOthers(d7);break;
		case "inputText":createMenuForOthers(d6);break;
    	case "image":createMenuForOthers(d9);break;
		default: break;

	}
		$("#selectOperation").show();
	});
	}
function createMenu(menu,id,text){
menu.append("<li id="+id+"><a href='#'>"+text+"</a><hr/></li>");
menu.hide();
}
function deleteMenu(menu){
menu.remove();
}
function createButton()
{

            var e = document.createElement("input");
            e.type = "button";
            e.name="button";
            e.value = d0.data.text;
            e.title = d0.data.title;
            e.className="createdElements";
             e.style.fontSize="20px";
      		return e;

}
function createInputText()
{
            var e = document.createElement("input");
            e.type = "text";
            e.name="inputText";
            e.title = d1.data.title;
            e.value = d1.data.text;
            e.className="createdElements";
            e.size=5;
            e.style.fontSize="20px";
            return e;

}
function createDiv(){
    var e = document.createElement('div');
    e.title = d2.data.title;
    e.name="div";
    e.innerHTML = d2.data.text;
    e.className="createdElements";
    e.style.fontSize="20px";
    return e;
}
function createTable(){
var table = document.createElement("table"); 
var tbody = document.createElement("tbody"); 
table.border = 1;    
for(var i=0;i<d3.data.rows;i++) 
{ 
var tr = document.createElement("tr"); 
for(var j=0;j<d3.data.cols;j++) 
{ 
var td = document.createElement("td"); 
for (var k = 0; k < d3.data.cells.length; k++) {
if (d3.data.cells[k].row==i&&d3.data.cells[k].col==j) {
td.innerHTML = d3.data.cells[k].data; }
}
tr.appendChild(td); 
} 
tbody.appendChild(tr);    
} 
table.appendChild(tbody);
table.className="createdElements" ;
table.name="table";
table.style.fontSize="20px";
return table;    
}
function createImage(){
	var e = document.createElement('img');
    e.title = d4.data.title;
    e.src = d4.data.image;
    e.name="image";
    e.className="createdElements";
    return e;
  
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
function getRandomColor(){
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}
function displayMenu(menu){
     document.getElementById(menu).style.display="block";
}
function closeMenu(menu){
    document.getElementById(menu).style.display="none";
}
function changeStyleBorder(element){
    element.style.border="2px solid blue";
  var elements=document.getElementsByClassName("createdElements");
  for(var i=0;i<elements.length;i++)
  {
     if (elements[i]!=element) {elements[i].style.border="2px solid black";}
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
function createMenuForOthers(d){
for (var i = 0; i < d.data.length; i++) {
	 createMenu($("#selectOperation"),d.data[i].id,d.data[i].text);
}

}


