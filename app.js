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
  };

  var fileName = 'form.html';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error('err', err);
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/replace', (req, res) => {
  console.log('query', req.query);

  fs.readFile('Template_EE-SS_modified.html', 'utf8', function (err,data) {
  // fs.readFile('input.html', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    var regex = /#000000/gi;

    var result = data.replace('schoollink', req.query.schoollink);
    // result = result.replace(/asdf/g, req.query.text);
    result = result.replace('schoolname', req.query.schoolname);
    result = result.replace('School Name', req.query.schoolnamehead);
    result = result.replace('111111', req.query.UTM);
    result = result.replace('222222', req.query.SMI);
    result = result.replace('[Nickname]', req.query.nickname);
    result = result.replace('**Day**', req.query.day);
    result = result.replace('**Month**', req.query.month);
    result = result.replace('**#**', req.query.number);
    result = result.replace('**00**', req.query.starthour);
    result = result.replace('**a.m.**', req.query.am);
    result = result.replace('**00**', req.query.endhour);
    result = result.replace('**p.m.**', req.query.pm);
    result = result.replace('**Location**', req.query.location);
    result = result.replace(regex, req.query.buttoncolor);

    fs.writeFileSync('output.html', result);
    res.download('output.html');
  });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
