
const gameBoard = function (){
    let board = []

    const getBoardState = () => board

    function markBoard (x,y,token){
        if((x>=0 && x<=2 && y>=0 && y<=2) && board[x][y] === ''){
            board[x][y] = token
        }

        return 
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
        getBoardState,
        markBoard
    }
}

const game = gameBoard()