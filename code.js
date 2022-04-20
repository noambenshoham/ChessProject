let selectedCell;
let boardData;

const BOARD_SIZE = 8;
const boardEl = document.createElement("table"); 

function createChessBoard() { // Creates the base of the Chess - the board himself.
    boardEl.classList.add("chessBoard"); 
    document.body.appendChild(boardEl);
    for (let row = 0; row < BOARD_SIZE; row++) {
        let rowElement = boardEl.insertRow(); // Runs 8 times and creates 8 rows in the chess board element(table).
        for (let col = 0; col < BOARD_SIZE; col++) {
            let cellElement = rowElement.insertCell(); // Adding 8 cells for each row. 
            if ((row + col) % 2 === 0) { // Defines wich cell will paint with black and wich will paint with white.
                cellElement.classList.add("white");
            } else {
                cellElement.classList.add("black");
            }
            if (row === 0 || row === 1) { // Up side down the enemy pieces.
                cellElement.classList.add("upSide")
                // TODO : Replace this block with a function in BoardData class that defines the enemy team and css it with the "upSide"
            }
            cellElement.addEventListener('click', (event) => onCellClick(event, row, col)); // When clicking on a cell -> 
        }

    }
    boardData = new BoardData(getInitialPiecies());
    
    for (let piece of boardData.pieces) {
        let cell = boardEl.rows[piece.row].cells[piece.col];
        cell.appendChild(piece.img.cloneNode());
    }
}

window.addEventListener('load', createChessBoard);

// When cell clicked - it removes all the previous signs and add new.
function onCellClick(event, row, col) {
    for (let i = 0; i < BOARD_SIZE; i++) { // clear all signs
        for (let j = 0; j < BOARD_SIZE; j++) {
            boardEl.rows[i].cells[j].classList.remove('possible-move');
            boardEl.rows[i].cells[j].classList.remove('selected');
        }
    }
    const piece = boardData.getPiece(row, col); // Get the piece in the cell that clicked
    if (!(piece === undefined)) {              // If the cell is not empty 
        let possibleMoves = piece.getPossibleMoves();
          for (let possibleMove of possibleMoves) // Runs over the list of the possible moves
          boardEl.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move'); // Find the cell on our board and paint it.
    }
    
    selectedCell = event.currentTarget; // Save the selected element and paint it.
    selectedCell.classList.add('selected');
    
  }

// Orginize all the data about the board. For now just the location of specific piece. But in the future for example - it will help me to update the board after a piece was eaten.
class BoardData { 
    constructor(pieces) {
        this.pieces = pieces;
    }
    getPiece(row, col) { 
        for (const piece of this.pieces) {
            if (piece.row === row && piece.col === col) {
                return piece
            }
        }
    }
    
}

// Orginize all the data about the pieces - their legal moves, their imgages, types an etc.
class Pieces {
    constructor(row, col, type, player, img) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
        this.img = img;
    }
    getPossibleMoves() {
        let relativeMoves; // Save the relative moves that the piece can make by game laws into a list.
        if (this.type === 'rook') {
          relativeMoves = this.getRookRelativeMoves();
        } else if (this.type === 'knight') {
            relativeMoves = this.getKnightRelativeMoves();
        } else if (this.type === 'bishop') {
            relativeMoves = this.getBishopRelativeMoves();
        } else if (this.type === 'queen') {
            relativeMoves = this.getQueenRelativeMoves();
        } else if (this.type === 'king') {
            relativeMoves = this.getKingRelativeMoves();
        } else if (this.type === 'pawn') {
            relativeMoves = this.getPawnRelativeMoves();
        }
        let absoluteMoves = [];
        for (let relativeMove of relativeMoves) { // The moves from the current positions of the piece
          const absoluteRow = this.row + relativeMove[0];
          const absoluteCol = this.col + relativeMove[1];
          absoluteMoves.push([absoluteRow, absoluteCol]);
        }
        let filteredMoves = []; 
        for (let absoluteMove of absoluteMoves) { // Filters the moves that are out of the board borders.
          const absoluteRow = absoluteMove[0];
          const absoluteCol = absoluteMove[1];
          if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
            filteredMoves.push(absoluteMove); 
          }
        }
        return filteredMoves; // The final list of cells that the piece can go to.
    }
    getRookRelativeMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
          result.push([i, 0]);
          result.push([-i, 0]);
          result.push([0, i]);
          result.push([0, -i]);
        }
        return result;
    }
    getKnightRelativeMoves() {
        let result = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]
        return result;
    }
    getBishopRelativeMoves() {
        let result = []
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, i])
            result.push([i, -i])
            result.push([-i, i])
            result.push([-i, -i])
            
        }
        return result;
    }
    getQueenRelativeMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, 0]);
            result.push([-i, 0]);
            result.push([0, i]);
            result.push([0, -i]);
            result.push([i, i])
            result.push([i, -i])
            result.push([-i, i])
            result.push([-i, -i])
          }
        return result;
    }
    getKingRelativeMoves() {
        let result = [];
        result.push([1, 0]);
        result.push([-1, 0]);
        result.push([0, 1]);
        result.push([0, -1]);
        result.push([1, 1])
        result.push([1, -1])
        result.push([-1, 1])
        result.push([-1, -1])
        return result;
    }
    getPawnRelativeMoves() {
        if (this.player === 'black_player') {
            return [[1, 0]]
        } else {
        return [[-1, 0]]
        }
    }


}
function getInitialPiecies() { // Return a list of all pieces, thier first locations, their color and images elements.
    let result = [];
    result.push(new Pieces(0, 0, 'rook', 'black_player', blackRookImg))
    result.push(new Pieces(0, 1, 'knight', 'black_player', blackKnightImg))
    result.push(new Pieces(0, 2, 'bishop', 'black_player', blackBishopImg))
    result.push(new Pieces(0, 3, 'queen', 'black_player', blackQueenImg))
    result.push(new Pieces(0, 4, 'king', 'black_player', blackKingImg))
    result.push(new Pieces(0, 5, 'bishop', 'black_player', blackBishopImg))
    result.push(new Pieces(0, 6, 'knight', 'black_player', blackKnightImg))
    result.push(new Pieces(0, 7, 'rook', 'black_player', blackRookImg))

    result.push(new Pieces(7, 0, 'rook', 'white_player', whiteRookImg))
    result.push(new Pieces(7, 1, 'knight', 'white_player', whiteKnightImg))
    result.push(new Pieces(7, 2, 'bishop', 'white_player', whiteBishopImg))
    result.push(new Pieces(7, 3, 'queen', 'white_player', whiteQueenImg))
    result.push(new Pieces(7, 4, 'king', 'white_player', whiteKingImg))
    result.push(new Pieces(7, 5, 'bishop', 'white_player', whiteBishopImg))
    result.push(new Pieces(7, 6, 'knight', 'white_player', whiteKnightImg))
    result.push(new Pieces(7, 7, 'rook', 'white_player', whiteRookImg))

    for (let i = 0; i < BOARD_SIZE; i++) {  
        result.push(new Pieces(1, i, 'pawn', 'black_player', blackPawnImg))
        result.push(new Pieces(6, i, 'pawn', 'white_player', whitePawnImg))
    }
  return result;
  }

// Images elements:
let blackRookImg = imgEl("https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/68px-Chess_rdt45.svg.png");
let blackKnightImg = imgEl("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/68px-Chess_ndt45.svg.png");
let blackBishopImg = imgEl("https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/68px-Chess_bdt45.svg.png");
let blackQueenImg = imgEl("https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/68px-Chess_qdt45.svg.png");
let blackKingImg = imgEl("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/68px-Chess_kdt45.svg.png");
let blackPawnImg = imgEl("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/68px-Chess_pdt45.svg.png");
let whiteRookImg = imgEl("https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/68px-Chess_rlt45.svg.png");
let whiteKnightImg = imgEl("https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/68px-Chess_nlt45.svg.png");
let whiteBishopImg = imgEl("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/68px-Chess_blt45.svg.png");
let whiteQueenImg = imgEl("https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/68px-Chess_qlt45.svg.png");
let whiteKingImg = imgEl("https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/68px-Chess_klt45.svg.png");
let whitePawnImg = imgEl("https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/68px-Chess_plt45.svg.png");

function imgEl(url) { // Make the imgage's URL into an HTML element.
    let newEl = document.createElement("img");
    newEl.src = url;
    return newEl
} 


