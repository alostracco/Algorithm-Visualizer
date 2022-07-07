function startStopButton() {
    var button = document.getElementById("startButton");
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;
    if (button.innerHTML == "Visualize") {
        button.innerHTML = "Stop";
        var title = document.getElementById("algoTitle").innerHTML;
        var endIndex = barsList.length;
        if (title == "Bubble Sort") bubble();
        else if (title == "Insertion Sort") insertion();
        else if (title == "Selection Sort") selection();
        else if (title == "Merge Sort") merge(0, endIndex, true);
        else if (title == "Quick Sort") quick(0, endIndex-1);
        else if (title == "Heap Sort") heap(endIndex);
    }
    else {
        button.innerHTML = "Visualize";
    }
}

function getColourVar(variable) {
    var root = document.querySelector(":root");
    return getComputedStyle(root).getPropertyValue(variable);
}

function generateGrid(nodeSideLength) {
    var grid = document.getElementById("grid");
    
    var topSection = document.getElementById("topSection");
    var algoTitle = document.getElementById("algoTitle");
    var topHeight = topSection.clientHeight + algoTitle.clientHeight;
    var gridHeight = body.clientHeight - topHeight;
    grid.style.height = gridHeight + "px";

    var numNodesInRow = grid.clientWidth/nodeSideLength;
    var numRows = gridHeight/nodeSideLength;

    for (var i = 0; i < numRows; i++) {
        var rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        grid.appendChild(rowDiv);
        for (var j = 0; j < numNodesInRow; j++) {
            var node = document.createElement("div");
            var newID = "node_" + i + "_" + j;
            node.classList.add("node");
            node.id = newID;
            node.setAttribute("onmouseover", "drawWall(\'" + newID + "\', false)");
            node.setAttribute("onclick", "drawWall(\'" + newID + "\', \'true\')");
            rowDiv.appendChild(node);
        }
    }
}

function algoSpeed() {
    var speed = document.getElementById("speed").value;
    if (speed == 1) return 1000;
    else if (speed == 2) return 500;
    else if (speed == 3) return 50;
    else if (speed == 4) return 5;
    else return 0.5;
}

generateGrid(25);

function changeAlgo(title) {
    document.getElementById("algoTitle").innerHTML = title;
}

function changeStyle(col1, col2, col3A, col3B) {
    var root = document.querySelector(":root");
    root.style.setProperty("--mainColour", col1);
    root.style.setProperty("--secondaryColour", col2);
    root.style.setProperty("--tertiaryColour", col3A);
    root.style.setProperty("--tertiaryColour2", col3B);
}

function openMenu() {
    document.getElementById("menu").style.width = "100%";
}

function closeMenu() {
    document.getElementById("menu").style.width = "0%";
}

var mouseDown = false;

function activateWalls() {
    mouseDown = true;
}

function deactivateWalls() {
    mouseDown = false;
}

function drawWall(id, isClicked) {
    if (mouseDown || isClicked) {
        var node = document.getElementById(id);
        node.style.backgroundColor = "black";
    }
}
