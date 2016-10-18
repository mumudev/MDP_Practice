function BarChart(){
}
BarChart.prototype.svg={
    createSvg:function(elements){
        $("body").append("<div><svg width='40%' height='300px'>"+
          this._svgHtml(elements)+
          "</svg></div>");
        for (var i in elements) {
          this.bindBarChartEvents(elements[i].id);
        }
    },
    setBarLength:function(elementsId,type){
        var rectjq=$("rect[name="+elementsId+"]");
        var textjq=$("text[name="+elementsId+"]");
        var hidejq=$("text."+elementsId);
        var intWidth=parseInt(rectjq.attr("width"));
        var intNewWidth=(eval(intWidth+type+5));
        var elementAmount=intNewWidth/5;
        rectjq.attr("width",intNewWidth+0.1+'%');
        textjq.html(elementAmount);
        hidejq.html(elementAmount);
    },
    _svgHtml:function(elements){
        var html='';
        var y=50;
        console.log(elements);
        for (var i in elements){
          var str="'createdElements "+elements[i].id+"'";
          html+="<text x='10' y="+y+">"+elements[i].text+":</text>"+
             "<text  name="+elements[i].id+" x='100' y="+y+">0</text>"+
          "<rect title='0' name="+elements[i].id+" x='10' y="+(y+=7)+" width='0.1%'/>"+
          "<text  class="+str+" x='50' y="+(y+18)+">0</text>";
           y+=40;
            }  
          return html;
    },
    bindBarChartEvents:function(elementsId){
        var $rect=$("rect[name="+elementsId+"]");
        $rect.bind("mouseover mouseleave",function(event){
            $(".dropdown-menu").remove();
            var $ele=$("[title="+elementsId+"]");
            $(".createdElements").css("border","2px solid gray");
            $ele.css("border","2px solid blue");
            if (event.type==="mouseleave") {
              $ele.css("border","2px solid gray");}
            $("text."+elementsId).toggle();
        	});
      	},
    };