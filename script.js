
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

    this.getPlayer = () => player

    let activePlayer = player[0]

    this.switchPlayer = () => {
        activePlayer = activePlayer === player[0]? player[1] : player[0]
    }

    this.getActivePlayer = () => activePlayer
}

const gameBoard = (function (){
    let board = []

    const getBoardState = () => board

    function markBoard (x,y,token){
        if((x>=0 && x<=2 && y>=0 && y<=2) && board[x][y] === ''){
            board[x][y] = token
            return true
        }

        return false;
    }

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
            if((board[0][i] === token && board[1][i] === token && board[2][0] === token) ||
            (board[i][0] === token && board[i][1] === token && board[i][2] === token) ||
            (board[0][0] === token && board[1][1] === token && board[2][2] === token) ||
            (board[0][2] === token && board[1][1] === token && board[2][0] === token)) {
                return true
            }
        }

        return false
    }

    resetBoard();
    return {
        resetBoard,
        getBoardState,
        markBoard,
        checkWin
    }
})();

const gameController = function(){

    //generating gameboard
    gameBoard

    //Creating player object
    let player = new Player()

    const playGame = (x, y) => {
        const markedResult = gameBoard.markBoard(x, y, player.getActivePlayer().token)
        console.log(gameBoard.getBoardState())

        const checkWiner = gameBoard.checkWin(player.getActivePlayer().token)
        console.log(checkWiner)

        if( markedResult === true){
            player.switchPlayer();
        }

        if(checkWiner === true){
            console.log(`${player.getActivePlayer().name} is the winner.`)
            gameBoard.resetBoard()
        }
    }
    
    return {
        playGame
    }
}

const game = gameController()