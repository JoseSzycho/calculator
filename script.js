let toCalculate = {
    firstNumber: null,
    operator: null,
    secondNumber: null,
};

function secondaryDisplay(){
    
}

function principalDisplay(value){
    const element = document.querySelector("#principal-display");
    element.textContent = value;
    secondaryDisplay();
}

function addNumber(){
    //adding first number
    if(!toCalculate.operator && !toCalculate.secondNumber){
        toCalculate.firstNumber += this.getAttribute("value");
        toCalculate.firstNumber = toCalculate.firstNumber.replace('null','')
        principalDisplay(toCalculate.firstNumber);
    };
    //adding second number
    if(toCalculate.firstNumber && toCalculate.operator){
        toCalculate.secondNumber += this.getAttribute("value");
        toCalculate.secondNumber = toCalculate.secondNumber.replace('null','')
        principalDisplay(toCalculate.secondNumber);
    }
    //console.log(toCalculate.firstNumber, toCalculate.operator, toCalculate.secondNumber)
    
}

function selectOperator(){
    if(toCalculate.firstNumber && !toCalculate.secondNumber){
        toCalculate.operator = this.getAttribute("value");
    }
    principalDisplay(toCalculate.operator);
}

//adds event listener to numbers
const numberElements = document.querySelectorAll("button[class]:not(.equal, .operator)"); //gets all button elements
numberElements.forEach(el => el.addEventListener("click", addNumber));

//ads event listener to operators
const operatorElements = document.querySelectorAll("button[class]:not(.equal, .number)")
operatorElements.forEach(el => el.addEventListener("click", selectOperator));