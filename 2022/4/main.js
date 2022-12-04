const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")

t1 = 0;
t2 = 0;

for (var i = 0; i < d.length-1; i++) {
  d[i] = d[i].split(",")
  d[i][0] = d[i][0].split("-")
  d[i][1] = d[i][1].split("-")

  d[i][0][0] = Number(d[i][0][0])
  d[i][0][1] = Number(d[i][0][1])
  d[i][1][0] = Number(d[i][1][0])
  d[i][1][1] = Number(d[i][1][1])

  if ((d[i][0][0] <= d[i][1][0] && d[i][0][1] >= d[i][1][1]) || (d[i][0][0] >= d[i][1][0] && d[i][0][1] <= d[i][1][1])) {
    t1++
  }

  if ((d[i][0][1] >= d[i][1][0] && d[i][0][1] <= d[i][1][1]) || (d[i][0][0] >= d[i][1][0] && d[i][0][0] <= d[i][1][1]) || (d[i][1][0] >= d[i][0][0] && d[i][1][0] <= d[i][0][1]) || (d[i][1][1] >= d[i][0][0] && d[i][1][1] <= d[i][0][1])) {
    t2++
  }
}

console.log(t1)
console.log(t2)
