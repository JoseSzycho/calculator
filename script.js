let valuesToCalculate = { //values used for the calculus
    operand: null,
    firstValue: null,
    secondValue: null,
    result: null
};

function storeButtonValue(){
    console.log(this.getAttribute("value"));
    console.log(valuesToCalculate);
    
}

const element = document.querySelectorAll("button"); //gets all button elements
element.forEach(el => el.addEventListener("click", storeButtonValue)); //adds event listener to all elements
//element.addEventListener("click", storeButtonValue);
