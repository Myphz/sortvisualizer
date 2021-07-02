async function run() {
    runBtn(radixBucketSort, elements);
}

async function radixBucketSort (arr) {
    let delay = SORT_DELAY / elements.length;
    var idx1, idx2, idx3, len1, len2, radix, radixKey;
    var radices = {}, buckets = {}, num, curr;
    var currLen, radixStr, currBucket;

    len1 = arr.length;
    len2 = 10;

    for (idx1 = 0;idx1 < len1;idx1++) {
     radices[(parseInt(getValue(idx1)*10)).toString().length] = 0;
    }

    for (radix in radices) {
     len1 = arr.length;
     for (idx1 = 0;idx1 < len1;idx1++) {
       curr = parseInt(getValue(idx1)*10);
       currLen = curr.toString().length;
       if (currLen >= radix) {

         radixKey = curr.toString()[currLen - radix];

         if (!buckets.hasOwnProperty(radixKey)) {
           buckets[radixKey] = [];
         }

         buckets[radixKey].push(curr);
       } else {
         if (!buckets.hasOwnProperty('0')) {
           buckets['0'] = [];
         }
         buckets['0'].push(curr);
       }
     }

     idx1 = 0;
     for (idx2 = 0;idx2 < len2;idx2++) {
         if (!running) return;
       if (buckets[idx2] != null) {
         currBucket = buckets[idx2];
         len1 = currBucket.length;
         for (idx3 = 0;idx3 < len1;idx3++) {

             if (!running) return;
            if (idx1 < arr.length) resetColor(idx1);
            arr[idx1].style.height = currBucket[idx3] / 10 + "%";
            playNote(calculateFreq(idx1), NOTE_DURATION);
            idx1++;
            if (idx1 < arr.length) changeColor(idx1, RED);
            await sleep(delay);
         }
       }
     }
     buckets = {};
    }
}

var codes = {
    "C": `
int getMax (int a[], int n){
   int max = a[0];
   for (int i = 1; i < n; i++)
      if (a[i] > max)
         max = a[i];
   return max;
}

void radixSort (int a[], int n){
   int bucket[10][10], bucket_cnt[10];
   int i, j, k, r, NOP = 0, divisor = 1, lar, pass;
   lar = getMax (a, n);
   while (lar > 0) {
      NOP++;
      lar /= 10;
   }
   for (pass = 0; pass < NOP; pass++) {
      for (i = 0; i < 10; i++) {
         bucket_cnt[i] = 0;
      }
      for (i = 0; i < n; i++) {
         r = (a[i] / divisor) % 10;
         bucket[r][bucket_cnt[r]] = a[i];
         bucket_cnt[r] += 1;
      }
      i = 0;
      for (k = 0; k < 10; k++){
         for (j = 0; j < bucket_cnt[k]; j++){
            a[i] = bucket[k][j];
            i++;
         }
      }
      divisor *= 10;
   }
}`,

    "C++": `
int getMax(int arr[], int n)
{
    int mx = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > mx)
            mx = arr[i];
    return mx;
}

void countSort(int arr[], int n, int exp)
{
    int output[n];
    int i, count[10] = { 0 };

    for (i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    for (i = 1; i < 10; i++)
        count[i] += count[i - 1];

    for (i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    for (i = 0; i < n; i++)
        arr[i] = output[i];
}

void radixSort(int arr[], int n)
{

    int m = getMax(arr, n);

    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}`,

    "Java": `
static int getMax(int arr[], int n)
{
    int mx = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > mx)
            mx = arr[i];
    return mx;
}

static void countSort(int arr[], int n, int exp)
{
    int output[] = new int[n];
    int i;
    int count[] = new int[10];
    Arrays.fill(count, 0);

    for (i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    for (i = 1; i < 10; i++)
        count[i] += count[i - 1];

    for (i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    for (i = 0; i < n; i++)
        arr[i] = output[i];
}

static void radixSort(int arr[], int n)
{
    int m = getMax(arr, n);

    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}`,

    "JavaScript": `
function getMax(arr) {
    let max = 0;
    for (let num of arr) {
        if (max < num.toString().length) {
            max = num.toString().length
        }
    }
    return max
}

function getPosition(num, place){
    return  Math.floor(Math.abs(num)/Math.pow(10,place))% 10
}

function radixSort(arr) {
    const max = getMax(arr);

    for (let i = 0; i < max; i++) {
        let buckets = Array.from({ length: 10 }, () => [ ])
        for (let j = 0; j < arr.length; j++) {
          buckets[getPosition(arr[ j ], i)].push(arr[ j ]);
        }
        arr = [ ].concat(...buckets);
    }
    return arr
}`,

    "Python": `
def countingSort(arr, exp1):
    n = len(arr)
    output = [0] * (n)
    count = [0] * (10)

    for i in range(0, n):
        index = (arr[i] / exp1)
        count[int(index % 10)] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    i = n - 1
    while i >= 0:
        index = (arr[i] / exp1)
        output[count[int(index % 10)] - 1] = arr[i]
        count[int(index % 10)] -= 1
        i -= 1

    i = 0
    for i in range(0, len(arr)):
        arr[i] = output[i]

def radixSort(arr):
    max1 = max(arr)
    exp = 1
    while max1 / exp > 0:
        countingSort(arr, exp)
        exp *= 10`
}
