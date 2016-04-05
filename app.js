var babel = require('babel-core');
var moriscript = require('./moriscript');

var input = document.getElementById('input');
var output = document.getElementById('output');

var inputEditor = CodeMirror.fromTextArea(input, {
  mode: 'javascript',
  lineNumbers: true,
  autofocus: true
});
var outputEditor = CodeMirror.fromTextArea(output, {
  mode: 'javascript',
  lineNumbers: true
});

function compile() {
  var src = inputEditor.getValue();
  var out = babel.transform(src, {
    plugins: [moriscript]
  });
  outputEditor.setValue(out.code);
}

inputEditor.on('change', compile);
compile();
