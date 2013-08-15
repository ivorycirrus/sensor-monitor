
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');

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
io.sockets.on('connection',function(socket){

	//connection message
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
