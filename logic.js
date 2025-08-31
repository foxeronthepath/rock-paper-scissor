  let humanScore = 0;
  let computerScore = 0;

  function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const idx = Math.floor(Math.random() * choices.length);
    return choices[idx];
  }

  function getHumanChoice() {
    while (true) {
      const input = prompt(
        'Write down your choice: "rock", "paper", or "scissors"',
        ""
      );
      if (input === null) return null; 
      const choice = input.trim().toLowerCase();
      if (["rock", "paper", "scissors"].includes(choice)) return choice;
      alert('Invalid choice. Please type "rock", "paper", or "scissors".');
    }
  }

  function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
      console.log(`It's a tie! You both chose ${humanChoice}`);
      return;
    }

    const playerWins =
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper");

    if (playerWins) {
      humanScore++;
      console.log(`You win! ${humanChoice} beats ${computerChoice}`);
    } else {
      computerScore++;
      console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
    }
  }

  function playGame() {
    for (let i = 1; i <= 5; i++) {
      const human = getHumanChoice();
      if (human === null) {
        console.log("Game cancelled by user.");
        return;
      }
      const comp = getComputerChoice();
      console.log(`\nRound ${i}: You -> ${human} | Computer -> ${comp}`);
      playRound(human, comp);
      console.log(`Score → Player: ${humanScore} | Computer: ${computerScore}`);
    }

    console.log("\n=== Final Result ===");
    if (humanScore > computerScore) {
      console.log(`You win the game ${humanScore}–${computerScore}!`);
    } else if (computerScore > humanScore) {
      console.log(`You lose the game ${computerScore}–${humanScore}.`);
    } else {
      console.log(`It's a tie: ${humanScore}–${computerScore}.`);
    }
  }

  playGame();