async function run() {
    runBtn(gnomeSort, elements);
}

async function gnomeSort(elements) {
    let i = 1;
    let j = 2;

    while (i < elements.length) {
        if (!running) return;
        if (!compare(i-1, i)) {
            i = j;
            j++;
        } else {
            await swap(i-1, i);
            i--;

            if (i == 0) {
                i = j;
                j ++;
            }
        }
    }
}

var codes = {
    "C": `
void swap(int* a, int* b) {
    int c = *b;
    *b = *a;
    *a = c;
}

void gnomeSort(int arr[], int n) {
    int index = 0;

    while (index < n) {
        if (index == 0)
            index++;
        if (arr[index] >= arr[index - 1])
            index++;
        else {
            swap(arr[index], arr[index - 1]);
            index--;
        }
    }
}`,
    "C++": `
void swap(int* a, int* b) {
    int c = *b;
    *b = *a;
    *a = c;
}

void gnomeSort(int arr[], int n) {
    int index = 0;

    while (index < n) {
        if (index == 0)
            index++;
        if (arr[index] >= arr[index - 1])
            index++;
        else {
            swap(arr[index], arr[index - 1]);
            index--;
        }
    }
}`,
    "Java": `
public void gnomeSort(int arr[], int n) {
    int index = 0;

    while (index < n) {
        if (index == 0)
            index++;
        if (arr[index] >= arr[index - 1])
            index++;
        else {
            int temp = 0;
            temp = arr[index];
            arr[index] = arr[index - 1];
            arr[index - 1] = temp;
            index--;
        }
    }
}`,
    "JavaScript": `
function gnomeSort(arr) {
    function moveBack(i) {
        for( ; i > 0 && arr[i-1] > arr[i]; i--) {
            var t = arr[i];
            arr[i] = arr[i-1];
            arr[i-1] = t;
        }
    }
    for (var i = 1; i < arr.length; i++) {
        if (arr[i-1] > arr[i]) moveBack(i);
    }
}`,
    "Python": `
def gnomeSort( arr, n):
    index = 0
    while index < n:
        if index == 0:
            index = index + 1
        if arr[index] >= arr[index - 1]:
            index = index + 1
        else:
            arr[index], arr[index-1] = arr[index-1], arr[index]
            index = index - 1`
}
