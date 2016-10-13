var View=Backbone.View.extend(
{ 
  	initialize:function(){
  	this.$el.html("<button class='Create btn-primary btn-circle'>Create</button>");
  	this.model=new Model();
  	this.bindCreateButtonEvent();
  	},
  	render:function(){},
  	bindCreateButtonEvent: function() {
  		this.bindBlankEvents();
  	$(".Create").click(function(event){
  		if (this.model.requestTimes!==11){
  			alert("request 2 or 3 is not succeed now" );
  			return;
  		}
  		event.stopPropagation();
  		$(".dropdown-menu").remove();
  		$(".createdElements").css('border',"2px solid gray");
  		if($(".dropdown-menu").length===0){
  		$("body").append("<div class='dropdown-menu'></div>");
  		var elements = this.model.get("elements");
		this.createElementsMenu(elements);
    	this.showMenuInPostion();
  		}	
  		}.bind(this));
  	},
    createElementsMenu:function(elements){
    	var data=this.model.data;
    	for (var i in data) {
  			data[i].tag=i;
            data[i].name=i;
  		}
  			data.button.tag="input";
  			data.button.type="button";
  			data.image.tag="img";
  			data.inputText.tag="input";
  			data.inputText.type="text";
        for (i = 0; i < elements.length; i++) {
  	    	var element = elements[i];
    		this.createMenu($(".dropdown-menu"),element.id, element.text);
    		for (var j in data) {
    			if (j===element.id) {
    		this.bindElementsMenuEvents($('#'+element.id),data[j]);
                     break;
    				}	
    			}	
    	}
    },
  	actions:{
    delete:function() {
        $(".selected").remove();
        $(".dropdown-menu").remove();
    },
    backgroundColor: function() {
      $(".selected").css("background-color",this.actions._getRandomColor());
    },
    fontColor:function() {
     $(".selected").css("color",this.actions._getRandomColor());
    },
    increaseFontSize: function(){
        this.actions._setFontSize('+');
    },
    decreaseFontSize: function(){
        this.actions._setFontSize('-');
    },
    _getRandomColor: function(){
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
    _setFontSize: function(type) {
        var $s=$(".selected");
        var fontSize=$s.css("font-size");
            fontSize = eval((parseInt(fontSize)+type+2)) + "px";
         $s.css("font-size",fontSize);
     	}
	},
	bindElementsMenuEvents: function(jq,elementData){
    jq.bind("click",function(){this.createElements(elementData);}.bind(this));
	},
    bindBlankEvents:function(){
    	$(document).click(function(event){
		  var _con = $(".dropdown-menu");   // 设置目标区域
		  if(!_con.is(event.target) && _con.has(event.target).length === 0){ 
				_con.remove();          
			$(".createdElements").css("border","2px solid gray");
			}
		});
    },
  	bindActionsMenuEvents:function(){
     for (var i in this.actions) {
     	// if(i===actionsId){
      	$("#"+i).bind("click",this.actions[i].bind(this));
      		// break;
      		// } 
  		}
  	},
  	changeStyleBorder:function(element) {
    $(".createdElements").css("border","2px solid gray");
     element.style.border = "2px solid blue";
	},

  	createElements: function(element){
  	if ($("#combo").length===0) {
    				$("body").append("<div id='combo'></div>");
    			}
     var e = document.createElement(element.tag);
     if (element.tag==="div") {
        e.innerHTML=element.text;
    }
     else if(element.tag==="table"){
          e.appendChild(this.createTable(element));
      	}
      else if(element.tag==="img"){
          e.src = element.image;
      	}
     else{
    e.type = element.type;
    e.value = element.text;
   		}
    e.className = "createdElements";
    e.name=element.name;
    var comboValue = document.getElementById('combo');
    comboValue.appendChild(e);
    this.addBootstrapClass();
    this.bindElementsEvent($(e));
	},

	createTable:function (element){
	var tbody = document.createElement("tbody");    
	for(var i=0;i<element.rows;i++) 
		{ 
	var tr = document.createElement("tr"); 
	for(var j=0;j<element.cols;j++) 
			{ 
	var td = document.createElement("td"); 
	for (var k = 0; k < element.cells.length; k++) {
	if (element.cells[k].row==i&&element.cells[k].col==j) {
	td.innerHTML = element.cells[k].data; }
			}
	tr.appendChild(td); 
			} 
	tbody.appendChild(tr);    
		} 
	return tbody;    
	},

	bindElementsEvent:function(jq){
		//bind click element event
    	jq.bind("click",function() {
    	event.stopPropagation();
        $(".createdElements").removeClass("selected");
        $(event.currentTarget).addClass("selected");
        this.changeStyleBorder(event.currentTarget);
        $(".dropdown-menu").remove();
		$("body").append("<div class='dropdown-menu'></div>");
		var actions=this.model.actions;
		var name=event.currentTarget.name;
		   	for (var i in actions) {
	    	if (i===name) {
	    	this.createActionsMenu(actions[i]);
	    	break;
          		}
	    	}
		this.showMenuInPostion();
    	}.bind(this));
	},

  	showMenuInPostion:function(){
  	  var x=(event.currentTarget.offsetLeft+event.currentTarget.offsetWidth).toString()+"px";
	  var y=(event.currentTarget.offsetTop+event.currentTarget.offsetHeight-15).toString()+"px";
	  $(".dropdown-menu").css({"position":"absolute","left":x,"top":y});
	  $(".dropdown-menu").show();
  	},
  	createMenu:function(menu,id,text){
	menu.append("<li id="+id+"><a href='#'>"+text+"</a></li>");
	},	
	
	createActionsMenu:function (actions){
	for (var i = 0; i < actions.length; i++) {
	 this.createMenu($(".dropdown-menu"),actions[i].id,actions[i].text);
				// this.bindActionsMenuEvents(actions[i].id);
				}
				// for (i in this.actions) {
				this.bindActionsMenuEvents(i);
			// }
	},
	addBootstrapClass:function(){
	$("img").addClass("img-circle");
	$("[type='button']").addClass("btn-info");
	$("[type='text']").addClass("form-control");
	$("table").addClass("table-bordered table-striped");
	$("div").addClass("form-group");
}
});
 // bindActionsMenuEvents:function(i){
    //    $("#"+i).bind("click",function(){
    //    	this.actions[i].apply(this);
    //    	this.showMenuInPostion();
    //    	$("li#"+i+">a").css("background-color","#a7dce0");
    //    	$("a:hover").css("background-color","#000000");
    //    }.bind(this));
    // },