const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

async function bubble() {
    var speed = algoSpeed();
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;
    var sorted = false;
    while (!sorted) {
        /*
        var bob = document.getElementById("bob");
        var divElement = document.createElement("p");
        divElement.innerHTML = "yes";
        bob.appendChild(divElement); */
        sorted = true;
        for (var i = 0; i < barsList.length-1; i++) {
            var curBar = barsList[i];
            var nextBar = barsList[i+1];
            if (Number(curBar.textContent) > Number(nextBar.textContent)) {
                curBar.style.backgroundColor = "red";
                nextBar.style.backgroundColor = "red";
                await delay(speed);
                nextBar.parentNode.insertBefore(nextBar, curBar);
                sorted = false;
            } else {
                curBar.style.backgroundColor = "green";
                nextBar.style.backgroundColor = "green";
            }
            await delay(speed);
            curBar.style.backgroundColor = getColourVar("--secondaryColour");
            nextBar.style.backgroundColor = getColourVar("--secondaryColour");
        }
    }
}

async function insertion() {
    var speed = algoSpeed();
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;
    for (var i = 1; i < barsList.length; i++) {
        var curBar = barsList[i];
        var prevBar = barsList[i-1];
        var prevBarIndex = i-1;
        while (Number(curBar.textContent) < Number(prevBar.textContent)) {
            curBar.style.backgroundColor = "red";
            prevBar.style.backgroundColor = "red";
            await delay(speed);
            curBar.parentNode.insertBefore(curBar, prevBar);
            curBar.style.backgroundColor = getColourVar("--secondaryColour");
            prevBar.style.backgroundColor = getColourVar("--secondaryColour");
            await delay(speed);
            if (prevBarIndex == 0) break;
            prevBar = barsList[--prevBarIndex]; 
        }
    }
}


