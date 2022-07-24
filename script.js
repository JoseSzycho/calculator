let toCalculate={
    firstNumber: null,
    operator: null,
    secondNumber: null,
    result: null,
};
let previousResult = false;
let currentNumber = null;

function display(toDisplay){
    //displaying principal-display
    const principalDisplay = document.querySelector("#principal-display");
    principalDisplay.textContent = toDisplay;

};

function secondaryDisplay(clear = false){
    let toDisplay;
    //displaying secondary-display
    if(clear == false){
        toDisplay = Object.values(toCalculate)
                                .filter(el => el);                  
        if(toDisplay[3]) toDisplay[3] = "=";
        toDisplay = toDisplay.join(" ");        
        console.log(toDisplay)     
    }else{
        toDisplay = '0';
    }


    const secondaryDisplay = document.querySelector("#secondary-display");
    secondaryDisplay.textContent = toDisplay; 
}

function updateNumbers(){
    if(!toCalculate.operator && !toCalculate.secondNumber){
        toCalculate.firstNumber = currentNumber;
        return;
    }
    if(toCalculate.firstNumber && toCalculate.operator && currentNumber){
        toCalculate.secondNumber = currentNumber;
    }
}

function storeNumber(){
    let value = this.getAttribute("value");
    if(!currentNumber){
        currentNumber = value;
    }else{
        currentNumber += value;
    };
    updateNumbers();
    display(currentNumber);
    secondaryDisplay();
};

function addDecimal(){
    if(!currentNumber) return;
    if(currentNumber.includes(".")) return;
    currentNumber += ".";
    updateNumbers();
    display(currentNumber);
    secondaryDisplay();
};

function toggleSign(){
    if(!currentNumber) return;
    currentNumber = (-1*Number(currentNumber)).toString();
    updateNumbers();
    display(currentNumber);
    secondaryDisplay();
}

function clear(){
    toCalculate.firstNumber = null,
    toCalculate.operator = null,
    toCalculate.secondNumber = null,
    toCalculate.result = null,
    previousResult = false;
    currentNumber = null;
    display(0);
    secondaryDisplay(true);
};

function del(){
    if((currentNumber).length > 1) {
        currentNumber = currentNumber.slice(0, -1);
        display(currentNumber);
        updateNumbers();
        secondaryDisplay();
    }
}

function storeOperator(){
    if(this.getAttribute("value") == 'C'){
        clear();
        return
    }
    if(this.getAttribute("value") == 'D'){
        del();
        return
    }
    if(!currentNumber && previousResult == false) return; //if there is a previous result, I can chose an operator
    toCalculate.operator = this.getAttribute("value");
    //if there is an operator, first number is already chosen
    currentNumber = null;
    updateNumbers();
    display(toCalculate.operator);
    secondaryDisplay();
};

function evaluate(){
    if(!toCalculate.firstNumber || !toCalculate.operator || !currentNumber) return 0;
    const a = Number(toCalculate.firstNumber);
    const b = Number(toCalculate.secondNumber);
    let operator = toCalculate.operator;
    let result;
    switch(operator){
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "x":
            result = a * b;
            break;
        case "/":
            result = a / b;
            break;
    }
    result = result.toString();
    //preparing for next calculus
    display(result);
    toCalculate.result = result;
    secondaryDisplay();
    toCalculate.firstNumber = result;
    toCalculate.secondNumber = null;
    toCalculate.operator = null;
    previousResult = true;
    toCalculate.result = null;
    currentNumber = null;
    
    
};

//Getting number from DOM
const elementNumber = document.querySelectorAll(".number");
elementNumber.forEach(el => el.addEventListener('click', storeNumber));

//Adding decimal point
const elementDecimal = document.querySelector("#decimal-point");
elementDecimal.addEventListener('click', addDecimal);

//Toggling sign
const toggleElement = document.querySelector("#toggle-sign");
toggleElement.addEventListener("click", toggleSign);

//Getting operators
const operatorElement = document.querySelectorAll(".operator");
operatorElement.forEach(el => el.addEventListener('click', storeOperator));

//Calculating result
const equalElement = document.querySelector(".equal");
equalElement.addEventListener("click", evaluate);