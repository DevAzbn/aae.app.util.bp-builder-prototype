'use strict';

var _ = function(app, p) {
	
	var azbn = app.azbn;
	
	var ctrl = {
		
		failReport : function(criterion_uid, task, _result) {

			console.log('');
			console.log('---------- Task ' + task.uid + ' failed at ' + criterion_uid + '----------');
			console.dir(_result);
			console.log('');

		},
		
	};
	
	return ctrl;
	
};

module.exports = _;