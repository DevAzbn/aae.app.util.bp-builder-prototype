'use strict';

var azbn = new require(__dirname + '/../../../../../../../system/bootstrap')({
	
});

var app = azbn.loadApp(module, '/../../');

var _data = azbn.mdl('process/child').parseCliData(process.argv);

//console.dir(_data);

var result = {
	is : {
		completed : true,
	},
};

//console.log(__filename);

process.send({
	kill_child : 1,
	app_fork : 1,
	data : result,
});