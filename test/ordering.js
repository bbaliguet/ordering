var ordering = require('../ordering.js');

exports.test = {
	'reverse': function(test) {
		var list = [2, 3, 0].sort(ordering.reverse());
		test.deepEqual(list, [3, 2, 0]);
		test.done();
	},
	'double reverse': function(test) {
		var list = [2, 3, 0].sort(ordering.reverse().reverse());
		test.deepEqual(list, [0, 2, 3]);
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
		test.deepEqual(list, [v1, v3, v5]);
		// other syntax
		list = [v3, v5, v1].sort(ordering.onResultOf(function() {
			return this.value;
		}));
		test.deepEqual(list, [v1, v3, v5]);
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
		test.deepEqual(list, [v1, v3, v5]);
		
		// alternative syntax
		list = [v3, v5, v1].sort(ordering.onPath('value'));
		test.deepEqual(list, [v1, v3, v5]);
		
		// alternative syntax
		list = [v3, v5, v1].sort(ordering.onPath(['value']));
		test.deepEqual(list, [v1, v3, v5]);

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
		test.deepEqual(list, [v5, v3, v1]);
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

		test.deepEqual(list, [v13, v12, v11, v22, v21]);
		test.done();
	},
	'from': function(test) {
		var list = ["qwe", "aaaaa", null].sort(ordering.from(function(a, b) {
			return (a ? a.length : 0) - (b ? b.length : 0);
		}).reverse());
		test.deepEqual(list, ["aaaaa", "qwe", null]);
		test.done();
	}
};