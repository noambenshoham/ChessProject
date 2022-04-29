class BoardData {
    constructor(firstPlayer) {
        this.pieces = this.getInitialPieces();
        this.currentPlayer = firstPlayer;
        this.winner = undefined;
    }

    clearBoard(boardEl) {
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                boardEl.rows[i].cells[j].classList.remove('possible-move');
                boardEl.rows[i].cells[j].classList.remove('selected');
            }
        }
    }
    paintPossibleMoves(piece) {
        let possibleMoves = piece.getPossibleMoves();
        for (let possibleMove of possibleMoves) {
            let possibleCell = boardEl.rows[possibleMove[0]].cells[possibleMove[1]];
            possibleCell.classList.add('possible-move');
        }
    }
    tryMove(piece, row, col) {
        selectedCell = boardEl.rows[row].cells[col];
        // If the cell - [row, col] - is in the possibleMoves list [[2,1], [1,0]]
        if (piece.getPossibleMoves().some(element => element.toString() === [row, col].toString())) {
            let removedPiece = this.removePiece(row, col);
            // Remove img if there is a piece. Better than removeChild for case of empty cells.
            selectedCell.innerHTML = ''
            // Update new piece's position to the selected cell:
            piece.row = row;
            piece.col = col;
            selectedCell.appendChild(piece.img);

            if (removedPiece && removedPiece.type === 'king')
                this.gameOver()
            this.endTurn()

            return true;
        }
        return false;
    }
    endTurn() {
        if (this.currentPlayer === 'white_player') {
            this.currentPlayer = 'black_player';
        } else {
            this.currentPlayer = 'white_player';
        }
        document.querySelector(".Player-1").classList.toggle("player--active");
        document.querySelector(".Player-2").classList.toggle("player--active")
    }
    gameOver() {
        this.winner = this.currentPlayer;
        let winnerMessage = document.createElement('div')
        winnerMessage.innerHTML = 'The winner is: ' + this.currentPlayer;
        winnerMessage.classList.add('winner')
        boardEl.appendChild(winnerMessage);
    }
    removePiece(row, col) {
        for (let i = 0; i < this.pieces.length; i++) {
            const piece = this.pieces[i];
            if (piece.row === row && piece.col === col) {
                this.pieces.splice(i, 1);
                return piece;
            }
        }
    }

    getPiece(row, col) {
        for (const piece of this.pieces) {
            if (piece.row === row && piece.col === col) {
                return piece
            }
        }
    }

    // Return a list of all pieces, their first locations, their color and images elements.
    getInitialPieces() {
        let result = [];
        result.push(new Pieces(0, 0, 'rook', 'black_player', imgURLsObj.blackRookImg))
        result.push(new Pieces(0, 1, 'knight', 'black_player', imgURLsObj.blackKnightImg))
        result.push(new Pieces(0, 2, 'bishop', 'black_player', imgURLsObj.blackBishopImg))
        result.push(new Pieces(0, 3, 'queen', 'black_player', imgURLsObj.blackQueenImg))
        result.push(new Pieces(0, 4, 'king', 'black_player', imgURLsObj.blackKingImg))
        result.push(new Pieces(0, 5, 'bishop', 'black_player', imgURLsObj.blackBishopImg))
        result.push(new Pieces(0, 6, 'knight', 'black_player', imgURLsObj.blackKnightImg))
        result.push(new Pieces(0, 7, 'rook', 'black_player', imgURLsObj.blackRookImg))

        result.push(new Pieces(7, 0, 'rook', 'white_player', imgURLsObj.whiteRookImg))
        result.push(new Pieces(7, 1, 'knight', 'white_player', imgURLsObj.whiteKnightImg))
        result.push(new Pieces(7, 2, 'bishop', 'white_player', imgURLsObj.whiteBishopImg))
        result.push(new Pieces(7, 3, 'queen', 'white_player', imgURLsObj.whiteQueenImg))
        result.push(new Pieces(7, 4, 'king', 'white_player', imgURLsObj.whiteKingImg))
        result.push(new Pieces(7, 5, 'bishop', 'white_player', imgURLsObj.whiteBishopImg))
        result.push(new Pieces(7, 6, 'knight', 'white_player', imgURLsObj.whiteKnightImg))
        result.push(new Pieces(7, 7, 'rook', 'white_player', imgURLsObj.whiteRookImg))

        for (let i = 0; i < BOARD_SIZE; i++) {
            result.push(new Pieces(1, i, 'pawn', 'black_player', imgURLsObj.blackPawnImg))
            result.push(new Pieces(6, i, 'pawn', 'white_player', imgURLsObj.whitePawnImg))
        }
        return result;
    }

}