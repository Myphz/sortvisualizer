window.addEventListener("load", () => {
    document.getElementsByClassName("sidenav-btn")[0].addEventListener("click", openSidenav);

    AOS.init({
        duration: 1000,
        once: true
    });
});

function openSidenav() {
    document.getElementsByClassName("sidenav")[0].classList.toggle("show");
}

window.onclick = function(event) {
    const matches = ['#sort-btn', '.sidenav-btn', '.sidenav', '.sidenav-element', '.sidenav-title']

    if (!(matches.some((match) => event.target.matches(match)))) {
        document.getElementsByClassName("sidenav")[0].classList.remove("show");
    }
}
