//****************************
// tcp socket server
//****************************
var net = require("net");

net.createServer(function(socket){
	socket.on('data', function(data){
		console.log(data);
		console.log("convert> "+data.toString());
		socket.write("[server]"+data);
	});
}).listen(21000,function(){
	console.log("TCP server running at 127.0.0.1:21000");
}); 
