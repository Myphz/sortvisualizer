async function run() {
    runBtn(heapSort, elements);
}

async function heapify(elements, length, i) {
    if (!running) return;
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    if (left < length && compare(left, largest)) {
        largest = left;
    }

    if (right < length && compare(right, largest)) {
        largest = right;
    }

    if (largest != i) {
        await swap(i, largest);
        await heapify(elements, length, largest);
    }
}

async function heapSort(elements) {
    let length = elements.length;
    let i = Math.floor(length / 2 - 1);
    let k = length - 1;

    while (i >= 0) {
        if (!running) return;
        await heapify(elements, length, i);
        i--;
    }

    while (k >= 0) {
        if (!running) return;
        await swap(0, k);
        await heapify(elements, k, 0);
        k--;
    }
}


var codes = {
    "C": `
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
      largest = left;

    if (right < n && arr[right] > arr[largest])
      largest = right;

    if (largest != i) {
      swap(&arr[i], &arr[largest]);
      heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (int i = n - 1; i >= 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}`,

    "C++": `
void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
      largest = left;

    if (right < n && arr[right] > arr[largest])
      largest = right;

    if (largest != i) {
      swap(arr[i], arr[largest]);
      heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
      heapify(arr, n, i);

    for (int i = n - 1; i >= 0; i--) {
      swap(arr[0], arr[i]);
      heapify(arr, i, 0);
    }
}`,

    "Java": `
public void sort(int arr[]) {
      int n = arr.length;

      for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
      }

      for (int i = n - 1; i >= 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        heapify(arr, i, 0);
      }
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest])
        largest = l;

    if (r < n && arr[r] > arr[largest])
        largest = r;

    if (largest != i) {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        heapify(arr, n, largest);
    }
}`,

    "JavaScript": `
function heapSort(array) {
  let size = array.length

  for (let i = Math.floor(size / 2 - 1); i >= 0; i--)
    heapify(array, size, i)

  for (let i = size - 1; i >= 0; i--) {
    let temp = array[0]
    array[0] = array[i]
    array[i] = temp
    heapify(array, i, 0)
  }
}

function heapify(array, size, i) {
  let max = i
  let left = 2 * i + 1
  let right = 2 * i + 2

  if (left < size && array[left] > array[max])
    max = left

  if (right < size && array[right] > array[max])
    max = right

  if (max != i) {
    let temp = array[i]
    array[i] = array[max]
    array[max] = temp

    heapify(array, size, max)
  }
}`,

    "Python": `
def heapify(arr, n, i):
  largest = i
  l = 2 * i + 1
  r = 2 * i + 2

  if l < n and arr[i] < arr[l]:
      largest = l

  if r < n and arr[largest] < arr[r]:
      largest = r

  if largest != i:
      arr[i], arr[largest] = arr[largest], arr[i]
      heapify(arr, n, largest)


def heapSort(arr):
  n = len(arr)

  for i in range(n//2, -1, -1):
      heapify(arr, n, i)

  for i in range(n-1, 0, -1):
      arr[i], arr[0] = arr[0], arr[i]

      heapify(arr, i, 0)`
}
