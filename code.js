
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
let selectedPiece;

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
            cellElement.addEventListener('click', () => onCellClick(row, col));
        }

    }
    boardData = new BoardData('white_player');
}

window.addEventListener('load', createChessBoard);

function onCellClick(row, col) {
    selectedCell = boardEl.rows[row].cells[col];
    if (!(selectedPiece === undefined) && boardData.tryMove(selectedPiece, row, col)) {
        boardData.clearBoard(boardEl);
        selectedPiece = undefined;

    } else { // First position of the board
        boardData.clearBoard(boardEl);
        const piece = boardData.getPiece(row, col);
        if (!(piece === undefined)) {
            boardData.paintPossibleMoves(piece)
        }
        selectedCell.classList.add('selected');
        selectedPiece = piece;
    }

}