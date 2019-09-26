const fs = require('fs');
const replace = require('../replace.js');

const query = {
  buttoncolor: 'buttoncolor',
  schoolname: '_schoolname_',
  schoollink: '_schoollink_',
  UTM: 'UTM',
  SMI: 'SMI',
  schoolnamehead: 'schoolnamehead',
  nickname: 'nickname',
  days: 'days',
  day: 'day',
  // month: 'month',
  // number: 'number',
  starthour: 'starthour',
  am: 'am',
  endhour: 'endhour',
  pm: 'pm',
  location: 'location',
};

const input = fs.readFileSync('./input', 'utf8');
// console.log('input', input);
const result = replace.replace_strings(input, query);
// console.log('result', result);
const output = fs.readFileSync('./output', 'utf8');
// console.log('output', output);

if (result === output) {
  console.log('tests passed');
} else {
  console.error('tests failed');
}
