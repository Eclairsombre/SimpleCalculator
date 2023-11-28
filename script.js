class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
     
    }

    appendNumber(number) {
        if(number ==='.'&& this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand ='';
      
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const cur = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(cur)) return
        switch (this.operation) {
            case '+':
                computation = prev + cur;
                break;
            case '-':
                computation = prev - cur;
                break;
            case '/':
                if(cur !== 0){
                    computation = prev / cur;
                }
                
                break;
            case '*':
                computation = prev * cur;
                break;
        
            default:
                break;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        
    }

    

     
    

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if(this.operation !=null){
            this.previousOperandTextElement.innerText = this.previousOperand+ this.operation;
        }
        else{
            this.previousOperandTextElement.innerText ='';
        }
    }
}


const numberButtons = document.querySelectorAll("[data-number]")
const operationButton = document.querySelectorAll("[data-operation]")
const equalButton = document.querySelector("[data-equal]")
const deleteButton = document.querySelector("[data-del]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperand = document.querySelector("[data-previous]")
const currentOperand = document.querySelector("[data-current]")



const calculator = new Calculator(previousOperand,currentOperand)

numberButtons.forEach(button => {
    button.addEventListener('click',()=> {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButton.forEach(button => {
    button.addEventListener('click',()=> {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalButton.addEventListener('click',()=> {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click',()=> {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click',()=> {
    calculator.delete();
    calculator.updateDisplay();
})