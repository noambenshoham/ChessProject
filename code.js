window.addEventListener('load', () => {
    const board = document.createElement("table");
    board.classList.add("chess");

    document.body.appendChild(board);
    for (let x = 0; x < 8; x++) {
        const line = document.createElement("tr");
        board.appendChild(line);
        for (let y = 0; y < 4; y++) {
            if (x % 2 === 0) {
                const whiteSqare = document.createElement("th");
                line.appendChild(whiteSqare)
                whiteSqare.classList.add("white");
                const blackSquare = document.createElement("th");
                blackSquare.classList.add("black");
                line.appendChild(blackSquare)
            } else {
                const blackSquare = document.createElement("th");
                blackSquare.classList.add("black");
                line.appendChild(blackSquare)
                const whiteSqare = document.createElement("th");
                line.appendChild(whiteSqare)
                whiteSqare.classList.add("white");
            }
        }

    }
})