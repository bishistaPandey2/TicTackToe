
function Player(player1 ="playerOne", player2 = "playerTwo"){
    player = [
        this.player1 = {
            name: player1,
            token: "O"
        },
        this.player2 = {
            name: player2,
            token: "X"
        }
    ]

    let activePlayer = player[0]

    this.switchPlayer = () => {
        activePlayer = activePlayer === player[0]? player[1] : player[0]
        return true
    }

    this.getActivePlayer = () => activePlayer
}

const gameBoard = (function (){
    let board = []

    function markBoard (x,y,token){
        if((x>=0 && x<=2 && y>=0 && y<=2) && board[x][y] === ''){
            board[x][y] = token
            return true
        }

        return false
    }

    const getBoardState = () => board

    const resetBoard = function (){
        board = [
            ['','',''],
            ['','',''],
            ['','','']
        ]
        console.log(board)
    }

    const checkWin = function(token){
        for(let i = 0; i<3; i++){
            if((board[0][i] === token && board[1][i] === token && board[2][i] === token) ||
            (board[i][0] === token && board[i][1] === token && board[i][2] === token) ||
            (board[0][0] === token && board[1][1] === token && board[2][2] === token) ||
            (board[0][2] === token && board[1][1] === token && board[2][0] === token)) {
                return true
            }
        }

        return false
    }

    resetBoard()
    return {
        resetBoard,
        getBoardState,
        markBoard,
        checkWin
    }
})();

const gameController = (function(){

    //generating gameboard
    gameBoard

    //Creating player object
    let player = new Player()

    const playGame = (x, y) => {
        const markedResult = gameBoard.markBoard(x, y, player.getActivePlayer().token)
        console.log(gameBoard.getBoardState())

        if(markedResult === true){
            player.switchPlayer()
        } else {
            alert("Hero banta hai bhen k lund!")
        }
    }
    
    return {
        player,
        playGame
    }
})();

const ticTackToeDisplay = function(){
    const container = document.querySelector(".container")

    const generateBoard = () => {
        for(let i = 0; i<3; i++){
            const row = document.createElement("div")
            row.classList.add(`row`)
            for(let j = 0; j<3; j++){
                const cell = document.createElement("button")
                cell.classList.add(`cell`)
                cell.dataset.row = `${i}`
                cell.dataset.column = `${j}`
                row.appendChild(cell)
            }
            container.appendChild(row)
        } 
    }


    generateBoard()

    const cell = document.querySelectorAll(".cell")
    container.addEventListener('click', (e) => {
        let row = e.target.dataset.row
        let column = e.target.dataset.column

        gameController.playGame(row, column)
        board = gameBoard.getBoardState()
        e.target.innerText = board[row][column]

        const checkWin = gameBoard.checkWin(board[row][column])

        if(checkWin === true){
            setTimeout(() => {
                alert(`${gameController.player.getActivePlayer().name} is the winner.`) 
                cell.forEach((element) => {
                element.innerText = ''
                })
                gameBoard.resetBoard()
            }, 500)
            
        }
    })

    const resetBtn = document.querySelector(".resetBoard")

    resetBtn.addEventListener('click', () => {
        alert("Haaa laudu.")
        gameBoard.resetBoard()
        cell.forEach((element) => {
            element.innerText = ''
        });
    })
}

ticTackToeDisplay()