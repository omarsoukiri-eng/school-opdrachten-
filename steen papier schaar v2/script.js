// ── Constanten: DOM elementen ophalen ──────────────────────────────
const computerEmoji       = document.querySelector("#computerEmoji");
const humanEmoji          = document.querySelector("#humanEmoji");
const computerKeuzeEmoji  = document.querySelector("#computerKeuzeEmoji");
const humanKeuzeEmoji     = document.querySelector("#humanKeuzeEmoji");
const computerOutput      = document.querySelector("#computer");
const humanOutput         = document.querySelector("#human");
const resultOutput        = document.querySelector("#result");
const scoreJijOutput      = document.querySelector("#scoreJij");
const scoreComputerOutput = document.querySelector("#scoreComputer");
const scoreGelijkOutput   = document.querySelector("#scoreGelijk");
const rondeOutput         = document.querySelector("#ronde");
const streakOutput        = document.querySelector("#streak");
const highscoreOutput     = document.querySelector("#highscore");

const steenBtn  = document.querySelector("#steenBtn");
const papierBtn = document.querySelector("#papierBtn");
const schaarBtn = document.querySelector("#schaarBtn");

// ── Variabelen ─────────────────────────────────────────────────────
let humanChoice   = "";
let scoreJij      = 0;
let scoreComputer = 0;
let scoreGelijk   = 0;
let ronde         = 1;
let streak        = 0;
let highscore     = 0;

// Emoji mapping voor de keuzes
const emojis = {
  steen:  "✊",
  papier: "✋",
  schaar: "✌️"
};

// ── Functie: computer maakt een willekeurige keuze ─────────────────
function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;

  if (randomNumber === 1) return "steen";
  if (randomNumber === 2) return "papier";
  if (randomNumber === 3) return "schaar";
}

// ── Functie: animatie afspelen ─────────────────────────────────────
function speelAnimatie(uitkomst) {
  document.body.classList.remove("animatie-win", "animatie-verlies", "animatie-gelijk");

  setTimeout(function() {
    if (uitkomst === "win")     document.body.classList.add("animatie-win");
    if (uitkomst === "verlies") document.body.classList.add("animatie-verlies");
    if (uitkomst === "gelijk")  document.body.classList.add("animatie-gelijk");
  }, 10);

  if (uitkomst === "verlies") {
    computerEmoji.classList.remove("schudden");
    setTimeout(function() {
      computerEmoji.classList.add("schudden");
    }, 10);
  }
}

// ── Functie: update streak en highscore ───────────────────────────
function updateStreak(uitkomst) {
  if (uitkomst === "win") {
    streak++;
    if (streak > highscore) {
      highscore = streak;
      highscoreOutput.innerHTML = "🏆 Highscore: " + highscore;
    }
  } else {
    streak = 0;
  }
  streakOutput.innerHTML = "🔥 Streak: " + streak + " op rij";
}

// ── Functie: update het scorebord ─────────────────────────────────
function updateScore(uitkomst) {
  if (uitkomst === "win") {
    scoreJij++;
    scoreJijOutput.innerHTML = scoreJij;
  } else if (uitkomst === "verlies") {
    scoreComputer++;
    scoreComputerOutput.innerHTML = scoreComputer;
  } else {
    scoreGelijk++;
    scoreGelijkOutput.innerHTML = scoreGelijk;
  }

  ronde++;
  rondeOutput.innerHTML = ronde;
}

// ── Functie: bepaal wie er wint ────────────────────────────────────
function bepaalWinnaar(human, computer) {
  let uitkomst = "";

  if (human === computer) {
    uitkomst = "gelijk";
    resultOutput.innerHTML = "🤝 Gelijkspel!";
  } else if (
    (human === "steen"  && computer === "schaar") ||
    (human === "schaar" && computer === "papier") ||
    (human === "papier" && computer === "steen")
  ) {
    uitkomst = "win";
    resultOutput.innerHTML = "🏆 Jij wint!";
  } else {
    uitkomst = "verlies";
    resultOutput.innerHTML = "💀 Computer wint!";
  }

  updateScore(uitkomst);
  updateStreak(uitkomst);
  speelAnimatie(uitkomst);
}

// ── Functie: speel een ronde ───────────────────────────────────────
function speelRonde(keuze) {
  humanChoice = keuze;

  // ♟️ blijft altijd staan, keuze emoji apart eronder
  humanKeuzeEmoji.innerHTML  = emojis[humanChoice];
  humanOutput.innerHTML      = humanChoice;

  const computerChoice = getComputerChoice();

  // 🖥️ blijft altijd staan, keuze emoji apart eronder
  computerKeuzeEmoji.innerHTML = emojis[computerChoice];
  computerOutput.innerHTML     = computerChoice;

  bepaalWinnaar(humanChoice, computerChoice);
}

// ── Event handlers ─────────────────────────────────────────────────
steenBtn.addEventListener("click", function(event) {
  speelRonde("steen");
});

papierBtn.addEventListener("click", function(event) {
  speelRonde("papier");
});

schaarBtn.addEventListener("click", function(event) {
  speelRonde("schaar");
});