async function run() {
    runBtn(shellSort, elements);
}


async function shellSort(arr) {
    let delay = SORT_DELAY / elements.length;
    let n = arr.length;
    let interval = ~~(n / 2);
    let j;

    while (interval > 0) {
        for (let i = interval; i < n; i++) {
            if (!running) return;
            temp = arr[i];
            j = i;

            while (j >= interval && getValue(j-interval) > getValue(temp)) {
                if (!running) return;
                arr[j] = arr[j-interval];
                changeColor(j, RED);
                arr[j].style.left = 100 / elements.length * j + "%";
                playNote(calculateFreq(j), NOTE_DURATION);
                await sleep(delay);
                resetColor(j);
                j -= interval;
            }
            arr[j] = temp;
            playNote(calculateFreq(j), NOTE_DURATION);
            arr[j].style.left = 100 / elements.length * j + "%";
            changeColor(j, BLUE);
            await sleep(delay);
            resetColor(j);
        }
        interval = ~~(interval/2);
    }
}

var codes = {
    "C": `
void shellsort(int arr[], int num) {
    int i, j, k, tmp;
    for (i = num / 2; i > 0; i = i / 2) {
        for (j = i; j < num; j++) {
            for(k = j - i; k >= 0; k = k - i) {
                if (arr[k+i] >= arr[k])
                    break;
                else {
                    tmp = arr[k];
                    arr[k] = arr[k+i];
                    arr[k+i] = tmp;
                }
            }
        }
    }
}`,
    "C++": `
int shellSort(int arr[], int n) {
    for (int gap = n/2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i += 1) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];

            arr[j] = temp;
        }
    }
    return 0;
}`,
    "Java": `
int sort(int arr[]) {
    int n = arr.length;

    for (int gap = n/2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i += 1) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];
            arr[j] = temp;
        }
    }
    return 0;
}`,
    "JavaScript": `
function shellSort(arr) {
    let n = arr.length;
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
        for (let i = gap; i < n; i += 1)  {
            let temp = arr[i];

            let j;
            for (j = i; j >= gap && arr[j-gap] > temp; j-=gap)  {
                arr[j] = arr[j-gap];
            }
            arr[j] = temp;
        }
    }
    return arr;
}`,
    "Python": `
def shellSort(arr):
    n = len(arr)
    gap = n//2

    while gap > 0:

        for i in range(gap,n):
            temp = arr[i]
            j = i
            while  j >= gap and arr[j-gap] >temp:
                arr[j] = arr[j-gap]
                j -= gap
            arr[j] = temp
        gap //= 2`
}
