(function() {

	var TAG = "site-js";
	
	var testSingleton = function() {
		var crud1 = CRUD.getInstance();
		var crud2 = CRUD.getInstance();
		console.log(crud1 == crud2);
	}
	
	$(document).ready(function() {
		var crud;

		$.getScript("assets/js/CRUD.js", function(data, textStatus, jqxhr) {
			console.log(TAG, "loaded: assets/js/CRUD.js");

			if (!crud) {
				crud = CRUD.createInstance({});
			}

			// events
			$("#create-table").click(function(e) {
				e.preventDefault();
				console.log(TAG, "create-table");
				
				console.log($("#sql-create-table-searchindex").tmpl({}).html());
			});

			$("#drop-table").click(function(e) {
				e.preventDefault();
				console.log(TAG, "drop-table");
			});

			
			// tests
			testSingleton();

		});

	});

}());