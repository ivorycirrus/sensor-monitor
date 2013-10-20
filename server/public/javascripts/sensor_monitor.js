var socket;

var SensorChart = {
    "can1" : {
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
                ],
                "lastDataTime": ''
            },
        "options" : {
            "animation":false,
            "scaleOverride" : true,
            "scaleSteps" : 10,//Number - The number of steps in a hard coded scale
            "scaleStepWidth" : 25,//Number - The value jump in the hard coded scale               
            "scaleStartValue" : 0//Number - The scale starting value
        }
    },
    "can2" : {
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
    "rs485_1" : {
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
                ],
                "lastDataTime": ''
            },
        "options" : {
            "animation":false,
            "scaleOverride" : true,
            "scaleSteps" : 10,//Number - The number of steps in a hard coded scale
            "scaleStepWidth" : 5,//Number - The value jump in the hard coded scale               
            "scaleStartValue" : 0//Number - The scale starting value
        }
    },
    "rs485_2" : {
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
    /*
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
    }*/
}

 $(function() {

    SensorChart.can1.canvas_context = $("#chart_can1").get(0).getContext("2d");
    SensorChart.can1.chart = new Chart(SensorChart.can1.canvas_context);
    SensorChart.can1.chart.Line(SensorChart.can1.data,SensorChart.can1.options);

    SensorChart.can2.canvas_context = $("#chart_can2").get(0).getContext("2d");
    SensorChart.can2.chart = new Chart(SensorChart.can2.canvas_context);
    SensorChart.can2.chart.Line(SensorChart.can2.data,SensorChart.can2.options);

    SensorChart.rs485_1.canvas_context = $("#chart_rs485_1").get(0).getContext("2d");
    SensorChart.rs485_1.chart = new Chart(SensorChart.rs485_1.canvas_context);
    SensorChart.rs485_1.chart.Line(SensorChart.rs485_1.data,SensorChart.rs485_1.options);

    SensorChart.rs485_2.canvas_context = $("#chart_rs485_2").get(0).getContext("2d");
    SensorChart.rs485_2.chart = new Chart(SensorChart.rs485_2.canvas_context);
    SensorChart.rs485_2.chart.Line(SensorChart.rs485_2.data,SensorChart.rs485_2.options);

    /*
    SensorChart.opticaldepth.canvas_context = $("#chart_opticaldepth").get(0).getContext("2d");
    SensorChart.opticaldepth.chart = new Chart(SensorChart.opticaldepth.canvas_context);
    SensorChart.opticaldepth.chart.Line(SensorChart.opticaldepth.data,SensorChart.opticaldepth.options);
    */

    socket = io.connect();

    socket.on('server_msg',function(data){
    	$("#log_console").append(data+'\n');
    });

    socket.on('sensor_on',function(data){
        /*$("#status_"+data).removeClass('sensor_off');
        $("#status_"+data).addClass('sensor_on');
        $("#status_"+data).html('Sensor On');*/
        $("#log_console").append('[Sensor On]'+data+'\n');
    });

    socket.on('sensor_off',function(data){
        /*
        $("#status_"+data).removeClass('sensor_on');
        $("#status_"+data).addClass('sensor_off');
        $("#status_"+data).html('Sensor Off');*/
        $("#log_console").append('[Sensor Off]'+data+'\n');
    });

    socket.on('sensor_data',function(recv_data){
        $("#log_console").append(JSON.stringify(recv_data)+'\n');
        refreshChart(recv_data.sensor, recv_data.data, recv_data.time);
    });
 });

function refreshChart(sensor, data, time){
    var dataTime = time[0]+':'+time[1];
    if(dataTime == SensorChart[sensor].data.lastDataTime) {
        dataTime = time[2];
    }else{
        SensorChart[sensor].data.lastDataTime = dataTime;
        dataTime += (':'+time[2]);
    }

    if(SensorChart[sensor].data_count<10){
        SensorChart[sensor].data.datasets[0].data[SensorChart[sensor].data_count] = data;
        SensorChart[sensor].data.labels[SensorChart[sensor].data_count] = dataTime;
    }else{
        SensorChart[sensor].data.datasets[0].data.push(data);
        SensorChart[sensor].data.datasets[0].data.shift();
        SensorChart[sensor].data.labels.push(dataTime);
        SensorChart[sensor].data.labels.shift();
    }
    
    SensorChart[sensor].data_count++;
    SensorChart[sensor].chart.Line(SensorChart[sensor].data,SensorChart[sensor].options);
}