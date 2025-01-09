// Selecting DOM elements
const playerScoreDisplay = document.getElementById("playerScore");
const computerScoreDisplay = document.getElementById("computerScore");
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("result");
const choiceButtons = document.querySelectorAll(".choice-button");
const resetButton = document.getElementById("resetButton");
const rulesButton = document.getElementById("rulesButton");

// Modal elements for the rules
const rulesModal = document.getElementById("rulesModal");
const closeModal = document.getElementById("closeModal");

// Modal elements for the history
const historyModal = document.getElementById("historyModal");
const closeHistoryModal = document.getElementById("closeHistoryModal");
const historyList = document.getElementById("historyList");

// Initial scores
let playerScore = 0;
let computerScore = 0;
let gameHistory = [];

// Choices array to link choices with their corresponding emojis
const choices = {
  rock: "👊",
  paper: "📄",
  scissors: "✂️",
  lizard: "🦎",
  spock: "🖖",
};

// Function to get a random choice for the computer
function getComputerChoice() {
  const keys = Object.keys(choices);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}

// Function to determine the winner and update the result text color
function determineWinner(playerChoice, computerChoice) {
  // Reset all glow classes
  resultDisplay.classList.remove("green-glow", "red-glow", "tie-glow");

  if (playerChoice === computerChoice) {
    resultDisplay.textContent = "It's a Tie!";
    resultDisplay.classList.add("tie-glow"); 
    return "Tie";
  }

  const winningCombinations = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["rock", "scissors"],
  };

  if (winningCombinations[playerChoice].includes(computerChoice)) {
    resultDisplay.textContent = "Player Wins!";
    resultDisplay.classList.add("green-glow");
    return "Player Wins!";
  } else {
    resultDisplay.textContent = "Computer Wins!";
    resultDisplay.classList.add("red-glow");
    return "Computer Wins!";
  }
}

// Function to update the scores
function updateScores(winner) {
  if (winner === "Player Wins!") {
    playerScore++;
    playerScoreDisplay.textContent = `Player: ${playerScore}`;
  } else if (winner === "Computer Wins!") {
    computerScore++;
    computerScoreDisplay.textContent = `Computer: ${computerScore}`;
  }
}

// Function to handle player's selection
function handleChoice(playerChoice) {
  // Display player's choice
  playerDisplay.textContent = choices[playerChoice];

  // Get computer's choice
  const computerChoice = getComputerChoice();
  computerDisplay.textContent = choices[computerChoice];

  // Determine the winner
  const winner = determineWinner(playerChoice, computerChoice);

  // Update result and scores
  updateScores(winner);

  // Store game result in history
  gameHistory.push({ playerChoice, computerChoice, result: winner });
}

// Adding event listeners to buttons
choiceButtons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.id; // Get the id of the clicked button (rock, paper, etc.)
    handleChoice(playerChoice);
  });
});

// Resetting the game
resetButton.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = `Player: 0`;
  computerScoreDisplay.textContent = `Computer: 0`;
  playerDisplay.textContent = "🤔";
  computerDisplay.textContent = "🤔";
  resultDisplay.textContent = "Let's Play!";
  resultDisplay.classList.remove("green-glow", "red-glow", "tie-glow");

  // Clear the game history
  gameHistory = [];
  historyList.innerHTML = ''; // Clear the history display
});

// Rules Modal functionality
rulesButton.addEventListener("click", () => {
  rulesModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  rulesModal.style.display = "none";
});

// History Modal functionality
document.getElementById("historyButton").addEventListener("click", () => {
  historyModal.style.display = "block";
  historyList.innerHTML = ""; // Clear the history list before updating

  // Display game history
  gameHistory.forEach((game, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Game ${index + 1}: Player chose ${game.playerChoice} | Computer chose ${game.computerChoice} | Result: ${game.result}`;
    historyList.appendChild(listItem);
  });
});

closeHistoryModal.addEventListener("click", () => {
  historyModal.style.display = "none";
});

// Grab the funky button
const funkyButton = document.getElementById("funkyButton");

// Grab the body and the entire document
const body = document.body;

// Add event listener to the funky button
funkyButton.addEventListener("click", () => {
    // Toggle the 'funky' class on the body to trigger funky effects
    body.classList.toggle("funky");
});
