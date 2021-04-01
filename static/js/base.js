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
    if (!event.target.matches('#sort-btn') && !event.target.matches('.sidenav-btn') && !event.target.matches('.sidenav') && !event.target.matches('.sidenav-element') && !event.target.matches('.sidenav-title')) {
        document.getElementsByClassName("sidenav")[0].classList.remove("show");
    }
}
