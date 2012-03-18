(function() {

	var TAG = "site-js";

	$(document).ready(function() {
		var crud;

		$.getScript("assets/js/CRUD.js", function(data, textStatus, jqxhr) {
			console.log(TAG, "loaded: assets/js/CRUD.js");

			if (!crud) {
				crud = CRUD.createInstance({});
			}

			// tests
			$("#create-table").click(function(e) {
				e.preventDefault();
				console.log(TAG, "create-table");
				
				var sql = $("#sql-searchindex-create-table").tmpl({}).html();
				crud.getDB().execute(sql, function(results) {
					console.log(TAG, results);
				});
			});

			$("#drop-table").click(function(e) {
				e.preventDefault();
				console.log(TAG, "drop-table");

				var sql = $("#sql-searchindex-drop-table").tmpl({}).html();
				crud.getDB().execute(sql, function(results) {
					console.log(TAG, results);
				});
			});

			$("#insert-record").click(function(e) {
				e.preventDefault();
				console.log(TAG, "insert-record");

				var sql = $("#sql-searchindex-insert-record").tmpl({}).html();
				crud.getDB().execute(sql, function(results) {
					console.log(TAG, results);
				});
			});

			$("#select-record").click(function(e) {
				e.preventDefault();
				console.log(TAG, "select-record");

				var sql = $("#sql-searchindex-select-record").tmpl({}).html();
				crud.getDB().query(sql, function(results) {
					for (var i=0; i<results.rows.length; i++) {
						console.log(TAG, results.rows.item(i));
					}
				});
			});

			$("#update-record").click(function(e) {
				e.preventDefault();
				console.log(TAG, "update-record");

				var sql = $("#sql-searchindex-update-record").tmpl({}).html();
				crud.getDB().execute(sql, function(results) {
					console.log(TAG, results);
				});
			});

			$("#delete-record").click(function(e) {
				e.preventDefault();
				console.log(TAG, "delete-record");

				var sql = $("#sql-searchindex-delete-record").tmpl({}).html();
				crud.getDB().execute(sql, function(results) {
					console.log(TAG, results);
				});
			});

			$("#search-record").click(function(e) {
				e.preventDefault();
				console.log(TAG, "search-record");

				var sql = $("#sql-searchindex-search-record").tmpl({}).html();
				crud.getDB().query(sql, function(results) {
					for (var i=0; i<results.rows.length; i++) {
						console.log(TAG, results.rows.item(i));
					}
				});
			});

			// tests
			runTestes();

		});

	});

	var runTestes = function() {
		testSingleton();
	}

	
	var testSingleton = function() {
		var crud1 = CRUD.getInstance();
		var crud2 = CRUD.getInstance();
		console.log(TAG, "testSingleton", crud1 == crud2);
	}
	
}());