var http = require('http');
var url = require('url');
var fs= require('fs');

var room =[
		1,1,1,1,
		1,1,1,1,
		1,1,1,1
];

function getroom (usr){
	console.log("usr "+usr+" getting room " );
	return room;
}

function sendroom ( usr, strroom ){

	console.log("usr "+usr+" updated room");
	
}

function serveFile(name, res){
	var src = fs.createReadStream("./static/"+name);
	console.log(src);
	console.log(src.toString());
	src.pipe(res);
	// res.end(src);
}

var server = http.createServer(function (req, res) {
	// request handling logic...
	// console.log();
	var myrequrl=url.parse(req.url);
	console.log(myrequrl);
	
	if( myrequrl.pathname === "/index.html" ){
		serveFile("index.html",res);
	}
	else
	if( myrequrl.pathname === "/jquery.js" ){
		serveFile("jquery.js",res);
	}
	else
	if( myrequrl.pathname === "/main.js" ){
		serveFile("main.js",res);
	}
	else
	//waiting for /api/getroom?usr=toto
	if( myrequrl.pathname === "/api/getroom" ){
		var usr = myrequrl.query.split("=")[1];
		console.log(usr)
		res.end(JSON.stringify(getroom(usr)));
		// res.
	}
	else
	if( myrequrl.pathname === "/api/sendroom" ){
		console.log("sendroom");
		if(req.method=='POST'){
			var jsonString='';
			req.on('data',function(data){
				jsonString += data;
			});
			req.on('end',function(){
				console.log(JSON.parse(jsonString));
			});
		}
		//res.end();
		// res.
	}
	
});
server.listen(process.argv[2]);
