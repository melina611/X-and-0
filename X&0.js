function drawLine() {
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")

    ctx.strokeStyle = "black"
    ctx.lineWidth = 2

    //horizontal lines

    ctx.beginPath()
    ctx.moveTo(0, 200)
    ctx.lineTo(600, 200)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, 400)
    ctx.lineTo(600, 400)
    ctx.stroke()

    //vertical lines

    ctx.beginPath()
    ctx.moveTo(200, 0)
    ctx.lineTo(200, 600)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(400, 0)
    ctx.lineTo(400, 600)
    ctx.stroke()

    canvas.addEventListener('click', clickOnCanvas)
}

let curentPlayer = -1
let winerOfTheGame = 0;
let borderOfTheGame = []
let row = 3
let column = 3
for (let i = 0; i < row; ++i) {
    borderOfTheGame[i] = []
    for (let j = 0; j < column; ++j) {
        borderOfTheGame[i][j] = 0
    }
}

function clickOnCanvas(event) {
    ++curentPlayer
    let ctx = canvas.getContext("2d")
    let elemLeft = canvas.offsetLeft,
        elemTop = canvas.offsetTop
    let x = event.pageX - elemLeft,
        y = event.pageY - elemTop
    let x1 = Math.floor(x / 200)
    let y1 = Math.floor(y / 200)
    if (curentPlayer % 2 == 0 && borderOfTheGame[y1][x1] == 0) {
        borderOfTheGame[y1][x1] = 1
        ctx.font = "148px serif"
        ctx.fillText("X", x1 * 200 + 50, y1 * 200 + 150)
    } else if (curentPlayer % 2 != 0 && borderOfTheGame[y1][x1] == 0) {
        borderOfTheGame[y1][x1] = 2
        ctx.font = "148px serif"
        ctx.fillText("0", x1 * 200 + 50, y1 * 200 + 150)
    }
    if (curentPlayer % 2 == 0 && borderOfTheGame[y1][x1] == 2) {
        --curentPlayer
    } else if (curentPlayer % 2 != 0 && borderOfTheGame[y1][x1] == 1) {
        --curentPlayer
    }
    if (borderOfTheGame[y1][0] == borderOfTheGame[y1][1] && borderOfTheGame[y1][1] == borderOfTheGame[y1][2]) {
        winerOfTheGame = 1
        ctx.beginPath()
        ctx.moveTo(0, y1 * 200 + 100)
        ctx.lineTo(600, y1 * 200 + 100)
        ctx.stroke()
        canvas.style.pointerEvents = "none"
    }
    if (borderOfTheGame[0][x1] == borderOfTheGame[1][x1] && borderOfTheGame[1][x1] == borderOfTheGame[2][x1]) {
        winerOfTheGame = 1
        ctx.beginPath()
        ctx.moveTo(x1 * 200 + 100, 0)
        ctx.lineTo(x1 * 200 + 100, 600)
        ctx.stroke()
        canvas.style.pointerEvents = "none"
    }
    if (borderOfTheGame[0][0] == borderOfTheGame[1][1] && borderOfTheGame[1][1] == borderOfTheGame[2][2] && borderOfTheGame[0][0] != 0) {
        winerOfTheGame = 1
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(600, 600)
        ctx.stroke()
        canvas.style.pointerEvents = "none"
    }
    if (borderOfTheGame[0][2] == borderOfTheGame[1][1] && borderOfTheGame[1][1] == borderOfTheGame[2][0] && borderOfTheGame[0][2] != 0) {
        winerOfTheGame = 1
        ctx.beginPath()
        ctx.moveTo(0, 600)
        ctx.lineTo(600, 0)
        ctx.stroke()
        canvas.style.pointerEvents = "none"
    }
    if (curentPlayer % 2 == 0 && winerOfTheGame == 1) {
        let winerPlayer = document.getElementById("winerPlayer")
        winerPlayer.innerHTML = "X WON!"
    } else if (curentPlayer % 2 != 0 && winerOfTheGame == 1) {
        winerPlayer.innerHTML = "0 WON!"
    } else if (curentPlayer == 8 && winerOfTheGame == 0) {
        winerPlayer.innerHTML = "Tie Game!"
    }
}

function restartTheGame() {
    curentPlayer = -1
    winerOfTheGame = 0
    canvas.style.pointerEvents = "visible"
    winerPlayer.innerHTML = " "
    for (let i = 0; i < row; ++i) {
        borderOfTheGame[i] = []
        for (let j = 0; j < column; ++j) {
            borderOfTheGame[i][j] = 0
        }
    }
    ctx = canvas.getContext("2d")
    ctx.reset()
    drawLine()
}

window.onload = drawLine