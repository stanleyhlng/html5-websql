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
		console.log(TAG, "on-error", e);
	}

	WebSQLHelper.onSuccess = function(tx, response) {
		console.log(TAG, "on-success", response);
	}

	WebSQLHelper.onCreate = function() {
		console.log(TAG, "on-create");
	}
	
	WebSQLHelper.onReady = function() {
		//console.log(TAG, "on-ready");
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
			//console.log(params);

			db = openDatabase(params.name, params.version, params.description, params.size, params.callback);
			if (!db) {
				console.log(TAG, "Fail to open database!");
				}
		}
	}

	WebSQLHelper.prototype.execute = function(sql, values, callback) {
		console.log(TAG, "execute", sql);

		values = values || [];
		console.log(TAG, "execute", values);

		callback = callback || undefined;
		
		db.transaction(function(tx) {

			tx.executeSql(sql, values, function(tx, results) {
				if (callback) {
					callback(results);
				}
			},
			WebSQLHelper.onError);
		},
		WebSQLHelper.onError,
		WebSQLHelper.onReady);
	}
	
	WebSQLHelper.prototype.query = function(sql, values, callback) {
		console.log(TAG, "query", sql);

		values = values || [];
		console.log(TAG, "query", values);

		callback = callback || undefined;
		
		db.readTransaction(function(tx) {
			tx.executeSql(sql, values, function(tx, results) {
				if (callback) {
					console.log(TAG, "query", values, "count", results.rows.length);
					callback(results);
				}
			},
			WebSQLHelper.onError);
		},
		WebSQLHelper.onError,
		WebSQLHelper.onReady);
	}

	return WebSQLHelper;
	
}(jQuery));