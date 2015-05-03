//TODO get state of other player from client WIP
//TODO display other players
//TODO make it scheduled
//TODO initially other plys not sent
//TODO test mode with automatic users 


var http = require('http');
var url = require('url');
var fs= require('fs');

//only one room at the mo
var room1 ={
		h:6,
		w:6,
		map:
		[1,1,1,1,1,1,
		1,1,1,1,1,1,
		1,1,1,1,1,1,
		1,1,1,1,1,1,
		1,1,1,1,1,1,
		1,1,1,1,1,1]
		};

//the walls are not resent but this is resent on player action
var activeObjects=[
	{name:"chest",x:4,y:4}
];
		
//all users in the room and their state/ coordinates,
//resent when something changes
var usersInRoom=[];

//to get state of other players
function getOtherUsers(key){
	var ret =[];
	for( var i =0;i<usersInRoom.length;i++){
		if( usersInRoom[i].userid !== key){
			ret.push(usersInRoom[i]);
		}
	}
	return ret;
}

		
//the usr is created on this get
function enterroom (
				// usr
				){
	//TMP generating unique key 
	var ukey = "usr"+usersInRoom.length;
	console.log("usr "+ukey+" getting initial room " + room1 );
	//TMP
	var userdef ={userid:ukey,x:1,y:1};
	usersInRoom.push(userdef);
	return {user_data:userdef,
			walls:room1,
			active_objects:activeObjects
			};
}




function updateServerdataFromPlyAction(data){
	console.log("upd serv from ply ");
	//we need to replace data player, the others will get it on next ping  
	var acting_player = data.ply;
	
	for(var i=0;i<usersInRoom.length;i++){
		if(usersInRoom[i].userid===acting_player.userid){
			usersInRoom[i]=acting_player;
			break;
		}
	}
	console.log("ply list updated " + JSON.stringify(usersInRoom));
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
	if( myrequrl.pathname === "/api/enterroom" ){
		// var usr = myrequrl.query.split("=")[1];
		// console.log(usr)
		res.end(JSON.stringify(
			enterroom(
				// usr
				)
			));
		// res.
	}
	else
	if( myrequrl.pathname === "/api/sendupdate" ){
		console.log("sendupdate");
		if(req.method=='POST'){
			var jsonString='';
			req.on('data',function(data){
				jsonString += data;
			});
			req.on('end',function(){
				// console.log(JSON.parse(jsonString));
				console.log("data received" +JSON.parse(jsonString));
				updateServerdataFromPlyAction(JSON.parse(jsonString));
				res.end();
			});
		}
		//res.end();
		// res.
	}
	else // work around for the client to get notifications ( polled every nth second )
	if( myrequrl.pathname === "/api/getupdate" ){
		console.log("getupdate");
		if(req.method=='POST'){// post with userkey to defeat caching
			var jsonString='';
			req.on('data',function(data){
				jsonString += data;
			});
			req.on('end',function(){
				console.log("data received" +jsonString);
				var ret=JSON.stringify({ret:getOtherUsers(JSON.parse(jsonString).userkey)});
				console.log("ret "+ret);
				res.end(ret);
				
			});
		}
		//res.end();
		// res.
	}
	
});
server.listen(process.argv[2]);




















































































































































