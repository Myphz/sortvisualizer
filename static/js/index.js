var title = ["SORT", "VISUALIZER"];

window.addEventListener("load", () => {
    document.getElementById("sort-btn").addEventListener("click", openSidenav);

    var header = document.getElementById("header");
    header.children[0].innerHTML.split("").forEach((item, i) => {
        titleAnimation(0, item, i);
    });

    header.children[2].innerHTML.split("").forEach((item, i) => {
        titleAnimation(1, item, i);
    });
});

window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  }, false);

async function titleAnimation(child, letter, i) {
    await sleep(Math.floor(Math.random() * 700) + 200);
    let rand = Math.floor(Math.random() * 10) + 8;
    let target = [];
    for (let k = 0; k < rand; k++) target.push(randomLetter());
    target.push(title[child][i]);
    for (let j = 0; j < target.length; j++) {
        changeLetter(child, target[j], i);
        await sleep(75);
    }
}

function randomLetter() {
    return String.fromCharCode(65+Math.floor(Math.random() * 26));
}

function changeLetter(child, repl, i) {
    if (child == 1) child = 2;
    let header = document.getElementById("header");
    child = header.children[child];
    let temp = child.innerHTML;
    child.innerHTML = temp.substr(0, i) + repl + temp.substr(i+1);
}

function sleep(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}
