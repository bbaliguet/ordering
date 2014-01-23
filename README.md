[![Build Status](https://travis-ci.org/bbaliguet/ordering.png)](https://travis-ci.org/bbaliguet/ordering)
# Ordering.js
Guava inspired ordering utility.

See https://code.google.com/p/guava-libraries/wiki/OrderingExplained.

## Syntax
```Javascript
array.sort(ordering.onResultOf(myFn).reverse());
```
### .from(compareFn)
### .onResultOf(fn)
### .reverse()
### .compound(ordering)

### Usage
* as a requirejs module
* as a nodejs module
* directly on global scope
