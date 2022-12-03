const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")

t = 0;

function findMatch(p1,p2,p3) {
  for (var j = 0; j < p1.length; j++) {
    for (var k = 0; k < p2.length; k++) {
      for (var i = 0; i < p3.length; i++) {
      if (p1.charAt(j) == p2.charAt(k) && p1.charAt(j) == p3.charAt(i)) {
        return p1.charAt(j)
      }
    }
  }
}
}

for (var i = 0; i < d.length; i+=3) {
  p1 = d[i]
  p2 = d[i+1]
  p3 = d[i+2]

  m = findMatch(p1,p2, p3)

  if (m != undefined) {
    c = m.charCodeAt(0)
    if (c > 96) {
      t += c-96
      console.log(m+" "+(c-96))
    } else {
      t += c-38
      console.log(m+" "+(c-38))
    }

  }
}

console.log(t)
