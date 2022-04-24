
let imgURLsObj =
{
    blackRookImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/68px-Chess_rdt45.svg.png",
    blackKnightImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/68px-Chess_ndt45.svg.png",
    blackBishopImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/68px-Chess_bdt45.svg.png",
    blackQueenImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/68px-Chess_qdt45.svg.png",
    blackKingImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/68px-Chess_kdt45.svg.png",
    blackPawnImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/68px-Chess_pdt45.svg.png",
    whiteRookImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/68px-Chess_rlt45.svg.png",
    whiteKnightImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/68px-Chess_nlt45.svg.png",
    whiteBishopImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/68px-Chess_blt45.svg.png",
    whiteQueenImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/68px-Chess_qlt45.svg.png",
    whiteKingImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/68px-Chess_klt45.svg.png",
    whitePawnImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/68px-Chess_plt45.svg.png"
}
let selectedCell;
let boardData;

const BOARD_SIZE = 8;
const boardEl = document.createElement("table");

function createChessBoard() {
    boardEl.classList.add("chessBoard");
    document.body.appendChild(boardEl);
    for (let row = 0; row < BOARD_SIZE; row++) {
        let rowElement = boardEl.insertRow();
        for (let col = 0; col < BOARD_SIZE; col++) {
            let cellElement = rowElement.insertCell();
            if ((row + col) % 2 === 0) { // Zig-Zag 
                cellElement.classList.add("white");
            } else {
                cellElement.classList.add("black");
            }
            cellElement.addEventListener('click', (event) => onCellClick(event, row, col));
        }

    }
    boardData = new BoardData();
}

window.addEventListener('load', createChessBoard);

function onCellClick(event, row, col) {
    for (let i = 0; i < BOARD_SIZE; i++) { // clear all signs
        for (let j = 0; j < BOARD_SIZE; j++) {
            boardEl.rows[i].cells[j].classList.remove('possible-move');
            boardEl.rows[i].cells[j].classList.remove('selected');
        }
    }
    const piece = boardData.getPiece(row, col);
    if (!(piece === undefined)) {
        let possibleMoves = piece.getPossibleMoves();
        for (let possibleMove of possibleMoves)
            boardEl.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');

    }

    selectedCell = event.currentTarget; // Save the selected element and paint it.
    selectedCell.classList.add('selected');

}

class BoardData {
    constructor() {
        this.pieces = this.getInitialPiecies();
    }

    getPiece(row, col) {
        for (const piece of this.pieces) {
            if (piece.row === row && piece.col === col) {
                return piece
            }
        }
    }
    getInitialPiecies() { // Return a list of all pieces, their first locations, their color and images elements.
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

// Orginize all the data about the pieces - their legal moves, their imgages, types an etc.
class Pieces {
    constructor(row, col, type, player, imgUrl) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
        this.img = this.imgToElement(imgUrl);
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
                    console.log("opponent");
                    return result;
                } else if (this.player === boardData.getPiece(row, col).player) {
                    console.log("player");
                    return result;
                }
            }
            console.log("all empty");
            return result;
        } else {
            let row = this.row + directionRow;
            let col = this.col + directionCol;
            if (boardData.getPiece(row, col) === undefined) {
                result.push([row, col]);
                console.log('empty cell')
            } else if (this.player !== boardData.getPiece(row, col).player) {
                result.push([row, col]);
                console.log("opponent");
                return result;
            } else if (this.player === boardData.getPiece(row, col).player) {
                console.log("player");
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
        if (this.player === 'black_player') {
            result = result.concat(this.getMovesInDirection(1, 0, boardData))
        } else {
            result = result.concat(this.getMovesInDirection(-1, 0, boardData))
        }
        return result;
    }
}


