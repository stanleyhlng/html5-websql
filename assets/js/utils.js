/* sugar methods */

Function.prototype.method = function(name, func) {
	this.prototype[name] = func;
	return this;
};


Function.method('inherits', function(parent) {
	var d = {};
	var p = (this.prototype = new parent());
	this.method('uber', function uber(name) {
		if (!(name in d)) {
			d[name] = 0;
		}
		var f;
		var r;
		var t = d[name];
		var v = parent.prototype;
		if (t) {
			while (t) {
				v = v.constructor.prototype;
				t -= 1;
			}
			f = v[name];
		} else {
			f = p[name];
			if (f == this[name]) {
				f = v[name];
			}
		}
		d[name] += 1;
		r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
		d[name] -= 1;
		return r;
	});
	return this;
});


Function.method('swiss', function(parent) {
	for (var i = 1; i < arguments.length; i += 1) {
		var name = arguments[i];
		this.prototype[name] = parent.prototype[name];
	}
	return this;
});