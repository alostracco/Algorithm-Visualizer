const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

async function bubble() {
    

    var speed = algoSpeed();
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;
    var sorted = false;
    while (!sorted) {
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

async function selection() {
    var speed = algoSpeed();
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;
    for (var i = 0; i < barsList.length; i++) {
        var smallestBarIndex = i;
        for (var j = i+1; j < barsList.length; j++) {
            if (Number(barsList[j].textContent) < Number(barsList[smallestBarIndex].textContent)) smallestBarIndex = j;
        }
        barsList[smallestBarIndex].parentNode.insertBefore(barsList[smallestBarIndex], barsList[i]);
        barsList[i+1].parentNode.insertBefore(barsList[i+1], barsList[smallestBarIndex+1]);
    }
}

async function mergeCombine(left, right, isSameLength) {
    var speed = algoSpeed();
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;

    var leftSize = right - left;
    if (isSameLength) var rightSize = leftSize;
    else var rightSize = leftSize + 1;
    
    while (leftSize != 0 && rightSize != 0) {
        if (Number(barsList[left].innerHTML) < Number(barsList[right].innerHTML)) {
            //barsList[left].parentNode.insertBefore(barsList[left], barsList[left+1]);
            left++;
            leftSize--;
        } else {
            barsList[right].parentNode.insertBefore(barsList[right], barsList[left]);
            right++;
            left++;
            rightSize--;
        }
    }
}

function merge(startIndex, endIndex) {
    if (endIndex-startIndex <= 1) return startIndex;

    var midPoint = Math.floor((endIndex-startIndex) / 2 + startIndex);
    var isSameLength = false;
    if ((endIndex-startIndex) % 2 == 0) isSameLength = true;

    mergeCombine(merge(startIndex, midPoint), merge(midPoint, endIndex), isSameLength);
    return startIndex;
}


function quickCombine(left, right) {
    var speed = algoSpeed();
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;

    var midPoint = Math.floor((right-left) / 2 + left);
    barsList[midPoint].parentNode.insertBefore(barsList[midPoint], barsList[left]);
    barsList[left+1].parentNode.insertBefore(barsList[left+1], barsList[midPoint+1]);

    var pivot = Number(barsList[left].textContent);
    var low = left + 1;
    var high = right;

    while (low <= high) {
        while (Number(barsList[high].textContent) > pivot) high--;
        while (low <= high && Number(barsList[low].textContent) <= pivot) low++;
        if (low <= high) {
            barsList[high].parentNode.insertBefore(barsList[high], barsList[low]);
            barsList[low+1].parentNode.insertBefore(barsList[low+1], barsList[high+1]);
            low++;
            high--;
        }
    }
    barsList[high].parentNode.insertBefore(barsList[high], barsList[left]);
    barsList[left+1].parentNode.insertBefore(barsList[left+1], barsList[high+1]);

    return high;
}

function quick(left, right) {
    if (left >= right) return;
    var partition = quickCombine(left, right);
    quick(left, partition-1);
    quick(partition+1, right);
}

function heap() {
    
}
