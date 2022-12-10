const fs = require('fs')

data = fs.readFileSync('data.txt', 'utf8')
data = data.split("\r\n")

total = 0;

for (var i = 0; i < data.length; i++) {
  if (data[i].charAt(2) == "X") {
    total += 0
    if (data[i].charAt(0) == "B") {
      total += 1
    } else if (data[i].charAt(0) == "C") {
      total += 2
    } else if (data[i].charAt(0) == "A") {
      total += 3
    }
  } else  if (data[i].charAt(2) == "Y") {
    total += 3
    if (data[i].charAt(0) == "A") {
      total += 1
    } else if (data[i].charAt(0) == "B") {
      total += 2
    } else if (data[i].charAt(0) == "C") {
      total += 3
    }
  } else  if (data[i].charAt(2) == "Z") {
    total += 6
    if (data[i].charAt(0) == "C") {
      total += 1
    } else if (data[i].charAt(0) == "A") {
      total += 2
    } else if (data[i].charAt(0) == "B") {
      total += 3
    }
  }
}

console.log(total)
