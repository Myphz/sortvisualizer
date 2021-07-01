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
    let btn = document.getElementsByClassName("btn-code")[0];
    btn.addEventListener("click", () => {
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
