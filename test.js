const babel = require('babel-core');
const moriscript = require('./moriscript');
const fs = require('fs');

fs.readFile('./example/app.js', (err, data) => {
  if(err) throw err;
  const src = data.toString();

  const out = babel.transform(src, {
    plugins: [moriscript]
  });

  console.log(out.code);
});

