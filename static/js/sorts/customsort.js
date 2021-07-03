let run;

class SortError extends Error {
  constructor(...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SortError)
    }

    this.name = 'SortError'
  }
}


async function updateBox(elements, index) {
    if (!running) throw new SortError("Execution stopped.");
    let size = 100 / elements.length;
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.left = i * size + "%";
    }

    if (typeof index !== "undefined") {
        changeColor(index, RED);
        playNote(calculateFreq(index), NOTE_DURATION);
    }

    await sleep(SORT_DELAY / elements.length);

    if (typeof index !== "undefined") resetColor(index);
}

function injectSort(code, entryPoint) {
    eval(code);
    customSort = async (elements) => {
        try {
            document.getElementById("error").innerHTML = "";
            return await eval(entryPoint)(elements);
        } catch (e) {
            if (e instanceof SortError) {
                console.log("lol hai stoppato");
            } else {
                const editorError = CodeMirror(document.getElementById("error"), {
                    value: e.name + ":\n" + e.message,
                    theme: "seti",
                    lineNumbers: true,
                    lineWrapping: true,
                    matchBrackets: true,
                });
                location.href = '#error';
            }
        }
    }

    run = async () => {
        runBtn(customSort, elements);
    }
}

const instructions = `// Write an async function that sorts a list of DOM elements by their value,
// available with getValue(element).

// For more information, check the documentation: https://www.sortvisualizer.com/api

// Here's an example implementation of the selection sort algorithm using the API.

async function selectionSort(elements) {
	let min_idx;
 	for (let i = 0; i < elements.length; i++) {
		min_idx = i;

	  	for (let j = i+1; j < elements.length; j++) {
			if (getValue(min_idx) > getValue(j)) {
				min_idx = j;
			}
  		}

		await swap(i, min_idx);
		/* Can also be written as:
  			[elements[i], elements[min_idx]] = [elements[min_idx], elements[i]]
			await updateBox(elements, i);
		*/
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


window.addEventListener("load", () => {
    let btns = document.getElementsByClassName("btn-code");

    btns[0].addEventListener("click", () => {
        let code = editor.getValue();
        let entryPoint = document.getElementById("entry-point").value;
        injectSort(code, entryPoint);
    })

    btns[1].addEventListener("click", () => {
        fetch("/submit/", {
            method: "POST",

            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },

            body: JSON.stringify({code: editor.getValue()})
        });
    })
});
