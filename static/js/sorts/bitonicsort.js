window.addEventListener("load", () => {
    let slider = document.getElementById("slider");
    slider.parentNode.removeChild(slider);
    let container = document.getElementsByClassName("slider-container")[0];
    container.innerHTML += '<input type="range" value="6" min="4" max="10" step="1" name="item-num" id="slider" oninput="sliderChangeBitonic()">'
    sliderChangeBitonic();
})

function disableButtons() {
    btn = document.getElementById("run-btn");
    btn.lastElementChild.innerHTML = 'stop'
    btn.onclick = stopBitonic;
    btn.disabled = false;
    document.getElementById("shuffle-btn").disabled = true;
}

function sliderChangeBitonic() {
    running = false;
    let slider = document.getElementById("slider");
    let sliderSpan = document.getElementById("slider-span");
    sliderSpan.innerHTML = 2**slider.value;
    fillBox(2**slider.value);
    activateButtons();
}

function stopBitonic() {
    running = false;
    fillBox(2**document.getElementById("slider").value);
}

async function run() {
    runBtn(bitonicSort, elements, elements.length);
}

async function bitonicSort(arr, n) {
    for (let k = 2; k <= n; k *= 2) {
        for (let j = Math.floor(k/2); j > 0; j = Math.floor(j/2)) {
            for (let i = 0; i < n; i++) {
                if (!running) return;
                let l = i ^ j;
                if (l > i) {
                    if ( ((i&k)==0) && (compare(i, l)) || (((i&k)!=0) && (!compare(i,l)))) await swap(i, l);
                }
            }
        }
    }
}

var codes = {
    "C": `
void bitonicSort(int *arr, int n) {
    int k, j, l, i, temp;
    for (k = 2; k <= n; k *= 2) {
        for (j = k/2; j > 0; j /= 2) {
            for (i = 0; i < n; i++) {
                l = i ^ j;
                if (l > i) {
                    if ( ((i&k)==0) && (arr[i] > arr[l]) || ( ( (i&k)!=0) && (arr[i] < arr[l])) )  {
                        temp = arr[i];
                        arr[i] = arr[l];
                        arr[l] = temp;
                    }
                }
            }
        }
    }
}`,
    "C++": `
void bitonicSort(int *arr, int n) {
    int k, j, l, i, temp;
    for (k = 2; k <= n; k *= 2) {
        for (j = k/2; j > 0; j /= 2) {
            for (i = 0; i < n; i++) {
                l = i ^ j;
                if (l > i) {
                    if ( ((i&k)==0) && (arr[i] > arr[l]) || ( ( (i&k)!=0) && (arr[i] < arr[l])) )  {
                        temp = arr[i];
                        arr[i] = arr[l];
                        arr[l] = temp;
                    }
                }
            }
        }
    }
}`,
    "Java": `
void bitonicSort(int[] arr) {
    int n = arr.length;
    int k, j, l, i, temp;
    for (k = 2; k <= n; k *= 2) {
        for (j = k/2; j > 0; j /= 2) {
            for (i = 0; i < n; i++) {
                l = i ^ j;
                if (l > i) {
                    if ( ((i&k)==0) && (arr[i] > arr[l]) || ( ( (i&k)!=0) && (arr[i] < arr[l])) )  {
                        temp = arr[i];
                        arr[i] = arr[l];
                        arr[l] = temp;
                    }
                }
            }
        }
    }
}`,
    "JavaScript": `
function bitonicSort(arr) {
    let n = arr.length;
    let k, j, l, i, temp;
    for (k = 2; k <= n; k *= 2) {
        for (j = k/2; j > 0; j /= 2) {
            for (i = 0; i < n; i++) {
                l = i ^ j;
                if (l > i) {
                    if ( ((i&k)==0) && (arr[i] > arr[l]) || ( ( (i&k)!=0) && (arr[i] < arr[l])) )  {
                        temp = arr[i];
                        arr[i] = arr[l];
                        arr[l] = temp;
                    }
                }
            }
        }
    }
}`,
    "Python": `
def bitonic_sort(arr):
    n = len(arr)
    for k in range(2, n+1):
        j = k // 2
        while j > 0:
            for i in range(0, n):
                l = i ^ j
                if l > i:
                    if ( ((i&k)==0) and (arr[i] > arr[l]) or ( ( (i&k)!=0) and (arr[i] < arr[l])) ):
                        temp = arr[i]
                        arr[i] = arr[l]
                        arr[l] = temp
            j //= 2`
}
