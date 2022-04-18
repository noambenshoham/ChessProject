function Chess() {
    const boardEl = document.createElement("table");
    boardEl.classList.add("chessBoard");

    
    document.body.appendChild(boardEl);
    for (let x = 0; x < BOARD_SIZE; x++) {
        let row = boardEl.insertRow();
        for (let y = 0; y < BOARD_SIZE; y++) {
            let cell = row.insertCell();
            if ((x + y) % 2 === 0) {
                cell.classList.add("white");
            } else {
                cell.classList.add("black");
            }
            if (x === 0 || x === 1) {
                cell.classList.add("upSide")
            }
            cell.addEventListener('click', onCellClick);
        }

    }
    pieces = getInitialBoard();

    for (let piece of pieces) {
        let cell = boardEl.rows[piece.row].cells[piece.col];
        cell.innerHTML = piece.type;
    }
}

window.addEventListener('load', Chess);

class Pieces {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }
}

function getInitialBoard() {
    let result = [];
    result.push(new Pieces(0, 0, blackRook, BLACK_PLAYER))
    result.push(new Pieces(0, 1, blackKnight, BLACK_PLAYER))
    result.push(new Pieces(0, 2, blackBishop, BLACK_PLAYER))
    result.push(new Pieces(0, 3, blackQueen, BLACK_PLAYER))
    result.push(new Pieces(0, 4, blackKing, BLACK_PLAYER))
    result.push(new Pieces(0, 5, blackBishop, BLACK_PLAYER))
    result.push(new Pieces(0, 6, blackKnight, BLACK_PLAYER))
    result.push(new Pieces(0, 7, blackRook, BLACK_PLAYER))
    
    result.push(new Pieces(7, 0, whiteRook, WHITE_PLAYER))
    result.push(new Pieces(7, 1, whiteKnight, WHITE_PLAYER))
    result.push(new Pieces(7, 2, whiteBishop, WHITE_PLAYER))
    result.push(new Pieces(7, 3, whiteQueen, WHITE_PLAYER))
    result.push(new Pieces(7, 4, whiteKing, WHITE_PLAYER))
    result.push(new Pieces(7, 5, whiteBishop, WHITE_PLAYER))
    result.push(new Pieces(7, 6, whiteKnight, WHITE_PLAYER))
    result.push(new Pieces(7, 7, whiteRook, WHITE_PLAYER))

    for (let i = 0; i < BOARD_SIZE; i++) {  
        result.push(new Pieces(1, i, blackPawn))
        result.push(new Pieces(6, i, whitePawn))

    }
  return result;
  }
  

function onCellClick(event) {
    console.log("hey");
    if (selectedCell !== undefined) {
      selectedCell.classList.remove('selected');
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');
  }

function urlToElement(url) {
    return "<img src='" + url + "'>"
}

let blackRook = urlToElement("https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/68px-Chess_rdt45.svg.png");
let blackKnight = urlToElement("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/68px-Chess_ndt45.svg.png");
let blackBishop = urlToElement("https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/68px-Chess_bdt45.svg.png");
let blackQueen = urlToElement("https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/68px-Chess_qdt45.svg.png");
let blackKing = urlToElement("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/68px-Chess_kdt45.svg.png");
let blackPawn = urlToElement("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/68px-Chess_pdt45.svg.png");
let whiteRook = urlToElement("https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/68px-Chess_rlt45.svg.png");
let whiteKnight = urlToElement("https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/68px-Chess_nlt45.svg.png");
let whiteBishop = urlToElement("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/68px-Chess_blt45.svg.png");
let whiteQueen = urlToElement("https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/68px-Chess_qlt45.svg.png");
let whiteKing = urlToElement("https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/68px-Chess_klt45.svg.png");
let whitePawn = urlToElement("https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/68px-Chess_plt45.svg.png");

let selectedCell;
let pieces = [];
let BLACK_PLAYER;
let WHITE_PLAYER;
const BOARD_SIZE = 8;
