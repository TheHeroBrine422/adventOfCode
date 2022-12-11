const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n\r\n")

monkeys = []
primedDivisbilityModulo = BigInt(1)
part = 1

for (var i = 0; i < d.length; i++) {
  d[i] = d[i].split("\r\n")
  monkeyObj = {
    items: d[i][1].split(":")[1].split(",").map(x => BigInt(Number(x))),
    operationType: d[i][2].split(" ")[7] != "old" ? d[i][2].split(" ")[6] : "^",
    operationNumber: BigInt(isNaN(Number(d[i][2].split(" ")[7])) ? 0 : Number(d[i][2].split(" ")[7])),
    test: BigInt(Number(d[i][3].split(" ")[5])),
    trueMonkey: Number(d[i][4].split(" ")[9]),
    falseMonkey: Number(d[i][5].split(" ")[9]),
    interactions: 0
  }
  primedDivisbilityModulo *= monkeyObj.test
  monkeys.push(monkeyObj)
}

for (var i = 0; i < part == 1 ? 20 : 10000; i++) {
  for (var j = 0; j < monkeys.length; j++) {
    snapShotLength = monkeys[j].items.length
    for (var k = 0; k < snapShotLength; k++) {
      if (monkeys[j].operationType == "*") {
        monkeys[j].items[0] = (monkeys[j].items[0]*monkeys[j].operationNumber)
      } else if (monkeys[j].operationType == "+") {
        monkeys[j].items[0] = (monkeys[j].items[0]+monkeys[j].operationNumber)
      } else if (monkeys[j].operationType == "^") {
        monkeys[j].items[0] = (monkeys[j].items[0]*monkeys[j].items[0])
      }

      if (part == 1) {
        monkeys[j].items[0] = monkeys[j].items[0]/BigInt(3)
      } else {
        monkeys[j].items[0] = monkeys[j].items[0] % primedDivisbilityModulo
      }

      if (monkeys[j].items[0] % monkeys[j].test == 0) {
        monkeys[monkeys[j].trueMonkey].items.push(monkeys[j].items[0])
      } else {
        monkeys[monkeys[j].falseMonkey].items.push(monkeys[j].items[0])
      }

      monkeys[j].items.shift()
      monkeys[j].interactions++
    }
  }
}

monkeys.sort(function(a, b){return b.interactions - a.interactions});

console.log(monkeys[0].interactions*monkeys[1].interactions)
