(function() {

	$(document).ready(function() {

		var webSQLHelper;
		
		$.getScript("assets/js/websqlHelper.js", function(data, textStatus, jqxhr) {
			console.log("site.js", "loaded: assets/js/websqlHelper.js");
			
			if (!webSQLHelper) {
				webSQLHelper = new WebSQLHelper();
			}
			
			});

	});

}());