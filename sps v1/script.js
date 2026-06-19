const computerOutput = document.querySelector("#computer");
const humanOutput    = document.querySelector("#human");
const resultOutput   = document.querySelector("#result");

const steenBtn  = document.querySelector("#steenBtn");
const papierBtn = document.querySelector("#papierBtn");
const schaarBtn = document.querySelector("#schaarBtn");

let humanChoice = "";

function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;

  if (randomNumber === 1) return "steen";
  if (randomNumber === 2) return "papier";
  if (randomNumber === 3) return "schaar";
}

function bepaalWinnaar(human, computer) {
  if (human === computer) {
    resultOutput.innerHTML = "Gelijkspel!";
  } else if (
    (human === "steen"  && computer === "schaar") ||
    (human === "schaar" && computer === "papier") ||
    (human === "papier" && computer === "steen")
  ) {
    resultOutput.innerHTML = "Jij wint!";
  } else {
    resultOutput.innerHTML = "Computer wint!";
  }
}

steenBtn.addEventListener("click", function(event) {
  humanChoice = "steen";
  humanOutput.innerHTML = humanChoice;

  const computerChoice = getComputerChoice();
  computerOutput.innerHTML = computerChoice;

  bepaalWinnaar(humanChoice, computerChoice);
});

papierBtn.addEventListener("click", function(event) {
  humanChoice = "papier";
  humanOutput.innerHTML = humanChoice;

  const computerChoice = getComputerChoice();
  computerOutput.innerHTML = computerChoice;

  bepaalWinnaar(humanChoice, computerChoice);
});

schaarBtn.addEventListener("click", function(event) {
  humanChoice = "schaar";
  humanOutput.innerHTML = humanChoice;

  const computerChoice = getComputerChoice();
  computerOutput.innerHTML = computerChoice;

  bepaalWinnaar(humanChoice, computerChoice);
});