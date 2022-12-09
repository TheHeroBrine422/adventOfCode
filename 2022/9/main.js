const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")

t = 0;
knotPositions = []

part = 2

knots = part == 2 ? 10 : 2

for (var i = 0; i < knots; i++) {
  knotPositions.push([0,0])
}

seenPositions = new Set()

for (var i = 0; i < d.length-1; i++) {
  d[i] = d[i].split(" ")
  for (var j = 0; j < Number(d[i][1]); j++) {
    if (d[i][0] == "R") {
      knotPositions[0][0]++
    } else if (d[i][0] == "L") {
      knotPositions[0][0]--
    } else if (d[i][0] == "D") {
      knotPositions[0][1]--
    } else if (d[i][0] == "U") {
      knotPositions[0][1]++
    }

    for (var k = 1; k < knotPositions.length; k++) {
      if ((knotPositions[k-1][0]-knotPositions[k][0] > 1 && knotPositions[k-1][1]-knotPositions[k][1] > 0) || (knotPositions[k-1][0]-knotPositions[k][0] > 0 && knotPositions[k-1][1]-knotPositions[k][1] > 1)) {
        knotPositions[k][0]++
        knotPositions[k][1]++
      } else if ((knotPositions[k-1][0]-knotPositions[k][0] < -1 && knotPositions[k-1][1]-knotPositions[k][1] > 0) || (knotPositions[k-1][0]-knotPositions[k][0] < 0 && knotPositions[k-1][1]-knotPositions[k][1] > 1)) {
        knotPositions[k][0]--
        knotPositions[k][1]++
      } else if ((knotPositions[k-1][0]-knotPositions[k][0] > 1 && knotPositions[k-1][1]-knotPositions[k][1] < 0) || (knotPositions[k-1][0]-knotPositions[k][0] > 0 && knotPositions[k-1][1]-knotPositions[k][1] < -1)) {
        knotPositions[k][0]++
        knotPositions[k][1]--
      } else if ((knotPositions[k-1][0]-knotPositions[k][0] < -1 && knotPositions[k-1][1]-knotPositions[k][1] < 0) || (knotPositions[k-1][0]-knotPositions[k][0] < 0 && knotPositions[k-1][1]-knotPositions[k][1] < -1)) {
        knotPositions[k][0]--
        knotPositions[k][1]--
      } else if (knotPositions[k-1][0]-knotPositions[k][0] > 1) {
        knotPositions[k][0]++
      } else if (knotPositions[k-1][0]-knotPositions[k][0] < -1) {
        knotPositions[k][0]--
      } else if (knotPositions[k-1][1]-knotPositions[k][1] > 1) {
        knotPositions[k][1]++
      } else if (knotPositions[k-1][1]-knotPositions[k][1] < -1) {
        knotPositions[k][1]--
      }
    }
    seenPositions.add(JSON.stringify(knotPositions[knotPositions.length-1]))
  }
}

console.log(seenPositions.size)
