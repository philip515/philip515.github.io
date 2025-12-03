// -----------------------------
// Adventure Game (no JSON file)
// -----------------------------

// Player stats (starting values stored directly in JS)
let stamina = 10;
let money = 20;
let hunger = 5;

// -----------------------------
// Function: updateStats
// -----------------------------
// This function changes the stats when a choice is made.
// It takes three numbers (change in stamina, money, hunger)
// and adds them to the current values.
function updateStats(staminaChange, moneyChange, hungerChange) {
  stamina += staminaChange;
  money += moneyChange;
  hunger += hungerChange;
  showStats(); // refresh the numbers on screen
}

// -----------------------------
// Function: showStats
// -----------------------------
// This function updates the numbers shown on the web page.
function showStats() {
  document.getElementById("stamina").textContent = stamina;
  document.getElementById("money").textContent = money;
  document.getElementById("hunger").textContent = hunger;
}

// -----------------------------
// Adventure steps (story + choices)
// -----------------------------
const steps = {
  step1: {
    text: "Step 1: You see berries and a merchant.",
    choices: [
      { text: "Eat berries ", next: "step2", effect: () => updateStats(-1, 0, +2) },
      { text: "Buy food ", next: "step2", effect: () => updateStats(0, -5, +3) }
    ]
  },
  step2: {
    text: "Step 2: At a river, you can fish or build a raft.",
    choices: [
      { text: "Fish", next: "step3", effect: () => updateStats(-2, 0, +2) },
      { text: "Build raft", next: "step3", effect: () => updateStats(-3, -2, 0) }
    ]
  },
  step3: {
    text: "Step 3: In a village, you can work or rest.",
    choices: [
      { text: "Work", next: "end", effect: () => updateStats(-2, +5, +1) },
      { text: "Rest", next: "end", effect: () => updateStats(+3, -5, -1) }
    ]
  },
  end: {
    text: "The adventure ends! Final stats are shown.",
    choices: [
      { text: "Play again", next: "step1", effect: () => {
        // Reset stats back to starting values
        stamina = 10;
        money = 20;
        hunger = 5;
        showStats();
      }}
    ]
  }
};

// -----------------------------
// Function: showStep
// -----------------------------
// This function shows one step of the adventure.
// It uses a forEach loop to create buttons for each choice.
function showStep(stepName) {
  const step = steps[stepName];
  document.getElementById("story").textContent = step.text;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  // Loop through each choice and make a button
  step.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;

    btn.onclick = () => {
      choice.effect();   // apply the choice's effect (update stats)
      showStep(choice.next); // go to the next step
    };

    choicesDiv.appendChild(btn);
  });
}

// -----------------------------
// Start the game
// -----------------------------
showStats();   // show starting stats
showStep("step1"); // begin at step 1