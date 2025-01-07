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

// Initial scores
let playerScore = 0;
let computerScore = 0;

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
  if (playerChoice === computerChoice) {
    resultDisplay.textContent = "It's a Tie!";
    resultDisplay.style.color = "#e0e0e0"; // Neutral color for a tie
    return "Tie";
  }

  // Winning conditions
  const winningCombinations = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["rock", "scissors"],
  };

  if (winningCombinations[playerChoice].includes(computerChoice)) {
    resultDisplay.textContent = "Player Wins!";
    resultDisplay.style.color = "green"; // Green for player win
    return "Player Wins!";
  } else {
    resultDisplay.textContent = "Computer Wins!";
    resultDisplay.style.color = "red"; // Red for computer win
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
}

// Adding event listeners to buttons
choiceButtons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.id; // Get the id of the clicked button (rock, paper, etc.)
    handleChoice(playerChoice);
  });
});

// Reset button functionality 
resetButton.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = "Player: 0";
  computerScoreDisplay.textContent = "Computer: 0";
  playerDisplay.textContent = "🤔";
  computerDisplay.textContent = "🤔";
  resultDisplay.textContent = "Let's Play!";
  resultDisplay.style.color = "#e0e0e0"; // Neutral color
});

// Rules button functionality (opens the modal with the image)
rulesButton.addEventListener("click", () => {
  rulesModal.style.display = "block"; // Show the modal
});

// Close button functionality (closes the modal)
closeModal.addEventListener("click", () => {
  rulesModal.style.display = "none"; // Hide the modal
});

// Close the modal if the user clicks anywhere outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === rulesModal) {
    rulesModal.style.display = "none"; // Hide the modal if clicked outside
  }
});
