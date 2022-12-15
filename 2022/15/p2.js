const fs = require('fs')

d = fs.readFileSync('data.txt', 'utf8')
d = d.split("\r\n")

d.pop()

data = []

for (var i = 0; i < d.length; i++) { // parse
  d[i] = d[i].split(" ")
  data.push({
    sensor:[
      Number(d[i][2].split("=")[1].split(",")[0]),
      Number(d[i][3].split("=")[1].split(":")[0])
    ],
    beacon: [
      Number(d[i][8].split("=")[1].split(",")[0]),
      Number(d[i][9].split("=")[1])
    ]
  })
}

const merge = intervals => { // https://javascript.plainenglish.io/javascript-algorithms-merge-intervals-leetcode-98da240805bc
  if (intervals.length < 2) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  const result = [];
  let previous = intervals[0];

  for (let i = 1; i < intervals.length; i += 1) {
    if (previous[1] >= intervals[i][0]) {
      previous = [previous[0], Math.max(previous[1], intervals[i][1])];
    } else {
      result.push(previous);
      previous = intervals[i];
    }
  }

  result.push(previous);

  return result;
};

max = 4000000;

function limit(value) {
  return Math.min(Math.max(value,0),max)
}

for (var j = 0; j <= max; j++) {
  ranges = []

  for (var i = 0; i < data.length; i++) { // find intervals
    if (data[i].sensor[1] == j && data[i].sensor[0] >= 0 && data[i].sensor[0] <= max) {
      ranges.push([data[i].sensor[0],data[i].sensor[0]])
    }

    if (data[i].beacon[1] == j && data[i].beacon[0] >= 0 && data[i].beacon[0] <= max) {
      ranges.push([data[i].beacon[0],data[i].beacon[0]])
    }

    distance = Math.abs(data[i].sensor[1]-data[i].beacon[1])+Math.abs(data[i].sensor[0]-data[i].beacon[0])
    reducedDistance = distance-Math.abs(j-data[i].sensor[1])
    if (reducedDistance >= 0) {
      ranges.push([limit(data[i].sensor[0]-reducedDistance), limit(data[i].sensor[0]+reducedDistance)])
    }
  }

  for (var i = 0; i < ranges.length; i++) { // sort ranges
    ranges[i].sort((a,b) => a-b)
  }
  ranges.sort((a,b) => a[0]-b[0])

  ranges = merge(ranges)

  if (ranges.length != 1) {
    console.log("("+(ranges[0][1]+1)+", "+j+")")
    console.log((ranges[0][1]+1)*4000000+j)
    break
  }
}
