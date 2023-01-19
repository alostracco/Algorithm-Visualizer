function startStopButton() {
    var button = document.getElementById("startButton");
    if (button.innerHTML == "Visualize") {
        button.innerHTML = "Stop";
        var title = document.getElementById("algoTitle").innerHTML;
        if (title == "Dijkstra\'s Algorithm") dijkstra();
        else if (title == "Breadth First Search") bfs();
        else if (title == "Depth First Search") dfs();
        else if (title == "A* Search") Astar();
    }
    else {
        button.innerHTML = "Visualize";
    }
}

function getColourVar(variable) {
    var root = document.querySelector(":root");
    return getComputedStyle(root).getPropertyValue(variable);
}

var numNodesInRow;
var numRows;

function generateGrid(sliderValue) {
    if (sliderValue == 1) var nodeSideLength = 50;
    else if (sliderValue == 2) var nodeSideLength = 25;
    else var nodeSideLength = 10;
    var grid = document.getElementById("grid");
    
    var topSection = document.getElementById("topSection");
    var algoTitle = document.getElementById("algoTitle");
    var topHeight = topSection.clientHeight + algoTitle.clientHeight;
    var gridHeight = body.clientHeight - topHeight;
    grid.style.height = gridHeight + "px";

    numNodesInRow = grid.clientWidth/nodeSideLength;
    numRows = gridHeight/nodeSideLength;
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    for (var i = 0; i < numRows; i++) {
        var rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        grid.appendChild(rowDiv);
        for (var j = 0; j < numNodesInRow; j++) {
            var node = document.createElement("div");
            var newID = "node_" + i + "_" + j;
            node.classList.add("node");
            node.style.setProperty("height", (nodeSideLength-1)+"px");
            node.style.setProperty("width", (nodeSideLength-1)+"px");
            if (i == Math.floor(numRows/2) && j == Math.floor(numNodesInRow/4)) {
                node.classList.add("start");
                node.setAttribute("onmousedown", "activateDrag(" + true + ")");
            }
            else if (i == Math.floor(numRows/2) && j == Math.floor(numNodesInRow/4*3)) {
                node.classList.add("target");
                node.setAttribute("onmousedown", "activateDrag(" + false + ")");
            }
            node.id = newID;
            node.setAttribute("onmouseover", "drawWall(\'" + newID + "\', false)");
            node.setAttribute("onclick", "drawWall(\'" + newID + "\', \'true\')");
            node.setAttribute("onmouseenter", "dragNodeIn(\'" + newID + "\')");
            node.setAttribute("onmouseout", "dragNodeOut(\'" + newID + "\')");
            rowDiv.appendChild(node);
        }
    }
}

generateGrid(2);

function createGraph() {
    var graph = new Graph(numNodesInRow*numRows);
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numNodesInRow; j++) {
            var curNode = document.getElementById("node_" + i + "_" + j);
            graph.addNode(curNode);
        }
    }
    for (var i = 0; i < Math.ceil(numRows); i++) {
        for (var j = Math.ceil(numNodesInRow)-1; j >= 0 ; j--) {
            var curNode = document.getElementById("node_" + i + "_" + j);
            if (j != Math.ceil(numNodesInRow)-1) {
                var rightID = j+1;
                var rightNode = document.getElementById("node_" + i + "_" + rightID);
                graph.addEdge(curNode, rightNode);
            }
            if (i != Math.ceil(numRows)-1) {
                var downID = i+1;
                var downNode = document.getElementById("node_" + downID + "_" + j);
                graph.addEdge(curNode, downNode);
            }
        }
    }
    return graph;
}

function algoSpeed() {
    var speed = document.getElementById("speed").value;
    if (speed == 1) return 1000;
    else if (speed == 2) return 500;
    else if (speed == 3) return 50;
    else if (speed == 4) return 5;
    else return 0.5;
}



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
var nodeDragging = false;
var startPressed = false;
var targetPressed = false;

function activateWalls() {
    if (nodeDragging) return;
    mouseDown = true;
}

function deactivateWalls() {
    if (startPressed) deactivateDrag(true);
    else if (targetPressed) deactivateDrag(false);
    mouseDown = false;
}

function drawWall(id, isClicked) {
    if (mouseDown || isClicked) {
        var node = document.getElementById(id);
        if (node.classList.contains("start") || node.classList.contains("target")) return;
        if (isClicked && node.classList.contains("wall")) node.classList.remove("wall");
        else node.classList.add("wall");
    }
}


function activateDrag(isStartNode) {
    if (isStartNode) {
        startPressed = true;
        var node = document.getElementsByClassName("start");
    } else {
        targetPressed = true;
        var node = document.getElementsByClassName("target");
    }
    nodeDragging = true;
    node[0].removeAttribute("onmousedown");
}

function deactivateDrag(isStartNode) {
    if (isStartNode) {
        startPressed = false;
        var node = document.getElementsByClassName("start");
        node[0].setAttribute("onmousedown", "activateDrag(" + true + ")");
    } else {
        targetPressed = false;
        var node = document.getElementsByClassName("target");
        node[0].setAttribute("onmousedown", "activateDrag(" + false + ")");
    }
    nodeDragging = false;
}

function dragNodeIn(id) {
    var node = document.getElementById(id);
    if (startPressed) {
        node.classList.add("start");
    } else if (targetPressed) {
        node.classList.add("target");
    }
}

function dragNodeOut(id) {
    var node = document.getElementById(id);
    if (startPressed) {
        node.classList.remove("start");
    } else if (targetPressed) {
        node.classList.remove("target");
    }
}

function clearWalls() {
    var walls = document.getElementsByClassName("wall");
    var numWalls = walls.length;
    for (var wallNode = 0; wallNode < numWalls; wallNode++) {
        walls[0].classList.remove("wall");
    }
}


