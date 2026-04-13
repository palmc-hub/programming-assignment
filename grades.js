// grades.js
// Program #2:

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function validateScore(score) {
  return !isNaN(score) && score >= 0 && score <= 100;
}

function getLetterGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

async function main() {
  let currentAvg;

  while (true) {
    currentAvg = parseFloat(await askQuestion("Current average: "));
    if (!isNaN(currentAvg) && currentAvg >= 0 && currentAvg <= 100) break;
    console.log("Invalid average. Must be 0–100.");
  }

  let scoresInput = await askQuestion(
    "Enter hypothetical final exam scores (comma-separated, e.g. 100,90,80): "
  );

  let scores = scoresInput
    .split(",")
    .map((s) => parseFloat(s.trim()))
    .filter((s) => validateScore(s));

  if (scores.length === 0) {
    console.log("No valid scores entered.");
    rl.close();
    return;
  }

  console.log("\n===== GRADE FORECAST REPORT =====");

  scores.forEach((score) => {
    let finalGrade = currentAvg * 0.75 + score * 0.25;
    let letter = getLetterGrade(finalGrade);

    let change =
      finalGrade > currentAvg
        ? "Improved"
        : finalGrade < currentAvg
        ? "Declined"
        : "Stayed the same";

    console.log("\n--------------------------");
    console.log(`Final Exam Score: ${score}`);
    console.log(`Final Course Average: ${finalGrade.toFixed(2)}`);
    console.log(`Letter Grade: ${letter}`);
    console.log(`Status: ${change}`);
  });

  rl.close();
}

main();
