
var myurl="api/sendroom";
var mydata={test:"test"};

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

$(
function(){
var gameCanvas = document.getElementById('gameCanvas');
var gameGfxCtx = gameCanvas.getContext('2d');





 gameCanvas.width  = 700;
 gameCanvas.height = 500;

}

);