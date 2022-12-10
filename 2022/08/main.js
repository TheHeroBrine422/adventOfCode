const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")

t = 0;

for (let i = 0; i < d.length-1; i++) {
  d[i] = d[i].split("")
  for (let j = 0; j < d[i].length; j++) {
    d[i][j] = Number(d[i][j])
  }
}

function visible(x,y) {
  currentHeight = d[x][y]
  failed = false;
  for (let i = 0; i < x; i++) {
    if (i != x) {
      if (d[i][y] >= currentHeight) {
        failed = true
        break
      }
    }
  }
  if (!failed) {
    return true
  }

  failed = false;
  for (let i = x+1; i < d.length; i++) {
    if (i != x) {
      if (d[i][y] >= currentHeight) {
        failed = true
        break
      }
    }
  }
  if (!failed) {
    return true
  }

  failed = false;
  for (let i = 0; i < y; i++) {
    if (i != y) {
      if (d[x][i] >= currentHeight) {
        failed = true
        break
      }
    }
  }
  if (!failed) {
    return true
  }

  failed = false;
  for (let i = y+1; i < d[x].length; i++) {
    if (i != y) {
      if (d[x][i] >= currentHeight) {
        failed = true
        break
      }
    }
  }
  if (!failed) {
    return true
  }
  return false
}

for (let i = 0; i < d.length-1; i++) {
  for (let j = 0; j < d[i].length; j++) {
    if (visible(i,j)) {
      t++
    }
  }
}



console.log(t)
