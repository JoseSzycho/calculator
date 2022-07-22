let valuesToCalculate = { //values used for the calculus
    firstValue: null,
    operand: null,
    secondValue: null,
};

let calculatorResult;

function updateDisplay(toDisplay){
    const element = document.querySelector("#display");
    element.textContent = toDisplay;
}

function updateSmallDisplay(equal=""){
    const element = document.querySelector("#small-display");
    let toDisplay = Object
                        .values(valuesToCalculate)
                        .reduce((value, el) => {
                            if(el){return value+" "+el;
                            }else{
                                return value;
                            }},[]);
    
    if(equal == "=") {
        toDisplay += " =";
        console.log(toDisplay)
    };
    element.textContent = toDisplay;              
    

}

function storeButtonValue(){
    if(this.getAttribute("class") == "operator" && this.getAttribute("value") != "+-"){ 
        if(valuesToCalculate.firstValue && !valuesToCalculate.secondValue){ //once you set firs number and second you cant change operator
            valuesToCalculate.operand = this.getAttribute("value"); 
        };
    };
    if(this.getAttribute("class") == "number"){  //if element is an number
        if(!valuesToCalculate.secondValue && !valuesToCalculate.operand){ //sets the first number 
            valuesToCalculate.firstValue = parseInt(this.getAttribute("value"));
            updateDisplay(valuesToCalculate.firstValue);
        }
        if(valuesToCalculate.firstValue && valuesToCalculate.operand){
            valuesToCalculate.secondValue = parseInt(this.getAttribute("value")); //sets second number
            updateDisplay(valuesToCalculate.secondValue);
        }
    }
    
    if(this.getAttribute("value") == "+-"){
        if(valuesToCalculate.firstValue && !valuesToCalculate.operand && !valuesToCalculate.secondValue){
            valuesToCalculate.firstValue = - valuesToCalculate.firstValue;
            updateDisplay(valuesToCalculate.firstValue);
        }

        if(valuesToCalculate.secondValue && valuesToCalculate.operand && valuesToCalculate.firstValue){
            valuesToCalculate.secondValue = - valuesToCalculate.secondValue;
            updateDisplay(valuesToCalculate.secondValue);
        }
    }

    updateSmallDisplay();

}

function calculateResult(){
    if(Object.values(valuesToCalculate).every(el => el)){ //if all values are set for calculating
        if(valuesToCalculate.operand == "+") calculatorResult = valuesToCalculate.firstValue + valuesToCalculate.secondValue;
        if(valuesToCalculate.operand == "-") calculatorResult = valuesToCalculate.firstValue - valuesToCalculate.secondValue;
        if(valuesToCalculate.operand == "x") calculatorResult = valuesToCalculate.firstValue * valuesToCalculate.secondValue;
        if(valuesToCalculate.operand == "/") calculatorResult = valuesToCalculate.firstValue / valuesToCalculate.secondValue;
        if(valuesToCalculate.operand == "%") calculatorResult = valuesToCalculate.firstValue + valuesToCalculate.secondValue;
        updateSmallDisplay("=");
        Object.keys(valuesToCalculate).forEach(i => valuesToCalculate[i] = null); //reset values for new calculation
        updateDisplay(calculatorResult);
    }
    
    
}

const elements = document.querySelectorAll("button[class]:not(.equal)"); //gets all button elements
elements.forEach(el => el.addEventListener("click", storeButtonValue)); //adds event listener to all elements

const equalElement = document.querySelector(".equal")
equalElement.addEventListener("click", calculateResult);