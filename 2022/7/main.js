const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")

directories = {}
currentPath = []

totalSizeOfSmallDirs = 0;
usedSpace = 0

for (var i = 0; i < d.length-1; i++) {
  d[i] = d[i].split(" ")
  if (d[i][0] == "$") {
    if (d[i][1] == "cd") {
      if (d[i][2] == "/") {
        currentPath = []
      } else if (d[i][2] == "..") {
        currentPath.pop()
      } else {
        currentPath.push(d[i][2])
      }
    }
  } else if (d[i][0] != "dir") {
    size = Number(d[i][0])
    usedSpace += size
    for (var j = 0; j < currentPath.length; j++) {
      if (directories[currentPath.slice(0,j+1)] == undefined) {
        directories[currentPath.slice(0,j+1)] = size
      } else {
        directories[currentPath.slice(0,j+1)] += size
      }
    }
  }
}

neededSpace = 30000000 - (70000000 - usedSpace)
bestDirSpace = Infinity

for (var i = 0; i < Object.values(directories).length; i++) {
  size = Object.values(directories)[i]
  if (size > neededSpace && size < bestDirSpace) {
    bestDirSpace = size
  }
  if (size < 100000) {
    totalSizeOfSmallDirs += size
  }
}

console.log("part 1: "+totalSizeOfSmallDirs)
console.log("part 2: "+bestDirSpace)
