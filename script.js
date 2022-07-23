let toCalculate = {
    firstNumber: null,
    operator: null,
    secondNumber: null
};

function addNumber(){
    console.log(this)
    if(!toCalculate.operator && !toCalculate.secondNumber){
        toCalculate.firstNumber += this.getAttribute("value");
    }

    console.log(toCalculate.firstNumber);
}

const elements = document.querySelectorAll("button[class]:not(.equal, .operator)"); //gets all button elements
elements.forEach(addEventListener("click", addNumber));