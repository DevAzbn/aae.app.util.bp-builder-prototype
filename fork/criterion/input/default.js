'use strict';

var azbn = new require(__dirname + '/../../../../../../../system/bootstrap')({
	
});

var app = azbn.loadApp(module, '/../../');

var _data = azbn.mdl('process/child').parseCliData(process.argv);

//console.dir(_data);

var _rand = azbn.randint(5,10);

var _valid = true;
var _process_uid = 'common/default';

if(_rand == 7) {
	_process_uid = 'common/error';
}

var result = {
	is : {
		validated : _valid,
	},
	process : _process_uid,
};

//console.log(__filename);

process.send({
	kill_child : 1,
	app_fork : 1,
	data : result,
});