async function delay(ms) {
    return new Promise(function(resolve, reject) {
        var stopButton = document.getElementById("startButton")
        if (stopButton.innerHTML == "Visualize") {
            var barChart = document.getElementById("barChart");
            var barsList = barChart.childNodes;
            for (var i = 0; i < barsList.length; i++) {
                barsList[i].style.backgroundColor = getColourVar("--secondaryColour");
            }
            return;
        }
        return setTimeout(resolve, ms);
    })
}

function colourBars(colour, bar1, bar2) {
    bar1.style.backgroundColor = colour;
    if (!(bar2 === undefined)){
        bar2.style.backgroundColor = colour;
    }
}

async function bubble() {
    var speed = algoSpeed();
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;
    for (var i = 0; i < barsList.length-1; i++) {
        for (var j = 0; j < barsList.length-1-i; j++) {
            var curBar = barsList[j];
            var nextBar = barsList[j+1];
            colourBars("green", curBar, nextBar);
            var swapped = false;
            if (Number(curBar.textContent) > Number(nextBar.textContent)) {
                await delay(speed);
                colourBars("red", curBar, nextBar);
                await delay(speed);
                nextBar.parentNode.insertBefore(nextBar, curBar);
                await delay(speed);
                colourBars("green", curBar, nextBar);
                swapped = true;
            }
            await delay(speed);
            if (j == barsList.length-2-i) {
                if (swapped) {
                    colourBars(getColourVar("--tertiaryColour"), curBar);
                    colourBars(getColourVar("--secondaryColour"), nextBar);
                } else if (i == barsList.length-2) colourBars(getColourVar("--tertiaryColour"), curBar, nextBar);
                else {
                    colourBars(getColourVar("--tertiaryColour"), nextBar);
                    colourBars(getColourVar("--secondaryColour"), curBar);
                }
            } else {
                colourBars(getColourVar("--secondaryColour"), curBar, nextBar);
            }
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
        colourBars("green", curBar, prevBar);
        var needsSwap = false;
        while (prevBarIndex >= 0 && Number(curBar.textContent) < Number(barsList[prevBarIndex].textContent)) {
            needsSwap = true;
            colourBars("green", barsList[prevBarIndex]);
            await delay(speed);
            colourBars(getColourVar("--tertiaryColour"), barsList[prevBarIndex]);
            await delay(speed);
            prevBarIndex--;
        }
        if (needsSwap) {
            prevBar = barsList[++prevBarIndex]; 
            colourBars("red", curBar);
            await delay(speed);
            curBar.parentNode.insertBefore(curBar, prevBar);
            await delay(speed);
        }
        colourBars(getColourVar("--tertiaryColour"), curBar, barsList[1]);
        colourBars(getColourVar("--tertiaryColour"), barsList[0]);
    }
    for (var i = 1; i < barsList.length; i++) {
        colourBars(getColourVar("--tertiaryColour"), barsList[i]);
    }
}

async function selection() {
    var speed = algoSpeed();
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;
    for (var i = 0; i < barsList.length-1; i++) {
        var smallestBarIndex = i;
        colourBars("red", barsList[smallestBarIndex]);
        await delay(speed);
        for (var j = i+1; j < barsList.length; j++) {
            colourBars("green", barsList[j]);
            await delay(speed);
            if (Number(barsList[j].textContent) < Number(barsList[smallestBarIndex].textContent)) {
                colourBars(getColourVar("--secondaryColour"), barsList[smallestBarIndex]);
                smallestBarIndex = j;
                colourBars("red", barsList[smallestBarIndex]);
                await delay(speed);
            } else colourBars(getColourVar("--secondaryColour"), barsList[j]);
        }
        colourBars("red", barsList[i]);
        await delay(speed);
        barsList[smallestBarIndex].parentNode.insertBefore(barsList[smallestBarIndex], barsList[i]);
        barsList[i+1].parentNode.insertBefore(barsList[i+1], barsList[smallestBarIndex+1]);
        await delay(speed);
        colourBars(getColourVar("--secondaryColour"), barsList[smallestBarIndex]);
        colourBars(getColourVar("--tertiaryColour"), barsList[i]);
        if (i == barsList.length-2) colourBars(getColourVar("--tertiaryColour"), barsList[i+1]);
    }
}

async function mergeCombine(left, right, isSameLength, isFirstCall) {
    var speed = algoSpeed();
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;

    var leftSize = right - left;
    if (isSameLength) var rightSize = leftSize;
    else var rightSize = leftSize + 1;
    
    while (leftSize != 0 && rightSize != 0) {
        colourBars("green", barsList[left], barsList[right]);
        if (Number(barsList[left].textContent) < Number(barsList[right].textContent)) {
            leftSize--;
        } else {
            await delay(speed);
            colourBars("red", barsList[left], barsList[right]);
            barsList[right].parentNode.insertBefore(barsList[right], barsList[left]);
            right++;
            rightSize--;
        }
        await delay(speed);
        if (isFirstCall) colourBars(getColourVar("--tertiaryColour"), barsList[left]);
        else colourBars(getColourVar("--secondaryColour"), barsList[left]);
        left++;
        if (!isFirstCall) colourBars(getColourVar("--secondaryColour"), barsList[left]);
    }
    if (isFirstCall) {
        for (let i = barsList.length-1; i >= 0; i--) {
            colourBars(getColourVar("--tertiaryColour"), barsList[i]);
        }
    }
}

async function merge(startIndex, endIndex, isFirstCall) {
    if (endIndex-startIndex <= 1) return startIndex;

    var midPoint = Math.floor((endIndex-startIndex) / 2 + startIndex);
    var isSameLength = false;
    if ((endIndex-startIndex) % 2 == 0) isSameLength = true;
    await mergeCombine(await merge(startIndex, midPoint, false), await merge(midPoint, endIndex, false), isSameLength, isFirstCall);
    return startIndex;
}


async function quickCombine(left, right) {
    var speed = algoSpeed();
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;

    var midPoint = Math.floor((right-left) / 2 + left);
    colourBars("yellow", barsList[midPoint]);
    await delay(speed);
    barsList[midPoint].parentNode.insertBefore(barsList[midPoint], barsList[left]);
    barsList[left+1].parentNode.insertBefore(barsList[left+1], barsList[midPoint+1]);
    await delay(speed);
    var pivot = Number(barsList[left].textContent);
    var low = left + 1;
    var high = right;
    colourBars("green", barsList[low], barsList[high]);
    await delay(speed);
    while (low <= high) {
        while (low <= high && Number(barsList[high].textContent) > pivot) {
            colourBars(getColourVar("--secondaryColour"), barsList[high]);
            high--;
            colourBars("green", barsList[high]);
            await delay(speed);
        }
        while (low <= high && Number(barsList[low].textContent) <= pivot) {
            colourBars(getColourVar("--secondaryColour"), barsList[low]);
            low++;
            if (low <= high) colourBars("green", barsList[low]);
            await delay(speed);
        }
        if (low <= high) {
            colourBars("red", barsList[low], barsList[high]);
            await delay(speed);
            barsList[high].parentNode.insertBefore(barsList[high], barsList[low]);
            barsList[low+1].parentNode.insertBefore(barsList[low+1], barsList[high+1]);
            await delay(speed);
            colourBars(getColourVar("--secondaryColour"), barsList[low], barsList[high]);
            low++;
            high--;
        } else {
            if (low < barsList.length) colourBars(getColourVar("--secondaryColour"), barsList[low], barsList[high]);
        }
    }
    colourBars("red", barsList[left], barsList[high]);
    await delay(speed);
    barsList[high].parentNode.insertBefore(barsList[high], barsList[left]);
    barsList[left+1].parentNode.insertBefore(barsList[left+1], barsList[high+1]);
    colourBars(getColourVar("--secondaryColour"), barsList[left]);
    colourBars(getColourVar("--tertiaryColour"), barsList[high]);
    return high;
}

async function quick(left, right) {
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;
    if (left >= right) return;
    var partition = await quickCombine(left, right);
    await quick(left, partition-1);
    for (var i = left; i <= partition-1; i++) {
        colourBars(getColourVar("--tertiaryColour"), barsList[i]);
    }
    await quick(partition+1, right);
    for (var i = partition; i <= right; i++) {
        colourBars(getColourVar("--tertiaryColour"), barsList[i]);
    }
}

async function heapify(len, index) {
    var speed = algoSpeed();
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;
    var largest = index;
    var leftChild = 2 * index + 1;
    var rightChild = 2 * index + 2;
    colourBars("green", barsList[largest]);
    if (leftChild < len && Number(barsList[leftChild].textContent) > Number(barsList[largest].textContent)) {
        largest = leftChild;
    }
    if (rightChild < len && Number(barsList[rightChild].textContent) > Number(barsList[largest].textContent)) {
        largest = rightChild;
    }
    colourBars("green", barsList[largest]);
    await delay(speed);
    if (largest != index) {
        colourBars("red", barsList[largest], barsList[index]);
        await delay(speed);
        barsList[largest].parentNode.insertBefore(barsList[largest], barsList[index]);
        barsList[index+1].parentNode.insertBefore(barsList[index+1], barsList[largest+1]);
        await delay(speed);
        colourBars("green", barsList[largest], barsList[index]);
        await delay(speed);
        colourBars(getColourVar("--secondaryColour"), barsList[largest], barsList[index]);
        await heapify(len, largest);
    } else {
        colourBars(getColourVar("--secondaryColour"), barsList[largest]);
    }
}

async function heap(len) {
    var speed = algoSpeed();
    var barChart = document.getElementById("barChart");
    var barsList = barChart.childNodes;

    for (var i = parseInt(len / 2 - 1); i >= 0; i--) {
        await heapify(len, i);
    }
    for (var i = len - 1; i >= 0; i--) {
        await delay(speed);
        colourBars(getColourVar("--tertiaryColour"), barsList[0]);
        barsList[i].parentNode.insertBefore(barsList[i], barsList[0]);
        barsList[1].parentNode.insertBefore(barsList[1], barsList[i+1]);
        await heapify(i, 0);
    }
    colourBars(getColourVar("--tertiaryColour"), barsList[0]);
}
