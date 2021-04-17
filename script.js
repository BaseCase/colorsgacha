let state = {
    buttonElement: undefined,
    progressBarElement: undefined,
    progressFillElement: undefined,
    progressPercent: 0.0,
    progressIsAccumulating: false,
    colorBlocks: [],
};

// TODO: handle window resizing w.r.t. progress bar position and color blocks position

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
    let h = Math.floor(Math.random() * 360);
    let s = Math.floor(Math.random() * 100);
    let l = Math.floor(Math.random() * 100);
    let color = `hsl(${h}, ${s}%, ${l}%)`;
    let width = Math.ceil(Math.random() * 100);
    state.colorBlocks.push({
        color: color,
        width: width,
    });
    drawColorBlocks();
}

function drawColorBlocks() {
    let buttonRect = state.buttonElement.getBoundingClientRect()
    let center = buttonRect.bottom - buttonRect.height / 2;

    // TODO: we can actually do this with z-index instead of building backwards. Refactor?
    let nextWidth = state.colorBlocks.reduce((accWidth, curBlock) => (accWidth + curBlock.width), 50); // calc width of blocks based on sum of all widths
    let blocks = state.colorBlocks.slice().reverse();
    for (let block of blocks) {
        let blockEl = document.createElement('div');
        document.querySelector("#container").appendChild(blockEl);
        blockEl.classList.add('color-block');
        blockEl.style.backgroundColor = block.color;
        blockEl.style.width = `${nextWidth}px`;
        blockEl.style.height = `${nextWidth}px`;
        blockEl.style.zIndex = '-1';
        blockEl.style.top = `${center - nextWidth / 2}px`;
        blockEl.style.border = '2px solid black';
        blockEl.style.borderRadius = '5px';
        nextWidth -= block.width;
    }
}

document.addEventListener("DOMContentLoaded", init);
