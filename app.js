'use strict';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var azbn = new require(__dirname + '/../../../../system/bootstrap')({
	
});

var app = azbn.loadApp(module);

//var path = require('path');
var argv = require('optimist').argv;

azbn.setMdl('config', require('./config/main'));

app.mdl('task_runner').loadTasks();

var periodic = setInterval(function(){

	app.mdl('task_runner').runAll();

}, azbn.mdl('config').processes.main_interval);
