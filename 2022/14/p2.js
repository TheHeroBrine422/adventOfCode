const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")

d.pop()

t = 0;

grid = []

for (var i = 0; i < 200; i++) {
  grid[i] = []
  for (var j = 0; j < 1000; j++) {
    grid[i][j] = "."
  }
}

lowestY = 0

grid[0][500] = "+"

for (var i = 0; i < d.length; i++) {
  d[i] = d[i].split(" -> ")
  for (var j = 0; j < d[i].length; j++) {
    d[i][j] = d[i][j].split(",")
    d[i][j][0] = Number(d[i][j][0])
    d[i][j][1] = Number(d[i][j][1])
    if (d[i][j][1] > lowestY) {
      lowestY = d[i][j][1]
    }
  }
}

for (var i = 0; i < d.length; i++) {
  console.log(d[i])
  for (var j = 0; j < d[i].length-1; j++) {
    if (d[i][j][0] == d[i][j+1][0]) { // x is not changing
      min = Math.min(d[i][j][1], d[i][j+1][1])
      max = Math.max(d[i][j][1], d[i][j+1][1])+1
      for (var k = min; k < max; k++) {
        console.log(k+", "+d[i][j][0])
        grid[k][d[i][j][0]] = "#"
      }
    } else { // y is not changing
      min = Math.min(d[i][j][0], d[i][j+1][0])
      max = Math.max(d[i][j][0], d[i][j+1][0])+1
      for (var k = min; k < max; k++) {
        console.log(d[i][j][1]+", "+k)
        grid[d[i][j][1]][k] = "#"
      }
    }
    console.log("new segment")
  }
  console.log("new set")
}

for (var i = 0; i < grid[lowestY+2].length; i++) {
  grid[lowestY+2][i] = "#"
}

sandPos = [500,0]

while(grid[0][500] == "+") {
  if (grid[sandPos[1]+1][sandPos[0]] == ".") {
    sandPos[1]++;
  } else if (grid[sandPos[1]+1][sandPos[0]-1] == ".") {
    sandPos[1]++
    sandPos[0]--
  } else if (grid[sandPos[1]+1][sandPos[0]+1] == ".") {
    sandPos[1]++
    sandPos[0]++
  } else {
    t++
    grid[sandPos[1]][sandPos[0]] = "o"
    sandPos = [500,0]
  }
}

display()
console.log(t)

function display() {
  for (var i = 0; i < lowestY+10; i++) {
    string = ""
    for (var j = 350; j < 650; j++) {
      string += grid[i][j]
    }
    console.log(string)
  }
}
