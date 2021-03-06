/*! see https://github.com/bbaliguet/ordering */
(function(scope) {

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
			if (typeof parent === 'function') {
				return parent;
			}
			return ordering;
		},

		pathGetter = function(path) {
			var parts = path.split ? path.split(".") : path;
			// case start with .
			if (parts[0] === "") {
				parts.shift();
			}
			var nbParts = parts.length;
			return function(element) {
				var i = 0;
				while (i < nbParts) {
					element = element[parts[i++]];
				}
				return element;
			};
		},

		chainable = function(fn) {

			if (!fn) {
				fn = ordering;
			}

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

			fn.compound = function(otherOrdering) {
				var parent = getParent(this);
				return chainable(function(a, b) {
					var result = parent(a, b);
					return result ? result : otherOrdering(a, b);
				});
			};

			fn.onPath = function(path) {
				return fn.onResultOf.call(this, pathGetter(path));
			};

			return fn;
		};

	if (typeof define === 'function') {
		// requirejs style
		var api = chainable({
			from : chainable
		});
		define(api);
	} else {
		// node /  global scope
		chainable(scope);
		scope.from = chainable;
	}

})(typeof exports !== 'undefined' ? exports : (this.ordering = {}, this.ordering));