/*warning:

this code is awful. i didnt deal with cleaning it up and it doesnt even work.
it generally missorts one value near the very end of the list.
i manually copied all the packets, manually sorted the missorted value and then used crtl+f to find the indexs of the divider packets and then manually did the math.

*/
const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n\r\n")

packets = [[[2]], [[6]]]

for (var i = 0; i < d.length; i++) {
  d[i] = d[i].split("\r\n")

  first = JSON.parse(d[i][0])
  second = JSON.parse(d[i][1])

  packets.push(first)
  packets.push(second)
}

packets.sort(compare)

console.log(packets)

firstDistress = -1
secondDistress = -1

for (var i = 0; i < packets.length; i++) {
  if (JSON.stringify(packets[i]) == "[[2]]") {
    firstDistress = i+1
  }
  if (JSON.stringify(packets[i]) == "[[6]]") {
    secondDistress = i+1
  }
}

console.log(firstDistress*secondDistress)

function checkIfEmpty(array) {
  return Array.isArray(array) && (array.length == 0 || array.every(checkIfEmpty));
}

function compare(first, second) { // 0 = right order, 1 = wrong order, 2 = undetermined
  first = JSON.parse(JSON.stringify(first))
  second = JSON.parse(JSON.stringify(second))

  if ((checkIfEmpty(first) || JSON.stringify(first) == "[]") && (checkIfEmpty(second) || JSON.stringify(second) == "[]")) {
    firstLengthCounter = 0;
    secondLengthCounter = 0;

    while (first != undefined) {
      first = first[0]
      firstLengthCounter++
    }
    while (second != undefined) {
      second = second[0]
      secondLengthCounter++
    }

    if (firstLengthCounter < secondLengthCounter) {
      return -1
    } else if (firstLengthCounter > secondLengthCounter){
      return 1
    } else {
      return 0
    }
  }

  for (var i = 0; i < first.length; i++) {
    if (second[i] == undefined) {
      return 1
    }
    if (Array.isArray(first[i]) || Array.isArray(second[i])) {
      if (!Array.isArray(second[i])) {
        second[i] = [second[i]]
      }
      if (!Array.isArray(first[i])) {
        first[i] = [first[i]]
      }
      returnValue = compare(first[i], second[i])
      if (returnValue != 0) {
        return returnValue
      }
    } else {
      if (second[i] > first[i]) {
        return -1;
      } else if (second[i] < first[i]) {
        return 1;
      }
    }
  }
  if (first.length == second.length) {
    return 0
  } else {
    return -1
  }
  return true
}
