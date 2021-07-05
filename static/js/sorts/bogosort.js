async function run() {
    runBtn(bogoSort, elements);
}

async function bogoSort(arr) {
    while (!isSorted(arr)) {
        if (!running) return;
        await shuffleBogo(arr);
    }
}

async function shuffleBogo(arr) {
    for (let i = 0; i < elements.length; i++) {
        let rand_index = Math.floor(Math.random() * elements.length);
        await swap(i, rand_index, 0);
    }
}

var codes = {
    "C": `
int isSorted(int *a, int n) {
    while (--n >= 1) {
        if (a[n] < a[n - 1]) {
            return 0;
        }
    }
    return 1;
}

void shuffle(int *a, int n) {
    int i, t, temp;
    for (i = 0;i < n;i++) {
        t = a[i];
        temp = rand() % n;
        a[i] = a[temp];
        a[temp] = t;
    }
}

void bogoSort(int *a, int n) {
    while (!isSorted(a, n)) {
        shuffle(a, n);
    }
}`,
    "C++": `
void swap(int *xp, int *yp) {
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}

bool isSorted(int a[], int n) {
    while (--n > 1)
        if (a[n] < a[n - 1])
            return false;
    return true;
}

void shuffle(int a[], int n) {
    for (int i = 0; i < n; i++)
        swap(a[i], a[rand() % n]);
}

void bogoSort(int a[], int n) {
    while (!isSorted(a, n))
        shuffle(a, n);
}`,
    "Java": `
public bogoSort(int[] i) {
	while(!isSorted(i)) {
		shuffle(i);
	}
}

private void shuffle(int[] i) {
	for(int x = 0; x < i.length; ++x) {
		int index1 = (int) (Math.random() * i.length), index2 = (int) (Math.random() * i.length);
		int a = i[index1];
		i[index1] = i[index2];
		i[index2] = a;
	}
}

private boolean isSorted(int[] i) {
	for(int x = 0; x < i.length - 1; ++x) {
		if(i[x] > i[x+1]) {
			return false;
		}
	}
	return true;
}`,
    "JavaScript": `
function isSorted(arr){
    for(var i = 1; i < arr.length; i++){
        if (arr[i-1] > arr[i]) {
            return false;
        }
    }
    return true;
};

function shuffle(arr){
    var count = arr.length, temp, index;
    while(count > 0) {
        index = Math.floor(Math.random() * count);
        count--;

        temp = arr[count];
        arr[count] = arr[index];
        arr[index] = temp;
    }

    return arr;
}

function bogoSort(arr){
    var sorted = false;
    while(!sorted) {
        arr = shuffle(arr);
        sorted = isSorted(arr);
    }
    return arr;
}`,
    "Python": `
import random

def bogo_sort(a):
    n = len(a)
    while (is_sorted(a)== False):
        shuffle(a)

def is_sorted(a):
    n = len(a)
    for i in range(0, n-1):
        if (a[i] > a[i+1] ):
            return False
    return True

def shuffle(a):
    n = len(a)
    for i in range (0,n):
        r = random.randint(0,n-1)
        a[i], a[r] = a[r], a[i] `
}
