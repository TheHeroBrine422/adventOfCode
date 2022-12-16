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

paths = [{currentLocation: "AA", elephantLocation: "AA", openValves: new Set(), pressureReleased: 0}]
newPaths = []
minutes = 0
while (minutes < 26) {
  for (var i = 0; i < paths.length; i++) {
    currentLocation = structuredClone(paths[i].currentLocation)
    elephantLocation = structuredClone(paths[i].elephantLocation)
    openValves = structuredClone(paths[i].openValves)
    pressureReleased = structuredClone(paths[i].pressureReleased)

    addedPressure = 0

    for (const valve of openValves.entries()) {
      addedPressure += graph[valve[0]].flowRate
    }
    pressureReleased += addedPressure
    if (setsAreEqual(pointsWithFlowRate, openValves)) {
      newPaths.push({currentLocation: currentLocation, elephantLocation: elephantLocation, openValves: openValves, pressureReleased: pressureReleased, expectedPressure: pressureReleased+(25-minutes)*addedPressure})
      break
    } else {
      for (var j = 0; j < graph[currentLocation].children.length; j++) {
        for (var k = 0; k < graph[elephantLocation].children.length; k++) {
          newPaths.push({currentLocation: graph[currentLocation].children[j], elephantLocation: graph[elephantLocation].children[k], openValves: openValves, pressureReleased: pressureReleased, expectedPressure: pressureReleased+(25-minutes)*addedPressure})
        }
      }
      if (!openValves.has(currentLocation) && graph[currentLocation].flowRate != 0) {
        addedValve = structuredClone(paths[i].openValves)
        addedValve.add(currentLocation)
        for (var k = 0; k < graph[elephantLocation].children.length; k++) {
          newPaths.push({currentLocation: currentLocation, elephantLocation: graph[elephantLocation].children[k], openValves: addedValve, pressureReleased: pressureReleased, expectedPressure: pressureReleased+(25-minutes)*addedPressure})
        }
      }
      if (!openValves.has(elephantLocation) && graph[elephantLocation].flowRate != 0) {
        addedElephantValve = structuredClone(paths[i].openValves)
        addedElephantValve.add(elephantLocation)
        for (var j = 0; j < graph[currentLocation].children.length; j++) {
          newPaths.push({currentLocation: graph[currentLocation].children[j], elephantLocation: elephantLocation, openValves: addedElephantValve, pressureReleased: pressureReleased, expectedPressure: pressureReleased+(25-minutes)*addedPressure})
        }
      }
      if (!openValves.has(elephantLocation) && graph[elephantLocation].flowRate != 0 && !openValves.has(currentLocation) && graph[currentLocation].flowRate != 0) {
        addedBothValve = structuredClone(paths[i].openValves)
        addedBothValve.add(currentLocation)
        addedBothValve.add(elephantLocation)
        newPaths.push({currentLocation: currentLocation, elephantLocation: elephantLocation, openValves: addedBothValve, pressureReleased: pressureReleased, expectedPressure: pressureReleased+(25-minutes)*addedPressure})
      }
    }
  }
  newPaths.sort((a,b) => b.expectedPressure-a.expectedPressure)
  if (setsAreEqual(pointsWithFlowRate, openValves)) {
    paths = [newPaths[0]]
  } else {
    paths = newPaths.slice(0,5000000)
  }
  minutes++
  console.log(minutes)
  console.log(newPaths.length)
  newPaths = []
  console.log(paths.length)
  console.log(paths[0])
}
