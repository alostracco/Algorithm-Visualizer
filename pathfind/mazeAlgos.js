function randomWalls() {
    clearWalls();
    clearPath();
    i = numRows*numNodesInRow/3;
    while (i > 0) {
        var randomRow = randomNumGenerator(0, numRows);
        var randomCol = randomNumGenerator(0, numNodesInRow);
        var randomNode = document.getElementById("node_" + randomRow + "_" + randomCol);
        if (!(randomNode.classList.contains("target") || randomNode.classList.contains("start"))) {
            randomNode.classList.add("wall");
            i--;
        }
    }
}