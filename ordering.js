(function() {

	"use strict";

	var ordering = function(a, b) {
		if (a < b) {
			return -1;
		} else if (a > b) {
			return 1;
		}
		return 0;
	},

		getParent = function(parent) {
			if (typeof parent === 'function' && parent.onResultOf) {
				return parent;
			}
			return ordering;
		},

		chainable = function(fn) {
			fn.onResultOf = function(getter) {
				var parent = getParent(this);
				return chainable(function(a, b) {
					return parent(getter.call(a, a), getter.call(b, b));
				});
			};

			fn.reverse = function() {
				var parent = getParent(this);
				return chainable(function(a, b) {
					return -parent(a, b);
				});
			};

			fn.coumpound = function(otherOrdering) {
				var parent = getParent(this);
				return chainable(function(a, b) {
					var result = parent(a, b);
					return result ? result : otherOrdering(a, b);
				});
			};

			return fn;
		};


	// node style
	if (typeof exports !== 'undefined') {
		chainable(exports);
	}
	// requirejs style
	else if (typeof define !== 'undefined') {
		define(chainable({}));
	}
	// global scope style
	else {
		window.ordering = chainable({});
	}

})();