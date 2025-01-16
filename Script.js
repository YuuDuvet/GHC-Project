// Variables to track game state
let Environment = 100;
let Economy = 50;
let Happiness = 75;

// Questions pool with multiple options
const questions = [
  {
    message: "A large company wants to build a factory in a rural area.",
    options: [
      { text: "Approve the factory", effects: { Environment: -15, Economy: 10, Happiness: 5 } },
      { text: "Deny the factory", effects: { Environment: 10, Economy: -5, Happiness: -10 } },
      { 
        text: "Negotiate stricter regulations", 
        effects: null, // No immediate effect
        dialogue: "The company agrees to stricter environmental rules. What regulations will you enforce?", 
        followUpOptions: [
          { text: "Limit emissions", effects: { Environment: 10, Economy: -5, Happiness: 5 } },
          { text: "Demand renewable energy", effects: { Environment: 20, Economy: -10, Happiness: 10 } },
          { text: "Ask for a community fund", effects: { Environment: 5, Economy: -5, Happiness: 15 } },
        ],
      },
    ],
  },
  {
    message: "You discover an endangered species in a forest targeted for logging.",
    options: [
      { text: "Protect the species", effects: { Environment: 50, Economy: -10, Happiness: 10 } },
      { text: "Allow logging", effects: { Environment: -50, Economy: 10, Happiness: -10 } },
      { text: "Seek a compromise", effects: { Environment: 10, Economy: 0, Happiness: 5 } },
    ],
  },
];

// Get elements
const messageBox = document.getElementById("message");
const EnvironmentDisplay = document.getElementById("Environment");
const EconomyDisplay = document.getElementById("Economy");
const HappinessDisplay = document.getElementById("Happiness");
const optionsContainer = document.getElementById("options-container");

// Show a question
function showQuestion(question = null) {
  const currentQuestion = question || questions[Math.floor(Math.random() * questions.length)];
  messageBox.textContent = currentQuestion.message;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Add options as buttons
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option.text;
    button.onclick = () => {
      if (option.effects) {
        // Apply effects and show next random question
        applyEffects(option.effects);
        showQuestion();
      } else if (option.dialogue) {
        // Show follow-up dialogue and options
        showFollowUp(option);
      }
    };
    optionsContainer.appendChild(button);
  });
}

// Show follow-up dialogue and options
function showFollowUp(option) {
  messageBox.textContent = option.dialogue;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Add follow-up options as buttons
  option.followUpOptions.forEach((followUp) => {
    const button = document.createElement("button");
    button.textContent = followUp.text;
    button.onclick = () => {
      applyEffects(followUp.effects);
      showQuestion(); // Show the next random question
    };
    optionsContainer.appendChild(button);
  });
}

// Apply effects of a choice
function applyEffects(effects) {
  Environment += effects.Environment || 0;
  Economy += effects.Economy || 0;
  Happiness += effects.Happiness || 0;

  // Update the UI
  EnvironmentDisplay.textContent = Environment;
  EconomyDisplay.textContent = Economy;
  HappinessDisplay.textContent = Happiness;

  checkGameOver();
}

// Check for game over conditions
function checkGameOver() {
  if (Environment <= 0 || Economy <= 0 || Happiness <= 0) {
    messageBox.textContent = "Game Over! Refresh to play again.";
    optionsContainer.innerHTML = ""; // Clear options
  }
}

// Start the game
showQuestion();