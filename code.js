function Chess() {
    const BOARD_SIZE = 8;
    const boardEl = document.createElement("table");
    boardEl.classList.add("chessBoard");

    document.body.appendChild(boardEl);
    for (let x = 0; x < BOARD_SIZE; x++) {
        let row = boardEl.insertRow();
        for (let y = 0; y < BOARD_SIZE; y++) {
            let cell = row.insertCell();
            cell.innerHTML = addImg(x, y);
            cell.addEventListener('click', () => cell.classList.add("clicked"));
            if ((x + y) % 2 === 0) {
                cell.classList.add("white");
            } else {
                cell.classList.add("black");
            }
            if (x === 0 || x === 1) {
                cell.classList.add("upSide")
            }
        }
    }
}

window.addEventListener('load', Chess);



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

function addImg(a, b) {
    if (a === 1) {
        return blackPawn
    } else if ((a === 0 && b === 0) || (a === 0 && b === 7)) {
        return blackRook;
    } else if ((a === 0 && b === 1) || (a === 0 && b === 6)) {
        return blackKnight;
    } else if ((a === 0 && b === 2) || (a === 0 && b === 5)) {
        return blackBishop;
    } else if (a === 0 && b === 3) {
        return blackQueen;
    } else if (a === 0 && b === 4) {
        return blackKing;
    }
    if (a === 6) {
        return whitePawn;
    } else if ((a === 7 && b === 0) || (a === 7 && b === 7)) {
        return whiteRook;
    } else if ((a === 7 && b === 1) || (a === 7 && b === 6)) {
        return whiteKnight;
    } else if ((a === 7 && b === 2) || (a === 7 && b === 5)) {
        return whiteBishop;
    } else if (a === 7 && b === 3) {
        return whiteQueen;
    } else if (a === 7 && b === 4) {
        return whiteKing;
    }
    else return null
}
