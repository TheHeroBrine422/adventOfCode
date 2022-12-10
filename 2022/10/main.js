const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")

cycles = 1
X = 1
totalSignalStrengths = 0;
display = ""

for (var i = 0; i < d.length-1; i++) {
  d[i] = d[i].split(" ")
  if (d[i][0] == "noop") {
    cycles++
  } else if (d[i][0] == "addx") {
    cycles++
    renderPixelAndCalcStrength()
    cycles++
    X += Number(d[i][1])
  }
  if (cycles % 40 == 20) {
    totalSignalStrengths += cycles * X
  }
  renderPixelAndCalcStrength()
}

console.log(totalSignalStrengths)
console.log(display)

function renderPixelAndCalcStrength() {
  if ((cycles) % 40 == 20) {
    totalSignalStrengths += (cycles) * X
  }
  crtPosition = (cycles-1) % 40
  if (X == crtPosition || X-1 == crtPosition || X+1 == crtPosition) {
    display += "#"
  } else {
    display += "."
  }
  if ((cycles) % 40 == 0 && cycles != 0) {
    display += "\n"
  }
}
