'use strict';

var _ = function(app, p) {
	
	var azbn = app.azbn;

	var _root_dir = 'json/tasks/';
	
	var ctrl = {
		
		create : function(stream_uid, type, title) {

			var _now = azbn.now();

			var item = {
				uid : 'task' + azbn.randstr() + _now,
				created_at : _now,
				stream : stream_uid,
				type : type,
				title : title,
				input : {
					data : null,
				},
				output : {
					data : null,
				}
			}

			app.saveJSON(_root_dir + item.uid, item);

			return item;

		},

		load : function(uid) {

			return app.loadJSON(_root_dir + uid);

		}
		
	};
	
	return ctrl;
	
};

module.exports = _;