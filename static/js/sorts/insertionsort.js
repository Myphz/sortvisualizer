async function run() {
    runBtn(insertionSort, elements);
}

async function insertionSort(elements) {
    for (let i = 1; i < elements.length; i++) {
        if (!running) return;
        let j = i;
        while (j > 0 && !compare(j, j-1)) {
            if (!running) return;
            await swap(j, j-1);
            j--;
        }
    }
}

var codes = {
    "C": `
void insertionSort(int arr[], int n)
{
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,

    "C++": `
void insertionSort(int arr[], int n)
{
    int i, key, j;
    for (i = 1; i < n; i++)
    {
        key = arr[i];
        j = i - 1;

        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,

    "Java": `
void insertionSort(int arr[])
{
       int n = arr.length;
       for (int i = 1; i < n; ++i) {
           int key = arr[i];
           int j = i - 1;

           while (j >= 0 && arr[j] > key) {
               arr[j + 1] = arr[j];
               j = j - 1;
           }
           arr[j + 1] = key;
       }
}`,

    "JavaScript": `
function insertionSort(arr, n)
{
    let i, key, j;
    for (i = 1; i < n; i++)
    {
        key = arr[i];
        j = i - 1;

        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,

    "Python": `
def insertionSort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j >= 0 and key < arr[j] :
                arr[j + 1] = arr[j]
                j -= 1
        arr[j + 1] = key`
}
