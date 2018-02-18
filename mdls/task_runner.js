'use strict';

var _ = function(app, p) {
	
	var azbn = app.azbn;
	
	var tasks = {};
	var task_file = 'json/tasks/active';
	var task_types_dir = 'json/tasks/types/';

	var ctrl = {
		
		loadTasks : function(file) {

			app.clearRequireCache(require);

			if(file && file != '') {
				task_file = file;
			}

			tasks = app.loadJSON(task_file);

		},

		saveTasks : function() {

			app.saveJSON(task_file, tasks);

		},

		runAll : function() {

			var keys = Object.keys(tasks);

			if(keys.length) {

				for(var uid in tasks) {
					
					ctrl.runTask(tasks[uid]);
		
				}
		
			}

		},

		runTask : function(task) {

			var type = app.loadJSON(task_types_dir + task.type);

			if (type.scheme.criterion.input && type.scheme.criterion.input != '') {

				app.fork(type.scheme.criterion.input, task, function (_ci_process, _ci_data) {

					_ci_process.kill();

					azbn.echo_dev(type.scheme.criterion.input);

					var _ci_result = _ci_data.data;

					if (_ci_result.is.validated) {//&& _ci_result.process && _ci_result.process != ''



						app.fork(_ci_result.process, task, function (_p_process, _p_data) {

							_p_process.kill();

							azbn.echo_dev(_ci_result.process);

							var _p_result = _p_data.data;

							if (type.scheme.criterion.output && type.scheme.criterion.output != '') {




								app.fork(type.scheme.criterion.output, _p_result, function (_co_process, _co_data) {

									_co_process.kill();

									azbn.echo_dev(type.scheme.criterion.output);

									var _co_result = _co_data.data;

									if (_co_result.is.completed) {

										tasks[task.uid] = null;
										delete tasks[task.uid];
										ctrl.saveTasks();

									}

								});




							}

						});



					} else {

						app.mdl('criterion').failReport(type.scheme.criterion.input, task, _ci_result);

					}

				});

			}

		},
		
	};
	
	return ctrl;
	
};

module.exports = _;
