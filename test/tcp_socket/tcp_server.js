//****************************
// tcp socket server
//****************************
var net = require("net");

net.createServer(function(socket){
	socket.on('data', function(data){
		console.log(data);
		console.log("from> "+data.toString());
		socket.write("[server]"+data);
	});
}).listen(6200,function(){
	console.log("TCP server running at 192.168.1.11:6200");
}); 
