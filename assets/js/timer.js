var Timer = (function($){

	var TAG = "timer-js";
	var _start = 0;
	var _end = 0;
	var _isRunning = false;
	
	function Timer() {
		console.log(TAG, "timer");
	}

	Timer.method('start', function() {
		this._start = this.now();
		this._isRunning = true;
	});

	Timer.method('stop', function() {
		this._end = this.now();
		this._isRunning = false;
	});
	
	Timer.method('elapsed', function() {
		if (this._isRunning) {
			return (this.now() - this._start) / 1000;
		} else {
			return (this._end - this._start) / 1000;
		}
	});

	Timer.method('now', function() {
		return new Date();
	});

	return Timer;
	
}(jQuery));