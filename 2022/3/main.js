const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")

t = 0;

function findMatch(p1,p2) {
  for (var j = 0; j < p1.length; j++) {
    for (var k = 0; k < p2.length; k++) {
      if (p1.charAt(j) == p2.charAt(k)) {
        return p1.charAt(j)
      }
    }
  }
}

for (var i = 0; i < d.length; i++) {
  p1 = d[i].substring(0, Math.floor(d[i].length/2))
  p2 = d[i].substring(Math.floor(d[i].length/2))

  m = findMatch(p1,p2)

  if (m != undefined) {
    c = m.charCodeAt(0)
    if (c > 96) {
      t += c-96
    } else {
      t += c-38
    }
  }
}

console.log(t)
