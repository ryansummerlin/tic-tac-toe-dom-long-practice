

// set up the empty board and populate it with null values
const newBoard = function() {
    let board = [];
    for (let i = 0; i < 3; i++) {
        board.push(Array(3).fill(null));
    }

    return board;
}

let board = newBoard();

// Set up the grid container and the grid item boxes within
const gridContainer = document.createElement("div");
gridContainer.setAttribute("class", "grid-container");

// Set up the buttons - they will get appended to the button-container element in the initializeBoard function
const newGameButton = document.createElement("button");
newGameButton.setAttribute("class", "new-game");
newGameButton.innerText = "New Game";
const giveUpButton = document.createElement("button");
giveUpButton.setAttribute("class", "give-up");
giveUpButton.innerText = "Give Up";

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

    buttonContainer.appendChild(newGameButton);
    buttonContainer.appendChild(giveUpButton);

    // Restore functionality after the browser gets reloaded
    if (sessionStorage.getItem("autosave")) {
        document.body.innerHTML = sessionStorage.getItem("autosave");
        turnTracker = sessionStorage.getItem("turnTracker");
        board = sessionStorage.getItem("board");
        const gridContainer = document.querySelector(".grid-container");
        const giveUpButton = document.querySelector(".give-up");
        const newGameButton = document.querySelector(".new-game");
        gridContainer.addEventListener("click", makeMove);
        giveUpButton.addEventListener("click", giveUp);

        const winnerHeader = document.querySelector("h2");
        if (winnerHeader.style.display === 'block') {
            newGameButton.addEventListener("click", newGame);
        }

    }

}

// The function for creating the X and O markers that will populate the board. This gets called in the makeMove function below
let turnTracker = 0;
const markerArr = ["X", "O"];

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
    const gridContainer = document.querySelector(".grid-container");
    const newGameButton = document.querySelector(".new-game");
    const giveUpButton = document.querySelector(".give-up");

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

    if (turnTracker === 1) {
        giveUpButton.addEventListener("click", giveUp);
        giveUpButton.style.opacity = 1;
    }

    if (checkWinner(board)) {
        let winner = checkWinner(board);
        const winnerHeader = document.querySelector("h2");
        winnerHeader.innerText = `Winner: ${winner}`;
        winnerHeader.style.display = 'block';

        gridContainer.removeEventListener("click", makeMove);

        giveUpButton.removeEventListener("click", giveUp);
        giveUpButton.style.opacity = 0.4;

        newGameButton.addEventListener("click", newGame);
        newGameButton.style.opacity = 1;
    }

    autoSave();

    if (!checkWinner(board)) {
        gridContainer.removeEventListener("click", makeMove);
        setTimeout(computerMakeMove, 1000);
    }

}



// Game logic - check for a winner
const checkWinner = function(board) {
    function checkHorizontalWinner() {
        for (let i = 0; i < board.length; i++) {
            let row = board[i];
            if (row[0] === 'X' && row[1] === 'X' && row[2] === 'X') {
                return 'X';
            }

            if (row[0] === 'O' && row[1] === 'O' && row[2] === 'O') {
                return 'O';
            }
        }

        return false;
    }

    function checkVerticalWinner() {
        for (let i = 0; i < board.length; i++) {
            if (board[0][i] === 'X' && board[1][i] === 'X' && board[2][i] === 'X') {
                return 'X';
            }

            if (board[0][i] === 'O' && board[1][i] === 'O' && board[2][i] === 'O') {
                return 'O';
            }
        }

        return false;
    }

    function checkDiagonalWinner() {
        if (board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X') {
            return 'X';
        }

        if (board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O') {
            return 'O';
        }

        if (board[0][2] === 'X' && board[1][1] === 'X' && board[2][0] === 'X') {
            return 'X';
        }

        if (board[0][2] === 'O' && board[1][1] === 'O' && board[2][0] === 'O') {
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

// New game functionality
const newGame = function(event) {
    const winnerHeader = document.querySelector("h2");
    winnerHeader.style.display = "none";

    board = newBoard();
    // Grab all of the img elements and deletes them
    const allMarkers = document.querySelectorAll("img");
    for (let i = 0; i < allMarkers.length; i++) {
        let child = allMarkers[i];
        child.parentNode.removeChild(child);
    }

    turnTracker = 0;

    const gridContainer = document.querySelector(".grid-container");
    const newGameButton = document.querySelector(".new-game");

    gridContainer.addEventListener("click", makeMove);
    newGameButton.removeEventListener("click", newGame);
    newGameButton.style.opacity = 0.4;

    autoSave();
}


// Give up functionality
const giveUp = function(event) {
    turnTracker++;
    let winner = markerArr[turnTracker % 2];
    const winnerHeader = document.querySelector("h2");
    winnerHeader.innerText = `Winner: ${winner}`;
    winnerHeader.style.display = 'block';

    const gridContainer = document.querySelector(".grid-container");
    gridContainer.removeEventListener("click", makeMove);

    const newGameButton = document.querySelector(".new-game");
    newGameButton.addEventListener("click", newGame);
    newGameButton.style.opacity = 1;

    const giveUpButton = document.querySelector(".give-up");
    giveUpButton.removeEventListener("click", giveUp);
    giveUpButton.style.opacity = 0.4;

    autoSave();

}


// Autosave functionality
const autoSave = function() {
    const htmlContent = document.body.innerHTML;
    sessionStorage.setItem("autosave", htmlContent);
    sessionStorage.setItem("turnTracker", turnTracker);
    sessionStorage.setItem("board", board);
}

// event handlers for initializing the board and handling clicks on the board
document.addEventListener("DOMContentLoaded", initializeBoard);
gridContainer.addEventListener("click", makeMove);


// Computer moves code
const computerMakeMove = function(event) {
    const gridContainer = document.querySelector(".grid-container");

    let row = Math.floor(Math.random() * 3);
    let col = Math.floor(Math.random() * 3);

    while (board[row][col]) {
        row = Math.floor(Math.random() * 3);
        col = Math.floor(Math.random() * 3);
    }

    board[row][col] = markerArr[turnTracker % 2];

    let gridItemArr = document.querySelectorAll(".grid-item");
    let selectedGridItem;
    for (let i = 0; i < gridItemArr.length; i++) {
        let box = gridItemArr[i];
        if (box.dataset.row == row && box.dataset.col == col) {
            selectedGridItem = box;
        }
    }

    const marker = makeMarker(turnTracker);
    selectedGridItem.appendChild(marker);

    turnTracker++;
    gridContainer.addEventListener("click", makeMove);

    if (turnTracker === 1) {
        giveUpButton.addEventListener("click", giveUp);
        giveUpButton.style.opacity = 1;
    }

    if (checkWinner(board)) {
        let winner = checkWinner(board);
        const winnerHeader = document.querySelector("h2");
        winnerHeader.innerText = `Winner: ${winner}`;
        winnerHeader.style.display = 'block';

        gridContainer.removeEventListener("click", makeMove);

        giveUpButton.removeEventListener("click", giveUp);
        giveUpButton.style.opacity = 0.4;

        newGameButton.addEventListener("click", newGame);
        newGameButton.style.opacity = 1;
    }

    autoSave();
}
