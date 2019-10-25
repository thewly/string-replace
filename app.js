const express = require('express')
const app = express()
// const port = 80;
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const URL = process.env.NODE_ENV === 'production' ? 'https://balfour-email.herokuapp.com' : 'http://localhost:3001'

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

  fs.readFile('Template_EE-SS_modified.html', 'utf8', function (err,data) {
  // fs.readFile('input.html', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    var regex = /000000/gi;
    var SNregex = /schoolname/gi;
    var SLregex = /schoollink/gi;
    var UTMregex = /111111/gi;
    var SMIregex = /222222/gi;

    var result = data.replace(SLregex, req.query.schoollink);
    // result = result.replace(/asdf/g, req.query.text);
    result = result.replace(SNregex, req.query.schoolname);
    result = result.replace("It's time to order your Official [School] Ring!", req.query.schoolnamehead);
    result = result.replace(UTMregex, req.query.UTM);
    result = result.replace(SMIregex, req.query.SMI);
    result = result.replace('Be part of a timeless [Nickname] tradition. Order your personalized ring in time for graduation to show your pride and celebrate your success with fellow classmates.', req.query.nickname);
    result = result.replace('ONE DAY ONLY', req.query.days);
    result = result.replace('**Day**, **Month** **#**', req.query.day);
    // result = result.replace('**Month**', req.query.month);
    // result = result.replace('**#**', req.query.number);
    result = result.replace('**00**', req.query.starthour);
    result = result.replace('**a.m.**', req.query.am);
    result = result.replace('**00**', req.query.endhour);
    result = result.replace('**p.m.**', req.query.pm);
    result = result.replace('**Location**', req.query.location);
    result = result.replace(regex, req.query.buttoncolor);

    fs.writeFileSync('XXXX_EE-SS.html', result);
    res.download('XXXX_EE-SS.html');
  });

});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
