'use strict';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var azbn = new require(__dirname + '/../../../../system/bootstrap')({
	
});

var app = azbn.loadApp(module);

var argv = require('optimist').argv;

azbn.setMdl('config', require('./config/main'));

process.stdin.setEncoding('utf8');
process.stdin.resume();

process.stdin.on('data', function(msg){

	var input = msg.trim();

	var stream = app.mdl('streams').create();

	var task = app.mdl('tasks').create(stream.uid, 'default', 'Новая задача ' + input + ' ' + azbn.now());

	if(input != '') {
		task.output.data = input;
	}

	app.clearRequireCache(require);

	var tasks = app.loadJSON('json/tasks/active');
	
	if(tasks[task.uid]) {
		
	} else {
		tasks[task.uid] = task;
	}
	
	app.saveJSON('json/tasks/active', tasks);

	azbn.echo('Stream uid: ' + stream.uid + ' Task uid: ' + task.uid);

	process.exit();

});