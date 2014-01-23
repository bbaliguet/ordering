var ordering = require('../ordering.js');

var listEqual = function(l1, l2, test) {
	test.equal(l1.length, l2.length);
	l1.forEach(function(element, index) {
		test.equal(element, l2[index]);
	});
}

exports['test'] = {
	'reverse': function(test) {
		var list = [2, 3, 0].sort(ordering.reverse());
		listEqual(list, [3, 2, 0], test);
		test.done();
	},
	'double reverse': function(test) {
		var list = [2, 3, 0].sort(ordering.reverse().reverse());
		listEqual(list, [0, 2, 3], test);
		test.done();
	},
	'on result of': function(test) {
		var v1 = {
			value: 1
		}, v3 = {
				value: 3
			}, v5 = {
				value: 5
			},
			list = [v3, v5, v1].sort(ordering.onResultOf(function(item) {
				return item.value;
			}));
		listEqual(list, [v1, v3, v5], test);
		// other syntax
		list = [v3, v5, v1].sort(ordering.onResultOf(function() {
			return this.value;
		}));
		listEqual(list, [v1, v3, v5], test);
		test.done();
	},
	'on path':  function(test) {
		var v1 = {
			value: 1
		}, v3 = {
				value: 3
			}, v5 = {
				value: 5
			},
			list = [v3, v5, v1].sort(ordering.onPath('.value'));
		listEqual(list, [v1, v3, v5], test);
		test.done();
	},
	'reverse then on result of': function(test) {
		var v1 = {
			value: 1
		}, v3 = {
				value: 3
			}, v5 = {
				value: 5
			},
			list = [v3, v5, v1].sort(ordering.reverse().onResultOf(function() {
				return this.value;
			}));
		listEqual(list, [v5, v3, v1], test);
		test.done();
	},
	'all': function(test) {
		var v11 = {
			value: 1,
			otherValue: 1
		}, v12 = {
				value: 1,
				otherValue: 2
			}, v21 = {
				value: 2,
				otherValue: 1
			}, v13 = {
				value: 1,
				otherValue: 3
			}, v22 = {
				value: 2,
				otherValue: 2
			},
			list = [v22, v13, v12, v21, v11].sort(ordering.onResultOf(function(item) {
				return item.value;
			}).compound(ordering.onResultOf(function() {
				return this.otherValue;
			}).reverse()));

		listEqual(list, [v13, v12, v11, v22, v21], test);
		test.done();
	},
	'from': function(test) {
		var list = ["qwe", "aaaaa", null].sort(ordering.from(function(a, b) {
			return (a ? a.length : 0) - (b ? b.length : 0);
		}).reverse());
		listEqual(list, ["aaaaa", "qwe", null], test);
		test.done();
	}
};