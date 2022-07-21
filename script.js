let valuesToCalculate = { //values used for the calculus
    operand: null,
    firstValue: null,
    secondValue: null,
    result: null
};

function storeButtonValue(){
    if(this.getAttribute("class") == "operator"){ 
        if(valuesToCalculate.firstValue && !valuesToCalculate.secondValue){ //once you set firs number and second you cant change operator
            valuesToCalculate.operand = this.getAttribute("value"); 
        };
    };
    if(this.getAttribute("class") == "number"){  //if element is an number
        if(!valuesToCalculate.secondValue){ //sets the first number 
            valuesToCalculate.firstValue = parseInt(this.getAttribute("value"));
        }
        if(valuesToCalculate.firstValue && valuesToCalculate.operand){
            valuesToCalculate.secondValue = parseInt(this.getAttribute("value")); //sets second number
        }
    }
    console.log(valuesToCalculate);
}

const element = document.querySelectorAll("button"); //gets all button elements
element.forEach(el => el.addEventListener("click", storeButtonValue)); //adds event listener to all elements
//element.addEventListener("click", storeButtonValue);
