var Status = {
	'temperature':{
		'sensor_connected':false,
		'emit_timer':null,
		'sensor_count':1
	},
	'humidity':{
		'sensor_connected':false,
		'emit_timer':null,
		'sensor_count':1
	},
	'opticaldepth':{
		'sensor_connected':false,
		'emit_timer':null,
		'sensor_count':1
	}
};

var socket;

 $(function() {
    $( "#btn_connect_temperature" ).buttonset();
    $( "#btn_connect_humidity" ).buttonset();
    $( "#btn_connect_opticaldepth" ).buttonset();

    $( "#add_temperature_data" ).button();
    $( "#add_humidity_data" ).button();
    $( "#add_opticaldepth_data" ).button();

    socket = io.connect();

    socket.on('server_msg',function(data){
    	$("#log_console").append(data+'\n');
    });

 });

function addRow(kind){
 	var table = $("#data_"+kind).get(0);
 	var rowCount = table.rows.length;
    
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    var element1 = document.createElement("input");
    element1.type = "text";
    element1.class = kind;
    element1.size = "16";
    cell2.appendChild(element1);
}

function sensorOn(sensor){
 	if(Status[sensor].sensor_connected) {
 		$("#log_console").append('[Sensor On] '+sensor+' sensor already connected!\n');
 		return;
 	}else if(socket){
 		Status[sensor].sensor_connected = true;
 		Status[sensor].emit_timer = setInterval(emitSensorData,3000,sensor);
 		socket.emit('sensor_on',sensor);
 		$("#log_console").append('[Sensor On] '+sensor+' sensor is running...\n');
 	}
}

function sensorOff(sensor){
	clearInterval(Status[sensor].emit_timer);
	Status[sensor].sensor_connected = false;
	socket.emit('sensor_off', sensor);
	$("#log_console").append('[Sensor On] '+sensor+' sensor is stopped...\n');
}

function emitSensorData(sensor){
	var sensorData = getSensorData(sensor);
	$("#log_console").append('[Data] '+sensorData+'\n');
	socket.emit('sensor_data',sensorData);
}

function getSensorData(sensor){
 	var table = $("#data_"+sensor).get(0);
 	var rowCount = table.rows.length;

 	if(Status[sensor].sensor_count<rowCount){
 		var row = table.rows[(Status[sensor].sensor_count++)];
 		row.children[0].innerText = 'v';
 		console.log(row.children[1].children[0].value);
 		return '{"sensor":"'+sensor+'","data":"'+row.children[1].children[0].value+'"}';
 	}else{
 		sensorOff(sensor);
 	}	
}