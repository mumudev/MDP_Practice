var Model=Backbone.Model.extend(
{  
  	"element":["table","button","inputText","div","image"], 
    "data":{},
    "actions":{},
    "dataArray":[],
    "actionArray":[],
    "responseTimes":0,
    initialize:function(){
     	this.handleResponse('','','');
     	this.requestJson(this.data,"/data");
    },
    requestJson: function(obj,url) {
  	    for (i = 0;i<this.element.length ;i++) {
  	    	console.log("send request " + i);
  	    	var element =this.element[i];
          this.handleResponse(obj,element,url);
		  }
    },
   	handleResponse: function(obj,element,url) {
   		$.getJSON("http://admadevwb8001:8001/api/html/elements/"+element+url).done(
   			function(json){
				console.log("handle response " + element);
				if(obj){
   				obj[element] = json.data;}
   				else{this.set({'elements':json.data});}
   				this.responseTimes++;
		    }.bind(this)).fail(
		     function(){
		    	alert("request fail!");
		    });
    },
});
