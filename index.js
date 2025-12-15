const grid = document.querySelector('.grid');
const timeDisplay = document.querySelector('.ti');
const scoreDisplay = document.querySelector('.sc');
const targetDisplay = document.querySelector('.number');

const continueBtn = document.querySelector('.continue');
const resetBtn = document.querySelector('.rest');

let score = 0;
let timeLeft = 10;
let timerId = null;
let targetNumber = null;


function getRandomNumber() {
    return Math.ceil(Math.random() * 100);
}

function createGrid() {
    grid.innerHTML = "";
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("sel_num");
        cell.innerText = getRandomNumber();
        grid.appendChild(cell);
    }
}

function numberExistsInGrid(number) {
    const cells = document.querySelectorAll('.sel_num');
    for (const cell of cells) {
        if (Number(cell.innerText) === number) {
            return true;
        }
    }
    return false;
}

function pickTargetNumber() {
    let number;
    do {
        number = getRandomNumber();
    } while (!numberExistsInGrid(number));

    targetNumber = number;
    targetDisplay.innerText = targetNumber;
}

function startTimer() {
    clearInterval(timerId);

    timerId = setInterval(() => {
        timeLeft--;
        timeDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            alert("Time Over");
        }
    }, 1000);
}

function resetGame() {
    clearInterval(timerId);

    score = 0;
    timeLeft = 10;

    scoreDisplay.innerText = score;
    timeDisplay.innerText = timeLeft;

    createGrid();
    pickTargetNumber();
    startTimer();
}


createGrid();
pickTargetNumber();
startTimer();



grid.addEventListener('click', (e) => {
    if (!e.target.classList.contains("sel_num")) return;
    if (timeLeft <= 0) return;

    const clickedValue = Number(e.target.innerText);

    if (clickedValue === targetNumber) {
        score++;
        scoreDisplay.innerText = score;

        timeLeft = 10;
        timeDisplay.innerText = timeLeft;

        pickTargetNumber();
        startTimer();
    }
});

continueBtn.addEventListener('click', () => {
    if (timeLeft <= 0) {
        timeLeft = 10;
        timeDisplay.innerText = timeLeft;
        startTimer();
    }
});

resetBtn.addEventListener('click', resetGame);
