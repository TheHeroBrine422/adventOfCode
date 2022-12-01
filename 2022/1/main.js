const fs = require('fs')

data = fs.readFileSync('data.txt', 'utf8')
data = data.split("\r\n\r\n")

for (var i = 0; i < data.length; i++) {
  data[i] = data[i].split("\r\n")
  sum = 0;
  for (var j = 0; j < data[i].length; j++) {
    sum += Number(data[i][j])
  }
  data[i] = sum
}

data.sort((a,b) => {return b-a});

console.log("highest: "+data[0])
console.log("top 3: "+(data[0]+data[1]+data[2]))
