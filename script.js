let state = {
    buttonElement: undefined,
    progressBarElement: undefined,
    progressFillElement: undefined,
    progressPercent: 0.0,
    progressIsAccumulating: false,
};

function init(readyEvent) {
    state.buttonElement = document.querySelector("#the-button");
    state.progressBarElement = document.querySelector("#progress-bar");
    state.progressFillElement = document.querySelector("#progress-bar .fill");

    let boxTop = state.buttonElement.getBoundingClientRect().top;
    state.progressBarElement.style.top = `${boxTop-40}px`;
    state.buttonElement.addEventListener("mousedown", buttonClicked);
    document.addEventListener("mouseup", buttonReleased);

    requestAnimationFrame(animateProgressBar);
}

function buttonClicked(clickEvent) {
    state.buttonElement.classList.add('clicked');
    state.progressBarElement.classList.remove('hidden');
    state.progressIsAccumulating = true;
}

function buttonReleased(clickEvent) {
    state.buttonElement.classList.remove('clicked');
    state.progressIsAccumulating = false;
}

function animateProgressBar(timeStep) {
    if (state.progressIsAccumulating) {
        state.progressPercent += 0.5;

        if (state.progressPercent >= 100) {
            buttonReleased();
            state.progressBarElement.classList.add('hidden');
            addNewRandomColorBlock();
            state.progressPercent = 0;
        }
    } else {
        state.progressPercent -= 0.5;
    }

    if (state.progressPercent > 100) state.progressPercent = 100;
    if (state.progressPercent < 0) state.progressPercent = 0;

    state.progressFillElement.style.width = `${state.progressPercent}%`;

    requestAnimationFrame(animateProgressBar);
}

function addNewRandomColorBlock() {
    console.log("new one!");
}

document.addEventListener("DOMContentLoaded", init);
