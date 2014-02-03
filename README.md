[![Build Status](https://travis-ci.org/bbaliguet/ordering.png)](https://travis-ci.org/bbaliguet/ordering)
# Ordering.js
Guava inspired ordering utility. Provides an easy way to create javascript sorting function and compose them.

See https://code.google.com/p/guava-libraries/wiki/OrderingExplained.

## Syntax
```Javascript
require('ordering');
[
	{value: 2},
	{value: 1},
	{value: 5}
].sort(ordering.onResultOf(function() {
	return this.value;
}).reverse()); // [{value:5}, {value:2}, {value:1}]
```
### ordering.from(compareFn)
Return a chainable sorting function from an existing sorting function. If no argument is provided, return a default sorting function based on the < operator. Main purpose of this method is to transform a classic sorting function into a sorting function which can be chained with other orderings.
```Javascript
[3, 1, 4, 2].sort(ordering.from(function(a, b) {
	if (a < b) {
		return -1;
	} else if (a > b) {
		return 1;
	}
	return 0;
}).reverse()); // [4, 3. 2, 1]
```
### chainable.onResultOf(fn)
Return a chainable sorting function using previously provided sorting function, or ordering.from() if none provided, applying the function fn to each element before comparing them.
```Javascript
[
	{value: 2},
	{value: 1},
	{value: 5}
].sort(ordering.onResultOf(function() {
	return this.value;
}); // [{value:1}, {value:2}, {value:5}]
```
### chainable.onPath(path)
Same a chainable.onResultOf, but using a string path in the element to retrieved the compare value.
```Javascript
[
	{value: 2},
	{value: 1},
	{value: 5}
].sort(ordering.onPath('.value'); // [{value:1}, {value:2}, {value:5}]
```
#### Alternative syntaxes
```Javascript
// first . can be omitted
ordering.onPath('value'); 
// the path as an array can be provided if the . notation cannot be used
ordering.onPath(['value', 'something with a .']); 
```
### chainable.reverse()
Return a chainable sorting function using previously provided sorting function, or ordering.from(), but with reverse ordering.
```Javascript
[3,1,5].sort(ordering.reverse()); // [5,3,1]
```
### chainable.compound(ordering)
Return a chainable sorting function using previously provided sorting function, or ordering.from(), and using the ordering function to order elements considered as equals by previous ordering function.
```JavaScript
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
};
[v22, v13, v12, v21, v11].sort(
	ordering.onPath(".value").compound(
		ordering.onPath(".otherValue")
	)
); // [v11, v12, v13, v21, v22]
```
### Usage
* as a requirejs module
* as a nodejs module
* directly on global scope

## Release History
26/01/2014: v1.0.0

## License
Copyright (c) 2014 Benoît Baliguet  
Licensed under the MIT license.
