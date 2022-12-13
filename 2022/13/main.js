const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n\r\n")

t = 0;

for (var i = 0; i < d.length; i++) {
  d[i] = d[i].split("\r\n")

  first = JSON.parse(d[i][0])
  second = JSON.parse(d[i][1])

  if (compare(first, second) == 0) {
    console.log(i+1)
    t += i+1
  }
}

function compare(first, second) { // 0 = right order, 1 = wrong order, 2 = undetermined
  for (var i = 0; i < first.length; i++) {
    if (second[i] == undefined) {
      return 1
    }
    if (Array.isArray(first[i]) || Array.isArray(second[i])) {
      if (!Array.isArray(second[i])) {
        second[i] = [second[i]]
      }
      if (!Array.isArray(first[i])) {
        first[i] = [first[i]]
      }
      returnValue = compare(first[i], second[i])
      if (returnValue != 2) {
        return returnValue
      }
    } else {
      if (second[i] > first[i]) {
        return 0;
      } else if (second[i] < first[i]) {
        return 1;
      }
    }
  }
  if (first.length == second.length) {
    return 2
  } else {
    return 0
  }
}

console.log(t)
