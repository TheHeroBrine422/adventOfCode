const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")

d.pop()

t = 0;

data = []

for (var i = 0; i < d.length; i++) {
  d[i] = d[i].split(" ")
  data.push({
    sensor:[
      Number(d[i][2].split("=")[1].split(",")[0]),
      Number(d[i][3].split("=")[1].split(":")[0])
    ],
    beacon: [
      Number(d[i][8].split("=")[1].split(",")[0]),
      Number(d[i][9].split("=")[1])
    ]
  })
}

yValue = 2000000

seenPositions = new Set()
for (var i = 0; i < data.length; i++) {
  distance = Math.abs(data[i].sensor[1]-data[i].beacon[1])+Math.abs(data[i].sensor[0]-data[i].beacon[0])
  j = yValue
  for (var k = data[i].sensor[0]-(distance-Math.abs(j-data[i].sensor[1])); k < data[i].sensor[0]+(distance-Math.abs(j-data[i].sensor[1]))+1; k++) {
    seenPositions.add(k)
  }
}

for (var i = 0; i < data.length; i++) {
  if (data[i].sensor[1] == yValue) {
    seenPositions.delete(data[i].sensor[0])
  }
  if (data[i].beacon[1] == yValue) {
    seenPositions.delete(data[i].beacon[0])
  }
}

console.log(seenPositions.size)
