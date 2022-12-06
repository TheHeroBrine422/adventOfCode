const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')

t = 0;

lastFourChars = []

for (var i = 0; i < d.length-1; i++) {
  char = d.charAt(i)

  if (lastFourChars.length == 14) {
    lastFourChars.splice(0,1)
  }

  lastFourChars.push(char)

  if (lastFourChars.length == 14) {
    checkObj = {}
    fail = false;
    for (var j = 0; j < lastFourChars.length; j++) {
      if (checkObj[lastFourChars[j]] == undefined) {
        checkObj[lastFourChars[j]] = false;
      } else {
        fail = true;
      }
    }

    if (!fail) {
      console.log(i+1)
      console.log(lastFourChars)
      break
    }
  }
}
