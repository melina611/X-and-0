function drawLine() {
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")

    ctx.strokeStyle = "black"
    ctx.lineWidth = 2

    //horizontal lines

    ctx.beginPath()
    ctx.moveTo(0, 200)
    ctx.lineTo(600, 200)
    ctx.moveTo(0, 400)
    ctx.lineTo(600, 400)

    //vertical lines

    ctx.moveTo(200, 0)
    ctx.lineTo(200, 600)
    ctx.moveTo(400, 0)
    ctx.lineTo(400, 600)
    ctx.stroke()

    for (let i = 0; i < row; ++i) {
        gameBoard[i] = []
        for (let j = 0; j < column; ++j) {
            gameBoard[i][j] = 0
        }
    }
    canvas.addEventListener('click', clickOnCanvas)
}

let curentPlayer = -1
let winerOfTheGame = 0;
let gameBoard = []
let row = 3
let column = 3

function clickOnCanvas(event) {
    ++curentPlayer
    let ctx = canvas.getContext("2d")
    let elemLeft = canvas.offsetLeft,
        elemTop = canvas.offsetTop
    let x = event.pageX - elemLeft,
        y = event.pageY - elemTop
    let x1 = Math.floor(x / 200)
    let y1 = Math.floor(y / 200)
    if (curentPlayer % 2 == 0 && gameBoard[y1][x1] == 0) {
        gameBoard[y1][x1] = 1
        ctx.font = "148px serif"
        ctx.fillText("X", x1 * 200 + 50, y1 * 200 + 150)
    } else if (curentPlayer % 2 != 0 && gameBoard[y1][x1] == 0) {
        gameBoard[y1][x1] = 2
        ctx.font = "148px serif"
        ctx.fillText("0", x1 * 200 + 50, y1 * 200 + 150)
    }
    if (curentPlayer % 2 == 0 && gameBoard[y1][x1] == 2) {
        --curentPlayer
    } else if (curentPlayer % 2 != 0 && gameBoard[y1][x1] == 1) {
        --curentPlayer
    }
    checkColumnAndLine(x1, y1)
    checkDiagonals()
    theGameResult(curentPlayer)
}

function checkColumnAndLine(x1, y1) {
    ctx = canvas.getContext("2d")
    if (gameBoard[y1][0] == gameBoard[y1][1] && gameBoard[y1][1] == gameBoard[y1][2]) {
        winerOfTheGame = 1
        ctx.beginPath()
        ctx.moveTo(0, y1 * 200 + 100)
        ctx.lineTo(600, y1 * 200 + 100)
        ctx.stroke()
        canvas.style.pointerEvents = "none"
    }
    if (gameBoard[0][x1] == gameBoard[1][x1] && gameBoard[1][x1] == gameBoard[2][x1]) {
        winerOfTheGame = 1
        ctx.beginPath()
        ctx.moveTo(x1 * 200 + 100, 0)
        ctx.lineTo(x1 * 200 + 100, 600)
        ctx.stroke()
        canvas.style.pointerEvents = "none"
    }
}

function checkDiagonals() {
    ctx = canvas.getContext("2d")
    if (gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] && gameBoard[0][0] != 0) {
        winerOfTheGame = 1
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(600, 600)
        ctx.stroke()
        canvas.style.pointerEvents = "none"
    }
    if (gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0] && gameBoard[0][2] != 0) {
        winerOfTheGame = 1
        ctx.beginPath()
        ctx.moveTo(0, 600)
        ctx.lineTo(600, 0)
        ctx.stroke()
        canvas.style.pointerEvents = "none"
    }
}

function theGameResult(curentPlayer) {
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
    ctx = canvas.getContext("2d")
    ctx.reset()
    drawLine()
}

window.onload = drawLine
