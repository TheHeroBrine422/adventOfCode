const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")

o = fs.readFileSync('orders.txt', 'utf8')
o = o.split("\r\n")

stacks = []
numStacks = 9

char = 1;
for (var i = 0; i < numStacks; i++) {
  stacks[i] = []
  for (var j = 0; j < 8; j++) {
    crate = d[j].charAt(char)
    if (crate != " ") {
      stacks[i].push(crate)
    }
  }
  char += 4
}

for (var i = 0; i < o.length-1; i++) {
  o[i] = o[i].split(" ")
  num = Number(o[i][1])
  start = Number(o[i][3])
  end = Number(o[i][5])
  crate = stacks[start-1].splice(0, num)
  stacks[end-1].splice(0, 0, ...crate)
}

endingCrates = "";
for (var i = 0; i < stacks.length; i++) {
  endingCrates += stacks[i][0]
}

console.log(endingCrates)
