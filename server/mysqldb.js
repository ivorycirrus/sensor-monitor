var mysql = require('mysql');
var MYSQL_DB = {
	client: null,

	connect: function(host,userid,password){
		this.client = mysql.createConnection({
			"host": host,
			"user": userid,
			"password": password
		});
	},

	insert: function(sensor, data){

	}
};

exports.MYSQL_DB = MYSQL_DB;