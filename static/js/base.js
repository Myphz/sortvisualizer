AOS.init({
    duration: 1000,
    once: true
});

const byId = id => {
    return document.getElementById(id);
}

window.onclick = function(event) {
    if (event.target.matches(".open")) {
        byId("sidenav").classList.toggle("show");
    } else if (!(event.target.matches(".no-remove"))) {
        byId("sidenav").classList.remove("show")
    }
}
