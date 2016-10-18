var View=Backbone.View.extend(
{ 
  	initialize:function(){
    	this.$el.html("<button class='Create btn-primary btn-circle'>Create</button>");
    	this.model=new Model();
      this.barChart=new BarChart();
      this.act=new Actions();
      this.bootstrap=new Bootstrap();
      this.actionAfterResponse(function(){
          this.barChart.svg.createSvg(this.model.get('elements'));
          this.event.bindCreateButtonEvent.call(this);
      }.bind(this),60)(11);
  	},
    actionAfterResponse:function(callback,MaxWaitSecond){
      var count=0;
      var waitForResponse=function(responseTimes){
            if (this.model.responseTimes===responseTimes){
                callback();
                console.log(count);
            }
            else{
              var time=setTimeout(function(){
                waitForResponse(responseTimes);}.bind(this),5);
                count+=5;
                if (count>1000*MaxWaitSecond) {console.log(count);clearTimeout(time);}
            }
        }.bind(this);
        return waitForResponse;
    },
    "menu":{
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
        this.menu._createMenuList($(".dropdown-menu"),element.id, element.text);
        for (var j in data) {
          if (j===element.id) {
        this.event.bindElementsMenuEvents.call(this,$('li#'+element.id),data[j]);
                     break;
              } 
            } 
          }
      },
      createActionsMenu:function (actions){
        for (var i = 0; i < actions.length; i++) {
        this.menu._createMenuList($(".dropdown-menu"),actions[i].id,actions[i].text);
       }
        this.event.bindActionsMenuEvents.call(this,i);
      },
      showMenuInPostion:function(){
        var x=(event.currentTarget.offsetLeft+event.currentTarget.offsetWidth).toString()+"px";
        var y=(event.currentTarget.offsetTop+event.currentTarget.offsetHeight-15).toString()+"px";
        $(".dropdown-menu").css({"position":"absolute","left":x,"top":y});
        $(".dropdown-menu").show();
      },
      _createMenuList:function(menu,id,text){
        menu.append("<li id="+id+"><a href='#'>"+text+"</a></li>");
      },  
    },

    "event":{
      bindCreateButtonEvent: function(){
        this.event._bindBlankEvents();
        $(".Create").click(function(event){
        if (this.model.responseTimes!==11){
        alert("request 2 or 3 is not succeed now" );
        return;
        }
        event.stopPropagation();
        $(".dropdown-menu").remove();
        $(".createdElements").css('border',"2px solid gray");
        if($(".dropdown-menu").length===0){
        $("body").append("<div class='dropdown-menu'></div>");
        var elements = this.model.get("elements");
        this.menu.createElementsMenu.call(this,elements);
        this.menu.showMenuInPostion();
          } 
        }.bind(this));
      },
      bindElementsMenuEvents: function(jq,elementData){
        jq.bind("click",function(){
        this.element.createElements.call(this,elementData);}.bind(this)
        );
      },
      bindElementsEvent:function(jq){
        jq.bind("click",function(){
        event.stopPropagation();
        $(".createdElements").removeClass("selected");
        $(event.currentTarget).addClass("selected");
        this.act.actions.changeStyleBorder(event.currentTarget);
        $(".dropdown-menu").remove();
        $("body").append("<div class='dropdown-menu'></div>");
        var actions=this.model.actions;
        var name=event.currentTarget.name;
        for (var i in actions) {
        if (i===name) {
        this.menu.createActionsMenu.call(this,actions[i]);
        break;
            }
        }
        this.menu.showMenuInPostion();
          }.bind(this));
      },
      bindActionsMenuEvents:function(){
        var actions=this.act.actions;
        for (var i in actions) {
        if (i==="delete") {$("#"+i).bind("click",function(){
          var title=$(".selected").attr("title");
          this.barChart.svg.setBarLength(title,'-');
          actions.delete();
        }.bind(this));}
        $("#"+i).bind("click",actions[i].bind(actions));
        }
      },
      _bindBlankEvents:function(){
        $(document).click(function(event){
        var _con = $(".dropdown-menu");   // 设置目标区域
        if(!_con.is(event.target) && _con.has(event.target).length === 0){ 
          _con.remove();          
        $(".createdElements").css("border","2px solid gray");
          }
        });
      },
    },
    "element":{
      createElements: function(element){
        if ($("#combo").length===0) {
                $("body").append("<div id='combo'></div>");
              }
         var e = document.createElement(element.tag);
         if (element.tag==="div") {
            e.innerHTML=element.text;
        }
         else if(element.tag==="table"){
              e.appendChild(this.element.createTable(element));
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
        e.title=element.name;
        var comboValue = document.getElementById('combo');
        comboValue.appendChild(e);
        this.bootstrap.addBootstrapClass();
        this.barChart.svg.setBarLength(e.title,'+');
        this.event.bindElementsEvent.call(this,$(e));
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
    },
});