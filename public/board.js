export default class Board {
    constructor() {
        this.numRows = 3;
        this.numCols = 3;
        this.grid = populateGrid();
    }

    populateGrid() {
        for (let i = 0; i < this.numRows; i++) {
            grid.push(Array(this.numCols).fill(null));
        }
    }
}
