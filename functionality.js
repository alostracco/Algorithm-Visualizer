function startStopButton() {
    var button = document.getElementById("startButton");
    if (button.innerHTML == "Start") {
        button.innerHTML = "Stop";
        var title = document.getElementById("algoTitle").innerHTML;
        var barChart = document.getElementById("barChart");
        var barsList = barChart.childNodes;
        var endIndex = barsList.length;
        if (title == "Bubble Sort") bubble();
        else if (title == "Insertion Sort") insertion();
        else if (title == "Selection Sort") selection();
        else if (title == "Merge Sort") merge(0, endIndex, true);
        else if (title == "Quick Sort") quick(0, endIndex-1);
        else if (title == "Heap Sort") heap(endIndex);
    }
    else {
        button.innerHTML = "Start";
    }
}

function randomNumGenerator(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getColourVar(variable) {
    var root = document.querySelector(":root");
    return getComputedStyle(root).getPropertyValue(variable);
}

function generateChart(datasetSize) {
    var barChart = document.getElementById("barChart");
    while (barChart.firstChild) {
        barChart.removeChild(barChart.firstChild);
    }
    for (let i = 0; i < datasetSize; i++) {
        var randomNum = randomNumGenerator(5, 1000);
        var divElement = document.createElement("div");
        divElement.classList.add("bar");
        divElement.style.height = (randomNum/3)+"px";
        divElement.style.width = (1000/datasetSize)+"px";
        divElement.innerHTML = randomNum;
        divElement.style.fontSize = 0; 
        barChart.appendChild(divElement);
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

generateChart(document.getElementById("size").value);

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
