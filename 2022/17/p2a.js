const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")[0]

t = 0;

rocks = [
  [
    [true, true, true, true]
  ],
  [
    [false, true, false],
    [true, true, true],
    [false, true, false]
  ],
  [
    [false, false, true],
    [false, false, true],
    [true, true, true]
  ],
  [
    [true],
    [true],
    [true],
    [true]
  ],
  [
    [true, true],
    [true, true],
  ]
]

grid = []

for (var i = 0; i < 35; i++) {
  grid.push([false, false, false, false, false, false, false])
}

amountToTake = 10;

movementPosition = 0
rock = 0

y = grid.length

height = 0
console.time()
for (var numRocks = 0; numRocks < 1000000000000; numRocks++) {
  if (numRocks % 1000000 == 1) {console.log(numRocks+", "+height); console.timeLog()}
  x = 2
  y -= 3+rocks[rock].length
  //console.log(y)
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
  }

  for (var i = 0; i < rocks[rock].length; i++) {
    for (var j = 0; j < rocks[rock][i].length; j++) {
      if (rocks[rock][i][j] == true) {
        grid[y+i][x+j] = true
      }
    }
  }

  rock++
  rock = rock % rocks.length

  if (numRocks != 0 && numRocks % 10 == 0) {
    temp = []
    oldGridLength = grid.length
    for (var i = 0; i < grid.length; i++) {
      if (grid[i].indexOf(true) > -1) {
        temp = grid.slice(i, i+amountToTake)
        //console.log(oldGridLength - i - amountToTake)
        height += oldGridLength - i - amountToTake
        break
      }
    }
    grid = []
    for (var i = 0; i < oldGridLength-amountToTake; i++) {
      grid.push([false, false, false, false, false, false, false])
    }
    grid = grid.concat(temp)
    for (var i = 0; i < grid.length; i++) {
      if (grid[i].indexOf(true) > -1) {
        y = i-3
        break
      }
    }
  }
}

function checkCollision(x,y) {
  for (var i = 0; i < rocks[rock].length; i++) {
    for (var j = 0; j < rocks[rock][0].length; j++) {
      if (y+i > -1 && y+i < grid.length && x+j > -1 && x+j < grid[0].length) {
        if (rocks[rock][i][j] && grid[y+i][x+j]) {
          return false
        }
      } else {
        return false
      }
    }
  }
  return true
}

for (var i = 0; i < grid.length; i++) {
  if (grid[i].indexOf(true) > -1) {
    height++
  }
}


console.log(height)
console.timeLog()
