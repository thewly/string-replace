const express = require('express')
const app = express()
// const port = 80;
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const URL = process.env.NODE_ENV === 'production' ? 'https://balfour-email.herokuapp.com' : 'http://localhost:3001'

const replace = require('./replace.js');

// const db = require('./models')

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


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

  const input = fs.readFileSync('Template_EE-SS_modified.html', 'utf8');
  const output = replace.replace_strings(input, req.query);
  fs.writeFileSync('XXXX_EE-SS.html', output);
  res.download('XXXX_EE-SS.html');

});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
