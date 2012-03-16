var WebSQLHelper = (function($) {

	var TAG = "websqlhelper-js";
	var instance = undefined;
	var db = undefined;

	function WebSQLHelper(config) {
		console.log(TAG, "WebSQLHelper");
		this.init(config);
	}

	WebSQLHelper.createInstance = function(config) {
		config = config || {};
		
		if (instance == undefined) {
			instance = new WebSQLHelper(config);
		}
		return instance;
	}
	
	WebSQLHelper.getInstance = function() {
		if (instance == undefined) {
			console.log(TAG, "instance=undefined, please call createInstance(config).");
		}
		return instance;
	}

	WebSQLHelper.onError = function(e) {
		console.log(TAG, e);
	}

	WebSQLHelper.onSuccess = function(tx, response) {
		console.log(TAG, response);
	}

	WebSQLHelper.onCreate = function(tx, response) {
		console.log(TAG, response);
	}

	WebSQLHelper.prototype.init = function(config) {
		console.log(TAG, "init");
		
		if (db == undefined) {
			var params = {};
			params.name 		= config.name;
			params.version 		= config.version || "1.0";
			params.desciption	= config.description || "The description of WebSQL db";
			params.size			= config.size || (5 * 1024 * 1024);
			params.callback		= config.callback || WebSQLHelper.onCreate;
			console.log(params);

			db = openDatabase(params.name, params.version, params.description, params.size, params.callback);
		}
	}

	WebSQLHelper.prototype.execute = function(sql) {
		console.log(TAG, "execute");
		db.transaction(function(tx) {
			tx.executeSql(sql);
		});
	}
	
	WebSQLHelper.prototype.query = function(sql) {
	}

	WebSQLHelper.prototype.select = function() {
	}

	WebSQLHelper.prototype.insert = function() {
	}

	WebSQLHelper.prototype.update = function() {
	}

	WebSQLHelper.prototype.delete = function(table, where, using, vars, _test) {
		
	}

	return WebSQLHelper;
}(jQuery));