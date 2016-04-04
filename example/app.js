var mori = require('mori');

var foo = { bar: 1, baz: 2 };
var qux = foo.bar = 2;

console.log(foo, qux);
