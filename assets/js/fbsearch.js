/* FBSearchIndex class */
var FBSearchIndex = (function($) {

	var TAG = "fbsearchindex-js";
	var instance;
	var config;
	var db;

	FBSearchIndex.createInstance = function(config) {
		config = config || {};

		if (instance === undefined) {
			console.log(TAG, "create_instance");
			instance = new FBSearchIndex(config);
		}
		return instance;
	}

	FBSearchIndex.getInstance = function() {
		if (instance === undefined) {
			console.log(TAG, "instance=undefined, please call createInstance(config).");
		}
		return instance;
	}

	function FBSearchIndex(config) {
		this.init(config);
	}

	FBSearchIndex.inherits(LADDERS.search.index);

	FBSearchIndex.method('init', function(config) {
		console.log(TAG, "init");
		this.setConfig(config);
		
		// init db
		if (!db) {
			db = WebSQLHelper.createInstance({
				"name"	: "fbspotlight",
				"description"	: "This is Search Index Database for FBSpotlight Application."
			});
			
		}
		
		return this;
	});

	FBSearchIndex.method('setConfig', function(value) {
		this.config = value;
		return this;
	});

	FBSearchIndex.method('getConfig', function() {
		return this.config;
	});

	FBSearchIndex.method('loadIndex', function() {
		console.log(TAG, "load_index");
				
		var self = this;
		var sql = "";
		var timer = new Timer();
		var idx = {};

		if (db) {

			timer.start();

			self._index = {};
			
			sql = $("#sql-index-headchar-search-record").tmpl({}).html();
			db.query(sql, [], function(results) {
				var count = results.rows.length;
				for (var i = 0; i < count; i = i + 1) {
					var item = results.rows.item(i);
					//console.log(TAG, item);
					idx[item.headchar] = {};					
				}
				
				for (var i in idx) {
					sql = $("#sql-index-searchindex-search-record").tmpl({}).html();
					db.query(sql, [i], function(results) {
						var count = results.rows.length;
						for (var j = 0; j < count; j = j + 1) {
							var item = results.rows.item(j);
							//console.log(TAG, item);
							
							idx[item.headchar][item.word] = JSON.parse(item.meta);
						}
					});
				}

				//console.log(TAG, "idx", idx);
				self._index = idx;

				timer.stop();
				console.log(TAG, "elapsed time", timer.elapsed() + " seconds");
			});
		}
	});

	FBSearchIndex.method('saveIndex', function() {
		console.log(TAG, "save_index");
		var self = this;
		var sql = "";
		var timer = new Timer();

		if (db) {

			timer.start();

			// create "headchar" table
			sql = $("#sql-index-headchar-create-table").tmpl({}).html();
			db.execute(sql, [], function(results) {
				console.log(TAG, "save_index", results);
				for (var i in self._index) {
					sql = $("#sql-index-headchar-replace-record").tmpl({}).html();
					db.execute(sql, [i]);
				}
			});

			// 
			// save "searchindex"
			//
			
			// create "searchindex" table
			sql = $("#sql-index-searchindex-create-table").tmpl({}).html();
			db.execute(sql, [], function(results) {
				console.log(TAG, "save_index", results);
				for (var i in self._index) {
					for (var j in self._index[i]) {
						//console.log(TAG, i, j, JSON.stringify(self._index[i][j]));
						sql = $("#sql-index-searchindex-replace-record").tmpl({}).html();
						db.execute(sql, [i, j, JSON.stringify(self._index[i][j])]);
					}
				}
				
				timer.stop();
				console.log(TAG, "elapsed time", timer.elapsed() + " seconds");
			});
		}
	});

	FBSearchIndex.method('dumpIndex', function() {
		console.log(TAG, "dump_index");
		console.log(this._index);
	});

	FBSearchIndex.method('clearIndex', function() {
		console.log(TAG, "clear_index");
		this._index = {};
	});

	return FBSearchIndex;

}(jQuery));