//payroll.js
//Program #1

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout,
});

const EMPLOYEE_COUNT = 3;
let employees = [];

function askQuestions(query) {
  return new Promise ((resolve) => rl.question(query, resolve));
}

function validateWage(wage) {
  return !isNaN(wage) && wage > 0;
}

function validateHours (hours) {
  return !isNaN(hours) && hours >= 0 && hours <= 80; 
} 

function calculatePay(hours, wage) {
  let regularHours = Math.min (hours, 40); 
  let overtimeHours = Math.max (hours - 40, 0); 

  let regularPay = regularHours * wage;
  let overtimePay = overtimeHours * wage * 1.5; 

  return { 
    regularHours, 
    overtimeHours, 
    regularPay, 
    overtimePay, 
    totalPay: regularPay + overtimePay, 
  }; 
}

async function getEmployeeData(i) { 
  console.log(`\nEmployee #${i + 1}`);

  const name = await askQuestion("Name: "); 

  let wage; 
  while (true) {
    wage = parseFloat (await askQuestion("Hourly wage: ")); 
    if (validateWage(wage)) break;
    console.log ("Invalid wage. Must be a positive number.");
  }

  const pay = calculatePay (hours, wage); 

  employees.push ({
    name,
    hours,
    wage,
    ...pay,
  });
}

function printReport() {
  console.log("\n===== PAYROLL REPORT =====");

  let highestPaid = employees [0];

  employees.forEach ((e) => {
    if (e.totalPay > highestPaid.totalPay) {
      highestPaid = e; 
    }
  });

  employees.forEach ((e) => {
    console.log("\n--------------------------");
    console.log(`Name: ${e.name}`);
    console.log(`Total Hours: ${e.hours}`);
    console.log(`Regular Pay: $${e.regularPay.toFixed(2)}`);
    console.log(`Overtime Pay: $${e.overtimePay.toFixed(2)}`);
    console.log(`Total Pay: $${e.totalPay.toFixed(2)}`);
  });

  console.log("\n==========================");
  console.log(
    `Highest Paid Employee: ${highestPaid.name} ($${highestPaid.totalPay.toFixed(
      2
    )})`
  );
  console.log("==========================");
}

async function main (){
  for (let i = 0; i < EMPLOYEE_COUNT; i++) {
    await getEmployeeData(i);
  }

  printReport(); 
  rl.close();

}

main(); 
