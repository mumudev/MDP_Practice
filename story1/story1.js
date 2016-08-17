	var i=1;
	var j=1;
	var k=1;
	var l=1;
	function create(){
		var obj=document.getElementById("demo");
		var op=obj.value; 
		switch(op){
			case "Table":
			addTable();
				break;
			case "Button":
			addButton();
				break;
			case "Input Text": 
				addText();
				
				break;
			case "Div":
				addDiv();
				break;
			default:
				alert("Please select!");
			
			
		}
		
	}
	function deleteAll(){
		var obj=document.getElementById("demo");
		var op=obj.value; 
		switch(op){
			case 'Table':
				deleteTable();
				break;
			case 'Button':
				deleteButton();
				break;
			case 'Input Text': 
				deleteText();
				break;
			case 'Div':
				deleteDiv();
				break;
			default:
			
				alert("Please select!");
		}
		
	}
	function addTable(){

			
			var put = document.createElement('table');
			put.innerHTML = '<tr><th>Name</th><th>City</th></tr>'
			+'<tr><td>Fiona</td><td>Shenzhen</td></tr>'+
			'<tr><td>**</td><td>***</td></tr>';
			put.id = 'table'+i;
			put.className="Table";
			put.style.fontSize = "18px";
			document.getElementById('div1').appendChild(put);
			i++;

		

	}
	function addText(){
			var div = document.createElement('input');
			div.type="text";
			div.value="Please input a text";
			div.name="test";
			div.className="Input Text";
			div.style.fontSize="20px";
			div.id = 'text'+k;
			document.getElementById('div1').appendChild(div);
			k++;

		

	}
	function addButton(){
			var div = document.createElement('input');
			div.type="button";
			div.value="Button";
			div.className="Button";
			div.name="test";
			div.style.fontSize="12px";
			div.id = 'button'+j;
			document.getElementById('div1').appendChild(div);
			j++;
	}
	function addDiv(){
			var div = document.createElement('div');
			
			div.innerHTML = "Div";
			div.name="test";
			div.className = "Div";
			div.id = 'Div'+l;
			div.style.color="red";
			div.style.fontSize="12px";
			document.getElementById('div1').appendChild(div);
			l++;
	}
	function deleteTable(){
			if(i==1)alert("You must create!");
			while(i-1){
				i--;
				var a = document.getElementById('table'+i);
				document.getElementById('div1').removeChild(a);
				
				}
		

	}
	function deleteText(){
			if(k==1)alert("You must create!");
			while(k-1){
				k--;
				var a = document.getElementById('text'+k);
				document.getElementById('div1').removeChild(a);
				}
			
			

		

	}

	function deleteButton(){
			if(j==1)alert("You must create!");
			while(j-1){
				j--;
				var a = document.getElementById('button'+j);
				document.getElementById('div1').removeChild(a);
				
			}
			
                                                
			
			

		

	}
	function deleteDiv(){
			if(l==1)alert("You must create!");
			while(l-1){	
				l--;
				var a = document.getElementById('Div'+l);
				document.getElementById('div1').removeChild(a);
				
			}

			

	}
	function change_bgcolor(){
		var obj=document.getElementById("demo");
		var op=obj.value; 
		var bg=document.getElementsByClassName(op);
		for(i=0;i<bg.length;i++){
			var rand=Math.round(Math.random()*1000000);
			bg[i].style.backgroundColor="#"+rand;
			}
	}
	
	function change_ftcolor(){
		var obj=document.getElementById("demo");
		var op=obj.value; 
		var bg=document.getElementsByClassName(op);
		for(i=0;i<bg.length;i++){
			var rand=Math.round(Math.random()*1000000);
			bg[i].style.color="#"+rand;
			}
		
	}

	function fontBigger(){
        var obj=document.getElementById("demo");
		var op=obj.value; 
		var ft=document.getElementsByClassName(op);
        for(var i=0;i<ft.length;i++){
		var num=parseInt(ft[i].style.fontSize)+1;
        ft[i].style.fontSize=num+"px";
		}
		
	
	}

	function fontSmaller(){
		
			var obj=document.getElementById("demo");
			var op=obj.value; 
			var ft=document.getElementsByClassName(op);
			for(var i=0;i<ft.length;i++){
			ft[i].style.fontSize=(parseInt(ft[i].style.fontSize)-1)+"px";
			}
		
	}