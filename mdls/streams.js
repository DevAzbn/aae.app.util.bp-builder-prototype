'use strict';

var _ = function(app, p) {
	
	var azbn = app.azbn;

	var _root_dir = 'json/streams/';
	
	var ctrl = {
		
		create : function() {

			var _now = azbn.now();

			var item = {
				uid : 'stream' + azbn.randstr() + _now,
				created_at : _now,
			};

			//var dir = 'json/streams/' + item.uid;

			//item.path = dir;

			//app.mkDataDir(dir);
			//app.mkDataDir(dir + '/tasks');

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