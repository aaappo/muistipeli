import { createBoard } from './board.js';

document.addEventListener('DOMContentLoaded', () => {

    const select = document.getElementById('card-count');
    const restartBtn = document.getElementById('restart-btn');

    let cardCount = Number(select.value);
    createBoard(cardCount);

    select.addEventListener("change", () => {
        cardCount = Number(select.value);
        createBoard(cardCount);
    });

    restartBtn.addEventListener("click", () => {
        cardCount = Number(select.value);
        createBoard(cardCount);
    });

});
