import { createCardElement } from './card.js';

const allImages = [
   "asd.png",
   "IMG_7528.png",
   "IMG_7529.jpg",
   "IMG_7531.jpg",
   "IMG_7673.png",
   "IMG_7696.jpg",
   "IMG_7860.jpg",
   "IMG_8012.png",
   "IMG_8107.png",
   "IMG_8145.png",
   "IMG_8210.png",
   "Nayttokuva 2025-11-05 092337.png",

];

const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const attemptsDisplay = document.getElementById('attempts');
const restartButton = document.getElementById('restart-btn');
const cardSelect = document.getElementById('card-count');

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let time = 0;
let score = 0;
let attempts = 0;
let timerInterval = null;
let totalPairs = 0;
let foundPairs = 0;




function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function createBoard(cardCount) {
    gameBoard.innerHTML = '';
    if (cardCount > allImages.length * 2) {
        alert("Liikaa kortteja! Maksimi on " + (allImages.length * 2));
        return;
    }

    const selectedCards = allImages.slice(0, cardCount / 2);
    const cards = [...selectedCards, ...selectedCards];

    shuffle(cards);

    totalPairs = cardCount / 2;
    foundPairs = 0;
    attempts = 0;
    attemptsDisplay.textContent = "0";

    cards.forEach(card => {
        const cardElement = createCardElement(card);

        cardElement.cardClickHandler = () => flipCard(cardElement);
        cardElement.addEventListener('click', cardElement.cardClickHandler);

        gameBoard.appendChild(cardElement);
    });
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    time = 0;
    timerDisplay.textContent = "0";

    timerInterval = setInterval(() => {
        time++;
        timerDisplay.textContent = time;

        if (time % 5 === 0) {
            score -= 1;
            updateScore();
        }

    }, 1000);
}
function stopTimer() {
    clearInterval(timerInterval);
}
function updateScore() {
     if (score < 0) score = 0;
    scoreDisplay.textContent = score;
}

function flipCard(cardElement) {
    if (lockBoard) return;
    if (cardElement === firstCard) return;
    if (cardElement.classList.contains("flipped")) return;
    cardElement.classList.add("flipped");



    handleCardFlip(cardElement);
}

function handleCardFlip(cardElement) {

    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;
    attempts++;
    attemptsDisplay.textContent = attempts;

    if (isMatch) {
        score += 100;
        updateScore();
        disableCards();
    } else {
        score -= 10;
        if (score < 0) score = 0;
        updateScore();
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', firstCard.cardClickHandler);
    secondCard.removeEventListener('click', secondCard.cardClickHandler);
    foundPairs++;

    if (foundPairs === totalPairs) {
        stopTimer();
        showCompletionModal();
    }
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function showCompletionModal() {
    const modal = document.getElementById('completion-modal');
    const finalTime = document.getElementById('final-time');
    const finalAttempts = document.getElementById('final-attempts');
    const finalScore = document.getElementById('final-score');
    const closeButton = document.getElementById('close-modal');

    finalTime.textContent = time;
    finalAttempts.textContent = attempts;
    finalScore.textContent = score;

    modal.classList.remove('hidden');

    const newCloseButton = closeButton.cloneNode(true);
    closeButton.parentNode.replaceChild(newCloseButton, closeButton);

    newCloseButton.addEventListener('click', () => {
        modal.classList.add('hidden');
        const cardCount = Number(cardSelect.value);
        createBoard(cardCount);
    });
}

createBoard(Number(cardSelect.value));