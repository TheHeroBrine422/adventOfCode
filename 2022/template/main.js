const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")

t = 0;

for (var i = 0; i < d.length-1; i++) {
  d[i] = d[i].split(",")
}

console.log(t)
console.log(t)
