class Graph {
    constructor(numNodes) {
        this.numNodes = numNodes;
        this.adjList = new Map();
    }

    addNode(node) {
        this.adjList.set(node, []);
    }

    addEdge(node1, node2) {
        this.adjList.get(node1).push(node2);
        this.adjList.get(node2).push(node1);
    }

    incidentEdges(node) {
        //console.log(this.adjList.get(node));
        return this.adjList.get(node);
    }
}