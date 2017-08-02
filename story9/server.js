var express = require('express');
var app = express();
var config= require('./config');
var fs = require('fs');
var path = require("path");
var url = require('url');///引入文件读取模块
var bodyParser = require('body-parser');
var documentRoot = 'D:/myProject/story9';

//这里指定参数使用 json 格式
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/ele*",function(req,res){
	// var file;
	var pathname = url.parse(req.url).pathname; 
    var file=documentRoot+pathname+"/"+ config.Welcome.file;
    console.log(file);

	 fs.readFile(file , function(err,data){
        if(err){
            res.writeHead(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHead(200,{
                'content-type' : 'application/json;charset="utf-8"',
                "Access-Control-Allow-Origin": "*"
            });
            res.end(data);

        }
    });
});

var elements=[];
app.get("/story*",function(req,res){
	var file;
	var pathname = url.parse(req.url).pathname; 
	if(pathname=='/story5'){
		file=documentRoot+"/story5/story5.html";
	}else{
		file=documentRoot+pathname;
	}
	
 //    if(pathname!=='/'){
 //    	file = documentRoot+path;
	// }else{
	// 	file =documentRoot+"/index.html";
	// }
    console.log(file);

	 fs.readFile(file , function(err,data){
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else switch(path.extname(file)){
        	case".json":
	            res.writeHeader(200,{
	                'content-type' : 'application/json;charset="utf-8"',
	                "Access-Control-Allow-Origin": "*"
	            });
	            res.end(data);
	            break;
            case".js":
	            res.writeHeader(200,{
	                'content-type' : 'text/javascript;charset="utf-8"',
	                "Access-Control-Allow-Origin": "*"
	            });
	            res.end(data);
	            break;
	        case".html":
	         	res.writeHeader(200,{
	                'content-type' : 'text/html;charset="utf-8"',
	                "Access-Control-Allow-Origin": "*"
	            });
	            res.end(data);
	            break;
	        case".css":
	         	res.writeHeader(200,{
	                'content-type' : 'text/css;charset="utf-8"',
	                "Access-Control-Allow-Origin": "*"
	            });
	            res.end(data);
	            break;
 			default:
                    res.writeHead(200, {
                    	"Content-Type": "application/octet-stream",
                    	"Access-Control-Allow-Origin": "*"
                });


        }
    });
});

app.post("/",function(req,res){
	var ele;
	if(req.body.type!=="image"){
		ele={
	    	id:req.body.id,
	    	type:req.body.type,
	    	color:req.body.color,
	    	fontSize:req.body.fontSize,
	    	backgroundColor:req.body.backgroundColor
    	};
	}else{
		 ele={
	    	id:req.body.id,
	    	type:req.body.type
	    };
	}
    elements.push(ele);
 	res.writeHeader(200,{
        'content-type' : 'text/html;charset="utf-8"',
        "Access-Control-Allow-Origin": "*",
    });
    res.end();
    console.log("post successfully");
    console.log(ele);


   //  var record=JSON.stringify(req.body);  
   //  fs.appendFile(documentRoot+"/index.html", record+"\r\n",  function(err) {
   // if (err) {
   //     console.error(err);
   // }
// });
    // console.log(req.body);
	
});

app.get("/",function(req,res){
 	res.writeHeader(200,{
        'content-type' : 'text/html;charset="utf-8"',
        "Access-Control-Allow-Origin": "*",
    });
    record=JSON.stringify(elements);
    record=record.replace(/\[/,"");
    record=record.replace(/]/,"");
    // fs.appendFile(documentRoot+"/index.html", record);
    res.end(record);
    // res.write(elements);
    // var i;
    // for(i=0;i<elements.length;i++){
    // 	record=JSON.stringify(elements[i]);

        // fs.appendFile(documentRoot+"/index.html", record+"\r\n");
	// }
	// fs.readFile(documentRoot+"/index.html" , function(err,data){
        // if(err){
        	// console.log(err);
            // res.writeHeader(404,{
            //     'content-type' : 'text/html;charset="utf-8"'
            // });
            // res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            // data=JSON.parse(data);
            // res.end(data);
        // }else{
          
            // res.end(data);

        // }
    // });
	// console.log(elements);
});

app.delete("/",function(req,res){
 	res.writeHeader(200,{
        'content-type' : 'text/html;charset="utf-8"',
        "Access-Control-Allow-Origin": "*",
    });
    res.end();
    var id=req.body.id; 
    console.log(req.body.id); 
	delete elements[id-1];
	// console.log(elements);
});

app.put("/",function(req,res){
    var ele=elements[req.body.id-1];
    var type=req.body.type;
    if(type!=="image"){
	    ele.color=req.body.color;
	    ele.fontSize=req.body.fontSize;
	    ele.backgroundColor=req.body.backgroundColor;
    }
 	res.writeHeader(200,{
        'content-type' : 'text/html;charset="utf-8"',
        "Access-Control-Allow-Origin": "*",
    });
    res.end();

    console.log(ele); 

	// console.log(elements);
});
  var server = app.listen(8888, function () {

  console.log("Server is running...");

  });

  // fs.appendFile('./book.json','test',function(err){  
  //   if(err)  
  //       throw err;  
  //       console.log('The "data to append" was appended to file!');  
    // var jsonObj=JSON.parse(data);  
    // var space=' ';  
    // var newLine=' . ';  
    // var chunks=[];  
    // var length=0;  
      // console.log("length: "+jsonObj.length);
    // for(var i=0,size=jsonObj.length;i<size;i++){  
    //     var record=jsonObj[i];  
    //     var name=record['name'];  
    //     var category=record['category'];  
    //     var quantity=record['quantity'];  
          
    //     var value=name+space+category+space+quantity+newLine;  
    //     var buffer=new Buffer(value);  
    //     chunks.push(buffer);  
    //     length+=buffer.length;  
    // }  
      
    // var resultBuffer=new Buffer(length);  
    // for(var i=0,size=chunks.length,pos=0;i<size;i++){  
    //     chunks[i].copy(resultBuffer,pos);  
    //     pos+=chunks[i].length;  
    // }  
      
    // fs.writeFile('json/result.txt',resultBuffer,function(err){  
    //     if(err) throw err;  
    //     console.log('write JSON into TEXT');  
    // });  
// }); 