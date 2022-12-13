/*warning:

this code is awful. i didnt deal with cleaning it up and it doesnt even work.
it generally missorts one value near the very end of the list.
i manually copied all the packets, manually sorted the missorted value and then used crtl+f to find the indexs of the divider packets and then manually did the math.

*/
const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n\r\n")

packets = [[[2]], [[6]]]

t = 0;

for (var i = 0; i < d.length; i++) {
  d[i] = d[i].split("\r\n")

  first = JSON.parse(d[i][0])
  second = JSON.parse(d[i][1])

  packets.push(first)
  packets.push(second)
}

function isSorted() {
  for (var i = 0; i < packets.length-1; i++) {
    returnValue = compare(packets[i], packets[i+1])
    //console.log(JSON.stringify(packets[i])+", "+JSON.stringify(packets[i+1])+", "+returnValue)
    if (returnValue == 1) {
      console.log(i)
      return false
    }
  }
  return true
}

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

console.log(new Date())

counter = 0;

while (!isSorted()) {
  for (var i = 1; i < packets.length-1; i++) {
    if ((packets[i+1] != undefined && compare(packets[i], packets[i+1]) != 0) || (packets[i-1] != undefined && compare(packets[i-1], packets[i]) != 0)) {
      //console.log(i)
      neverFound = true
      for (var j = 0; j < packets.length; j++) {

        returnValue = compare(packets[i], packets[j])
        //console.log(JSON.stringify(packets[i])+", "+JSON.stringify(packets[j])+", "+returnValue)
        if (returnValue == 0) {
          //console.log(i+", "+j)

          neverFound = false


          array_move(packets, i, j)

          /*if (j == 0) {
            packet = packets.splice(i, 1)[0]
            packets.unshift(packet)
          } else {*/
          //}
        }
      }
      if (neverFound) {
        array_move(packets, i, packets.length-1)
      }
    }
  }

  for (var i = 0; i < packets.length; i++) {
    console.log(JSON.stringify(packets[i]))
  }
  counter++
  console.log("round"+counter)
  console.log(packets.length)
  //console.log(packets)
}


/*
for (var i = 0; i < 100; i++) {
  packets.sort((a,b) => {
    returnValue = compare(a,b)
    if (returnValue == 0) {
      return 0
    } else {
      return Math.random() < 0.5 ? 1 : -1
    }
  })
}
*/
console.log(packets)

console.log(new Date())


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
      return 0
    } else if (firstLengthCounter > secondLengthCounter){
      return 1
    } else {
      return 2
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
      if (returnValue != 2) {
        return returnValue
      }
    } else {
      if (second[i] > first[i]) {
        return 0;
      } else if (second[i] < first[i]) {
        return 1;
      }
    }
  }
  if (first.length == second.length) {
    return 2
  } else {
    return 0
  }
  return true
}

console.log(t)
