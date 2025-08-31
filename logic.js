document.addEventListener('DOMContentLoaded', () => {
  let humanScore = 0;
  let computerScore = 0;
  let currentRound = 1;
  const TOTAL_ROUNDS = 10;
  let gameOver = false;

  // DOM elements
  const humanScoreElement = document.getElementById('human-score');
  const computerScoreElement = document.getElementById('computer-score');
  const roundIndicator = document.getElementById('round-indicator');
  const choicesIndicator = document.getElementById('choices-indicator');
  const resultElement = document.getElementById('result');
  const finalResultElement = document.getElementById('final-result');
  const choiceButtons = document.querySelectorAll('.choice-btn');

  function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const idx = Math.floor(Math.random() * choices.length);
    return choices[idx];
  }

  function updateScoreDisplay() {
    humanScoreElement.textContent = humanScore;
    computerScoreElement.textContent = computerScore;
  }

  function updateRoundDisplay() {
    roundIndicator.textContent = `Round ${currentRound} of ${TOTAL_ROUNDS}`;
  }

  function playRound(humanChoice, computerChoice) {
    // Update choices indicator
    choicesIndicator.textContent = `You: ${humanChoice} | Computer: ${computerChoice}`;

    if (humanChoice === computerChoice) {
      resultElement.textContent = `It's a tie! You both chose ${humanChoice}`;
      return 'tie';
    }

    const playerWins =
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper");

    if (playerWins) {
      humanScore++;
      resultElement.textContent = `You win! ${humanChoice} beats ${computerChoice}`;
      return 'player';
    } else {
      computerScore++;
      resultElement.textContent = `You lose! ${computerChoice} beats ${humanChoice}`;
      return 'computer';
    }
  }

  function checkGameEnd() {
    if (currentRound > TOTAL_ROUNDS) {
      gameOver = true;
      finalResultElement.textContent = getGameResult();
      
      // Disable choice buttons
      choiceButtons.forEach(button => {
        button.disabled = true;
      });
      
      // Add reset button
      const resetButton = document.createElement('button');
      resetButton.textContent = 'Play Again';
      resetButton.className = 'choice-btn reset-btn';
      resetButton.style.marginTop = '1rem';
      resetButton.style.backgroundColor = '#10b981';
      resetButton.style.color = '#ffffff';
      resetButton.style.border = 'none';
      resetButton.addEventListener('click', resetGame);
      finalResultElement.after(resetButton);
    }
  }

  function getGameResult() {
    if (humanScore > computerScore) {
      return `You win the game ${humanScore}–${computerScore}!`;
    } else if (computerScore > humanScore) {
      return `You lose the game ${computerScore}–${humanScore}.`;
    } else {
      return `It's a tie: ${humanScore}–${computerScore}.`;
    }
  }

  function resetGame() {
    humanScore = 0;
    computerScore = 0;
    currentRound = 1;
    gameOver = false;
    
    updateScoreDisplay();
    updateRoundDisplay();
    
    resultElement.textContent = '';
    finalResultElement.textContent = '';
    choicesIndicator.textContent = 'Make your choice';
    
    // Enable choice buttons
    choiceButtons.forEach(button => {
      button.disabled = false;
    });
    
    // Remove reset button
    const resetButton = document.querySelector('.reset-btn');
    if (resetButton) resetButton.remove();
  }

  // Add click event listeners to choice buttons
  choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (gameOver) return;
      
      const humanChoice = button.id;
      const computerChoice = getComputerChoice();
      
      playRound(humanChoice, computerChoice);
      updateScoreDisplay();
      
      currentRound++;
      checkGameEnd();
      if (!gameOver) updateRoundDisplay();
    });
  });

  // Initialize game
  updateScoreDisplay();
  updateRoundDisplay();
});