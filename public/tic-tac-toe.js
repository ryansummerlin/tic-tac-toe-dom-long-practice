const initializeBoard = function() {
    const gridContainer = document.querySelector(".grid-container");
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

document.addEventListener("DOMContentLoaded", initializeBoard);
