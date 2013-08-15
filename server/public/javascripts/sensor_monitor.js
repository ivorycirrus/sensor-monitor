var socket;

var SensorChart = {
    "temperature" : {
        "canvas_context": null,
        "chart" : null,
        "data_count": 0,
        "data" : {
                labels : ["0","1","2","3","4","5","6","7","8","9"],
                datasets : [
                    {
                        fillColor : "rgba(225,165,151,0.5)",
                        strokeColor : "rgba(225,165,151,1)",
                        pointColor : "rgba(225,165,151,1)",
                        pointStrokeColor : "#fff",
                        data : [0,0,0,0,0,0,0,0,0,0]
                    }
                ]
            },
        "options" : {
            "animation":false,
            "scaleOverride" : true,
            "scaleSteps" : 10,//Number - The number of steps in a hard coded scale
            "scaleStepWidth" : 5,//Number - The value jump in the hard coded scale               
            "scaleStartValue" : 0//Number - The scale starting value
        }
    },
    "humidity" : {
        "canvas_context": null,
        "chart" : null,
        "data_count": 0,
        "data" : {
                labels : ["0","1","2","3","4","5","6","7","8","9"],
                datasets : [
                    {
                        fillColor : "rgba(151,187,205,0.5)",
                        strokeColor : "rgba(151,187,205,1)",
                        pointColor : "rgba(151,187,205,1)",
                        pointStrokeColor : "#fff",
                        data : [0,0,0,0,0,0,0,0,0,0]
                    }
                ]
            },
        "options" : {
            "animation":false,
            "scaleOverride" : true,   
            "scaleSteps" : 10,//Number - The number of steps in a hard coded scale
            "scaleStepWidth" : 10,//Number - The value jump in the hard coded scale               
            "scaleStartValue" : 0//Number - The scale starting value
        }
    },
    "opticaldepth" : {
        "canvas_context": null,
        "chart" : null,
        "data_count": 0,
        "data" : {
                labels : ["0","1","2","3","4","5","6","7","8","9"],
                datasets : [
                    {
                        fillColor : "rgba(187,205,151,0.5)",
                        strokeColor : "rgba(187,205,151,1)",
                        pointColor : "rgba(187,205,151,1)",
                        pointStrokeColor : "#fff",
                        data : [0,0,0,0,0,0,0,0,0,0]
                    }
                ]
            },
        "options" : {
            "animation":false,
            "scaleOverride" : true,   
            "scaleSteps" : 10,//Number - The number of steps in a hard coded scale
            "scaleStepWidth" : 5,//Number - The value jump in the hard coded scale               
            "scaleStartValue" : 0//Number - The scale starting value
        }
    }
}

 $(function() {

    SensorChart.temperature.canvas_context = $("#chart_temperature").get(0).getContext("2d");
    SensorChart.temperature.chart = new Chart(SensorChart.temperature.canvas_context);
    SensorChart.temperature.chart.Line(SensorChart.temperature.data,SensorChart.temperature.options);

    SensorChart.humidity.canvas_context = $("#chart_humidity").get(0).getContext("2d");
    SensorChart.humidity.chart = new Chart(SensorChart.humidity.canvas_context);
    SensorChart.humidity.chart.Line(SensorChart.humidity.data,SensorChart.humidity.options);

    SensorChart.opticaldepth.canvas_context = $("#chart_opticaldepth").get(0).getContext("2d");
    SensorChart.opticaldepth.chart = new Chart(SensorChart.opticaldepth.canvas_context);
    SensorChart.opticaldepth.chart.Line(SensorChart.opticaldepth.data,SensorChart.opticaldepth.options);

    socket = io.connect();

    socket.on('server_msg',function(data){
    	$("#log_console").append(data+'\n');
    });

    socket.on('sensor_on',function(data){
        $("#status_"+data).removeClass('sensor_off');
        $("#status_"+data).addClass('sensor_on');
        $("#status_"+data).html('Sensor On');
        $("#log_console").append('[Sensor On]'+data+'\n');
    });

    socket.on('sensor_off',function(data){
        $("#status_"+data).removeClass('sensor_on');
        $("#status_"+data).addClass('sensor_off');
        $("#status_"+data).html('Sensor Off');
        $("#log_console").append('[Sensor Off]'+data+'\n');
    });

    socket.on('sensor_data',function(recv_data){
        $("#log_console").append(recv_data+'\n');
        var data = JSON.parse(recv_data);
        refreshChart(data.sensor, data.data);
    });
 });

function refreshChart(sensor, data){
    console.log(SensorChart[sensor]);
    console.log(SensorChart[sensor].data_count);
    if(SensorChart[sensor].data_count<10){
        SensorChart[sensor].data.datasets[0].data[SensorChart[sensor].data_count] = data;
    }else{
        SensorChart[sensor].data.datasets[0].data.push(data);
        SensorChart[sensor].data.datasets[0].data.shift();
        SensorChart[sensor].data.labels.push(SensorChart[sensor].data_count);
        SensorChart[sensor].data.labels.shift();
    }
    SensorChart[sensor].data_count++;
    SensorChart[sensor].chart.Line(SensorChart[sensor].data,SensorChart[sensor].options);
}