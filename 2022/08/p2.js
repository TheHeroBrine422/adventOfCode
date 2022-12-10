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

function score(x,y) {
    currentHeight = d[x][y]
    score1 = 0;
    for (let i = x-1; i > -1; i--) {
        if (i != x) {
            score1++;
            if (d[i][y] >= currentHeight) {
                break
            }
        }
    }

    score2 = 0;
    for (let i = x+1; i < d.length-1; i++) {
        if (i != x) {
            score2++
            if (d[i][y] >= currentHeight) {
                break
            }
        }
    }

    score3 = 0;
    for (let i = y-1; i > -1; i--) {
        if (i != y) {
            score3++
            if (d[x][i] >= currentHeight) {
                break
            }
        }
    }

    score4 = 0;
    for (let i = y+1; i < d[x].length; i++) {
        if (i != y) {
            score4++
            if (d[x][i] >= currentHeight) {
                break
            }
        }
    }

    return score1 *score2 * score3 *score4
}

maxScore = 0;

for (let i = 0; i < d.length-1; i++) {
    for (let j = 0; j < d[i].length; j++) {
        temp = score(i,j)
        if (temp > maxScore) {
            maxScore = temp
        }
    }
}

console.log(maxScore)
