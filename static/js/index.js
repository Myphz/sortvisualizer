const minDelay = 700;
const maxDelay = 900;

const minLetters = 10;
const maxLetters = 18;

const delay = 75;

const startAscii = 65;
const endAscii = 91;

const title = {
    "first-header": "SORT",
    "second-header": "VISUALIZER"
};

byId("header").onclick = headerAnimation;
headerAnimation();

function oneHeaderAnimation(whichId) {
    byId(whichId).innerHTML.split("").forEach( (item, i) => {
        letterAnimation(whichId, item, i);
    }
)}

function headerAnimation() {
    oneHeaderAnimation('first-header');
    oneHeaderAnimation('second-header');
}

async function letterAnimation(child, letter, i) {
    await sleep(Math.floor(Math.random() * minDelay) + maxDelay - minDelay);
    let rand = Math.floor(Math.random() * minLetters) + maxLetters - minLetters;
    let target = [];

    for (let k = 0; k < rand; k++) target.push(randomLetter());

    target.push(title[child][i]);

    for (let j = 0; j < target.length; j++) {
        changeLetter(child, target[j], i);
        await sleep(delay);
    }
}

function randomLetter() {
    return String.fromCharCode(startAscii + Math.floor(Math.random() * (endAscii - startAscii)));
}

function changeLetter(child, repl, i) {
    child = byId(child);
    let temp = child.innerHTML;
    child.innerHTML = temp.substr(0, i) + repl + temp.substr(i+1);
}

function sleep(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}
