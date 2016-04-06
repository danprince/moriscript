import { transform } from 'babel-core';
import moriscript from 'moriscript';

const input = document.getElementById('input');
const output = document.getElementById('output');

const inputEditor = CodeMirror.fromTextArea(input, {
  mode: 'javascript',
  lineNumbers: true,
  autofocus: true
});

const outputEditor = CodeMirror.fromTextArea(output, {
  mode: 'javascript',
  lineNumbers: true
});

function compile() {
  const src = inputEditor.getValue();
  const out = transform(src, {
    plugins: [moriscript]
  });
  outputEditor.setValue(out.code);
}

inputEditor.on('change', compile);
compile();
