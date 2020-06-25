// Initalise variables
let input = '';
let output = '';
let answered = false;
let decimals = false;
const calculator = document.querySelector('#calculator')
const displayOutput = document.querySelector('#display-output');
const displayIntput = document.querySelector('#display-input')

// Initalise display
const updateDisp = () => {
    displayIntput.textContent = input;
    displayOutput.textContent = output;
}
const clearDisp = () => {
    decimals = false;
    input = '';
    output = '';
    updateDisp()
}
updateDisp()

/*-----Calculator display changes-----*/
calculator.addEventListener('click',(e) => {
    // clear previouse answer if there is one
    if (answered) {
        input = output;
        output = '';
        answered = false;
    }

    // find which button has been pressed
    let btnName = e.target.getAttribute('id') || e.target.parentElement.getAttribute('id')

    // clear, delete and equals button functions
    if (btnName == 'clear') { clearDisp(); }
    else if (btnName == 'delete') {
        if (/\W/.test(output[output.length -1])) { decimals = false; }
        output = output.slice(0,-1);
    }
    else if (btnName == 'equals') { 
        input += output;
        output = parsePlusSeparExpr(input);
        input += '=';
        answered = true;
        decimals = false; 
    }

    // number buttons
    else if (btnName == 'decimal') {
        if (!decimals) {
            output += '.';
            decimals = true;
        }
    }
    else if (btnName == 'zero') { output += '0'; }
    else if (btnName == 'one') { output += '1'; }
    else if (btnName == 'two') { output += '2'; }
    else if (btnName == 'three') { output += '3'; }
    else if (btnName == 'four') { output += '4'; }
    else if (btnName == 'five') { output += '5'; }
    else if (btnName == 'six') { output += '6'; }
    else if (btnName == 'seven') { output += '7'; }
    else if (btnName == 'eight') { output += '8'; }
    else if (btnName == 'nine') { output += '9'; }
    // brackets
    else if (btnName == 'open-bracket') { output += '('; }
    else if (btnName == 'close-bracket') { output += ')'; }
    // operator buttons
    else if (btnName == 'divide') { output = pushOperator('/', output ); }
    else if (btnName == 'multiply') { output = pushOperator('*', output ); }
    else if (btnName == 'add') { output = pushOperator('+', output ); }
    else if (btnName == 'subtract') { output = pushOperator('-', output ); }


    // console.log('btn ID is', btnName)
    updateDisp()
})
// replace last operator symbols (non word characters \W) with latest pressed, if they are pressed one after another.
const pushOperator = (operator, output) => {
    if (/\W/.test(output[output.length -1])) {
        output = output.slice(0,-1)
    }
    decimals = false;
    output += operator;
    return output;
}

/*-----Calculator Logic-----*/
// parse * / - +
const parsePlusSeparExpr = (expression) => {
    // convert string to array of no.s
    const arr = split(expression, '+').map(parseMinusSeparExpr);
    // sum array
    const result = arr.reduce((tot, no) => tot + no);
    return result;
}
// parse * / -
const parseMinusSeparExpr = (expression) => {
    // convert string to array of no.s
    const arr = split(expression, '-').map(parseDivisionSeparExpr);
    // minus array
    const result = arr.reduce((tot, no) => tot - no);
    return result;
}
// parse both * /
const parseDivisionSeparExpr = (expression) => {
    // convert string to array of no.s
    const arr = split(expression, '/').map(parseMultiplicationSeparExpr);
    // divide array
    const result = arr.reduce((tot, no) => tot / no);
    return result;
}
// parse strings only of no.s and * opperation
const parseMultiplicationSeparExpr = (expression) => {
    // convert string to array of no.s or pass back through functions for parts in brackets 
    const arr = split(expression, '*').map((numStr) => {
        return numStr[0] === '(' ? parsePlusSeparExpr(numStr.substr(1, numStr.length - 2)) : Number(numStr)
    });
    // multiply array
    const result = arr.reduce((tot, no) => tot * no);
    return result;
}

// split expression by opperator but don't split in parentheses
const split = (expression, operator) => {
    const result = [];
    let braces = 0;
    let currentChunk = "";
    for (let i = 0; i < expression.length; i++) {
        const curCh = expression[i];
        if (curCh == '(') { braces++; }
        else if (curCh == ')') { braces--; }

        if (braces == 0 && operator == curCh) {
            result.push(currentChunk);
            currentChunk = "";
        } else { currentChunk += curCh; }
    }
    if (currentChunk != "") {
        result.push(currentChunk);
    }
    return result;
};