// Orginize all the data about the pieces - their legal moves, their imgages, types an etc.
class Pieces {
    constructor(row, col, type, player, imgUrl) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
        this.img = this.imgToElement(imgUrl);
        

        // this.moves = this.getPossibleMoves();
    }

    imgToElement(url) {// Make the imgage's URL into an HTML element.
        let newEl = document.createElement("img");
        newEl.src = url;
        let cell = boardEl.rows[this.row].cells[this.col];
        cell.appendChild(newEl)
        if (this.player == 'black_player') {
            newEl.classList.add('upSide')
        }
        return newEl;
    }

    getPossibleMoves() {
        if (boardData.currentPlayer !== this.player || boardData.winner !== undefined) {
            return []
        }
        let moves;

        let findMovesFunc = {
            'rook': 'getRookMoves',
            'knight': 'getKnightMoves',
            'bishop': 'getBishopMoves',
            'queen': 'getQueenMoves',
            'king': 'getKingMoves',
            'pawn': 'getPawnMoves'
        }

        moves = this[findMovesFunc[this.type]]() // Call the function and get a List of the relative and absolute moves of this piece.

        let filteredMoves = [];
        for (let move of moves) {
            const absoluteRow = move[0];
            const absoluteCol = move[1];
            if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
                filteredMoves.push(move);
            }
        }
        // TODO : if there is check - return only moves that will return false to ifCheck
        if (boardData.checkBy && boardData.checkBy !== boardData.currentPlayer) {
            let checkMoves = []
            //     console.log('צמצם')
            for (let move of filteredMoves) {
                if (boardData.imagineMove(move, boardData.getPiece(this.row, this.col))) {
                    console.log(move)
                    checkMoves.push(move)

                }
            }
            return checkMoves
        }
        // console.log(boardData.getPiece(this.row, this.col))
        return filteredMoves;
    }

    getMovesInDirection(directionRow, directionCol, boardData) {
        let result = [];
        // for loop only for BISHOP, QUEEN, ROOK. They running
        if (this.type === 'bishop' || this.type === 'rook' || this.type === 'queen') {
            for (let i = 1; i < BOARD_SIZE; i++) {
                let row = this.row + directionRow * i;
                let col = this.col + directionCol * i;
                if (boardData.getPiece(row, col) === undefined) {
                    result.push([row, col]);
                } else if (this.player !== boardData.getPiece(row, col).player) {
                    result.push([row, col]);
                    // console.log("opponent");
                    return result;
                } else if (this.player === boardData.getPiece(row, col).player) {
                    // console.log("player");
                    return result;
                }
            }
            // console.log("all empty");
            return result;
        } else {
            let row = this.row + directionRow;
            let col = this.col + directionCol;
            if (boardData.getPiece(row, col) === undefined) {
                result.push([row, col]);
                // console.log('empty cell')
            } else if (this.player !== boardData.getPiece(row, col).player) {
                result.push([row, col]);
                // console.log("opponent");
                return result;
            } else if (this.player === boardData.getPiece(row, col).player) {
                // console.log("player");
                return result;
            }
            return result;
        }
    }
    getRookMoves() {
        let result = [];
        result = result.concat(this.getMovesInDirection(1, 0, boardData));
        result = result.concat(this.getMovesInDirection(-1, 0, boardData));
        result = result.concat(this.getMovesInDirection(0, 1, boardData));
        result = result.concat(this.getMovesInDirection(0, -1, boardData));
        return result;
    }
    getKnightMoves() {
        let result = [];
        result = result.concat(this.getMovesInDirection(2, 1, boardData))
        result = result.concat(this.getMovesInDirection(2, -1, boardData))
        result = result.concat(this.getMovesInDirection(-2, 1, boardData))
        result = result.concat(this.getMovesInDirection(-2, -1, boardData))
        result = result.concat(this.getMovesInDirection(1, 2, boardData))
        result = result.concat(this.getMovesInDirection(1, -2, boardData))
        result = result.concat(this.getMovesInDirection(-1, 2, boardData))
        result = result.concat(this.getMovesInDirection(-1, -2, boardData))
        return result;
    }
    getBishopMoves() {
        let result = []
        result = result.concat(this.getMovesInDirection(1, 1, boardData))
        result = result.concat(this.getMovesInDirection(1, -1, boardData))
        result = result.concat(this.getMovesInDirection(-1, 1, boardData))
        result = result.concat(this.getMovesInDirection(-1, -1, boardData))
        return result;
    }
    getQueenMoves() {
        let result = [];
        result = result.concat(this.getMovesInDirection(1, 0, boardData));
        result = result.concat(this.getMovesInDirection(-1, 0, boardData));
        result = result.concat(this.getMovesInDirection(0, 1, boardData));
        result = result.concat(this.getMovesInDirection(0, -1, boardData));
        result = result.concat(this.getMovesInDirection(1, 1, boardData))
        result = result.concat(this.getMovesInDirection(1, -1, boardData))
        result = result.concat(this.getMovesInDirection(-1, 1, boardData))
        result = result.concat(this.getMovesInDirection(-1, -1, boardData))
        return result;
    }
    getKingMoves() {
        let result = [];
        result = result.concat(this.getMovesInDirection(1, 0, boardData));
        result = result.concat(this.getMovesInDirection(-1, 0, boardData));
        result = result.concat(this.getMovesInDirection(0, 1, boardData));
        result = result.concat(this.getMovesInDirection(0, -1, boardData));
        result = result.concat(this.getMovesInDirection(1, 1, boardData))
        result = result.concat(this.getMovesInDirection(1, -1, boardData))
        result = result.concat(this.getMovesInDirection(-1, 1, boardData))
        result = result.concat(this.getMovesInDirection(-1, -1, boardData))
        return result;
    }
    getPawnMoves() {

        let result = [];
        let direction = 1;
        if (this.player === 'white_player') {
            direction = -1;
        }

        let oneStep = [this.row + direction, this.col];
        let twoSteps = [this.row + direction * 2, this.col];

        if (this.row === 1 || this.row === 6) {
            if (boardData.getPiece(oneStep[0], oneStep[1]) === undefined &&
                boardData.getPiece(twoSteps[0], twoSteps[1]) === undefined) {
                result.push(twoSteps)
            }
        }
        if (boardData.getPiece(oneStep[0], oneStep[1]) === undefined) {
            result.push(oneStep);
        }
        let eatPiece = [this.row + direction, this.col + direction];
        if (boardData.getPiece(eatPiece[0], eatPiece[1]) !== undefined) {
            if (boardData.getPiece(eatPiece[0], eatPiece[1]).player !== this.player) {
                result.push(eatPiece);
            }
        }
        eatPiece = [this.row + direction, this.col - direction];
        if (boardData.getPiece(eatPiece[0], eatPiece[1]) !== undefined) {
            if (boardData.getPiece(eatPiece[0], eatPiece[1]).player !== this.player) {
                result.push(eatPiece);
            }
        }
        return result;
    }
}