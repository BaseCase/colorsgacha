let button;

function init(readyEvent) {
    button = document.querySelector("#the-button");
    button.addEventListener("mousedown", buttonClicked);
    document.addEventListener("mouseup", buttonReleased);
}

function buttonClicked(clickEvent) {
    button.classList.add('clicked');
}

function buttonReleased(clickEvent) {
    button.classList.remove('clicked');
}

document.addEventListener("DOMContentLoaded", init);
