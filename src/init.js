const coordinate = (ref) => {
    var odiv = ref.current
    var X = (document.documentElement.clientWidth - odiv.offsetWidth) / 2;
    var Y = (document.documentElement.clientHeight - odiv.offsetHeight - 60) / 2 + 60;
    return [X, Y]
}

const preInit = () => {
    var A = []
    for (var i = 0; i < 16; i++) {
        A[i] = []
        for (var j = 0; j < 30; j++) {
            A[i][j] = { isReversal: false, number: 0, flag: false, deepColor: false }
        }
    }
    return A
}

const init = (x, y) => {
    var A = []
    for (var i = 0; i < 16; i++) {
        A[i] = []
        for (var j = 0; j < 30; j++) {
            if (i === x && j === y) A[i][j] = { isReversal: true, number: 0, flag: false, deepColor: false }
            else A[i][j] = { isReversal: false, number: 0, flag: false, deepColor: false }
        }
    }
    var arr = []
    while (arr.length < 99) {
        var flag = true
        var number = [Math.floor(Math.random() * 16), Math.floor(Math.random() * 30)]
        if (number[0] <= x + 1 && number[0] >= x - 1 && number[1] <= y + 1 && number[1] >= y - 1) {
            continue
        }
        else {
            if (arr.length === 0) arr.push(number)
            for (var k = 0; k < arr.length; k++) {
                if (number[0] === arr[k][0] && number[1] === arr[k][1]) {
                    flag = false
                }
            }
            if (flag) {
                arr.push(number)
            }
        }
    }
    arr.forEach((cell) => {
        A[cell[0]][cell[1]].number = '雷'
    })
    const checkCell = (x, y) => {
        if (0 <= x && x <= 15 && 0 <= y && y <= 29) {
            if (A[x][y].number !== '雷') return true
        }
        else return false
    }
    arr.forEach((cell) => {
        if (checkCell(cell[0] - 1, cell[1] - 1)) A[cell[0] - 1][cell[1] - 1].number += 1
        if (checkCell(cell[0], cell[1] - 1)) A[cell[0]][cell[1] - 1].number += 1
        if (checkCell(cell[0] + 1, cell[1] - 1)) A[cell[0] + 1][cell[1] - 1].number += 1
        if (checkCell(cell[0] - 1, cell[1])) A[cell[0] - 1][cell[1]].number += 1
        if (checkCell(cell[0] + 1, cell[1])) A[cell[0] + 1][cell[1]].number += 1
        if (checkCell(cell[0] - 1, cell[1] + 1)) A[cell[0] - 1][cell[1] + 1].number += 1
        if (checkCell(cell[0], cell[1] + 1)) A[cell[0]][cell[1] + 1].number += 1
        if (checkCell(cell[0] + 1, cell[1] + 1)) A[cell[0] + 1][cell[1] + 1].number += 1
    })
    for (var m = 0; m < 16; m++) {
        for (var n = 0; n < 30; n++) {
            if (A[m][n].number === 0) A[m][n].number = ' '
        }
    }
    return A
}

const handleTime = (time) => {
    let second = time % 60
    let minite = (time - second) / 60
    let m, s
    if (second / 10 < 1) s = '0' + second
    else s = second
    if (minite / 10 < 1) m = '0' + minite
    else m = minite
    return m + ':' + s
}


const size = 36

export { coordinate, init, size, preInit, handleTime }