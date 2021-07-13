//assign cards to nodelist
const cards = document.querySelectorAll(".memory__card");
//boolean to determine whether the first card has been flipped yet
let firstCardFlipped = false;
//variables to hold the two different cards
let firstCard, secondCard;
//to ensure you can't flip more than two cards before a match check, it's disabled
let noMoreThanTwo = false;
//shows how many moves
let moves = document.getElementById("moves");
let moveCounter = 0;

//match: disable pointer-event with .disabled class
const matchDisable = function () {
  firstCard.classList.add("disabled");
  secondCard.classList.add("disabled");
  resetValues();
};

//no match: set timer to allow second card to be seen, remove .flipped to flip to back
const noMatchFlipBack = function () {
  //set noMoreThanTwo to true, to avoid a third card flip before removing .flipped
  noMoreThanTwo = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    //reset boolean values and the two card variables
    resetValues();
  }, 1000);
};

//when two are flipped, check if they match or not
const checkMatch = function () {
  let isMatch = firstCard.dataset.character === secondCard.dataset.character;
  isMatch ? matchDisable() : noMatchFlipBack();
  moveCounter++;
  moves.textContent = moveCounter;
};

const cardFlip = function () {
  //to avoid flipping more than two cards
  if (noMoreThanTwo) return;
  //to avoid clicking the same card twice and creating a 'match'
  if (this === firstCard) return;
  //assign .flipped to flip card
  this.classList.add("flipped");
  //check whether it's the first card or not, assign card to respective variable
  if (!firstCardFlipped) {
    firstCardFlipped = true;
    firstCard = this;
    //if first card, exit function execution
    return;
  }
  //otherwise, continue to checkMatch
  firstCardFlipped = false;
  secondCard = this;
  checkMatch();
};

//reset values after matching has occurred
const resetValues = function () {
  [firstCardFlipped, noMoreThanTwo] = [false, false];
  [firstCard, secondCard] = [null, null];
};

//assign random order to cards in grid to shuffle
(function shuffleCards() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * (cards.length + 1));
    card.style.order = randomPosition;
  });
})();

//add event listener with cardFlip function to each card through nodelist
cards.forEach(function (memoryCard) {
  memoryCard.addEventListener("click", cardFlip);
});
