
var sendroomurl="api/sendupdate";
		
var myurl="api/sendroom";
var mydata={test:"test"};

var p;//player data, returned from server
var current ; //walls of the room of the dungeon, returned initially from the server
var activeObjects; //chest, traps
var otherplys=[]; // in room

//first time and every subsequent
function getRoom(){

var ret;

$.ajax({
  type: 'POST',
  url: 'api/enterroom',
  success:  function(rt) {
	//alert('fetched data '+rt);
	ret=rt;
  },
  dataType: 'json',
  async:false
});
	return ret;

};

//updates on other players and objects
//DOESN'T WORK
 function getUpdate(){

 	$.ajax({
		 url:"api/getupdate",
		 //we don't send walls but active objects ( which might have changed )
		  dataType: 'json',
		  type:'POST',
         data:
		 JSON.stringify({
				   userkey:p.userid
				}),

		 // JSON.stringify(
				// )
				// ,
		  // async:false,
         success:function(data) {
			 //we update list of other active players
			   //alert("Response: " + data);
			   otherplys=
			   // JSON.stringify(
			   data.ret;
			   // );
			   pushDisplay();
			 }
		 }
       );

 
	// $.ajax({
	  // type: 'POST',
	  // url: 'api/getupdate',
	  // data:	{
					   // userkey:p.userid
					// }),
	  // success:  function(data) {
		// //alert('fetched data '+rt);
		// // ret=rt;
			   // // otherplys=JSON.stringify(data);
			   // // pushDisplay();
	  // },
	  // dataType: 'json',
	  // async:false
	// });
 };






function sendRoom(){
	$.post(
		 sendroomurl,
		 //we don't send walls but active objects ( which might have changed )
         JSON.stringify(
				{
				  ply:p,
				  objs:activeObjects 
				}),
         function(data) {
//           alert("Response: " + data);
         }
       );

}

function tototest(){
		alert('json test');
		
		$.post(
         // "savejsonlevel.php",
		 myurl,
         JSON.stringify(mydata),
         function(data) {
           alert("Response: " + data);
         }
       );
		
		// $ajax(
			// {
			// type:"POST",
			// url:myurl,
			// dataType: 'json',
			// async:false,
			// data:JSON.stringify(mydata),
			// success:function(){
				// alert('sent');
				// }
			// }
		// );
}	

function pushDisplay(){
	
	//disadvantage of text vs canvas: one can not easily overwrite screen coordinate for player
	var display= "";
	for(var j=0;j<current.h;j++){
		for(var i=0;i<current.w;i++){
		//TODO additional condition to display players
			var op = false;
			for(var k=0;k<otherplys.length;k++){
				if( otherplys[k].x===i && otherplys[k].y===j ){
					op = true;
					display+=" o";
				}
			}
		
			if(op===false){
				if( i===p.x && j===p.y){
					display+=" x";
				}else{
					display+=" "+current.map[j*current.w +i];
				}
			}
		}
		display+="<br/>"
	}
	
	
$("#txtview").html(display);

}


$(
function(){
var data=getRoom();
current=data.walls;
p=data.user_data;
pushDisplay();

window.setInterval(
function(){
	// alert('test');
	getUpdate()
},2000);

// var gameCanvas = document.getElementById('gameCanvas');
// var gameGfxCtx = gameCanvas.getContext('2d');


 // gameCanvas.width  = 700;
 // gameCanvas.height = 500;

 	// Gestion du clavier
	window.onkeydown = function(event) {
	var e = event || window.event;
	var key = e.which || e.keyCode;
	//alert(key);
	processKey(key);
	//return false;
	}

 
 
}

);


function processKey(key){
	switch(key) {
	case 38 : 
	//case 122 : case 119 : case 90 : case 87 : 
	// Flèche haut, z, w, Z, W
		applyMove(0,-1);
		break;
	case 40 : 
	//case 115 : case 83 : // Flèche bas, s, S
		applyMove(0,1);
		break;
	case 37 : 
	//case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
		applyMove(-1,0);
		break;
	case 39 : 
	//case 100 : case 68 : 
	// Flèche droite, d, D
		applyMove(1,0);
		break;
	// case 32: //space, poser marteau
		// this.hitting=true;
		// break;
	default : 
		//alert(key);
		// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
		return true;
		}
}


function applyMove(vx,vy){
	p.x+=vx;
	p.y+=vy;
	
	pushDisplay();
	sendRoom();
}