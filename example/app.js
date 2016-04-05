var mori = require('mori');

var foo = { bar: 1, baz: 2 };
var qux = foo.bar = 2;
var zuq = foo.bar;

var zig = [1, 2, 3];
var zag = zig[0] = 3;
var zog = zig[1];

console.log(foo, qux);
