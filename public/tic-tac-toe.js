// set up the empty board and populate it with null values
let board = [];
for (let i = 0; i < 3; i++) {
    board.push(Array(3).fill(null));
}


// Set up the grid container and the grid item boxes within
const gridContainer = document.createElement("div");
gridContainer.setAttribute("class", "grid-container");

const initializeBoard = function() {
    const buttonContainer = document.querySelector(".button-container");
    document.body.insertBefore(gridContainer, buttonContainer);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let gridItem = document.createElement("div");
            gridItem.setAttribute("class", "grid-item");
            gridItem.setAttribute("data-row", i);
            gridItem.setAttribute("data-col", j);
            gridContainer.appendChild(gridItem);
        }
    }
}

// The function for creating the X and O markers that will populate the board. This gets called in the makeMove function below
let turnTracker = 0;
const markerArr = ["x", "o"];

const makeMarker = function(turnTracker) {
    if (turnTracker % 2 === 0) {
        const xMarker = document.createElement("img");
        xMarker.setAttribute("src", "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg");
        xMarker.setAttribute("class", "marker");
        return xMarker;
    } else {
        const oMarker = document.createElement("img");
        oMarker.setAttribute("src", "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg");
        oMarker.setAttribute("class", "marker");
        return oMarker;
    }
}



// Handle the user clicking on a square and check for a winner after
const makeMove = function(event) {
    if (event.target.getAttribute("class") === "marker") {
        return;
    }

    let box = event.target;
    const gridItemChildren = box.children;
    for (let i = 0; i < gridItemChildren.length; i++) {
        let el = gridItemChildren[i];
        if (el.getAttribute("class") === "marker") {
            return;
        }
    }

    const marker = makeMarker(turnTracker);
    event.target.appendChild(marker);

    let row = box.dataset.row;
    let col = box.dataset.col;
    board[row][col] = markerArr[turnTracker % 2];

    turnTracker++;

    if (checkWinner(board)) {
        let winner = checkWinner(board);
        const winnerHeader = document.querySelector("h2");
        winnerHeader.innerText = `Winner: ${winner}`;
        winnerHeader.style.display = 'block';
        gridContainer.removeEventListener("click", makeMove);
    }

}



// Game logic - check for a winner
const checkWinner = function(board) {
    function checkHorizontalWinner() {
        for (let i = 0; i < board.length; i++) {
            let row = board[i];
            if (row[0] === 'x' && row[1] === 'x' && row[2] === 'x') {
                return 'X';
            }

            if (row[0] === 'o' && row[1] === 'o' && row[2] === 'o') {
                return 'O';
            }
        }

        return false;
    }

    function checkVerticalWinner() {
        for (let i = 0; i < board.length; i++) {
            if (board[0][i] === 'x' && board[1][i] === 'x' && board[2][i] === 'x') {
                return 'X';
            }

            if (board[0][i] === 'o' && board[1][i] === 'o' && board[2][i] === 'o') {
                return 'O';
            }
        }

        return false;
    }

    function checkDiagonalWinner() {
        if (board[0][0] === 'x' && board[1][1] === 'x' && board[2][2] === 'x') {
            return 'X';
        }

        if (board[0][0] === 'o' && board[1][1] === 'o' && board[2][2] === 'o') {
            return 'O';
        }

        if (board[0][2] === 'x' && board[1][1] === 'x' && board[2][0] === 'x') {
            return 'X';
        }

        if (board[0][2] === 'o' && board[1][1] === 'o' && board[2][0] === 'o') {
            return 'O';
        }

        return false;
    }

    if (checkHorizontalWinner()) {
        return checkHorizontalWinner();
    } else if (checkVerticalWinner()) {
        return checkVerticalWinner();
    } else if (checkDiagonalWinner()) {
        return checkDiagonalWinner();
    } else if (turnTracker === 9) {
        return "None";
    } else {
        return false;
    }
}

// event handlers for initializing the board and handling clicks on the board
document.addEventListener("DOMContentLoaded", initializeBoard);
gridContainer.addEventListener("click", makeMove);
