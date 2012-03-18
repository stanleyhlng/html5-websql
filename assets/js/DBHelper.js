var DBHelper = (function($) {

	var TAG = "DBHelper";
	
	function DBHelper() 
	{
		console.log(TAG, "dbHelper");
		this.init();
	}

	DBHelper.prototype.init = function() {
		console.log(TAG, "init");
	}

	DBHelper.prototype.tables = function() {
	}

	return DBHelper;
}(jQuery));