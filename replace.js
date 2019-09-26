const strs = {
  schoolnamehead: 'Order your Official School Name Ring now to ensure ceremony delivery!',
  nickname: 'Be part of a timeless [Nickname] tradition. Order your personalized ring in time for graduation to show your pride and celebrate your success with fellow classmates.',
  days: 'ONE DAY ONLY',
  day: '**Day**, **Month** **#**',
  // month: '**Month**',
  // number: '**#**',
  starthour: '**00**',
  am: '**a.m.**',
  endhour: '**00**',
  pm: '**p.m.**',
  location: '**Location**',
};

exports.replace_strings = (input, query) => {
  const BCregex = /000000/gi;
  const SNregex = /schoolname/gi;
  const SLregex = /schoollink/gi;
  const UTMregex = /111111/gi;
  const SMIregex = /222222/gi;

  // Regex replaces
  let output = input.replace(BCregex, query.buttoncolor);
  output = output.replace(SNregex, query.schoolname);
  output = output.replace(SLregex, query.schoollink);
  output = output.replace(UTMregex, query.UTM);
  output = output.replace(SMIregex, query.SMI);

  // String replaces
  output = output.replace(strs.schoolnamehead, query.schoolnamehead);
  output = output.replace(strs.nickname, query.nickname);
  output = output.replace(strs.days, query.days);
  output = output.replace(strs.day, query.day);
  // result = result.replace(moo.month, query.month);
  // result = result.replace(moo.number, query.number);
  output = output.replace(strs.starthour, query.starthour);
  output = output.replace(strs.am, query.am);
  output = output.replace(strs.endhour, query.endhour);
  output = output.replace(strs.pm, query.pm);
  output = output.replace(strs.location, query.location);

  return output;
};
