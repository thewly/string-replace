const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const path = require('path');

app.get('/', (req, res) => {
  var options = {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = 'form.html';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
});

app.get('/replace', (req, res) => {
  console.log('query', req.query);

  // fs.readFile('2786_EE-SS.html', 'utf8', function (err,data) {
  fs.readFile('input.html', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/!@#\$/g, req.query.garbage);
    var result = result.replace(/asdf/g, req.query.text);
    var result = result.replace(/         /g, req.query.whitespace);

    fs.writeFileSync('output.html', result);
    res.download('output.html');
  });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))