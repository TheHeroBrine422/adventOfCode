const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")[0]

t = 0;

rocks = [
  [
    ["#", "#", "#", "#"]
  ],
  [
    [".", "#", "."],
    ["#", "#", "#"],
    [".", "#", "."]
  ],
  [
    [".", ".", "#"],
    [".", ".", "#"],
    ["#", "#", "#"]
  ],
  [
    ["#"],
    ["#"],
    ["#"],
    ["#"]
  ],
  [
    ["#", "#"],
    ["#", "#"],
  ]
]

grid = []

for (var i = 0; i < 10000; i++) {
  grid.push([".", ".", ".", ".", ".", ".", "."])
}

movementPosition = 0
rock = 0
console.time()

for (var numRocks = 0; numRocks < 2022; numRocks++) {
  console.log(numRocks)
  x = 2
  y = 9999-2-rocks[rock].length
  for (var i = 0; i < grid.length; i++) {
    if (grid[i].indexOf("#") > -1) {
      y = i-3-rocks[rock].length
      break
    }
  }

  collide = false
  while (!collide) {
    if (d.charAt(movementPosition) == "<") {
        if (checkCollision(x-1, y)) {
          x--
        }
    } else {
        if (checkCollision(x+1, y)) {
          x++
        }
    }
    movementPosition++
    movementPosition = movementPosition % d.length

    if (checkCollision(x,y+1)) {
      y++
    } else {
      collide = true
    }
    displayGrid()
  }

  for (var i = 0; i < rocks[rock].length; i++) {
    for (var j = 0; j < rocks[rock][i].length; j++) {
      if (rocks[rock][i][j] == "#") {
        grid[y+i][x+j] = "#"
      }
    }
  }

  //console.log(x+", "+y)

  rock++
  rock = rock % rocks.length
}

function displayGrid() {
  /*tempGrid = structuredClone(grid)
  for (var i = 0; i < rocks[rock].length; i++) {
    for (var j = 0; j < rocks[rock][i].length; j++) {
      if (rocks[rock][i][j] == "#") {
        tempGrid[y+i][x+j] = "#"
      }
    }
  }
  for (var i = 9980; i < tempGrid.length; i++) {
    str = ""
    for (var j = 0; j < tempGrid[i].length; j++) {
      str += tempGrid[i][j]
    }
    console.log(str)
  }
  console.log()*/
}

function checkCollision(x,y) {
  for (var i = 0; i < rocks[rock].length; i++) {
    for (var j = 0; j < rocks[rock][0].length; j++) {
      if (y+i > -1 && y+i < grid.length && x+j > -1 && x+j < grid[0].length) {
        if (rocks[rock][i][j] == "#" && grid[y+i][x+j] == "#") {
          return false
        }
      } else {
        return false
      }
    }
  }
  return true
}

counter = 0
for (var i = 0; i < grid.length; i++) {
  if (grid[i].indexOf("#") > -1) {
      counter++
  }
}


console.log(counter)
console.timeLog()
