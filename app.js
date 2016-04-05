const babel = require('babel-core');
const moriscript = require('./moriscript');

var input = document.getElementById('input');
var output = document.getElementById('output');

var inputEditor = CodeMirror.fromTextArea(input, {
  mode: 'javascript'
});
var outputEditor = CodeMirror.fromTextArea(output, {
  mode: 'javascript'
});

function compile() {
  var src = inputEditor.getValue();
  const out = babel.transform(src, {
    plugins: [moriscript]
  });
  outputEditor.setValue(out.code);
}

input.addEventListener('keyup', compile);
compile();