async function run() {
    runBtn(combSort, elements);
}

async function combSort(data) {
    let length = data.length;
    let shrink = 1.3;
    let gap = length;
    let sorted = false;

    while (!sorted) {
        if (!running) return;
        gap = parseInt(gap/shrink);
        if (gap <= 1) {
            sorted = true;
            gap = 1;
        }

        for (let i = 0; i < length-gap; i++) {
            if (!running) return;
            let sm = gap + i;
            if (compare(i, sm)) {
                await swap(i, sm);
                sorted = false;
            }
        }
    }
}

var codes = {
    "C": `
void combSort(int* arr, int length) {
    int sm;
    float shrink = 1.3;
    int gap = length;
    int sorted = 0;

    while (!sorted) {
        gap /= shrink;
        if (gap <= 1) {
            sorted = 1;
            gap = 1;
        }

        for (int i = 0; i < length-gap; i++) {
            sm = gap + i;
            if (arr[i] > arr[sm]) {
                int temp = arr[i];
                arr[i] = arr[sm];
                arr[sm] = temp;
                sorted = 0;
            }
        }
    }
}`,
    "C++": `
void combSort(int* arr, int length) {
    int sm;
    float shrink = 1.3;
    int gap = length;
    bool sorted = false;

    while (!sorted) {
        gap = floor(gap/shrink);
        if (gap <= 1) {
            sorted = true;
            gap = 1;
        }

        for (int i = 0; i < length-gap; i++) {
            sm = gap + i;
            if (arr[i] > arr[sm]) {
                int temp = arr[i];
                arr[i] = arr[sm];
                arr[sm] = temp;
                sorted = false;
            }
        }
    }
}`,
    "Java": `
public static void combSort(int[] arr) {
    int sm;
    int length = arr.length;
    double shrink = 1.3;
    int gap = length;
    boolean sorted = false;

    while (!sorted) {
        gap = (int)Math.floor(gap/shrink);
        if (gap <= 1) {
            sorted = true;
            gap = 1;
        }

        for (int i = 0; i < length-gap; i++) {
            sm = gap + i;
            if (arr[i] > arr[sm]) {
                int temp = arr[i];
                arr[i] = arr[sm];
                arr[sm] = temp;
                sorted = false;
            }
        }
    }
}`,
    "JavaScript": `
function combSort(arr) {
    let length = arr.length;
    let shrink = 1.3;
    let gap = length;
    let sorted = false;

    while (!sorted) {
        gap = parseInt(gap/shrink);
        if (gap <= 1) {
            sorted = true;
            gap = 1;
        }

        for (let i = 0; i < length-gap; i++) {
            let sm = gap + i;
            if (arr[i] > arr[sm]) {
                [arr[i], arr[sm]] = [arr[sm], arr[i]]
                sorted = false;
            }
        }
    }
}`,
    "Python": `
def comb_sort(arr):
    length = len(arr)
    shrink = 1.3
    gap = length
    sorted = False

    while not sorted:
        gap = int(gap/shrink)
        if gap <= 1:
            sorted = True
            gap = 1

        for i in range(length-gap):
            sm = gap + i
            if arr[i] > arr[sm]:
                arr[i], arr[sm] = arr[sm], arr[i]
                sorted = False`
}
