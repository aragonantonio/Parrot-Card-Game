let numberOfCards = 0
let score = 0
let endGameCounter = 0
let turnedCards = []
const cardsImages = ["assets/bobrossparrot.gif", "assets/explodyparrot.gif", "assets/fiestaparrot.gif", "assets/metalparrot.gif", 
             "assets/unicornparrot.gif", "assets/tripletsparrot.gif", "assets/revertitparrot.gif"]
const cardsInGame = []

//Function that shuffles the list that was created
function shuffle() { 
	return Math.random() - 0.5; 
}

//Function to remove the commas from the list of cards in the game
function removeCommas(array, separator = "") {
    return array.join(separator);
}

//Function that adds the cards based on the number provided by the user and shuffles them
function GameSetUp(numberOfCards) {
    const DivCards = document.querySelector(".Cards")
    for (let i = 0; i <= (numberOfCards - 1) / 2; i++) {
        CardBackFace = cardsImages[i]
        const Card = `<div class="card"><img class="front-face face" src="assets/back.png"><img class="back-face face" src="${CardBackFace}"></div>`;
        cardsInGame.push(Card)
        cardsInGame.push(Card)
        cardsInGame.sort(shuffle)
        DivCards.innerHTML = removeCommas(cardsInGame);
    }
}

//Function that asks for the number of cards and filters out incorrect options 
function NumberCards() { 
    numberOfCards  = prompt('Com quantas cartas você quer jogar? Precisa ser um número par entre 4 e 14!')
    if (numberOfCards % 2 == 0 & numberOfCards <= 14 & numberOfCards > 0) {
        GameSetUp(numberOfCards)
    } else {   
        NumberCards()
    }
}

NumberCards()

//Functionality to select cards with a click and to lock clicks to prevent overlapping moves
let locked = false; 

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {

        if (locked) return;

        if (turnedCards.includes(card)) return;

        if (card.classList.contains("permanentlyTurnedCard")) return;

        card.classList.toggle("cardSelected");
        turnedCards.push(card);
        score++;

        if (turnedCards.length === 2) {
            locked = true; 
            setTimeout(() => {
                compararCartas();
                locked = false;
            }, 1000);
        }
    });
});

//Function that compares the cards, counts the moves, and changes the card's situation
function compararCartas() {

    const firstCardTurned = turnedCards[0];
    const secondCardTurned = turnedCards[1];

    const backFirstCard = firstCardTurned.children[1].getAttribute("src");
    const backSecondCard = secondCardTurned.children[1].getAttribute("src");

    if (backFirstCard === backSecondCard) {
        firstCardTurned.classList.remove("cardSelected");
        secondCardTurned.classList.remove("cardSelected");
        firstCardTurned.classList.add("permanentlyTurnedCard");
        secondCardTurned.classList.add("permanentlyTurnedCard");
        endGameCounter++

    } else {
        firstCardTurned.classList.remove("cardSelected");
        secondCardTurned.classList.remove("cardSelected");
    }
    
    turnedCards.length = 0;
    endGame()
}

//End-game function
function endGame(){
    if (endGameCounter === numberOfCards / 2) {
        alert(`Você concluiu o jogo! Seu número de jogadas foi ${score}!`)
    }
}