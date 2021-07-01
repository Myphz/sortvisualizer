let run;

function injectSort(code, entryPoint) {
    eval(code);
    run = async () => {
        runBtn(eval(entryPoint), elements);
    }
}

const editor = CodeMirror(document.getElementById("code-test"), {
    theme: "darcula",
    lineNumbers: true,
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
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
