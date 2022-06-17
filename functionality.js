function startStopButton() {
    var button = document.getElementById("startButton");
    if (button.innerHTML == "Start") {
        button.innerHTML = "Stop";
        var title = document.getElementById("algoTitle").innerHTML;
        if (title == "Bubble Sort") bubble();
        else if (title == "Insertion Sort") insertion();
        else if (title == "Selection Sort") selection();
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
    else if (speed == 3) return 100;
    else if (speed == 4) return 20;
    else return 2;
}

generateChart(document.getElementById("size").value);

function changeAlgo(title) {
    document.getElementById("algoTitle").innerHTML = title;

}

/*
function sliderChange(datasetSize) {
    var values = [];

    for (let i = 0; i < datasetSize; i++) {
        var randomNum = randomNumGenerator(1, datasetSize * 3);
        values.push(randomNum); 
    }

    var data = [{
        y: values,
        marker: {color: getColourVar("--secondaryColour")},
        type: "bar"
    }];
    var layout = {
        title: "Blank Sort",
        plot_bgcolor:"rgba(0,0,0,0)",
        paper_bgcolor:"rgba(0,0,0,0)",
        xaxis: {
            showticklabels: false
        },
        yaxis: {
            showgrid: false,
            showticklabels: false,
            zeroline: false
        }
    };
    Plotly.newPlot("barChart", data, layout, {staticPlot: true});
}
*/

