function createChessBoard() {
    const boardEl = document.createElement("table");
    boardEl.classList.add("chessBoard");


    document.body.appendChild(boardEl);
    for (let row = 0; row < BOARD_SIZE; row++) {
        let rowElement = boardEl.insertRow();
        for (let col = 0; col < BOARD_SIZE; col++) {
            let cellElement = rowElement.insertCell();
            if ((row + col) % 2 === 0) {
                cellElement.classList.add("white");
            } else {
                cellElement.classList.add("black");
            }
            if (row === 0 || row === 1) {
                cellElement.classList.add("upSide")
            }
            cellElement.addEventListener('click', (event) => onCellClick(event, row, col));
        }

    }
    pieces = getInitialPicies();

    for (let piece of pieces) {
        let cell = boardEl.rows[piece.row].cells[piece.col];
        cell.appendChild(piece.img.cloneNode());
    }
}

window.addEventListener('load', createChessBoard);


class Pieces {
    constructor(row, col, type, player, img) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
        this.img = img;
    }
}
function getInitialPicies() {
    let result = [];
    result.push(new Pieces(0, 0, 'rook', BLACK_PLAYER, blackRookImg))
    result.push(new Pieces(0, 1, 'knight', BLACK_PLAYER, blackKnightImg))
    result.push(new Pieces(0, 2, 'bishop', BLACK_PLAYER, blackBishopImg))
    result.push(new Pieces(0, 3, 'queen', BLACK_PLAYER, blackQueenImg))
    result.push(new Pieces(0, 4, 'king', BLACK_PLAYER, blackKingImg))
    result.push(new Pieces(0, 5, 'bishop', BLACK_PLAYER, blackBishopImg))
    result.push(new Pieces(0, 6, 'knight', BLACK_PLAYER, blackKnightImg))
    result.push(new Pieces(0, 7, 'rook', BLACK_PLAYER, blackRookImg))

    result.push(new Pieces(7, 0, 'rook', WHITE_PLAYER, whiteRookImg))
    result.push(new Pieces(7, 1, 'knight', WHITE_PLAYER, whiteKnightImg))
    result.push(new Pieces(7, 2, 'bishop', WHITE_PLAYER, whiteBishopImg))
    result.push(new Pieces(7, 3, 'queen', WHITE_PLAYER, whiteQueenImg))
    result.push(new Pieces(7, 4, 'king', WHITE_PLAYER, whiteKingImg))
    result.push(new Pieces(7, 5, 'bishop', WHITE_PLAYER, whiteBishopImg))
    result.push(new Pieces(7, 6, 'knight', WHITE_PLAYER, whiteKnightImg))
    result.push(new Pieces(7, 7, 'rook', WHITE_PLAYER, whiteRookImg))

    for (let i = 0; i < BOARD_SIZE; i++) {  
        result.push(new Pieces(1, i, 'pawn', BLACK_PLAYER, blackPawnImg))
        result.push(new Pieces(6, i, 'pawn', WHITE_PLAYER, whitePawnImg))
    }
  return result;
  }


function onCellClick(event, row, col) {
    console.log(row, col);
    if (selectedCell !== undefined) {
      selectedCell.classList.remove('selected');
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');
  }

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

function imgEl(url) {
    let newEl = document.createElement("img");
    newEl.src = url;
    return newEl
} 

let selectedCell;
let pieces = [];
let BLACK_PLAYER;
let WHITE_PLAYER;
const BOARD_SIZE = 8;
