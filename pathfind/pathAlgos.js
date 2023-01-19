async function delay(ms) {
    return new Promise(function(resolve, reject) {
        var stopButton = document.getElementById("startButton")
        if (stopButton.innerHTML == "Visualize") {
            return;
        }
        return setTimeout(resolve, ms);
    })
}

function dijkstra() {
    
    
}

async function bfs() {
    var graph = createGraph();
    var speed = algoSpeed();
    var queue = [];
    var curNode = document.getElementsByClassName("start")[0];
    console.log("yes");
    curNode.classList.add("visited");
    queue.push(curNode);
    while (queue.length) {
        console.log("yes");
        curNode = queue.shift();
        var neighbours = graph.incidentEdges(curNode);
        for (var nextNode of neighbours) {
            if (!(nextNode.classList.contains("wall") || nextNode.classList.contains("visited"))) {
                await delay(speed);
                if (nextNode.classList.contains("target")) return;
                nextNode.classList.add("visited");
                queue.push(nextNode);
            }
        }
    }
}

async function dfs() {
    var graph = createGraph();
    await dfsHelper(graph, document.getElementsByClassName("start")[0]);
}

async function dfsHelper(graph, curNode) {
    if (curNode.classList.contains("target")) return true;
    var speed = algoSpeed();
    await delay(speed);
    curNode.classList.add("visited");
    var neighbours = graph.incidentEdges(curNode);
    for (var nextNode of neighbours) {
        if (!(nextNode.classList.contains("wall") || nextNode.classList.contains("visited"))) {
            if (await dfsHelper(graph, nextNode)) return true;
        }
    }
}

function Astar() {
    
}