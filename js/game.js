 // -----------------------------
    // Adventure Game with All Scores
    // -----------------------------

    let stamina = 10;
    let money = 20;
    let hunger = 5;

    let allScores = JSON.parse(localStorage.getItem("allScores")) || [];

    // -----------------------------
    // Function: showStats
    // -----------------------------
    function showStats() {
      document.getElementById("stamina").textContent = stamina;
      document.getElementById("money").textContent = money;
      document.getElementById("hunger").textContent = hunger;
      showScores(); // also update the list of scores at the bottom
    }

    // -----------------------------
    // Function: updateStats
    // -----------------------------
    function updateStats(staminaChange, moneyChange, hungerChange) {
      stamina += staminaChange;
      money += moneyChange;
      hunger += hungerChange;
      showStats();
    }

    // -----------------------------
    // Adventure steps (story + choices)
    // -----------------------------
    const steps = {
      step1: {
        text: "Step 1: You see berries and a merchant.",
        choices: [
          { text: "Eat berries", next: "step2", effect: () => updateStats(-1, 0, +2) },
          { text: "Buy food", next: "step2", effect: () => updateStats(0, -5, +3) }
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
          { 
            text: "Play again", 
            next: "step1", 
            effect: () => {
              // reset stats only, no duplicate saveScore()
              stamina = 10;
              money = 20;
              hunger = 5;
              showStats();
            }
          }
        ]
      }
    };

    // -----------------------------
    // Function: showStep
    // -----------------------------
    function showStep(stepName) {
      const step = steps[stepName];
      document.getElementById("story").textContent = step.text;

      const choicesDiv = document.getElementById("choices");
      choicesDiv.innerHTML = ""; // clear old buttons

      step.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;

        btn.onclick = () => {
          choice.effect(); // apply stat changes
          if (choice.next === "end") {
            saveScore(); // save score only once at the end
          }
          showStep(choice.next); // move to next step
        };

        choicesDiv.appendChild(btn);
      });
    }

    // -----------------------------
    // Function: saveScore
    // -----------------------------
    function saveScore() {
      const currentScore = stamina + money + hunger;
      const playerName = prompt("Enter your name for the score:") || "Anonymous";

      allScores.push({ name: playerName, score: currentScore });
      localStorage.setItem("allScores", JSON.stringify(allScores));

      showScores();
    }

    // -----------------------------
    // Function: showScores
    // -----------------------------
    function showScores() {
      const scoreDiv = document.getElementById("allScores");
      scoreDiv.innerHTML = "";

      if (allScores.length === 0) {
        scoreDiv.textContent = "No scores yet.";
        return;
      }

      const list = document.createElement("ul");
      allScores.forEach(entry => {
        const item = document.createElement("li");
        item.textContent = entry.name + " : " + entry.score;
        list.appendChild(item);
      });
      scoreDiv.appendChild(list);
    }

    // -----------------------------
    // Start the game
    // -----------------------------
    showStats();
    showStep("step1");
