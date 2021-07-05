const SHUFFLE_DELAY = 2000;
const SORT_DELAY = 5000;
const RED = "element-red";
const BLUE = "element-blue";
const GREEN = "element-green";
const NOTE_DURATION = 50;
const FREQ_MIN = 200;
const FREQ_MAX = 600;
const VOLUME = 0.005;
var elements = [];
var running = false;
const audioCtx = new(window.AudioContext || window.webkitAudioContext)();

window.addEventListener("load", () => {
    fillBox();
    document.getElementById("audio").addEventListener("click", audioButton);
    updateAudioIcon();

    sleep(1432).then(() => {
        if (!running) shuffle();
    });

    let menu = byId("menu-btns");
    if (!menu) return;
    for (let i = 0; i < menu.children.length; i++) {
        menu.children[i].addEventListener("click", () => {
            loadCode(menu.children[i]);
        })
    }
    loadCode(menu.children[0]);
});


function sliderChange() {
    running = false;
    let slider = byId("slider");
    let sliderSpan = byId("slider-span");
    sliderSpan.innerHTML = slider.value;
    fillBox();
    activateButtons();
}

function fillBox(value=byId("slider").value) {
    let box = byId("sort-container");
    let size = 100 / value;
    clearBox(box);

    elements = [];

    for (let i = 0; i < value; i++) {
        let element = document.createElement("div");
        element.classList.add("element");
        element.style.left = i*size + "%";
        element.style.width = size + "%";
        element.style.height = (i+1)*size + "%";
        elements.push(element);
        box.append(element);
    }
}

function clearBox(box) {
    while (box.lastElementChild) {
        box.removeChild(box.lastElementChild);
    }
}

async function shuffle() {
    running = true;
    disableButtons();
    for (let i = 0; i < elements.length; i++) {
        let rand_index = Math.floor(Math.random() * elements.length);
        await swap(i, rand_index, SHUFFLE_DELAY/elements.length);
    }
    activateButtons();
    running = false;
}

async function swap(i, j, delay) {
    if (typeof delay === "undefined") delay = SORT_DELAY / elements.length;
    let freq = Math.floor(( (getValue(i) + getValue(j)) / 200) * (FREQ_MAX - FREQ_MIN) + FREQ_MIN);
    playNote(freq, NOTE_DURATION);
    if (!running) return;
    changeColor(i, RED);
    [elements[i].style.left, elements[j].style.left] = [elements[j].style.left, elements[i].style.left];
    [elements[i], elements[j]] = [elements[j], elements[i]];
    await sleep(delay);
    resetColor(j);
}

function isSorted(elements) {
    for (let i = 1; i < elements.length; i++) {
        if (!compare(i, i-1)) return false;
    }
    return true;
}

function sleep(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

function playNote(frequency, duration) {
    if (!audio) return;
    const oscillator = new OscillatorNode(audioCtx);
    const gainNode = new GainNode(audioCtx);
    oscillator.type = "square";
    oscillator.frequency.value = frequency; // value in hertz
    gainNode.gain.value = VOLUME;
    oscillator.connect(gainNode).connect(audioCtx.destination);
    oscillator.start();

    setTimeout(function() {
        oscillator.stop();
    }, duration);
}

function getValue(i) {
    return typeof i === "object" ? parseFloat(i.style.height.slice(0, -1)) : parseFloat(elements[i].style.height.slice(0, -1));
}

function compare(x, y) {
    return getValue(x) >= getValue(y);
}

async function runBtn(sort, ...args) {
    running = true;
    disableButtons();
    await sort(...args);
    await controlLoop();
    resetColors();
    activateButtons();
    running = false;
}

function stop() {
    running = false;
    fillBox();
}

function disableButtons() {
    btn = byId("run-btn");
    btn.lastElementChild.innerHTML = 'stop'
    btn.onclick = stop;
    btn.disabled = false;
    document.getElementById("shuffle-btn").disabled = true;
}

function activateButtons() {
    btn = byId("run-btn");
    btn.lastElementChild.innerHTML = 'play_arrow'
    btn.onclick = run;
    btn.disabled = false;
    document.getElementById("shuffle-btn").disabled = false;
}

function changeColor(i, color) {
    elements[i].classList.add(color);
}

function resetColor(i) {
    elements[i].classList.remove(RED);
    elements[i].classList.remove(BLUE);
    elements[i].classList.remove(GREEN);
}

function resetColors() {
    for (let i = 0; i < elements.length; i++) resetColor(i);
}

async function controlLoop() {
    let delay = SHUFFLE_DELAY/elements.length/2;
    let anim_length = parseInt(elements.length / 6);
    for (let i = 0; i < elements.length+anim_length; i++) {
        if (!running) return;

        if (i < elements.length) {
            playNote(calculateFreq(i), NOTE_DURATION);
            changeColor(i, GREEN);
        }

        if (i > anim_length-1) {
            resetColor(i-anim_length);
        }
        await sleep(delay);
    }
}

function calculateFreq(i) {
    return getValue(i) / 100 * (FREQ_MAX - FREQ_MIN) + FREQ_MIN;
}

function loadCode(btn) {
    let lang = btn.firstElementChild.title;
    let menu = byId("menu-btns");

    for (let i = 0; i < menu.children.length; i++) {
        menu.children[i].classList.remove("menu-btns-activated");
    }

    btn.classList.add("menu-btns-activated");
    let code = byId("code");
    code.innerHTML = codes[lang];
    code.className = '';
    code.classList.add(lang.toLowerCase())
    hljs.highlightAll();
}

function audioButton() {
    audio = byId("audio").firstElementChild.innerHTML === "volume_off" | 0;
    updateAudioIcon();

    fetch("/audio/", {
        method: "PUT",
    })
}

function updateAudioIcon() {
    let icons = ["volume_off", "volume_up"];
    byId("audio").firstChild.innerHTML = icons[audio | 0];
}
