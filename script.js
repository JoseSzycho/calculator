let toCalculate = {
    firstNumber: null,
    operator: null,
    secondNumber: null,
};

let calculatorResult = null;

function evaluate(){
    let result;
    const a = Number(toCalculate.firstNumber);
    const b = Number(toCalculate.secondNumber);
    switch(toCalculate.operator){
        case '+':
            console.log(5555)
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case 'x':
            result = a * b;
            break;
        case '/':
            result = a / b;
            break;
    };
    calculatorResult = result;
    principalDisplay(result);
}

function secondaryDisplay(){
    const element = document.querySelector("#secondary-display");
    let toDisplay = Object
                        .values(toCalculate)
                        .reduce((value, el) => {
                            if(el){return value+" "+el;
                            }else{
                                return value;
                            }},[]);                       
    if(calculatorResult){
        toDisplay += " =";
    }
    element.textContent = toDisplay;
}

function principalDisplay(toDisplay){
    const element = document.querySelector("#principal-display");
    element.textContent = toDisplay;
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

//adds event listener to operators
const operatorElements = document.querySelectorAll("button[class]:not(.equal, .number)")
operatorElements.forEach(el => el.addEventListener("click", selectOperator));

//adds event listener to equal button
const equalElement = document.querySelector(".equal");
equalElement.addEventListener("click", evaluate);