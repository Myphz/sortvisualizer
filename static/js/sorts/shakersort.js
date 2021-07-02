async function run() {
    runBtn(shakerSort, elements);
}


async function shakerSort(nums) {
    let is_Sorted = true;
    while (is_Sorted) {
        for (let i = 0; i< nums.length - 1; i++) {
            if (!running) return;
            if (compare(i, i+1)) {
                await swap(i, i+1);
                is_Sorted = true;
            }
        }

       if (!is_Sorted)
           break;

       is_Sorted = false;

       for (let j = nums.length - 1; j > 0; j--){
           if (!running) return;
            if (compare(j-1, j)) {
               await swap(j-1, j);
               is_Sorted = true;
            }
       }
    }
}

var codes = {
    "C": `
void swap(int *xp, int *yp) {
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}

void CocktailSort(int a[], int n) {
    int swapped = 1;
    int start = 0;
    int end = n - 1;

    while (swapped) {
        swapped = 0;

        for (int i = start; i < end; ++i) {
            if (a[i] > a[i + 1]) {
                swap(a[i], a[i + 1]);
                swapped = 1;
            }
        }

        if (!swapped)
            break;

        swapped = 0;

        --end;

        for (int i = end - 1; i >= start; --i)
        {
            if (a[i] > a[i + 1]) {
                swap(a[i], a[i + 1]);
                swapped = 1;
            }
        }

        ++start;
    }
}`,
    "C++": `
void swap(int *xp, int *yp) {
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}

void CocktailSort(int a[], int n) {
    bool swapped = true;
    int start = 0;
    int end = n - 1;

    while (swapped) {
        swapped = false;

        for (int i = start; i < end; ++i) {
            if (a[i] > a[i + 1]) {
                swap(a[i], a[i + 1]);
                swapped = true;
            }
        }

        if (!swapped)
            break;

        swapped = false;

        --end;

        for (int i = end - 1; i >= start; --i)
        {
            if (a[i] > a[i + 1]) {
                swap(a[i], a[i + 1]);
                swapped = true;
            }
        }

        ++start;
    }
}`,
    "Java": `
void cocktailSort(int a[])
{
    boolean swapped = true;
    int start = 0;
    int end = a.length;

    while (swapped == true) {
        swapped = false;

        for (int i = start; i < end - 1; ++i) {
            if (a[i] > a[i + 1]) {
                int temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
            }
        }

        if (swapped == false)
            break;
        swapped = false;

        end = end - 1;

        for (int i = end - 1; i >= start; i--) {
            if (a[i] > a[i + 1]) {
                int temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
            }
        }

        start = start + 1;
    }
}`,
    "JavaScript": `
function cocktailShakerSort(nums) {

    let is_Sorted = true;
    while (is_Sorted) {
        for (let i = 0; i< nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                let temp = nums[i];
                nums[i] = nums[i + 1];
                nums[i+1] = temp;
                is_Sorted = true;
            }
        }

        if (!is_Sorted)
            break;

        is_Sorted = false;

        for (let j = nums.length - 1; j > 0; j--) {
            if (nums[j-1] > nums[j]) {
                let temp = nums[j];
                nums[j] = nums[j - 1];
                nums[j - 1] = temp;
                is_Sorted = true;
            }
        }
    }
}`,
    "Python": `
def cocktailSort(a):
    n = len(a)
    swapped = True
    start = 0
    end = n-1
    while (swapped == True):
        swapped = False

        for i in range(start, end):
            if (a[i] > a[i + 1]):
                a[i], a[i + 1] = a[i + 1], a[i]
                swapped = True

        if (swapped == False):
            break

        swapped = False
        end = end-1

        for i in range(end-1, start-1, -1):
            if (a[i] > a[i + 1]):
                a[i], a[i + 1] = a[i + 1], a[i]
                swapped = True

        start = start + 1`
}
