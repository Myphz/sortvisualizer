async function run() {
    runBtn(pancakeSort, elements);
}

async function flip(arr, k) {
    let left = 0;
    while (left < k) {
        if (!running) return;
        await swap(left, k);
        k--;
        left++;
    }
}

function max_index(arr, k) {
    let index = 0;
    for (let i = 0; i < k; i++) {
        if (compare(i, index)) {
            index = i;
        }
    }
    return index;
}

async function pancakeSort(arr) {
    let n = arr.length;
    while (n > 1) {
        if (!running) return;
        let maxdex = max_index(arr, n);
        if (maxdex != n) {
            await flip(arr, maxdex);
            await flip(arr, n-1);
        }
        n--;
    }
}

var codes = {
    "C": `
void flip(int* arr, int k) {
    int left = 0;
    while (left < k) {
        int temp = arr[left];
        arr[left] = arr[k];
        arr[k] = temp;
        k--;
        left++;
    }
}

int maxIndex(int* arr, int k) {
    int index = 0;
    for (int i = 0; i < k; i++) {
        if (arr[i] > arr[index]) {
            index = i;
        }
    }
    return index;
}

void pancakeSort(int* arr, int n) {
    int maxdex;
    while (n > 1) {
        maxdex = maxIndex(arr, n);
        if (maxdex != n) {
            flip(arr, maxdex);
            flip(arr, n-1);
        }
        n--;
    }
}`,
    "C++": `
void flip(int* arr, int k) {
    int left = 0;
    while (left < k) {
        int temp = arr[left];
        arr[left] = arr[k];
        arr[k] = temp;
        k--;
        left++;
    }
}

int maxIndex(int* arr, int k) {
    int index = 0;
    for (int i = 0; i < k; i++) {
        if (arr[i] > arr[index]) {
            index = i;
        }
    }
    return index;
}

void pancakeSort(int* arr, int n) {
    int maxdex;
    while (n > 1) {
        maxdex = maxIndex(arr, n);
        if (maxdex != n) {
            flip(arr, maxdex);
            flip(arr, n-1);
        }
        n--;
    }
}`,
    "Java": `
public static void flip(int[] arr, int k) {
    int left = 0;
    while (left < k) {
        int temp = arr[left];
        arr[left] = arr[k];
        arr[k] = temp;
        k--;
        left++;
    }
}

public static int maxIndex(int[] arr, int k) {
    int index = 0;
    for (int i = 0; i < k; i++) {
        if (arr[i] > arr[index]) {
            index = i;
        }
    }
    return index;
}

public static void pancakeSort(int[] arr) {
    int maxdex;
    int n = arr.length;
    while (n > 1) {
        maxdex = maxIndex(arr, n);
        if (maxdex != n) {
            flip(arr, maxdex);
            flip(arr, n-1);
        }
        n--;
    }
}`,
    "JavaScript": `
function flip(arr, k) {
    let left = 0;
    while (left < k) {
        [arr[left], arr[k]] = [arr[k], arr[left]];
        k--;
        left++;
    }
}

function max_index(arr, k) {
    let index = 0;
    for (let i = 0; i < k; i++) {
        if (arr[i] > arr[index]) {
            index = i;
        }
    }
    return index;
}

function pancakeSort(arr) {
    let n = arr.length;
    while (n > 1) {
        let maxdex = max_index(arr, n);
        if (maxdex != n) {
            flip(arr, maxdex);
            flip(arr, n-1);
        }
        n--;
    }
}`,
    "Python": `
def flip(arr, k):
  left = 0
  while left < k:
    arr[left], arr[k] = arr[k], arr[left]
    k -= 1
    left += 1

def max_index(arr, k):
  index = 0
  for i in range(k):
    if arr[i] > arr[index]:
      index = i
  return index

def pancake_sort(arr):
  n = len(arr)
  while n > 1:
    maxdex = max_index(arr, n)
    if maxdex != n:
      flip(arr, maxdex)
      flip(arr, n - 1)
    n -= 1`
}
