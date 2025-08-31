document.addEventListener('DOMContentLoaded', () => {
  // Game state variables
  let playerScore = 0;
  let computerScore = 0;
  let currentRound = 1;
  let gameOver = false;

  // DOM elements
  const playerScoreElement = document.getElementById('human-score');
  const computerScoreElement = document.getElementById('computer-score');
  const roundIndicator = document.getElementById('round-indicator');
  const choicesIndicator = document.getElementById('choices-indicator');
  const resultElement = document.getElementById('result');
  const finalResultElement = document.getElementById('final-result');
  const choiceButtons = document.querySelectorAll('.choice-btn');

  // Get random computer choice
  function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
  }

  // Update the game display
  function updateDisplay() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    roundIndicator.textContent = `Round ${currentRound}`;
  }

  // Determine winner of a round
  function playRound(playerChoice, computerChoice) {
    choicesIndicator.textContent = `You: ${playerChoice} | Computer: ${computerChoice}`;

    if (playerChoice === computerChoice) {
      resultElement.textContent = `Tie! Both chose ${playerChoice}`;
      return;
    }

    const winConditions = {
      rock: "scissors",
      scissors: "paper",
      paper: "rock"
    };

    if (winConditions[playerChoice] === computerChoice) {
      playerScore++;
      resultElement.textContent = `You win! ${playerChoice} beats ${computerChoice}`;
    } else {
      computerScore++;
      resultElement.textContent = `You lose! ${computerChoice} beats ${playerChoice}`;
    }
  }

  // Check if game is over (first to 10 wins)
  function checkGameEnd() {
    if (playerScore >= 10 || computerScore >= 10) {
      gameOver = true;
      
      // Display final result
      if (playerScore > computerScore) {
        finalResultElement.textContent = `You win the game ${playerScore}–${computerScore}!`;
      } else {
        finalResultElement.textContent = `You lose the game ${computerScore}–${playerScore}.`;
      }
      
      // Disable choice buttons
      choiceButtons.forEach(button => button.disabled = true);
      
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

  // Reset the game
  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;
    gameOver = false;
    
    updateDisplay();
    
    resultElement.textContent = '';
    finalResultElement.textContent = '';
    choicesIndicator.textContent = 'Make your choice';
    
    // Enable choice buttons
    choiceButtons.forEach(button => button.disabled = false);
    
    // Remove reset button
    document.querySelector('.reset-btn')?.remove();
  }

  // Add click event listeners to choice buttons
  choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (gameOver) return;
      
      const playerChoice = button.id;
      const computerChoice = getComputerChoice();
      
      playRound(playerChoice, computerChoice);
      updateDisplay();
      
      currentRound++;
      checkGameEnd();
    });
  });

  // Initialize game
  updateDisplay();
});