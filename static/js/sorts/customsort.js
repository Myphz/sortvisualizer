class SortError extends Error {
  constructor(...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SortError)
    }

    this.name = 'SortError'
  }
}

let run = () => {
    location.href = "#sort-cover";
};

let clicked = false;
let submitted = false;

CodeMirror.keyMap.default["Shift-Tab"] = "indentLess";
CodeMirror.keyMap.default["Tab"] = "indentMore";

byId("entry-point").onkeypress = function(e) {
    var chr = String.fromCharCode(e.which);
    if ("(-+* /)".indexOf(chr) >= 0)
        return false;
};

async function updateBox(elements, index1, index2, index3) {
    if (!running) throw new SortError("Execution stopped.");
    let size = 100 / elements.length;
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.left = i * size + "%";
    }

    let indexes = [index1, index2, index3];
    let colors = [RED, GREEN, BLUE];

    for (let i = 0; i < indexes.length; i++) {
        if (typeof indexes[i] !== "undefined") {
            changeColor(indexes[i], colors[i]);
            playNote(calculateFreq(indexes[i]), NOTE_DURATION);
        }
    }

    await sleep(SORT_DELAY / elements.length);

    for (let i = 0; i < indexes.length; i++) {
        if (typeof indexes[i] !== "undefined") {
            resetColor(indexes[i]);
        }
    }
}

const instructions = `// Write an async function that sorts a list of DOM elements by their value,
// available with getValue(element).

// For more information, check the documentation: https://www.sortvisualizer.com/docs

// Here's an example implementation of the Selection Sort algorithm visualization using the API.

async function selectionSort(elements) {
	let min_idx;
    // Loop over all the elements
 	for (let i = 0; i < elements.length; i++) {
		min_idx = i;

        // Find the index of the minimum element in the unsorted part
	  	for (let j = i+1; j < elements.length; j++) {
			if (getValue(min_idx) > getValue(j)) {
				min_idx = j;
			}
  		}

        // Swap the current index and the minimum index
		await swap(i, min_idx);
		// Can also be written as:
  		// [elements[i], elements[min_idx]] = [elements[min_idx], elements[i]]
		// await updateBox(elements, i);
 	}
}`


const editor = CodeMirror(document.getElementById("code-test"), {
    value: instructions,
    theme: "seti",
    lineNumbers: true,
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentWithTabs: true,
    indentUnit: 4,
    extraKeys: {
        "F11": function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },

        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        },
        "Ctrl-/": "toggleComment",
    }
});

window.onbeforeunload = () => {
    if (editor.getValue() === instructions || submitted) {
        return undefined;
    }

    return "Are you sure you want to leave? Your algorithm implementation will be lost!";
}

window.addEventListener("load", () => {
    byId("btn-code").addEventListener("click", () => {
        let code = editor.getValue();
        let entryPoint = byId("entry-point").value;
        injectSort(code, entryPoint);
    })

    let submit = byId("btn-submit")

    submit.addEventListener("click", () => {
        let text = byId("btn-submit-text");
        let icon = byId("btn-submit-icon");
        clicked = true;
        submit.disabled = true;

        fetch("/submit/", {
            method: "POST",

            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },

            body: JSON.stringify({code: editor.getValue()})

        }).then(async response => {
            if (response.ok) {
                submitted = true;
                text.innerHTML = "SUBMITTED";
                icon.innerHTML = "<i class='material-icons'>check</i>";
            } else {
                submitted = false;
                byId("success-text").innerHTML = "An error occured.<br>Please try again later."
                text.innerHTML = "ERROR";
                icon.innerHTML = "<i class='material-icons'>close</i>";
            }

            icon.firstElementChild.classList.remove("loading");
            await sleep(3000);
            clicked = false;
            byId("success-popup").style.opacity = 0;
            submit.style.cursor = "default";
            submit.disabled = false;
        });

        text.innerHTML = "SUBMITTING";
        icon.innerHTML = "<i class='material-icons'>autorenew</i>";

        icon.firstElementChild.classList.add("loading");
    })
});

function injectSort(code, entryPoint) {
    eval(code);
    customSort = async (elements) => {
        try {

            let startSorted = isSorted(elements);

            byId("error-title").style.opacity = 0;
            byId("error").innerHTML = "";
            await eval(entryPoint)(elements);

            let afterSorted = isSorted(elements);

            let successPopup = byId("success-popup");
            byId("success-text").innerHTML = `Great job! Your code is working!<br>
            Click the button below to submit<br>
            your code and send it to us!`

            byId("btn-submit-text").innerHTML = "SUBMIT";
            byId("btn-submit-icon").innerHTML = "<i class='material-icons'>file_upload</i>";

            if (!startSorted && afterSorted && code != instructions && entryPoint != "selectionSort") {
                byId("success-popup").style.opacity = 1;
                byId("btn-submit").style.cursor = "pointer";
                byId("btn-submit").disabled = false;
            }
            sleep(5000).then(
                () => {
                    if (!clicked) successPopup.style.opacity = 0;
                }
            );

        } catch (e) {

            if (!(e instanceof SortError)) {
                byId("error-title").style.opacity = 1;
                const editorError = CodeMirror(byId("error"), {
                    value: e.name + ":\n" + e.message,
                    readOnly: true,
                    theme: "seti",
                    lineNumbers: true,
                    lineWrapping: true,
                    matchBrackets: true,
                });
                location.href = '#error';
            }
        }
    }

    run = () => {
        runBtn(customSort, elements);
    }

    byId("run-btn").onclick = run;
}
