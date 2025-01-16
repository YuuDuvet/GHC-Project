// Define initial variables
let score = 0; // Player's environmental score

// Create the HTML structure dynamically
const gameContainer = document.createElement('div');
gameContainer.style.textAlign = 'center';
gameContainer.style.marginTop = '50px';
document.body.appendChild(gameContainer);

// Add a title
const title = document.createElement('h1');
title.innerText = 'Environmental Game';
gameContainer.appendChild(title);

// Add a score display
const scoreDisplay = document.createElement('h2');
scoreDisplay.innerText = 'Score: ' + score;
gameContainer.appendChild(scoreDisplay);

// Add a button for a factory decision (negative impact)
const factoryButton = document.createElement('button');
factoryButton.innerText = 'Build Factory (-10)';
factoryButton.style.margin = '10px';
gameContainer.appendChild(factoryButton);

// Add a button for planting a tree (positive impact)
const treeButton = document.createElement('button');
treeButton.innerText = 'Plant Tree (+20)';
treeButton.style.margin = '10px';
gameContainer.appendChild(treeButton);

// Add event listeners to the buttons
factoryButton.addEventListener('click', () => {
  updateScore(-10); // Decrease score by 10
});

treeButton.addEventListener('click', () => {
  updateScore(20); // Increase score by 20
});

// Function to update the score
function updateScore(amount) {
  score += amount; // Adjust score by the given amount

  // Prevent score from going below 0
  if (score < 0) {
    score = 0;
  }

  // Update the score display
  scoreDisplay.innerText = 'Score: ' + score;
}