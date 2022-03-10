let player = {
    name: "Mayank",
    chips: 5000
}

let cards;
let sum;
let hasBlackJack;
let isAlive;
let message;


let messageEl = document.getElementById("message-el");
let cardsEl = document.getElementById("cards-el");
let sumEl = document.getElementById("sum-el");
let pNameEl = document.getElementById("player-name");
let pChipsEl = document.getElementById("player-chips");

pNameEl.innerHTML = "Player Name: " + player.name;
pChipsEl.innerHTML = "Player Chips: " + "Rs. " + player.chips + "/-";

function newGame() {
    cards = [];
    sum = 0
    hasBlackJack = false
    isAlive = false
    message = "";
    startGame();
}

function startGame() {
    console.log("game started");
    isAlive = true;
    let card1 = getRandomCard();
    let card2 = getRandomCard();
    cards = [card1, card2];
    sum = card1 + card2;
    renderGame();
}

function renderGame() {
    console.log("game rendered");
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }

    sumEl.textContent = "Sum: " + sum;
    messageEl.textContent = getResult();
}

function getResult() {
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    return message;
}

function newCard() {
    console.log("got a new card");
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}

// in blackJack we assume Ace to be 11 and all face cards to be 10
// total 13 card of a suit, from 2 to 10, then Ace==11 and other3 == 10
function getRandomCard() {
    console.log("got a random card");
    let randomCard = Math.floor(Math.random() * 13) + 1;
    if (randomCard === 1) {
        return 11;
    } else if (randomCard > 10) {
        return 10;
    } else {
        return randomCard;
    }
}