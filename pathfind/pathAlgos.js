async function delay(ms) {
    return new Promise(function(resolve, reject) {
        var stopButton = document.getElementById("startButton")
        if (stopButton.innerHTML == "Visualize") {
            curNode = document.getElementsByClassName("current")[0];
            curNode.classList.remove("current");
            curNode.classList.add("visited");
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
    curNode.classList.add("current");
    queue.push(curNode);
    while (queue.length) {
        curNode = queue.shift();
        var neighbours = graph.incidentEdges(curNode);
        for (var nextNode of neighbours) {
            if (!(nextNode.classList.contains("wall") || nextNode.classList.contains("visited") || nextNode.classList.contains("current"))) {
                await delay(speed);
                curNode = document.getElementsByClassName("current")[0];
                curNode.classList.remove("current");
                curNode.classList.add("visited");
                if (nextNode.classList.contains("target")) return;
                nextNode.classList.add("current");
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