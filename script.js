let display = document.getElementById("display");
let currentNumber = "";
let previousNumber = "";
let operator = "";

function updateDisplay() {
  display.value = previousNumber + operator + currentNumber;
}

//handle number button clicks
function handleNumber(number) {
  if (currentNumber === "0" || operator === "=") {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
  updateDisplay();
}

//Add event listeners to number buttons
document.querySelectorAll(".number").forEach(button => {
  button.addEventListener('click', function() {
    handleNumber(this.dataset.number);
  });
});

function handleOperator(op) {
  if (previousNumber !== "" && currentNumber !== "" && operator !== "") {
    calculate();
  }
  operator = op;
  previousNumber = currentNumber;
  currentNumber = "";
  display.value = previousNumber + op; // add this line
}

document.querySelectorAll(".operator").forEach(button => {  
  button.addEventListener('click', function() {
    handleOperator(this.dataset.operator);
  });
});

function calculate() {
  let result;
  const num1 = parseFloat(previousNumber);
  const num2 = parseFloat(currentNumber);

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    default:
      return;
  }

  currentNumber = result.toString();
  operator = "";
  previousNumber = "";
  updateDisplay();
}

document.querySelector(".equals").addEventListener('click', calculate);

function clear() {
  currentNumber = "";
  previousNumber = "";
  operator = "";
  updateDisplay();
}

document.querySelector(".clear").addEventListener('click', clear);

function backspace() {
  if (currentNumber !== "") {
    currentNumber = currentNumber.toString().slice(0, -1);
  } else if (operator !== "") {
    operator = "";
  } else {
    previousNumber = previousNumber.toString().slice(0, -1);
  }
  updateDisplay();
}

document.querySelector(".backspace").addEventListener('click', backspace);

//Keyboard support
document.addEventListener('keydown', function(event) {
  const key = event.key;

  if (key >= '0' && key <= '9') {
    handleNumber(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    handleOperator(key);
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault(); // prevent form submission if main Enter key is pressed
    calculate();
  } else if (key === 'Escape' || key === 'C' || key === 'c') {
    clear();
  } else if (key === '.') {
    handleNumber(key);
  } else if (key === 'Backspace') {
    event.preventDefault();
    backspace();
  }
});