const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")

d.pop()

t = 0;

graph = {}

function setsAreEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }

  return Array.from(a).every(element => {
    return b.has(element);
  });
}

for (var i = 0; i < d.length; i++) {
  d[i] = d[i].split(" ")
  graph[d[i][1]] = {flowRate: Number(d[i][4].split("=")[1].split(";")[0]), children: d[i].splice(9)}

  for (var j = 0; j < graph[d[i][1]].children.length-1; j++) {
    graph[d[i][1]].children[j] = graph[d[i][1]].children[j].split(",")[0]
  }
}

pointsWithFlowRate = new Set()

for (var i = 0; i < Object.keys(graph).length; i++) {
  if (graph[Object.keys(graph)[i]].flowRate > 0) {
    pointsWithFlowRate.add(Object.keys(graph)[i])
  }
}

paths = [{currentLocation: "AA", openValves: new Set(), pressureReleased: 0}]
newPaths = []
minutes = 0
while (minutes < 30) {
  for (var i = 0; i < paths.length; i++) {
    currentLocation = structuredClone(paths[i].currentLocation)
    openValves = structuredClone(paths[i].openValves)
    pressureReleased = structuredClone(paths[i].pressureReleased)

    for (const valve of openValves.entries()) {
      pressureReleased += graph[valve[0]].flowRate
    }
    if (setsAreEqual(pointsWithFlowRate, openValves)) {
      newPaths.push({currentLocation: currentLocation, openValves: openValves, pressureReleased: pressureReleased})
      break
    } else {
      for (var j = 0; j < graph[currentLocation].children.length; j++) {
        newPaths.push({currentLocation: graph[currentLocation].children[j], openValves: openValves, pressureReleased: pressureReleased})
      }
      if (!openValves.has(currentLocation) && graph[currentLocation].flowRate != 0) {
        addedValve = structuredClone(paths[i].openValves)
        addedValve.add(currentLocation)
        newPaths.push({currentLocation: currentLocation, openValves: addedValve, pressureReleased: pressureReleased})
      }
    }
  }
  newPaths.sort((a,b) => b.pressureReleased-a.pressureReleased)
  paths = newPaths.slice(0,100000)
  newPaths = []
  console.log(paths[0])
  minutes++
}
