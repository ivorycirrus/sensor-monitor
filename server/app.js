
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var net = require("net");
var DB = require("./mysqldb").MYSQL_DB;

var app = express();

// all environments
app.set('port', 21000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//****************************
// monitor server
//****************************

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = socketio.listen(server);
var connected_socket = null;
io.sockets.on('connection',function(socket){

	//connection message
	connected_socket = socket;
	io.sockets.sockets[socket.id].emit('server_msg', '[SERVER] socket server connected....');

	socket.on('sensor_on',function(data){
		console.log('[SENSOR_MANAGER] sensor_connected : '+data);
		socket.broadcast.emit('sensor_on',data);
	});

	socket.on('sensor_off',function(data){
		console.log('[SENSOR_MANAGER] sensor_disconnected : '+data);
		socket.broadcast.emit('sensor_off',data);
	});

	socket.on('sensor_data',function(data){
		console.log('[SENSOR_MANAGER] sensor data emitted : '+data);
		socket.broadcast.emit('sensor_data',data);
	});
});

//****************************
// db server connect
//****************************
//DB.connect("us-cdbr-east-04.cleardb.com","bfd543c5b107bb","3dcb9eea");

//****************************
// tcp socket server
//****************************
net.createServer(function(tcp){
	tcp.on('data', function(data){
		console.log(data);
		console.log("from> "+data.toString());

		var objDate = new Date();
		var tempArray = data.toString().split(';');
		var dataSet = [];
		for(var i = 0 ; i < tempArray.length ; i++){
			var tempData = tempArray[i].split(',');
			var sensorType = null;
			if(tempData[0]=='ffff'){
				continue;
			}else if(tempData[0]=='100') {
				sensorType = 'can1';
			}else if(tempData[0]=='200') {
				sensorType = 'can2';
			}

			var sensorData = { 
								sensor: sensorType, 
								data: tempData[1], 
								time: [objDate.getHours(),objDate.getMinutes(),objDate.getSeconds()]
							};
			dataSet.push(sensorData);
			/* [start] for test */
			//var sensorData = { sensor: 'can2', data: tempData[1],time: [objDate.getHours(),objDate.getMinutes(),objDate.getSeconds()]};
			//dataSet.push(sensorData);
			/* [end] for test */
		}
		SensorData(dataSet);
		//tcp.write(data);
	});
	tcp.on('error',function(err){
		console.log(err);
	});
}).listen(6200,function(){
	console.log("TCP server running at 192.168.1.11:6200");
}); 

function SensorOn(data){
	console.log('[SENSOR_MANAGER] sensor_connected : '+data);
	io.sockets.emit('sensor_on',data);
}

function SensorData(data){
	for(var i = 0 ; i < data.length ; i++){
		if(!data[i].sensor) continue;
		console.log('[SENSOR_MANAGER] sensor data emitted : '+JSON.stringify(data[i]));
		io.sockets.emit('sensor_data',data[i]);
	}
}
