let currentNumber = "";
let previousNumber = "";
let operator = "";
const currentDisplay = document.querySelector(".current-display");
const topDisplay = document.querySelector(".top-display");
const decimalBtn = document.querySelector(".decimalBtn");
const allClearBtn = document.querySelector(".allClearBtn");
const numberBtn = document.querySelectorAll(".operand");
const operatorBtn = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clearBtn");
const equalBtn = document.querySelector(".equalBtn");

window.addEventListener("keydown", (e) => {
  if (e.key >= 0) handleNumber(e.key);
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key);
  }
  if (e.key === "*") handleOperator(convertMultiply(e.key));

  if (e.key === "Enter") {
    if (previousNumber.length === 0 || currentNumber.length === 0) {
      currentDisplay.textContent = NaN;
    } else {
      operate();
    }
  }
  if (e.key === "Backspace") handleDeleteKey();
});

clearBtn.addEventListener("click", () => {
  currentNumber = "";
  previousNumber = "";
  operator = "";
  currentDisplay.textContent = "0";
  topDisplay.textContent = "";
});

equalBtn.addEventListener("click", () => {
  if (currentNumber.length === 0 || previousNumber.length === 0) {
    currentDisplay.textContent = NaN;
  } else {
    operate();
  }
});

numberBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

// All calculation goes here
function operate() {
  previousNumber = Number(previousNumber); // Convert value to number
  currentNumber = Number(currentNumber); //Convert value to number

  const roundNumber = (num) => Math.round(num * 100000) / 100000;
  const add = (a, b) => a + b;
  const subtract = (a, b) => a - b;
  const multiply = (a, b) => a * b;
  const divide = (a, b) => a / b;

  if (operator === "+") {
    previousNumber = add(currentNumber, previousNumber);
  } else if (operator === "-") {
    previousNumber = subtract(previousNumber, currentNumber);
  } else if (operator === "x") {
    previousNumber = multiply(currentNumber, previousNumber);
  } else if (operator === "/") {
    previousNumber = divide(previousNumber, currentNumber);
    if (currentNumber <= 0) {
      displayResult();
    }
  }
  topDisplay.textContent += currentNumber;
  previousNumber = roundNumber(previousNumber);
  previousNumber = previousNumber.toString();
  alterResult();
}

// Show error if e.g 9 / 0
function displayResult() {
  previousNumber = "Error!";
  topDisplay.textContent = "";
  currentNumber = "";
}

// Altering result if it's overflowing the display
function alterResult() {
  if (previousNumber.length <= 11) {
    currentDisplay.textContent = previousNumber;
  } else {
    currentDisplay.textContent = `${previousNumber.slice(0, 11)}...`;
  }
}

function handleOperator(op) {
  if (previousNumber === "") {
    previousNumber = currentNumber;
    operatorCheck(op);
  } else if (currentNumber === "") {
    operatorCheck(op);
  } else {
    operate();
    operator = op;
    currentDisplay.textContent = "0";
    topDisplay.textContent = `${previousNum} ${operator}`;
  }

  // operator = op
  // previousNumber += currentNumber
  // topDisplay.textContent = `${previousNumber} ${operator} `
  // currentNumber = ''
  // currentDisplay.textContent = ''
}

function operatorCheck(text) {
  operator = text;
  topDisplay.textContent = `${previousNumber} ${operator} `;
  currentDisplay.textContent = "0";
  currentNumber = "";
}

function convertMultiply(keyOp) {
  if (keyOp === "*") return "x";
}

function handleDeleteKey() {
  if (currentNumber !== "") {
    currentNumber = currentNumber.slice(0, -1);
    currentDisplay.textContent = currentNumber;
    if (currentNumber === "") {
      currentDisplay.textContent = "0";
    }
  }
  if (currentNumber === "" && previousNumber !== "" && operator === "") {
    previousNumber = previousNumber.slice(0, -1);
    currentDisplayNumber.textcontent = previousNum;
  }
}

function handleNumber(number) {
  if (currentNumber.length <= 11) {
    currentNumber += number;
    currentDisplay.textContent = currentNumber;
  }
}
