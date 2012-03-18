var CRUD = (function($) {

	var TAG = "CRUD-js";
	var instance = undefined;
	var db = undefined;
	
	function CRUD(config) {
		console.log(TAG, "CRUD");
		console.log(TAG, config);
		this.init();
	}

	CRUD.createInstance = function(config) {
		config = config || {};
		
		if (CRUD.instance == undefined) {
		
			$.getScript("assets/js/WebSQLHelper.js", function(data, textStatus, jqxhr) {
				console.log(TAG, "loaded: assets/js/WebSQLHelper.js");

				if (!db) {
					db = WebSQLHelper.createInstance({
						"name"			: "searchindex",
						"description"	: "This is Search Index Database."
						});
				}

				// tests
				runTestes();

			});
			instance = new CRUD(config);
		}
		return instance;
	}
	
	CRUD.getInstance = function() {
		if (instance == undefined) {
			console.log(TAG, "instance=undefined, please call createInstance(config).");
		}
		return instance;
	}

	CRUD.prototype.getDB = function() {
		return db;
	}
	
	CRUD.prototype.init = function() {
		console.log(TAG, "init");
	}

	CRUD.prototype.create = function(data) {
	}

	CRUD.prototype.delete = function(id) {
	}

	CRUD.prototype.update = function(id, data) {
	}

	CRUD.prototype.select = function(id) {
	}
	
	CRUD.prototype.data = function() {
	}

	var runTestes = function() {
		testSingleton();
	}
	
	var testSingleton = function() {
		var db1 = WebSQLHelper.getInstance();
		var db2 = WebSQLHelper.getInstance();
		console.log(TAG, "testSingleton", db1 == db2);
	}
		
	return CRUD;

}(jQuery));

/*
http://webpy.org/src/blog/0.3
http://www.tutorialspoint.com/html5/html5_web_sql.htm
*/